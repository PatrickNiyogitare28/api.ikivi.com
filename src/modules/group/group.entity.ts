import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EGroupType } from 'src/enums/EGroupType';
import { EStatus } from 'src/enums/EStatus';
import { UserEntity } from '../user/users.entity';
import { GroupMetadataEntity } from 'src/modules/group-metadata/group-metadata.entity';
import { JoinCodesEntity } from 'src/modules/join-codes/join-codes.entity';
import { JoinRequestsEntity } from 'src/modules/join-requests/join-request.entity';
import { GroupMembersEntity } from 'src/modules/group-members/group-members.entity';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { ContributionEntity } from '../contribution/contribution.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  location: string;

  @Column({ type: 'enum', enum: EGroupType, nullable: false })
  type: EGroupType;

  @Column({
    type: 'enum',
    enum: EStatus,
    default: EStatus.ACTIVE,
    nullable: false,
  })
  status: EStatus;

  @Column({ default: false, nullable: false })
  verified: boolean;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.groups, {
    eager: true,
  })
  @JoinColumn({ name: 'group_owner' })
  group_owner: UserEntity;

  @OneToMany(
    () => GroupMetadataEntity,
    (groupMetadata: GroupMetadataEntity) => groupMetadata.group,
    { cascade: true, eager: true },
  )
  groupMetadata: GroupMetadataEntity[];

  @OneToMany(
    () => JoinCodesEntity,
    (joinCode: JoinCodesEntity) => joinCode.group,
  )
  joinCodes: JoinCodesEntity[];

  @OneToMany(
    () => JoinRequestsEntity,
    (joinRequest: JoinRequestsEntity) => joinRequest.group,
  )
  joinRequests: JoinRequestsEntity[];

  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;

  @OneToMany(
    () => GroupMembersEntity,
    (groupMembership: GroupMembersEntity) => groupMembership.group
    )
    members: GroupMembersEntity

  @OneToMany(() => ContributionTermEntity, (contributionTerm: ContributionTermEntity) => contributionTerm.group)
  contributionTerms: ContributionTermEntity;

  @OneToMany(() => ContributionEntity, (contribution: ContributionEntity) => contribution.group)
  contributions: ContributionTermEntity;
}
