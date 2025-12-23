import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/utils/response/utils.response.common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Get()
  async findAll(): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();

    // await this.buildService.findAll();
     await this.buildService.findAll2();
    // this.buildService.findAllUser();

    return responseData;
  }
}
