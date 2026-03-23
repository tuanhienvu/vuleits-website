/**
 * Adds User.displayName without using prisma db push (avoids destructive drift vs live DB).
 */
require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(
      'ALTER TABLE `User` ADD COLUMN `displayName` VARCHAR(150) NULL',
    );
    console.log('Added column User.displayName');
  } catch (e) {
    const msg = String(e?.message || e);
    if (msg.includes('Duplicate column') || msg.includes('ER_DUP_FIELDNAME')) {
      console.log('Column User.displayName already exists — OK');
    } else {
      throw e;
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
