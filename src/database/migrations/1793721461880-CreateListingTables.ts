import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListingTables1793721461880 implements MigrationInterface {
    name = 'CreateListingTables1793721461880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "marketplace" character varying NOT NULL, "external_id" character varying NOT NULL, "title" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "currency" character varying NOT NULL, "url" character varying NOT NULL, "availability" boolean NOT NULL DEFAULT true, "seller" character varying, "shipping_cosrt" numeric(12,2), "product_id" uuid, "first_seen_at" TIMESTAMP NOT NULL DEFAULT now(), "last_seen_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_5399d65e9272d938d18a54d3e1d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_5399d65e9272d938d18a54d3e1d"`);
        await queryRunner.query(`DROP TABLE "listings"`);
    }

}
