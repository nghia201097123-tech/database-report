// src/build/entities/MUserInfo.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('M_UserInfo')
export class MUserInfoEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'text', nullable: true })
  userName: string;

  @Column({ type: 'text', nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'bit', nullable: false })
  HasClass: boolean;

  @Column({ type: 'text', nullable: true })
  Password: string;

  @Column({ type: 'text', nullable: true })
  Email: string;

  @Column({ type: 'text', nullable: true })
  Phone: string;

  @Column({ type: 'text', nullable: true })
  Address: string;

  @Column({ type: 'text', nullable: true })
  Phone2: string;

  @Column({ type: 'bit', nullable: false })
  ActivePhone: boolean;

  @Column({ type: 'text', nullable: true })
  Serinumber: string;

  @Column({ type: 'int', nullable: false })
  ClassId: number;

  @Column({ type: 'datetime', nullable: true })
  DateActive: Date;

  @Column({ type: 'datetime', nullable: true })
  DateExpired: Date;

  @Column({ type: 'bit', nullable: false })
  HasToken: boolean;

  @Column({ type: 'bit', nullable: false })
  HasEbook: boolean;

  @Column({ type: 'text', nullable: true })
  ChildFullName1: string;

  @Column({ type: 'int', nullable: false })
  Child1_ClassId: number;

  @Column({ type: 'text', nullable: true })
  ChildFullName2: string;

  @Column({ type: 'int', nullable: false })
  Child2_ClassId: number;

  @Column({ type: 'int', nullable: true })
  CityId: number;

  @Column({ type: 'text', nullable: true })
  CityName: string;

  @Column({ type: 'int', nullable: true })
  DistrictId: number;

  @Column({ type: 'text', nullable: true })
  DistrictName: string;

  @Column({ type: 'int', nullable: true })
  AgencyId: number;

  @Column({ type: 'bit', nullable: false })
  HasVideoToken: boolean;

  @Column({ type: 'text', nullable: true })
  Child1_SchoolName: string;

  @Column({ type: 'text', nullable: true })
  Child2_SchoolName: string;

  @Column({ type: 'tinyint', nullable: true })
  STNHDType: number;

  @Column({ type: 'text', nullable: true })
  Avartar: string;

  @Column({ type: 'bit', nullable: false })
  IsUpdateLevelCode300: boolean;

  @Column({ type: 'datetime', nullable: true })
  DateCreate: Date;

  @Column({ type: 'datetime', nullable: true })
  Dayofbirth: Date;

  @Column({ type: 'text', nullable: true })
  GenderCode: string;

  @Column({ type: 'text', nullable: true })
  GenderName: string;

  @Column({ type: 'text', nullable: true })
  FromSource: string;

  @Column({ type: 'text', nullable: true })
  IsDaiSu: string;

  @Column({ type: 'text', nullable: true })
  ReferralCode: string;

  @Column({ type: 'text', nullable: true })
  RoleCode: string;

  @Column({ type: 'text', nullable: true })
  RoleName: string;

  @Column({ type: 'int', nullable: false })
  maxdevicelogin: number;

  @Column({ type: 'text', nullable: true })
  BackgroundUrl: string;

  @Column({ type: 'text', nullable: true })
  Symbol: string;

  @Column({ type: 'text', nullable: true })
  SBD: string;

  @Column({ type: 'bit', nullable: false })
  IsActiveGrade1: boolean;

  @Column({ type: 'text', nullable: true })
  AppID: string;

  @Column({ type: 'bit', nullable: false })
  IsActive: boolean;

  @Column({ type: 'bit', nullable: false })
  IsAllowHistory: boolean;

  @Column({ type: 'float', nullable: true })
  commision_total: number;

  @Column({ type: 'text', nullable: true })
  id_invite: string;

  @Column({ type: 'int', nullable: true })
  invite_user_id: number;

  @Column({ type: 'int', nullable: true })
  invite_user_count: number;

  @Column({ type: 'text', nullable: true })
  code_invite: string;

  @Column({ type: 'text', nullable: true })
  link_invite: string;

  @Column({ type: 'text', nullable: true })
  invite_user_code: string;

  @Column({ type: 'int', nullable: true })
  userType: number;

  @Column({ type: 'text', nullable: true })
  AgencyName: string;

  @Column({ type: 'text', nullable: true })
  short_code_link: string;

  @Column({ type: 'text', nullable: true })
  key_user: string;

  @Column({ type: 'text', nullable: true })
  OjbectCode: string;

  @Column({ type: 'text', nullable: true })
  OjbectName: string;

  @Column({ type: 'text', nullable: true })
  group_level: string;
}
