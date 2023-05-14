import { ApiProperty } from "@nestjs/swagger";
import { EUserRole } from "src/enums/EUserRole";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example:'John', required: true})
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @ApiProperty({example:'0785436974', required: true})
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    phone_number: string;

    @ApiProperty({example:'test@2022', required: true})
    @Column({
        type: 'varchar',
        nullable: false,
        select: false
    })
    password: string;
   
    @ApiProperty({example:'CLIENT', required: true})
    @Column({
        type: 'enum',
        nullable: false,
        enum: EUserRole
    })
    role: EUserRole;

    @ApiProperty({example: 'https://cloudinary.com/nestjs-boiler-plate/uploads/profiles/1d-eda.png', required: false})
    @Column({
        type: 'varchar',
        nullable: true,
    })
    avatar_url: string;

    @Column({
        type: 'boolean',
         default: false
    })
    is_verified: boolean

    @CreateDateColumn() createdAt?: Date;
    @UpdateDateColumn() updatedAt?: Date;
}