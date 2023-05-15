import {MigrationInterface, QueryRunner} from "typeorm";

export class group1684167007293 implements MigrationInterface {
    name = 'group1684167007293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."groups_type_enum" AS ENUM('SAVING_GROUP', 'COMPANY_GROUP')`);
        await queryRunner.query(`CREATE TYPE "public"."groups_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "type" "public"."groups_type_enum" NOT NULL, "status" "public"."groups_status_enum" NOT NULL DEFAULT 'ACTIVE', "verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT '"2023-05-15T16:10:13.356Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2023-05-15T16:10:13.356Z"', "group_owner" uuid, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_bbd2a962ee50dde645224084108" FOREIGN KEY ("group_owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_bbd2a962ee50dde645224084108"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "public"."groups_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."groups_type_enum"`);
    }

}
