import { EStatus } from 'src/enums/EStatus';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { GroupEntity } from 'src/modules/group/group.entity';
import { JoinRequestsEntity } from 'src/modules/join-requests/join-request.entity';

@Entity({ name: 'join-codes' })
export class JoinCodesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  code: string;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.joinCodes)
  @JoinColumn({ name: 'group' })
  group: string;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.ACTIVE })
  status: EStatus;

  @OneToMany(
    () => JoinRequestsEntity,
    (joinRequest: JoinRequestsEntity) => joinRequest.join_code,
  )
  joinRequests: JoinRequestsEntity[];
}
