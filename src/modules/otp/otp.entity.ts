import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('otpCodes')
export class VerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '405bu4ibjt4b4bibjh4t' })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  user_id: string;

  @ApiProperty({ example: '567788' })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  code: number;
  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
}
