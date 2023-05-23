import { EStatus } from 'src/enums/EStatus';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupEntity } from 'src/modules/group/group.entity';

@Entity({ name: 'group_metadata' })
export class GroupMetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id_photo_url: string;

  @Column({ nullable: false })
  user_selfie_with_id_url: string;

  @Column({ nullable: true })
  supporting_document_url?: string;

  @Column({
    type: 'enum',
    enum: EStatus,
    default: EStatus.ACTIVE,
    nullable: false,
  })
  status: EStatus;

  @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.groupMetadata)
  @Column()
  group: string;
}
