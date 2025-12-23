import { IsEnum } from 'class-validator';
import { BuildStatusEnum } from 'src/utils/enum/BuildStatus';

export class ChangeStatusBuild {
  @IsEnum(BuildStatusEnum)
  status: BuildStatusEnum;
}
