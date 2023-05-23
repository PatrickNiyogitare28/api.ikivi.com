import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EGroupType } from 'src/enums/EGroupType';
import { EStatus } from 'src/enums/EStatus';
import { UserEntity } from '../user/users.entity';
import { GroupMetadataEntity } from 'src/modules/group-metadata/group-metadata.entity';

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

  @Column({ type: 'enum', enum: EStatus, default: EStatus.ACTIVE, nullable: false })
  status: EStatus;

  @Column({ default: false, nullable: false })
  verified: boolean;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.groups, { eager: true })
  @JoinColumn({ name: 'group_owner' })
  group_owner: UserEntity;

  @OneToMany(() => GroupMetadataEntity, (groupMetadata: GroupMetadataEntity) => groupMetadata.group, { cascade: true, eager: true })
  groupMetadata: GroupMetadataEntity[];

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date;
}
