-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarMediaId" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "socialLinksJson" JSONB,
ADD COLUMN     "title" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarMediaId_fkey" FOREIGN KEY ("avatarMediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
