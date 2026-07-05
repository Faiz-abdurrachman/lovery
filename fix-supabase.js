
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixReminders() {
  const { data: reminders, error } = await supabase
    .from('reminders')
    .select('*, submission:submissions(client:clients(name))');

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  for (const r of reminders) {
    if (r.title && r.title.includes('undefined')) {
      // client can be an array in some supabase setups depending on the relationship, 
      // but if it's one-to-many, it's an object or array of objects.
      let clientName = 'Klien';
      if (r.submission && r.submission.client) {
        if (Array.isArray(r.submission.client)) {
          clientName = r.submission.client[0]?.name || 'Klien';
        } else {
          clientName = r.submission.client.name || 'Klien';
        }
      }
      
      const newTitle = r.title.replace('undefined', clientName);
      
      await supabase
        .from('reminders')
        .update({ title: newTitle })
        .eq('id', r.id);
        
      console.log(`Fixed reminder ${r.id} to ${newTitle}`);
    }
  }
}

fixReminders()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
