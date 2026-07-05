import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function run() {
  try {
    const res = await supabase.from('clients').select('*').eq('id', '00000000-0000-0000-0000-000000000000').single()
    console.log("No throw", res)
  } catch(e) {
    console.error("Threw", e)
  }
}
run()
