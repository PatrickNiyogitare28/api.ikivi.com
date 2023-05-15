import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EStatus } from 'src/enums/EStatus';

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
            throw new InternalServerErrorException(e);
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
        const group =  await this.groupRepository.find({ group_owner: ownerId });
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

    public async updateGroupData(id: string, newData: Partial<CreateGroupDto>) {
        const group = await this.groupRepository.findOne({where: {id}})
        if(!group) throw new NotFoundException("Group not found");
        Object.assign(group, newData);
        const newGroup = await this.groupRepository.save(group);
        return {
            success: true,
            data: newGroup
        };
    }

    public async deleteGroup(id: string) {
        const group = await this.groupRepository.findOne({where: {id}})
        if(!group) throw new NotFoundException("Group not found");
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
