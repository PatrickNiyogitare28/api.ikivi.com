import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateGroupDto } from './dto/group.dto';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EStatus } from 'src/enums/EStatus';
import { EUserRole } from 'src/enums/EUserRole';
import { Payload } from '../auth/payload.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private groupRepository: Repository<GroupEntity>,
    ) {}

    public async register(newGroupDto: CreateGroupDto, owner_id: string) {
        try {
            const group = await this.groupRepository.save({
                ...newGroupDto,
                group_owner: owner_id,
            } as any);
            return {
                success: true,
                message: 'Group registered successfully',
                data: group,
            };
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    public async getGroupById(id: string) {
       try{
            const group = await this.groupRepository.findOne({where: {id} })
            if(!group) throw new NotFoundException("Group not found");
            return {
                success: true,
                data: group
            }
       }
       catch(e){
        throw new InternalServerErrorException(e)
       }
    }

    public async getGroupsByOwner(ownerId: string) {
        const group =  await this.groupRepository.find({where: { group_owner: ownerId }});
        if(!group) throw new NotFoundException(`Group not found`)
        return {
            success: true,
            data: group
        }
    }

    // public async getGroupsByUserId(userId: string) {
    //     return await this.groupRepository.find({ members: { id: userId } });
    // }

    public async updateGroupStatus(id: string, status: EStatus) {
        const group = await this.groupRepository.findOne({where: {id}})
        if(!group) throw new NotFoundException("Group not found");
        group.status = status;
        const newGroup = await this.groupRepository.save(group);
        return {
            success: true,
            data: newGroup
        }
    }

    public async updateGroupData(id: string, newData: Partial<CreateGroupDto>, role: EUserRole, user_id: string) {
        const group = await this.groupRepository.findOne({where: {id}})
        if(!group) throw new NotFoundException("Group not found");
        if(user_id !== group.group_owner.id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action")
        Object.assign(group, newData);
        const newGroup = await this.groupRepository.save(group);
        delete newGroup.group_owner;
        return {
            success: true,
            data: newGroup
        };
    }

    public async deleteGroup(id: string, role: EUserRole, user_id: string) {
        const group = await this.groupRepository.findOne({where: {id}})
        if(!group) throw new NotFoundException("Group not found");
        if(user_id !== group.group_owner.id && role !== EUserRole.SYSTEM_ADMIN) throw new UnauthorizedException("You are not allowed to perform this action")
            await this.groupRepository.delete(id);
            return {
                success: true,
                message: 'Group deleted successfully',
            };
        }

    public async getAllGroups() {
        return await this.groupRepository.find();
    }
}
