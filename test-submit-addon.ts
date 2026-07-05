import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function run() {
  const { data, error } = await supabase.from("submission_add_ons").insert([{
    submissionId: 'cdac8adb-5fb2-42b4-be4a-978ca5b7d29a',
    addonId: 'add-extra-edit',
    priceSnapshot: 10000
  }])
  console.log(data, error)
}
run()
