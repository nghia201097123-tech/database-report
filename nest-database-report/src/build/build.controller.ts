import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ResponseData } from 'src/utils/response/utils.response.common';
import { BuildManagementService } from './build-management.service';
import { DataMigrationService } from './data-migration.service';
import { CreateBuildDto } from './dto/req/create-build';
import { UpdateBuildDto } from './dto/req/update-build.dto';
import { ChangeStatusBuild } from './dto/req/change-status-build';

@Controller('build')
export class BuildController {
  constructor(
    private readonly buildManagementService: BuildManagementService,
    private readonly dataMigrationService: DataMigrationService,
  ) {}

  /**
   * GET /api/build
   * Get all builds
   */
  @Get()
  async findAll(): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      const builds = await this.buildManagementService.findAll();
      responseData.setData(builds);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * GET /api/build/:id/detail
   * Get build detail by id
   */
  @Get(':id/detail')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      const build = await this.buildManagementService.findOne(parseInt(id));
      responseData.setData(build);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/build/create
   * Create new build
   */
  @Post('create')
  async create(@Body() createBuildDto: CreateBuildDto): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      const build = await this.buildManagementService.create(createBuildDto);
      responseData.setData(build);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/build/update
   * Update build
   */
  @Post('update')
  async update(@Body() updateBuildDto: UpdateBuildDto): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      const build = await this.buildManagementService.update(updateBuildDto);
      responseData.setData(build);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/build/change-status
   * Change build status
   */
  @Post('change-status')
  async changeStatus(
    @Body() changeStatusDto: ChangeStatusBuild,
  ): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      const build = await this.buildManagementService.changeStatus(
        changeStatusDto.id,
        changeStatusDto.status,
      );
      responseData.setData(build);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * GET /api/build/data-migration
   * Endpoint for data migration (kept for backward compatibility)
   */
  @Get('data-migration')
  async dataMigration(): Promise<ResponseData> {
    let responseData: ResponseData = new ResponseData();
    try {
      await this.dataMigrationService.findAll2();
      responseData.setData({ message: 'Data migration completed' });
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }
}
