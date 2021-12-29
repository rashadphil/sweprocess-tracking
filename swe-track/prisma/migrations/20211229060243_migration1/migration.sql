-- CreateEnum
CREATE TYPE "application_status" AS ENUM ('not open', 'rejected', 'applied', 'online assesement', 'interview rounds', 'final round', 'offer');

-- CreateEnum
CREATE TYPE "membership_status" AS ENUM ('free', 'tier1', 'tier2');

-- CreateTable
CREATE TABLE "companies" (
    "cid" SERIAL NOT NULL,
    "company_name" VARCHAR(255),
    "website_link" VARCHAR(255),
    "application_link" VARCHAR(255),
    "intern_salary" INTEGER,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "user_companies" (
    "id" INTEGER NOT NULL DEFAULT nextval('user_companies_id_seq'::regclass),
    "user_id" INTEGER,
    "company_id" INTEGER,
    "user_status" "application_status",
    "date_applied" DATE,

    CONSTRAINT "user_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "email" VARCHAR(255),
    "email_verified" BOOLEAN,
    "date_created" DATE,
    "membership" "membership_status",
    "last_login" DATE,
    "picture" VARCHAR(512),
    "full_name" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_name_key" ON "companies"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_companies_user_id_company_id_key" ON "user_companies"("user_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_companies" ADD CONSTRAINT "user_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_companies" ADD CONSTRAINT "user_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
