export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          tier: 'free' | 'premium' | 'pro'
          tier_expires_at: string | null
          subdomain: string | null
          created_at: string
          updated_at: string
          status: 'active' | 'suspended'
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          tier?: 'free' | 'premium' | 'pro'
          tier_expires_at?: string | null
          subdomain?: string | null
          created_at?: string
          updated_at?: string
          status?: 'active' | 'suspended'
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          tier?: 'free' | 'premium' | 'pro'
          tier_expires_at?: string | null
          subdomain?: string | null
          created_at?: string
          updated_at?: string
          status?: 'active' | 'suspended'
        }
      }
      invitations: {
        Row: {
          id: string
          user_id: string
          slug: string
          template_id: string
          bride_name: string
          groom_name: string
          event_date: string
          event_location: string
          event_address: string | null
          event_lat: number | null
          event_lng: number | null
          cover_image_url: string | null
          music_url: string | null
          story_text: string | null
          custom_message: string | null
          bank_accounts: Json
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          template_id: string
          bride_name: string
          groom_name: string
          event_date: string
          event_location: string
          event_address?: string | null
          event_lat?: number | null
          event_lng?: number | null
          cover_image_url?: string | null
          music_url?: string | null
          story_text?: string | null
          custom_message?: string | null
          bank_accounts?: Json
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          template_id?: string
          bride_name?: string
          groom_name?: string
          event_date?: string
          event_location?: string
          event_address?: string | null
          event_lat?: number | null
          event_lng?: number | null
          cover_image_url?: string | null
          music_url?: string | null
          story_text?: string | null
          custom_message?: string | null
          bank_accounts?: Json
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          invitation_id: string
          name: string
          phone: string | null
          email: string | null
          token: string
          rsvp_status: 'pending' | 'attending' | 'not_attending' | null
          rsvp_guest_count: number
          rsvp_submitted_at: string | null
          link_opened_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          phone?: string | null
          email?: string | null
          token: string
          rsvp_status?: 'pending' | 'attending' | 'not_attending' | null
          rsvp_guest_count?: number
          rsvp_submitted_at?: string | null
          link_opened_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          phone?: string | null
          email?: string | null
          token?: string
          rsvp_status?: 'pending' | 'attending' | 'not_attending' | null
          rsvp_guest_count?: number
          rsvp_submitted_at?: string | null
          link_opened_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guestbook_messages: {
        Row: {
          id: string
          invitation_id: string
          guest_name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          guest_name: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          guest_name?: string
          message?: string
          created_at?: string
        }
      }
      media: {
        Row: {
          id: string
          invitation_id: string
          type: 'photo' | 'video'
          url: string
          storage_path: string
          size_bytes: number
          caption: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          type: 'photo' | 'video'
          url: string
          storage_path: string
          size_bytes: number
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          type?: 'photo' | 'video'
          url?: string
          storage_path?: string
          size_bytes?: number
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          midtrans_order_id: string
          midtrans_transaction_id: string | null
          amount: number
          status: 'pending' | 'success' | 'failed' | 'expired'
          payment_type: string | null
          tier_purchased: 'premium' | 'pro'
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          midtrans_order_id: string
          midtrans_transaction_id?: string | null
          amount: number
          status?: 'pending' | 'success' | 'failed' | 'expired'
          payment_type?: string | null
          tier_purchased: 'premium' | 'pro'
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          midtrans_order_id?: string
          midtrans_transaction_id?: string | null
          amount?: number
          status?: 'pending' | 'success' | 'failed' | 'expired'
          payment_type?: string | null
          tier_purchased?: 'premium' | 'pro'
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          thumbnail_url: string
          tier_required: 'free' | 'premium' | 'pro'
          sort_order: number
          active: boolean
          created_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          thumbnail_url: string
          tier_required?: 'free' | 'premium' | 'pro'
          sort_order?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          thumbnail_url?: string
          tier_required?: 'free' | 'premium' | 'pro'
          sort_order?: number
          active?: boolean
          created_at?: string
        }
      }
    }
  }
}
