import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'affiliate' | 'buyer'
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          stripe_customer_id: string | null
          paypal_email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'affiliate' | 'buyer'
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          paypal_email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'affiliate' | 'buyer'
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          paypal_email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          image_url: string | null
          status: 'draft' | 'active' | 'archived'
          product_type: 'digital' | 'physical'
          delivery_method: 'download' | 'email' | 'manual'
          download_url: string | null
          thank_you_page_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          image_url?: string | null
          status?: 'draft' | 'active' | 'archived'
          product_type?: 'digital' | 'physical'
          delivery_method?: 'download' | 'email' | 'manual'
          download_url?: string | null
          thank_you_page_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          status?: 'draft' | 'active' | 'archived'
          product_type?: 'digital' | 'physical'
          delivery_method?: 'download' | 'email' | 'manual'
          download_url?: string | null
          thank_you_page_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
