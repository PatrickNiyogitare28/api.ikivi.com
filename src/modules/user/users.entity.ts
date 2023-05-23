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
import { GroupEntity } from '../group/group.entity';

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
}
