-- DropForeignKey
ALTER TABLE "TenantProfile" DROP CONSTRAINT "TenantProfile_userId_fkey";

-- AddForeignKey
ALTER TABLE "TenantProfile" ADD CONSTRAINT "TenantProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
