import { MigrationInterface, QueryRunner } from 'typeorm';

export class groupInfo1693763424512 implements MigrationInterface {
  name = 'groupInfo1693763424512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group-info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group" character varying NOT NULL, "updated_by" character varying, "total_capital" numeric(10,2) DEFAULT '0', "available_amount" numeric(10,2) DEFAULT '0', "current_interest" numeric(10,2) DEFAULT '0', "total_loans" numeric(10,2) DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, "updatedById" uuid, CONSTRAINT "PK_e2ce9cf2bb2f6d883d6bdd96d14" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(
      `ALTER TABLE "group-info" ADD CONSTRAINT "FK_ee79574718c989dbef4b4338bed" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group-info" ADD CONSTRAINT "FK_83efabe50af25493f8195954c54" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group-info" DROP CONSTRAINT "FK_83efabe50af25493f8195954c54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group-info" DROP CONSTRAINT "FK_ee79574718c989dbef4b4338bed"`,
    );
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
    await queryRunner.query(`DROP TABLE "group-info"`);
  }
}
