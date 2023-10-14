import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditGroupInfoEntity1697274794866 implements MigrationInterface {
  name = 'EditGroupInfoEntity1697274794866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group-info" ADD "available_interest" numeric(10,2) DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "group-info" ADD "current_unpaid_loan" numeric(10,2) DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-requests_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'-requests_request_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group-info" DROP COLUMN "current_unpaid_loan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group-info" DROP COLUMN "available_interest"`,
    );
  }
}
