import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from 'src/enums/EUserRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupEntity } from 'src/modules/group/group.entity';
import { JoinRequestsEntity } from 'src/modules/join-requests/join-request.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { ContributionEntity } from '../contribution/contribution.entity';
import { PeriodicEarnEntity } from '../periodic-earn/periodic-earn.entity';
import { LoanRequestsEntity } from '../loan-requests/loan-requests.entity';
import { LoanEntity } from '../loan/loan.entity';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John', required: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', required: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  last_name: string;

  @ApiProperty({ example: '0785436974', required: true })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({ example: 'johndoe@gmail.com', required: true })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'test@2022', required: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ApiProperty({ example: 'CLIENT', required: true })
  @Column({
    type: 'enum',
    nullable: false,
    enum: EUserRole,
    default: EUserRole.CLIENT,
  })
  role: EUserRole;

  @ApiProperty({
    example: 'https://cloudinary.com/ikivi/uploads/profiles/1d-eda.png',
    required: false,
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar_url: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_verified: boolean;

  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;

  @OneToMany(() => GroupEntity, (group: GroupEntity) => group.group_owner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  groups: Array<GroupEntity>;

  @OneToMany(
    () => JoinRequestsEntity,
    (joinRequest: JoinRequestsEntity) => joinRequest.user,
  )
  joinRequest: JoinRequestsEntity;

  @OneToMany(
    () => GroupMembersEntity,
    (groupMembership: GroupMembersEntity) => groupMembership.user,
  )
  groupMemberships: GroupMembersEntity;

  @OneToMany(
    () => ContributionEntity,
    (contribution: ContributionEntity) => contribution.user,
  )
  contributions: ContributionEntity;

  @OneToMany(
    () => ContributionEntity,
    (contribution: ContributionEntity) => contribution.created_by,
  )
  contribution_recorders: ContributionEntity;

  @OneToMany(() => PeriodicEarnEntity, (earn: PeriodicEarnEntity) => earn.user)
  periodic_earns: PeriodicEarnEntity;

  @OneToMany(
    () => PeriodicEarnEntity,
    (earn: PeriodicEarnEntity) => earn.created_by,
  )
  periodic_earns_recorder: PeriodicEarnEntity;

  @OneToMany(() => LoanRequestsEntity, (loan: LoanRequestsEntity) => loan.user)
  loan_requests: LoanRequestsEntity;

  @OneToMany(
    () => LoanRequestsEntity,
    (loan: LoanRequestsEntity) => loan.created_by,
  )
  loan_request_recorder: LoanRequestsEntity;

  @OneToMany(
    () => GroupInfoEntity,
    (group_info: GroupInfoEntity) => group_info.updated_by,
  )
  group_info_recorder: LoanRequestsEntity;

  @OneToMany(() => LoanEntity, (loan: LoanEntity) => loan.updated_by)
  loan_updater: LoanEntity;
}
