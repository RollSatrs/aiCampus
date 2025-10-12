-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_groupId_fkey";

-- AlterTable
ALTER TABLE "public"."Student" ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
