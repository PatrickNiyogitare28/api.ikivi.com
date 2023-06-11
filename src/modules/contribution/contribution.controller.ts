import { Body, Controller, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContributionEntity } from './contribution.entity';
import { AddContributionDto } from './dto/add-contribution.dto';
import { EStatus } from 'src/enums/EStatus';

@Controller('contribution')
@ApiTags("Contribution")
@ApiBearerAuth()
export class ContributionController {
    constructor(
        private contributionService: ContributionService
    ){}

    @Post('/')
    @ApiResponse({
      status: 201,
      description: 'Term crated successfully',
      type: ContributionEntity,
    })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Not Found Error' })
    @HttpCode(201)
    async register(
      @Body() dto: AddContributionDto,
      @Req() req: any,
    ): Promise<any> {
      return await this.contributionService.add(dto, req.user.user_id, req.user.role)
    }  

    @Get('/group/:groupId')
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched contributions list',
        type: ContributionEntity
    })
    @ApiParam({name: 'groupId', description: 'Group id'})
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Not Found Error' })
    async listContributions(
        @Req() req: any,
        @Param('groupId') group_id: string 
    ): Promise<any>{
        return await this.contributionService.listTransactions(group_id, req.user.user_id, req.user.role);
    }

    @Get('/:contributionId')
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched contributions list',
        type: ContributionEntity
    })
    @ApiParam({name: 'contributionId', description: 'Contribution id'})
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Not Found Error' })
    async getContributionById(
        @Req() req: any,
        @Param('contributionId') contribution_id: string,
    ): Promise<any>{
        return await this.contributionService.getById(contribution_id, req.user.user_id, req.user.role);
    }

    @Get('/group/:groupId/info')
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched contributions list',
        type: ContributionEntity
    })
    @ApiParam({name: 'groupId', description: 'Group id'})
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Not Found Error' })
    async contributionInfo(
        @Req() req: any,
        @Param('groupId') group_id: string,
    ): Promise<any>{
        return await this.contributionService.getContributionInfo(group_id, req.user.user_id);
    }

    @Put('/:contributionId/:status')
    @ApiResponse({
        status: 200,
        description: 'Successfully fetched contributions list',
        type: ContributionEntity
    })
    @ApiParam({name: 'contributionId', description: 'Contribution id'})
    @ApiParam({name: 'status', description: 'Contribution status', type: 'enum', enum: EStatus})
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiResponse({ status: 400, description: 'Not Found Error' })
    async editStatus(
        @Req() req: any,
        @Param('contributionId') contribution_id: string,
        @Param('status') status: EStatus 
    ): Promise<any>{
        return await this.contributionService.editStatus(contribution_id,req.user.user_id, req.user.role, status);
    }
}
