import { EStatus } from 'src/enums/EStatus';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { GroupEntity } from 'src/modules/group/group.entity';
import Decimal from 'decimal.js';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { UserEntity } from '../user/users.entity';

@Entity({ name: 'contribution' })
export class PeriodicEarnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'decimal',
    nullable: false,
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
  amount: Decimal;

  @ManyToOne(
    () => ContributionTermEntity,
    (contributionTerm: ContributionTermEntity) =>
      contributionTerm.periodic_earns,
    { eager: true },
  )
  @Column({ nullable: false })
  contribution_term: string;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.periodic_earns, {
    eager: true,
  })
  @Column({ nullable: false })
  group: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.periodic_earns, {
    eager: true,
  })
  @Column({ nullable: false })
  user: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.periodic_earns_recorder,
    { eager: true },
  )
  @JoinColumn({ name: 'created_by' })
  @Column({ nullable: false })
  created_by: string;

  @Column({ nullable: false })
  notes: string;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.ACTIVE })
  status: EStatus;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
