import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupMetadataEntity } from './group-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from '../group/dto/group.dto';
import { EUserRole } from 'src/enums/EUserRole';
import { GroupService } from '../group/group.service';

@Injectable()
export class GroupMetadataService {
    constructor(
        @InjectRepository(GroupMetadataEntity)
        private readonly GroupMetadataRepository: Repository<GroupMetadataEntity>,
        private  readonly groupService: GroupService
    ){}

    public async addGroupMetadata(groupMetadata: CreateGroupDto, group_id: string ,role: EUserRole, user_id: string){
        const group = await this.groupService.findGroupById(group_id);
        if(group.group_owner.id !== user_id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action");
        try{
            const newMetadata = await this.GroupMetadataRepository.create({...groupMetadata, group: group.id});
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
}
