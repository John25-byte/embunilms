
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://faiavzyvcxoeydotrdqn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaWF2enl2Y3hvZXlkb3RyZHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNTY3OTQsImV4cCI6MjA1NTczMjc5NH0.tVtIavB4uzzd7cVWCqwGiTO5FAA5OOw0PmPtzC9AJLM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
