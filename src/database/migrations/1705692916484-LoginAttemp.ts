import {MigrationInterface, QueryRunner} from "typeorm";

export class LoginAttemp1705692916484 implements MigrationInterface {
    name = 'LoginAttemp1705692916484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login-attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'SUCCESS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2fb99088ec9eb70db21524254e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "periodic-earn" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "login-attempts" ADD CONSTRAINT "FK_1f85c01d826b8651e140e50462b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login-attempts" DROP CONSTRAINT "FK_1f85c01d826b8651e140e50462b"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'-requests_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "periodic-earn" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-earn_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
        await queryRunner.query(`DROP TABLE "login-attempts"`);
    }

}
