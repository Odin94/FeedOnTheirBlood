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
      lairs: {
        Row: {
          id: number
          created_at: string | null
          headquarter_defense: number
          headquarter_luxury: number
          headquarter_hidden: number
          clan_id: number
          headquarter_imageSrc: string
          armory_weapons: number
          armory_armor: number
          domain_control: number
          domain_herd: number
          laboratory_equipment: number
          laboratory_worker_slots: number
          notoriety_mask: number
          notoriety_data_access: number
          notoriety_political_influence: number
          armory_imageSrc: string
          domain_imageSrc: string
          laboratory_imageSrc: string
          notoriety_imageSrc: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          headquarter_defense?: number
          headquarter_luxury?: number
          headquarter_hidden?: number
          clan_id: number
          headquarter_imageSrc?: string
          armory_weapons?: number
          armory_armor?: number
          domain_control?: number
          domain_herd?: number
          laboratory_equipment?: number
          laboratory_worker_slots?: number
          notoriety_mask?: number
          notoriety_data_access?: number
          notoriety_political_influence?: number
          armory_imageSrc?: string
          domain_imageSrc?: string
          laboratory_imageSrc?: string
          notoriety_imageSrc?: string
        }
        Update: {
          id?: number
          created_at?: string | null
          headquarter_defense?: number
          headquarter_luxury?: number
          headquarter_hidden?: number
          clan_id?: number
          headquarter_imageSrc?: string
          armory_weapons?: number
          armory_armor?: number
          domain_control?: number
          domain_herd?: number
          laboratory_equipment?: number
          laboratory_worker_slots?: number
          notoriety_mask?: number
          notoriety_data_access?: number
          notoriety_political_influence?: number
          armory_imageSrc?: string
          domain_imageSrc?: string
          laboratory_imageSrc?: string
          notoriety_imageSrc?: string
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
