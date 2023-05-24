import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { GroupEntity } from 'src/modules/group/group.entity';
  import { JoinCodesEntity } from 'src/modules/join-codes/join-codes.entity';
import { ERequestStatus } from 'src/enums/ERequestStatus';
import { UserEntity } from 'src/modules/user/users.entity';
  
  @Entity({ name: 'join-requests' })
  export class JoinRequestsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  
    @Column({ type: 'enum', enum: ERequestStatus, default: ERequestStatus.PENDING })
    status: ERequestStatus;
  
    @ManyToOne(() => JoinCodesEntity, (joinCode: JoinCodesEntity) => joinCode.joinRequests)
    @JoinColumn({ name: 'join_code' })
    join_code: string;
  
    @ManyToOne(() => GroupEntity, (group: GroupEntity) => group.joinRequests)
    @JoinColumn({ name: 'group' })
    group: string;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.joinRequest)
    @JoinColumn({ name: 'user' })
    user: string;
  }
  