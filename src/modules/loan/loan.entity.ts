import { EStatus } from 'src/enums/EStatus';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/users.entity';
import { LoanRequestsEntity } from '../loan-requests/loan-requests.entity';
import { ELoanStatus } from 'src/enums/ELoanStatus';

@Entity({ name: 'loan' })
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => LoanRequestsEntity, (loanRequest: LoanRequestsEntity) => loanRequest.loan, {eager: true})
  @JoinColumn({ name: 'loan_request' })
  loan_request: LoanRequestsEntity;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.loan_request_recorder,
    { eager: true },
  )
  @JoinColumn({ name: 'created_by' })
  @Column({ nullable: false })
  updated_by: string;

  @Column({ type: 'enum', enum: ELoanStatus, default: ELoanStatus.PAYMENT_PENDING })
  loan_status: ELoanStatus;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.ACTIVE })
  status: EStatus;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
