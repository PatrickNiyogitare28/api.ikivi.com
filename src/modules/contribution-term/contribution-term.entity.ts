import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupEntity } from "src/modules/group/group.entity";
import { EStatus } from "src/enums/EStatus";

@Entity({name: 'contribution-term'})
export class ContributionTermEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  date: string;

  @Column({nullable: false})
  name: string;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.contributionTerms)
  @JoinColumn({name: 'group'})
  @Column({nullable: false})
  group: string;

  @Column({nullable: false, enum: EStatus, default: EStatus.ACTIVE})
  status: EStatus

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}