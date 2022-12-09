import { createClient } from '@supabase/supabase-js'
import { Database } from '../api/database.types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLIC_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase url or key missing, please set in .env")
}
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase