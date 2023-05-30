import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ContributionTermService } from './contribution-term.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContributionTermEntity } from './contribution-term.entity';
import { CreateContributionTermDto } from './dto/contribution-term.dto';

@ApiTags("Contribution Terms")
@ApiBearerAuth()
@Controller('contribution-term')
export class ContributionTermController {
    constructor(
        private readonly termsService: ContributionTermService
    ){}

    @Post('/')
    @ApiResponse({
      status: 201,
      description: 'Term crated successfully',
      type: ContributionTermEntity,
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async register(
      @Body() createDto: CreateContributionTermDto,
      @Req() req: any,
    ): Promise<any> {
      return await this.termsService.openContributionTerm(createDto, req.user.role,req.user.user_id);
    }  

    @Get('/:group_id')
    @ApiResponse({
        status: 200,
        description: 'List of contribution terms',
        type: ContributionTermEntity,
        isArray: true
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getContributionTerms(
        @Param('group_id') group_id: string,
        @Req() req: any
    ): Promise<any> {
        const role = req.user.role;
        const user_id = req.user.user_id;
        return await this.termsService.getContributionTerms(group_id, role, user_id);
    }

    @Get('/active/:group_id')
    @ApiResponse({
        status: 200,
        description: 'Active contribution term',
        type: ContributionTermEntity
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getActiveContributionTerm(
        @Param('group_id') group_id: string,
        @Req() req: any
    ): Promise<any> {
        const role = req.user.role;
        const user_id = req.user.user_id;
        return await this.termsService.getActiveContributionTerm(group_id, role, user_id);
    }

    @Put('/:term')
    @ApiParam({name: 'term', description: 'Contribution term Id'})
    @ApiResponse({
      status: 200,
      description: 'Term inactivated successfully',
      type: ContributionTermEntity,
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async inactivate(
      @Req() req: any,
      @Param('term') term: string
    ): Promise<any> {
      return await this.termsService.inactiveContributionTerm(term, req.user.role,req.user.user_id);
    }  
}


