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
import { UserEntity } from 'src/modules/user/users.entity';
import { ENotificationStatus } from 'src/enums/ENotificationStatus';
import { ENotificationType } from 'src/enums/ENotificationType';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    type: 'enum',
    enum: ENotificationType,
  })
  type: ENotificationType;

  @Column({
    type: 'enum',
    enum: ENotificationStatus,
    default: ENotificationStatus.NOT_SEEN,
  })
  status: ENotificationStatus;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  message: string;

  @CreateDateColumn() created_at?: Date;
  @UpdateDateColumn() updated_at?: Date;
}
