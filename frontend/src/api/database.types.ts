export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clans: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          description: string | null
          blood: number | null
          money: number | null
          notoriety: number | null
          influence: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
          blood?: number | null
          money?: number | null
          notoriety?: number | null
          influence?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
          blood?: number | null
          money?: number | null
          notoriety?: number | null
          influence?: number | null
          user_id?: string | null
        }
      }
      vampires: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          max_blood: number | null
          current_blood: number | null
          max_health: number | null
          current_health: number | null
          clan_id: number | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          max_blood?: number | null
          current_blood?: number | null
          max_health?: number | null
          current_health?: number | null
          clan_id?: number | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          max_blood?: number | null
          current_blood?: number | null
          max_health?: number | null
          current_health?: number | null
          clan_id?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
