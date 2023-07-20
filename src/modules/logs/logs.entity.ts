import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EActionType } from 'src/enums/EActionTypes';

@Entity({ name: 'log' })
export class LogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  group_id: string

  @Column({nullable: false})
  message: string;

  @Column({type: 'enum', enum: EActionType})
  action: EActionType;

  @Column({nullable: true})
  actor_id: string;

  @Column('jsonb', { nullable: true, default: {} })
  data: string;
  
  @CreateDateColumn()
  created_at?: Date;
}

