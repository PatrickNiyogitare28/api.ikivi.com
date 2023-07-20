import Decimal from 'decimal.js';
import { ERequestStatus } from 'src/enums/ERequestStatus';
import { EStatus } from 'src/enums/EStatus';
import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterLoad,
  OneToOne,
} from 'typeorm';
import { GroupEntity } from '../group/group.entity';
import { UserEntity } from '../user/users.entity';
import {
  DecimalTransformer,
  DecimalToString,
} from 'src/helpers/dicimal.transformer';
import { Transform } from 'class-transformer';
import { LoanEntity } from '../loan/loan.entity';

@Entity({ name: 'loan-requests' })
export class LoanRequestsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'amount',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(DecimalToString() as any, { toPlainOnly: true })
  public amount: Decimal;

  @Column({
    name: 'interest_rate',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(DecimalToString() as any, { toPlainOnly: true })
  public interest_rate: Decimal;

  @Column({
    name: 'interest',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  @Transform(DecimalToString() as any, { toPlainOnly: true })
  public interest: Decimal;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.loan_requests, {
    eager: true,
  })
  @Column({ nullable: false })
  group: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.loan_requests, {
    eager: true,
  })
  @Column({ nullable: false })
  user: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.loan_request_recorder,
    { eager: true },
  )
  @JoinColumn({ name: 'created_by' })
  @Column({ nullable: false })
  created_by: string;

  @Column({
    type: 'enum',
    enum: ERequestStatus,
    default: ERequestStatus.PENDING,
  })
  request_status: ERequestStatus;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.ACTIVE })
  status: EStatus;

  @OneToOne(() => LoanEntity, (loan: LoanEntity) => loan.loan_request)
  @JoinColumn({ name: 'loan' })
  loan: LoanEntity;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
