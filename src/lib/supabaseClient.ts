import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eovbmghbnabknnnytmcp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdmJtZ2hibmFia25ubnl0bWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MjkzNDYsImV4cCI6MjA1ODMwNTM0Nn0.ZOwj8jQvkqvQ3y2tKASsgTz5R3yDHi2cRFO_XStaTYA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
