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
      admins: {
        Row: {
          id: string
          auth_user_id: string | null
          email: string
          name: string
          role: 'super_admin' | 'admin' | 'viewer'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_user_id?: string | null
          email: string
          name: string
          role?: 'super_admin' | 'admin' | 'viewer'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string | null
          email?: string
          name?: string
          role?: 'super_admin' | 'admin' | 'viewer'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      directors: {
        Row: {
          id: string
          name: string
          photo_url: string | null
          title: string
          position: string | null
          years_experience: number
          introduction: string
          specialties: string[]
          phone: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          photo_url?: string | null
          title?: string
          position?: string | null
          years_experience: number
          introduction: string
          specialties?: string[]
          phone?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          photo_url?: string | null
          title?: string
          position?: string | null
          years_experience?: number
          introduction?: string
          specialties?: string[]
          phone?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          id: string
          customer_name: string
          customer_phone: string
          consultation_type: 'general' | 'director_specific' | 'quick' | 'kakao'
          director_id: string | null
          message: string | null
          status: 'pending' | 'contacted' | 'completed' | 'cancelled'
          admin_note: string | null
          privacy_agreed: boolean
          ip_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          customer_phone: string
          consultation_type: 'general' | 'director_specific' | 'quick' | 'kakao'
          director_id?: string | null
          message?: string | null
          status?: 'pending' | 'contacted' | 'completed' | 'cancelled'
          admin_note?: string | null
          privacy_agreed: boolean
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          customer_phone?: string
          consultation_type?: 'general' | 'director_specific' | 'quick' | 'kakao'
          director_id?: string | null
          message?: string | null
          status?: 'pending' | 'contacted' | 'completed' | 'cancelled'
          admin_note?: string | null
          privacy_agreed?: boolean
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'consultations_director_id_fkey'
            columns: ['director_id']
            isOneToOne: false
            referencedRelation: 'directors'
            referencedColumns: ['id']
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          customer_name: string
          director_id: string | null
          rating: number
          content: string
          image_urls: Json
          status: 'pending' | 'approved' | 'rejected'
          admin_note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          director_id?: string | null
          rating: number
          content: string
          image_urls?: Json
          status?: 'pending' | 'approved' | 'rejected'
          admin_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          director_id?: string | null
          rating?: number
          content?: string
          image_urls?: Json
          status?: 'pending' | 'approved' | 'rejected'
          admin_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_director_id_fkey'
            columns: ['director_id']
            isOneToOne: false
            referencedRelation: 'directors'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Admin = Database['public']['Tables']['admins']['Row']
export type Director = Database['public']['Tables']['directors']['Row']
export type Consultation = Database['public']['Tables']['consultations']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
