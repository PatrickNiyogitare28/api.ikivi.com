import { Controller, Post, Body, Param, Req, HttpCode, Get, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupMetadataService } from './group-metadata.service';
import { CreateGroupMetadataDto, UpdateGroupMetadataDto } from './dto/metadata.dto';
import { GroupMetadataEntity } from './group-metadata.entity';

@ApiTags('Group Metadata')
@ApiBearerAuth()
@Controller('group-metadata')
export class GroupMetadataController {
  constructor(private readonly groupMetadataService: GroupMetadataService) {}

  @ApiResponse({ status: 201, description: 'Group  metadata added successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({name: 'id', description: 'Group id'})
  @Post('/group/:id')
  @HttpCode(201)
  async create(
    @Body() createGroupMetadataDto: CreateGroupMetadataDto,
    @Req() req: any,
    @Param('id') id: string
    ) {
    return this.groupMetadataService.addGroupMetadata(createGroupMetadataDto, id, req.user.role, req.user.user_id);
  }

  @ApiResponse({ status: 200, description: 'Metadata fetched successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Group or Group metadata not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({name: 'id', description: 'Group id'})
  @Get('/group/:id')
  async getGroupMetadata(
    @Req() req: any,
    @Param('id') id: string
    ) {
    return this.groupMetadataService.getGroupMetadata(id, req.user.role, req.user.user_id);
  }

  @ApiResponse({ status: 200, description: 'Metadata fetched successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized error' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/')
  async getMetadataList(
    ) {
    return this.groupMetadataService.getGroupMetadataList();
  }

  @ApiResponse({ status: 200, description: 'Metadata fetched successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Group metadata not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({name: 'id', description: 'Group id'})
  @Get('/:id')
  async getMetadataById(
    @Req() req: any,
    @Param('id') id: string
    ) {
    return this.groupMetadataService.getGroupMetadata(id, req.user.role, req.user.user_id);
  }

  @ApiResponse({ status: 201, description: 'Group metadata updated successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({name: 'id', description: 'Group id'})
  @Put('/:id')
  @HttpCode(200)
  async updatedMetadata(
    @Body() updateMetadataDto: UpdateGroupMetadataDto,
    @Req() req: any,
    @Param('id') id: string
    ) {
    return this.groupMetadataService.updateGroupMetadata(id, updateMetadataDto,req.user.role, req.user.user_id);
  }

  @ApiResponse({ status: 201, description: 'Group metadata updated successfully', type: GroupMetadataEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({name: 'id', description: 'Group id'})
  @Delete('/:id')
  @HttpCode(200)
  async deleteMetadata(
    @Req() req: any,
    @Param('id') id: string
    ) {
    return this.groupMetadataService.deleteGroupMetadata(id,req.user.role, req.user.user_id);
  }
}
