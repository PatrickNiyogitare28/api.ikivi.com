import {MigrationInterface, QueryRunner} from "typeorm";

export class createSchema1689080052388 implements MigrationInterface {
    name = 'createSchema1689080052388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group-members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "group" character varying NOT NULL, "membership" character varying NOT NULL DEFAULT 'ACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "groupId" uuid, CONSTRAINT "PK_6cf00d81f0f4855a513ac2b8e3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."join-codes_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "join-codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "group" character varying NOT NULL, "status" "public"."join-codes_status_enum" NOT NULL DEFAULT 'ACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, CONSTRAINT "PK_69c3a0f6ea314dc3ec3ec318262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."join-requests_status_enum" AS ENUM('APPROVED', 'REJECTED', 'PENDING', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "join-requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."join-requests_status_enum" NOT NULL DEFAULT 'PENDING', "join_code" uuid NOT NULL, "group" uuid NOT NULL, "user" uuid NOT NULL, "loan_due_date" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57e9c98e1dc5ae341738e61bb4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contribution_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "contribution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "contribution_term" character varying NOT NULL, "group" character varying NOT NULL, "user" character varying NOT NULL, "created_by" uuid NOT NULL, "notes" character varying NOT NULL, "status" "public"."contribution_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "contributionTermId" uuid, "groupId" uuid, "userId" uuid, CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contribution-term" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "name" character varying NOT NULL, "group" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8a1c38fefba30533fd71cb855b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."loan_loan_status_enum" AS ENUM('PAID', 'PAYMENT_PENDING', 'PARTIALLY_PAID', 'DELAYED', 'CANCELED')`);
        await queryRunner.query(`CREATE TYPE "public"."loan_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "loan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_by" character varying NOT NULL, "loan_status" "public"."loan_loan_status_enum" NOT NULL DEFAULT 'PAYMENT_PENDING', "status" "public"."loan_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loan_request" uuid, "created_by" uuid, CONSTRAINT "REL_378d25f47ebff7ff330f5eb513" UNIQUE ("loan_request"), CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."loan-requests_request_status_enum" AS ENUM('APPROVED', 'REJECTED', 'PENDING', 'CANCELED')`);
        await queryRunner.query(`CREATE TYPE "public"."loan-requests_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "loan-requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) DEFAULT '0', "interest_rate" numeric(10,2) DEFAULT '0', "interest" numeric(10,2) DEFAULT '0', "group" character varying NOT NULL, "user" character varying NOT NULL, "created_by" uuid NOT NULL, "request_status" "public"."loan-requests_request_status_enum" NOT NULL DEFAULT 'PENDING', "status" "public"."loan-requests_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, "userId" uuid, "loan" uuid, CONSTRAINT "REL_a7a8fb1a6fd89c5aa7aa28b37a" UNIQUE ("loan"), CONSTRAINT "PK_220ec4dcd6aea2d58a71e425556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('SYSTEM_ADMIN', 'CLIENT')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENT', "avatar_url" character varying, "is_verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."groups_type_enum" AS ENUM('SAVING_GROUP', 'COMPANY_GROUP')`);
        await queryRunner.query(`CREATE TYPE "public"."groups_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "type" "public"."groups_type_enum" NOT NULL, "status" "public"."groups_status_enum" NOT NULL DEFAULT 'ACTIVE', "verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "group_owner" uuid, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_metadata_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "group_metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id_photo_url" character varying NOT NULL, "user_selfie_with_id_url" character varying NOT NULL, "supporting_document_url" character varying, "status" "public"."group_metadata_status_enum" NOT NULL DEFAULT 'ACTIVE', "group" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, CONSTRAINT "PK_6a49c252458eb66407db26242c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."log_action_enum" AS ENUM('JOIN_GROUP_REQUEST', 'JOIN_GROUP_REJECTED', 'JOINED_GROUP', 'PERIODIC_CONTRIBUTION_TRANSACTION_SUCCESS', 'PERIODIC_CONTRIBUTION_TRANSACTION_FAILURE', 'LOAN_REQUESTED', 'LOAN_REJECTED', 'LOAN_APPROVED', 'RECEIVED_PERIODIC_EARN')`);
        await queryRunner.query(`CREATE TABLE "log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_id" character varying NOT NULL, "message" character varying NOT NULL, "action" "public"."log_action_enum" NOT NULL, "actor_id" character varying NOT NULL, "data" jsonb DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otpCodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3949fa329c96c776eabce3a98d0" UNIQUE ("code"), CONSTRAINT "PK_98754524ec2e0c9a0b5f3874e04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group-members" ADD CONSTRAINT "FK_931c0fffa263b0169349765b848" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group-members" ADD CONSTRAINT "FK_41baa2a552166436d8e2a037a7a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-codes" ADD CONSTRAINT "FK_6ac9ab7ae19e2ea201d5f92d48a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_690cff04b5e4bb477326640f17a" FOREIGN KEY ("join_code") REFERENCES "join-codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_0038869f44cc48f2b31f1297695" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_1fda27f8dfab3dcb24b68cb33e2" FOREIGN KEY ("contributionTermId") REFERENCES "contribution-term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_718f4dba3b6dd0643bf4ac72923" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_d2084068d6246a419df6fec9d0f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_e310f1f1db6abaef0564366cc1d" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution-term" ADD CONSTRAINT "FK_4cdce73e30ab3c65fca4166f2a5" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_378d25f47ebff7ff330f5eb5132" FOREIGN KEY ("loan_request") REFERENCES "loan-requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_5da43559a457dc5a444eaefdf80" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ADD CONSTRAINT "FK_9081be7d8527ef7680f42a83a6e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ADD CONSTRAINT "FK_fcb133ff52a0bdacf821598ea4d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ADD CONSTRAINT "FK_5d4c36495104f69d04df54f8233" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ADD CONSTRAINT "FK_a7a8fb1a6fd89c5aa7aa28b37a1" FOREIGN KEY ("loan") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_bbd2a962ee50dde645224084108" FOREIGN KEY ("group_owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_metadata" ADD CONSTRAINT "FK_77bbb505f8a2f80ba4576470a25" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_metadata" DROP CONSTRAINT "FK_77bbb505f8a2f80ba4576470a25"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_bbd2a962ee50dde645224084108"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" DROP CONSTRAINT "FK_a7a8fb1a6fd89c5aa7aa28b37a1"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" DROP CONSTRAINT "FK_5d4c36495104f69d04df54f8233"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" DROP CONSTRAINT "FK_fcb133ff52a0bdacf821598ea4d"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" DROP CONSTRAINT "FK_9081be7d8527ef7680f42a83a6e"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_5da43559a457dc5a444eaefdf80"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_378d25f47ebff7ff330f5eb5132"`);
        await queryRunner.query(`ALTER TABLE "contribution-term" DROP CONSTRAINT "FK_4cdce73e30ab3c65fca4166f2a5"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_e310f1f1db6abaef0564366cc1d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_d2084068d6246a419df6fec9d0f"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_718f4dba3b6dd0643bf4ac72923"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_1fda27f8dfab3dcb24b68cb33e2"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_0038869f44cc48f2b31f1297695"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_690cff04b5e4bb477326640f17a"`);
        await queryRunner.query(`ALTER TABLE "join-codes" DROP CONSTRAINT "FK_6ac9ab7ae19e2ea201d5f92d48a"`);
        await queryRunner.query(`ALTER TABLE "group-members" DROP CONSTRAINT "FK_41baa2a552166436d8e2a037a7a"`);
        await queryRunner.query(`ALTER TABLE "group-members" DROP CONSTRAINT "FK_931c0fffa263b0169349765b848"`);
        await queryRunner.query(`DROP TABLE "otpCodes"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TYPE "public"."log_action_enum"`);
        await queryRunner.query(`DROP TABLE "group_metadata"`);
        await queryRunner.query(`DROP TYPE "public"."group_metadata_status_enum"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "public"."groups_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."groups_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "loan-requests"`);
        await queryRunner.query(`DROP TYPE "public"."loan-requests_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."loan-requests_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "loan"`);
        await queryRunner.query(`DROP TYPE "public"."loan_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."loan_loan_status_enum"`);
        await queryRunner.query(`DROP TABLE "contribution-term"`);
        await queryRunner.query(`DROP TABLE "contribution"`);
        await queryRunner.query(`DROP TYPE "public"."contribution_status_enum"`);
        await queryRunner.query(`DROP TABLE "join-requests"`);
        await queryRunner.query(`DROP TYPE "public"."join-requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "join-codes"`);
        await queryRunner.query(`DROP TYPE "public"."join-codes_status_enum"`);
        await queryRunner.query(`DROP TABLE "group-members"`);
    }

}
