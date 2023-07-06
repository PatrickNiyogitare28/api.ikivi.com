import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/users.entity';
import { GroupEntity } from '../group/group.entity';
import { EActionType } from 'src/enums/EActionTypes';

@Entity({ name: 'logs' })
export class LogsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ((group: GroupEntity) => group.logs))
  @Column()
  group: string

  @Column()
  message: string;

  @Column({type: 'enum', enum: EActionType})
  action: EActionType;

  @ManyToOne(() => ((user: UserEntity) => user.actor))
  @Column()
  actor: string;

  @Column('jsonb', { nullable: true, default: {} })
  data: string;
  
  @CreateDateColumn()
  created_at?: Date;
}

