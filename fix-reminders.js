const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixReminders() {
  const reminders = await prisma.reminder.findMany({
    include: {
      submission: {
        include: {
          client: true
        }
      }
    }
  });

  for (const reminder of reminders) {
    if (reminder.title.toLowerCase().includes('undefined') && reminder.submission && reminder.submission.client) {
      const clientName = reminder.submission.client.name;
      // Replace both cases
      let newTitle = reminder.title.replace('undefined', clientName).replace('UNDEFINED', clientName);
      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { title: newTitle }
      });
      console.log(`Updated reminder ${reminder.id} to ${newTitle}`);
    } else {
      // console.log(`Skipping: ${reminder.title}`);
    }
  }
}

fixReminders()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
