import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuildEntity } from './entities/build.entity';
import { CreateBuildDto } from './dto/req/create-build.ts';
import { UpdateBuildDto } from './dto/req/update-build.dto';
import { BuildStatusEnum } from 'src/utils/enum/BuildStatus';

@Injectable()
export class BuildManagementService {
  constructor(
    @InjectRepository(BuildEntity)
    private readonly buildRepository: Repository<BuildEntity>,
  ) {}

  /**
   * Get all builds
   */
  async findAll(): Promise<BuildEntity[]> {
    return await this.buildRepository.find({
      order: {
        build_at: 'DESC',
      },
    });
  }

  /**
   * Get build by id
   */
  async findOne(id: number): Promise<BuildEntity> {
    const build = await this.buildRepository.findOne({
      where: { id },
    });

    if (!build) {
      throw new NotFoundException(`Build with ID ${id} not found`);
    }

    return build;
  }

  /**
   * Create new build
   */
  async create(createBuildDto: CreateBuildDto): Promise<BuildEntity> {
    const build = this.buildRepository.create({
      ...createBuildDto,
      status: BuildStatusEnum.PENDING,
      build_at: createBuildDto.build_at || new Date(),
    });

    return await this.buildRepository.save(build);
  }

  /**
   * Update build
   */
  async update(updateBuildDto: UpdateBuildDto): Promise<BuildEntity> {
    const build = await this.findOne(updateBuildDto.id);

    // Validate: Cannot edit if status is DONE or REJECT
    if (
      build.status === BuildStatusEnum.DONE ||
      build.status === BuildStatusEnum.REJECT
    ) {
      throw new BadRequestException(
        `Cannot update build with status ${build.status}`,
      );
    }

    // Update fields
    build.project_id = updateBuildDto.project_id;
    build.service_server_ids = updateBuildDto.service_server_ids;
    build.content = updateBuildDto.content;
    if (updateBuildDto.build_at) {
      build.build_at = updateBuildDto.build_at;
    }

    return await this.buildRepository.save(build);
  }

  /**
   * Change build status with validation
   */
  async changeStatus(
    id: number,
    newStatus: BuildStatusEnum,
  ): Promise<BuildEntity> {
    const build = await this.findOne(id);

    // Validate status transition
    this.validateStatusTransition(build.status, newStatus);

    build.status = newStatus;
    return await this.buildRepository.save(build);
  }

  /**
   * Validate status transition rules
   */
  private validateStatusTransition(
    currentStatus: BuildStatusEnum,
    newStatus: BuildStatusEnum,
  ): void {
    // Cannot change from DONE
    if (currentStatus === BuildStatusEnum.DONE) {
      throw new BadRequestException(
        'Cannot change status from DONE. Build is already completed.',
      );
    }

    // Cannot change from REJECT
    if (currentStatus === BuildStatusEnum.REJECT) {
      throw new BadRequestException(
        'Cannot change status from REJECT. Build is already rejected.',
      );
    }

    // All other transitions are allowed
    // PENDING -> PROCESS, REJECT
    // PROCESS -> DONE, REJECT, PENDING (rollback)
  }
}
