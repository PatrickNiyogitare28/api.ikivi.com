import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { UserEntity } from "../user/users.entity";
import Decimal from "decimal.js";

@Entity({name: 'group-info'})
export class GroupInfoEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne('GroupEntity', (group: GroupEntity) => group.group_info, {
        eager: true,
      })
      @Column({ nullable: false })
      group: string;

      @ManyToOne('UserEntity', (user: UserEntity) => user.group_info_recorder, {
        eager: true,
      })
      @Column({ nullable: true })
      updated_by: string;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      total_capital: Decimal;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      available_amount: Decimal;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      current_interest: Decimal;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      available_interest: Decimal;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      total_loans: Decimal;

      @Column({
        default: 0.0,
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2,
        transformer: {
          to(value: Decimal): string {
            return value.toString();
          },
          from(value: string): Decimal {
            return new Decimal(value);
          },
        },
      })
      current_unpaid_loan: Decimal;

      @CreateDateColumn() createdAt?: Date;
      @UpdateDateColumn() updatedAt?: Date;
}