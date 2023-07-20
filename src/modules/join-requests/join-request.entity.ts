import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupEntity } from 'src/modules/group/group.entity';
import { JoinCodesEntity } from 'src/modules/join-codes/join-codes.entity';
import { ERequestStatus } from 'src/enums/ERequestStatus';
import { UserEntity } from 'src/modules/user/users.entity';

@Entity({ name: 'join-requests' })
export class JoinRequestsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: ERequestStatus,
    default: ERequestStatus.PENDING,
  })
  status: ERequestStatus;

  @ManyToOne(
    () => JoinCodesEntity,
    (joinCode: JoinCodesEntity) => joinCode.joinRequests,
    { eager: true },
  )
  @JoinColumn({ name: 'join_code' })
  @Column({ nullable: false })
  join_code: string;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.joinRequests, {
    eager: true,
  })
  @JoinColumn({ name: 'group' })
  @Column({ nullable: false })
  group: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.joinRequest, {
    eager: true,
  })
  @JoinColumn({ name: 'user' })
  @Column({ nullable: false })
  user: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  loan_due_date: Date;

  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
}
