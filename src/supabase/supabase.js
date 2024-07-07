import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://uigxrbmqezobhlvcclhf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZ3hyYm1xZXpvYmhsdmNjbGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4ODM4NjMsImV4cCI6MjAzMjQ1OTg2M30.MyNj8aOSEjPQ5sWMOQN3OxYhVp1G-vSqj1UP8JDR_Ow')