import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { PosgressCustomer } from './entities/posgress_customer.entity';
import { PostGresMembersEntity } from './entities/posgress_member.entity';
import { TTLCustomerEntity } from './entities/TTLcustomer.entity';
import { TTLCustomerLeadBetaEntity } from './entities/TTLCustomerLeadBeta.entity';
import { MUserInfoEntity } from './entities/TTLmembers.entity';

@Injectable()
export class DataMigrationService {
  constructor(
    @InjectRepository(TTLCustomerEntity, 'mysqlConnection')
    private readonly buildEntityRepository: Repository<TTLCustomerEntity>,

    @InjectRepository(MUserInfoEntity, 'mysqlConnection')
    private readonly mUserInfoRepositoryEntity: Repository<MUserInfoEntity>,

    @InjectRepository(PosgressCustomer, 'postgresConnection')
    private readonly posgressCustomerRepository: Repository<PosgressCustomer>,

    @InjectRepository(PostGresMembersEntity, 'postgresConnection')
    private readonly postGresMemberRepository: Repository<PostGresMembersEntity>,

    @InjectRepository(
      TTLCustomerLeadBetaEntity,
      'mysqlConnectionTtlCustomerBeta',
    )
    private readonly tTLCustomerLeadBetaEntityRepository: Repository<TTLCustomerLeadBetaEntity>,
  ) {}

  async findAll(): Promise<any> {
    // Lấy f2

    const result =
      await this.buildEntityRepository.manager.query('CALL sp_test()');
    const data = result[0];

    // F2
    for (const element of data) {
      let posgressCustomer: PosgressCustomer = new PosgressCustomer();
      posgressCustomer.avatar = '';
      posgressCustomer.name =
        element.FullName === null ? 'Chưa xác định' : element.FullName;
      posgressCustomer.phone = element.Phone;
      posgressCustomer.status = 1;
      posgressCustomer.member_id = 1;
      posgressCustomer.is_buy = 1;
      posgressCustomer.ref_id = element.Ref_Phone;

      try {
        const savedCustomerScript =
          await this.posgressCustomerRepository.save(posgressCustomer);
        console.log('F2: ', savedCustomerScript.id);
      } catch (error) {
        console.error('Error saving customer script:', error);
      }
    }
  }

  async findAll2(): Promise<any> {
    // Lấy f1
    // let data: TTLCustomerEntity[] = await this.buildEntityRepository.find({
    //   where: [{ ref_phone: IsNull() }, { phone: '' }],
    // });

    const result =
      await this.buildEntityRepository.manager.query('CALL sp_test()');
    const data = result[0];

    //F1
    for (const element of data) {
      let postGresMembersEntity: PostGresMembersEntity =
        new PostGresMembersEntity();

      postGresMembersEntity.name =
        element.FullName === null ? 'Chưa xác định' : element.FullName;
      postGresMembersEntity.phone = element.Phone === null ? '' : element.Phone;
      postGresMembersEntity.email = element.Email === null ? '' : element.Email;
      postGresMembersEntity.address = '';
      postGresMembersEntity.birthday = element.Birthday
        ? element.Birthday.split('T')[0]
        : '';
      postGresMembersEntity.avatar = '';
      postGresMembersEntity.gender === 1 ? true : false; // Assuming HasClass indicates male and false indicates female
      postGresMembersEntity.amount_received = 0; // Assuming ClassId represents amount received
      postGresMembersEntity.amount_withdrawn = 0; // Default value
      postGresMembersEntity.total_amount_commission = 0; // Default value
      postGresMembersEntity.pending_balance = 0; // Default value
      postGresMembersEntity.total_amount_available_commission = 0; // Default value
      postGresMembersEntity.total_amount_pending_commission = 0; // Default value
      postGresMembersEntity.total_number_of_partners = 0; // Default value
      postGresMembersEntity.total_number_of_successful_sales = 0; // Default value
      (postGresMembersEntity.signature = ''), (postGresMembersEntity.point = 0); // Default value
      postGresMembersEntity.rank = 0; // Default value
      postGresMembersEntity.status = 1; // Default value
      postGresMembersEntity.code = String(new Date().getTime());
      postGresMembersEntity.conversion_rate = 0; // Default value
      postGresMembersEntity.number_of_purchases = 0; // Default value
      postGresMembersEntity.created_at = new Date();
      postGresMembersEntity.updated_at = new Date();
      postGresMembersEntity.old_id = 0;

      const savedPostGresMembersEntity =
        await this.postGresMemberRepository.save(postGresMembersEntity);

      console.log('F1: ', savedPostGresMembersEntity.id);
    }
  }

  async findAllUser(): Promise<any> {
    let data: MUserInfoEntity[] = await this.mUserInfoRepositoryEntity.find({
      select: [
        'Id',
        'fullName',
        'Phone',
        'Email',
        'Address',
        'DateActive',
        'Serinumber',
        'HasClass',
      ],
      where: [
        { invite_user_id: 0 }, // Điều kiện: invite_user_id = 0
        { invite_user_id: IsNull() }, // Điều kiện: invite_user_id IS NULL
      ],
    });

    console.log(data.length);

    for (const element of data) {
      let postGresMembersEntity: PostGresMembersEntity =
        new PostGresMembersEntity();

      postGresMembersEntity.name = element.fullName ? element.fullName : '';
      postGresMembersEntity.phone = element.Phone ? element.Phone : '';
      postGresMembersEntity.email = element.Email ? element.Email : '';
      postGresMembersEntity.address = element.Address ? element.Address : '';
      postGresMembersEntity.birthday = element.Dayofbirth
        ? element.Dayofbirth.toISOString().split('T')[0]
        : '';
      postGresMembersEntity.avatar = '';
      postGresMembersEntity.gender === 1 ? true : false; // Assuming HasClass indicates male and false indicates female
      postGresMembersEntity.amount_received = 0; // Assuming ClassId represents amount received
      postGresMembersEntity.amount_withdrawn = 0; // Default value
      postGresMembersEntity.total_amount_commission = 0; // Default value
      postGresMembersEntity.pending_balance = 0; // Default value
      postGresMembersEntity.total_amount_available_commission = 0; // Default value
      postGresMembersEntity.total_amount_pending_commission = 0; // Default value
      postGresMembersEntity.total_number_of_partners = 0; // Default value
      postGresMembersEntity.total_number_of_successful_sales = 0; // Default value
      (postGresMembersEntity.signature = ''), (postGresMembersEntity.point = 0); // Default value
      postGresMembersEntity.rank = 0; // Default value
      postGresMembersEntity.status = 1; // Default value
      postGresMembersEntity.code = String(new Date().getTime());
      postGresMembersEntity.conversion_rate = 0; // Default value
      postGresMembersEntity.number_of_purchases = 0; // Default value
      postGresMembersEntity.created_at = new Date();
      postGresMembersEntity.updated_at = new Date();
      postGresMembersEntity.old_id = element.Id;

      const savedPostGresMembersEntity =
        await this.postGresMemberRepository.save(postGresMembersEntity);

      console.log(savedPostGresMembersEntity.id);
    }
  }

  async findAllANdInsertMysql(): Promise<any> {
    let data: TTLCustomerEntity[] = await this.buildEntityRepository.find({
      where: {},
    });

    for (const element of data) {
      let tTLCustomerLeadBetaEntity: TTLCustomerLeadBetaEntity =
        new TTLCustomerLeadBetaEntity();

      tTLCustomerLeadBetaEntity.lead_source_id = 0;
      tTLCustomerLeadBetaEntity.company_id = 2000;
      tTLCustomerLeadBetaEntity.name = element.FullName ? element.FullName : '';
      tTLCustomerLeadBetaEntity.phone = element.phone ? element.phone : '';
      tTLCustomerLeadBetaEntity.gender = Number(element.genderId) === 1 ? 1 : 0;
      tTLCustomerLeadBetaEntity.birthday = element.birthday
        ? await this.castDateTime(element.birthday)
        : null;
      tTLCustomerLeadBetaEntity.email = element.email ? element.email : '';
      tTLCustomerLeadBetaEntity.street = element.address ? element.address : '';
      tTLCustomerLeadBetaEntity.ward = '';
      tTLCustomerLeadBetaEntity.district = '';
      tTLCustomerLeadBetaEntity.city = '';
      tTLCustomerLeadBetaEntity.lat = 0;
      tTLCustomerLeadBetaEntity.lng = 0;

      tTLCustomerLeadBetaEntity.search_value_normalized = '';
      tTLCustomerLeadBetaEntity.customer_id = 0;
      tTLCustomerLeadBetaEntity.is_priority = 0;
      tTLCustomerLeadBetaEntity.note = '';
      tTLCustomerLeadBetaEntity.user_id = 0;
      tTLCustomerLeadBetaEntity.lead_step_id = 0;
      tTLCustomerLeadBetaEntity.platform_source_type = 4;
      try {
        const savedCustomerScript =
          await this.tTLCustomerLeadBetaEntityRepository.save(
            tTLCustomerLeadBetaEntity,
          );
        console.log(
          savedCustomerScript.id,
          savedCustomerScript.name,
          savedCustomerScript.email,
          savedCustomerScript.phone,
        );
      } catch (error) {
        console.error('Error saving customer script:', error);
      }
    }
  }

  async findAllTTLUserANdInsertMysql(): Promise<any> {
    let data: MUserInfoEntity[] = await this.mUserInfoRepositoryEntity.find({
      select: [
        'Id',
        'fullName',
        'Phone',
        'Email',
        'Address',
        'DateActive',
        'Serinumber',
        'HasClass',
        'Dayofbirth',
      ],
      where: {
        // Thêm điều kiện ở đây nếu cần
      },
    });

    for (const element of data) {
      let tTLCustomerLeadBetaEntity: TTLCustomerLeadBetaEntity =
        new TTLCustomerLeadBetaEntity();

      tTLCustomerLeadBetaEntity.lead_source_id = 0;
      tTLCustomerLeadBetaEntity.company_id = 2000;
      tTLCustomerLeadBetaEntity.name = element.fullName ? element.fullName : '';
      tTLCustomerLeadBetaEntity.phone = element.Phone ? element.Phone : '';
      tTLCustomerLeadBetaEntity.gender = Number(element.HasClass) === 1 ? 1 : 0;
      tTLCustomerLeadBetaEntity.birthday = element.Dayofbirth
        ? new Date(element.Dayofbirth)
        : null;

      tTLCustomerLeadBetaEntity.email = element.Email ? element.Email : '';
      tTLCustomerLeadBetaEntity.street = element.Address ? element.Address : '';
      tTLCustomerLeadBetaEntity.ward = '';
      tTLCustomerLeadBetaEntity.district = '';
      tTLCustomerLeadBetaEntity.city = '';
      tTLCustomerLeadBetaEntity.lat = 0;
      tTLCustomerLeadBetaEntity.lng = 0;

      tTLCustomerLeadBetaEntity.search_value_normalized = '';
      tTLCustomerLeadBetaEntity.customer_id = 0;
      tTLCustomerLeadBetaEntity.is_priority = 0;
      tTLCustomerLeadBetaEntity.note = '';
      tTLCustomerLeadBetaEntity.user_id = 0;
      tTLCustomerLeadBetaEntity.lead_step_id = 0;
      tTLCustomerLeadBetaEntity.platform_source_type = 2;

      try {
        const savedCustomerScript =
          await this.tTLCustomerLeadBetaEntityRepository.save(
            tTLCustomerLeadBetaEntity,
          );
        console.log(
          savedCustomerScript.id,
          savedCustomerScript.name,
          savedCustomerScript.email,
          savedCustomerScript.phone,
          savedCustomerScript.birthday,
        );
      } catch (error) {
        console.error('Error saving customer script:', error);
      }
    }
  }

  async castDateTime(birthday: string): Promise<Date> {
    const [day, month, year] = birthday.split('/');
    return new Date(parseInt(year), 0, 1); // Set về ngày đầu tiên của tháng 1 năm 2009
  }
}
