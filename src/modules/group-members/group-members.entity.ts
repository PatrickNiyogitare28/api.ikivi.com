import { EStatus } from "src/enums/EStatus";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { UserEntity } from "../user/users.entity";
import { GroupEntity } from "../group/group.entity";

@Entity({name: 'group-members'})
export class GroupMembersEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @ManyToOne(('UserEntity'), (user: UserEntity) => user.groupMemberships)
 @Column({nullable: false})
 user: string;


 @ManyToOne(('GroupEntity'), (group: GroupEntity) => group.members)
 @Column({nullable: false})
 group: string;

 @Column({nullable: false, enum: EStatus, default: EStatus.ACTIVE})
 membership: EStatus

 @CreateDateColumn() createdAt?: Date;
 @UpdateDateColumn() updatedAt?: Date;
}