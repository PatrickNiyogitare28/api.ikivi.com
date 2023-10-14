import {MigrationInterface, QueryRunner} from "typeorm";

export class FixGroupInfo21697292418259 implements MigrationInterface {
    name = 'FixGroupInfo21697292418259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group-info" DROP CONSTRAINT "FK_ee79574718c989dbef4b4338bed"`);
        await queryRunner.query(`ALTER TABLE "group-info" DROP CONSTRAINT "FK_83efabe50af25493f8195954c54"`);
        await queryRunner.query(`ALTER TABLE "group-info" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "group-info" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'-requests_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
        await queryRunner.query(`ALTER TABLE "group-info" ADD "updatedById" uuid`);
        await queryRunner.query(`ALTER TABLE "group-info" ADD "groupId" uuid`);
        await queryRunner.query(`ALTER TABLE "group-info" ADD CONSTRAINT "FK_83efabe50af25493f8195954c54" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group-info" ADD CONSTRAINT "FK_ee79574718c989dbef4b4338bed" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
