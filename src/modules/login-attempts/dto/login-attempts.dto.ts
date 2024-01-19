import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { EActionStatus } from 'src/enums/ActionStatus';

export class LoginAttemptDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsEnum(EActionStatus)
  status: EActionStatus;
}
