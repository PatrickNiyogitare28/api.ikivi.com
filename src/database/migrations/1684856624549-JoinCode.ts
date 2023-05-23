import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinCode1684856624549 implements MigrationInterface {
    name = 'JoinCode1684856624549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-23T15:43:54.380Z"'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-23T15:43:54.380Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-23 15:42:30.069'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-23 15:42:30.069'`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
    }

}
