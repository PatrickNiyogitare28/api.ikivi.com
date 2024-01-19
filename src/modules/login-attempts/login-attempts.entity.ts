import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EActionStatus } from 'src/enums/ActionStatus';
import { UserEntity } from '../user/users.entity';

@Entity({ name: 'login-attempts' })
export class LoginAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('UserEntity', (user: UserEntity) => user.groupMemberships, {
    eager: true,
  })
  @Column({ nullable: false })
  user: string;

  @Column({
    nullable: false,
    enum: EActionStatus,
    default: EActionStatus.SUCCESS,
  })
  status: EActionStatus;

  @CreateDateColumn() created_at?: Date;
}
