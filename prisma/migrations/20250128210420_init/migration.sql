-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('EN', 'ES');

-- CreateEnum
CREATE TYPE "ThemeType" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateTable
CREATE TABLE "users" (
    "id_user" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_at" TIMESTAMPTZ(6),
    "updated_by" UUID,
    "disabled_at" TIMESTAMPTZ(6),
    "disabled_by" UUID,
    "role" "UserRoleType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "countries" (
    "id_code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "extension" VARCHAR(10) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id_code")
);

-- CreateTable
CREATE TABLE "currency" (
    "id_code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id_code")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "user_id" UUID NOT NULL,
    "country_id" VARCHAR(10),
    "currency_id" VARCHAR(10),
    "language" "LanguageType" NOT NULL DEFAULT 'ES',
    "theme" "ThemeType" NOT NULL DEFAULT 'LIGHT',
    "timezone" VARCHAR(100) NOT NULL DEFAULT 'America/Guatemala',

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id_sessions" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,
    "refresh_token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "device_id" VARCHAR(255),
    "device_name" VARCHAR(255),
    "device_type" VARCHAR(255),
    "device_os" VARCHAR(255),
    "device_ip" VARCHAR(255),
    "device_location" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "disabled_at" TIMESTAMPTZ(6),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id_sessions")
);

-- CreateTable
CREATE TABLE "measurement_units" (
    "id_unit" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "abbreviation" VARCHAR(10) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "conversion_factor" DOUBLE PRECISION DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "measurement_units_pkey" PRIMARY KEY ("id_unit")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id_ingredient" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "unit_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id_ingredient")
);

-- CreateTable
CREATE TABLE "prices" (
    "id_price" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ingredient_id" INTEGER NOT NULL,
    "currency_id" VARCHAR(10) NOT NULL,
    "region" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id_price")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id_recipe" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id_recipe")
);

-- CreateTable
CREATE TABLE "recipe_item" (
    "id_recipe_item" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "recipe_item_pkey" PRIMARY KEY ("id_recipe_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_disabled_by_fkey" FOREIGN KEY ("disabled_by") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "measurement_units"("id_unit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id_ingredient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_item" ADD CONSTRAINT "recipe_item_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id_recipe") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_item" ADD CONSTRAINT "recipe_item_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id_ingredient") ON DELETE CASCADE ON UPDATE CASCADE;
