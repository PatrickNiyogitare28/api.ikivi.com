import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupEntity } from "src/modules/group/group.entity";
import { EStatus } from "src/enums/EStatus";
import { ContributionEntity } from "../contribution/contribution.entity";
import { PeriodicEarnEntity } from "../periodic-earn/periodic-earn.entity";

@Entity({name: 'contribution-term'})
export class ContributionTermEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  date: string;

  @Column({nullable: false})
  name: string;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.contributionTerms, {eager: true})
  @JoinColumn({name: 'group'})
  @Column({nullable: false})
  group: string;

  @Column({nullable: false, enum: EStatus, default: EStatus.ACTIVE})
  status: EStatus

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToMany(() => ContributionEntity, (contribution: ContributionEntity) => contribution.contribution_term, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contributions: Array<ContributionEntity>;

  @OneToMany(() => PeriodicEarnEntity, (earn: PeriodicEarnEntity) => earn.contribution_term, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  periodic_earns: Array<ContributionEntity>;

}