import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
// Get these from: Supabase Dashboard → Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Validate that we have valid Supabase credentials
const isValidUrl = (url: string): boolean => {
  if (!url || url === 'YOUR_SUPABASE_URL' || url.trim() === '') return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

// Only create client if we have valid credentials
let supabase: ReturnType<typeof createClient>

if (isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
  // Use a valid URL format to prevent validation errors, but it won't work for actual requests
  supabase = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder')
}

export { supabase }

// Types for our database tables
export interface Character {
  id: string
  name: string
  image_url: string | null
  elo_rating: number
  total_votes: number
  wins: number
  losses: number
  draws: number
  created_at: string
  updated_at: string
}

export interface Vote {
  id: string
  character_a_id: string
  character_b_id: string
  winner_id: string | null
  elo_change_a: number
  elo_change_b: number
  elo_before_a: number
  elo_before_b: number
  elo_after_a: number
  elo_after_b: number
  created_at: string
}

