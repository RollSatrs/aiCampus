-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "confirmationCode" TEXT,
ADD COLUMN     "confirmationExpiresAt" TIMESTAMP(3),
ADD COLUMN     "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false;
