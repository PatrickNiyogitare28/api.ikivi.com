import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupMetadataEntity } from './group-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';
import { CreateGroupMetadataDto, UpdateGroupMetadataDto } from './dto/metadata.dto';

@Injectable()
export class GroupMetadataService {
    constructor(
        @InjectRepository(GroupMetadataEntity)
        private readonly groupMetadataRepository: Repository<GroupMetadataEntity>,
        private  readonly groupService: GroupService
    ){}

    public async addGroupMetadata(groupMetadata: CreateGroupMetadataDto,group_id: string ,role: EUserRole, user_id: string){
        const group = await this.groupService.findGroupById(group_id);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        const metadataExists = await this._findMetadataByGroupId(group.id);
        if(metadataExists) throw new BadRequestException("Metadata already exists");
        try{
            const newMetadata = await this.groupMetadataRepository.save({...groupMetadata, group: group.id});
            return {
                success: true,
                message: "Group metadata saved successfully",
                data: newMetadata
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message)
        }
    }



    public async getGroupMetadata(group_id: string, role: EUserRole, user_id: string){
        const group = await this.groupService.findGroupById(group_id);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        try{
            const metadataExists = await this._findMetadataByGroupId(group.id);
            if(!metadataExists) throw new NotFoundException("Group metadata not found");
            return {
                success: true,
                data: metadataExists
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message) 
        }
    }

    public async getGroupMetadataList() {
        try{
            const metadataList = await this._findMetadataList();
            if(!metadataList || metadataList.length === 0) throw new NotFoundException("No group metadata found");
            return {
                success: true,
                data: metadataList
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message) 
        }
    }

    public async getGroupMetadataById(metadata_id: string, role: EUserRole, user_id: string){
        const metadata = await this.groupMetadataRepository.findOne({where: {id: metadata_id}});
        if(!metadata) throw new NotFoundException("Group metadata not found");
        const group = await this.groupService.findGroupById(metadata.group);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        try{
            return {
                success: true,
                data: metadata
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message) 
        }
    }

    public async updateGroupMetadata(metadata_id: string, updateGroupMetadataDto: UpdateGroupMetadataDto, role: EUserRole, user_id: string){
        const metadata = await this.groupMetadataRepository.findOne({where: {id: metadata_id}});
        if(!metadata) throw new NotFoundException("Group metadata not found");
        const group = await this.groupService.findGroupById(metadata.group);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        try{
            const updatedMetadata = await this.groupMetadataRepository.save({...metadata, ...updateGroupMetadataDto});
            return {
                success: true,
                message: "Group metadata updated successfully",
                data: updatedMetadata
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message) 
        }
    }

    public async deleteGroupMetadata(metadata_id: string, role: EUserRole, user_id: string){
        const metadata = await this.groupMetadataRepository.findOne({where: {id: metadata_id}});
        if(!metadata) throw new NotFoundException("Group metadata not found");
        const group = await this.groupService.findGroupById(metadata.group);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        try{
            await this.groupMetadataRepository.remove(metadata);
            return {
                success: true,
                message: "Group metadata deleted successfully",
            }
        }
        catch(e){
            throw new InternalServerErrorException(e.message) 
        }
    }

   

    public async _findMetadataList(){
        try{
          return await this.groupMetadataRepository.find();
        }
        catch(e){
            throw new InternalServerErrorException(e.message)
        }
    }

    public async _findMetadataByGroupId(id:string){
        try{
          return await this.groupMetadataRepository.findOne({where: {group: id}});
        }
        catch(e){
            throw new InternalServerErrorException(e.message)
        }
    }
}
