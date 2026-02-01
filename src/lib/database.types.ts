export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accords: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      external_mappings: {
        Row: {
          external_id: string
          external_url: string | null
          fragrance_id: string | null
          id: string
          source_id: string | null
        }
        Insert: {
          external_id: string
          external_url?: string | null
          fragrance_id?: string | null
          id?: string
          source_id?: string | null
        }
        Update: {
          external_id?: string
          external_url?: string | null
          fragrance_id?: string | null
          id?: string
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_mappings_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_mappings_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          base_fragrance_id: string | null
          comment: string | null
          created_at: string
          id: string
          layered_fragrance_id: string | null
          liked: boolean | null
          rating: number | null
          recipe_id: string | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          base_fragrance_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          layered_fragrance_id?: string | null
          liked?: boolean | null
          rating?: number | null
          recipe_id?: string | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          base_fragrance_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          layered_fragrance_id?: string | null
          liked?: boolean | null
          rating?: number | null
          recipe_id?: string | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_base_fragrance_id_fkey"
            columns: ["base_fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_layered_fragrance_id_fkey"
            columns: ["layered_fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      fragrance_accords: {
        Row: {
          accord_id: string
          fragrance_id: string
          source_id: string | null
          strength: number | null
        }
        Insert: {
          accord_id: string
          fragrance_id: string
          source_id?: string | null
          strength?: number | null
        }
        Update: {
          accord_id?: string
          fragrance_id?: string
          source_id?: string | null
          strength?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fragrance_accords_source"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fragrance_accords_accord_id_fkey"
            columns: ["accord_id"]
            isOneToOne: false
            referencedRelation: "accords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fragrance_accords_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
        ]
      }
      fragrance_embeddings: {
        Row: {
          embedding: string | null
          fragrance_id: string
          updated_at: string
        }
        Insert: {
          embedding?: string | null
          fragrance_id: string
          updated_at?: string
        }
        Update: {
          embedding?: string | null
          fragrance_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fragrance_embeddings_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: true
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
        ]
      }
      fragrance_notes: {
        Row: {
          fragrance_id: string
          layer: Database["public"]["Enums"]["note_layer"]
          note_id: string
          source_id: string | null
          weight: number | null
        }
        Insert: {
          fragrance_id: string
          layer?: Database["public"]["Enums"]["note_layer"]
          note_id: string
          source_id?: string | null
          weight?: number | null
        }
        Update: {
          fragrance_id?: string
          layer?: Database["public"]["Enums"]["note_layer"]
          note_id?: string
          source_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_fragrance_notes_source"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fragrance_notes_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fragrance_notes_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      fragrances: {
        Row: {
          brand_id: string | null
          concentration: string | null
          created_at: string
          description: string | null
          gender_marketing: string | null
          id: string
          image_url: string | null
          name: string
          release_year: number | null
          updated_at: string
        }
        Insert: {
          brand_id?: string | null
          concentration?: string | null
          created_at?: string
          description?: string | null
          gender_marketing?: string | null
          id?: string
          image_url?: string | null
          name: string
          release_year?: number | null
          updated_at?: string
        }
        Update: {
          brand_id?: string | null
          concentration?: string | null
          created_at?: string
          description?: string | null
          gender_marketing?: string | null
          id?: string
          image_url?: string | null
          name?: string
          release_year?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fragrances_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          created_at: string
          id: string
          name: string
          note_family: string | null
          wikidata_qid: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          note_family?: string | null
          wikidata_qid?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          note_family?: string | null
          wikidata_qid?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recipe_items: {
        Row: {
          fragrance_id: string
          position: number
          recipe_id: string
          sprays: number | null
        }
        Insert: {
          fragrance_id: string
          position: number
          recipe_id: string
          sprays?: number | null
        }
        Update: {
          fragrance_id?: string
          position?: number
          recipe_id?: string
          sprays?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_items_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_items_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string
          id: string
          occasion: string | null
          season: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          occasion?: string | null
          season?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          occasion?: string | null
          season?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recommendation_events: {
        Row: {
          base_fragrance_id: string
          context: Json | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          base_fragrance_id: string
          context?: Json | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          base_fragrance_id?: string
          context?: Json | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_events_base_fragrance_id_fkey"
            columns: ["base_fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_items: {
        Row: {
          explanation: Json | null
          rank: number
          recommendation_event_id: string
          recommended_fragrance_id: string
          score: number
        }
        Insert: {
          explanation?: Json | null
          rank: number
          recommendation_event_id: string
          recommended_fragrance_id: string
          score: number
        }
        Update: {
          explanation?: Json | null
          rank?: number
          recommendation_event_id?: string
          recommended_fragrance_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_items_recommendation_event_id_fkey"
            columns: ["recommendation_event_id"]
            isOneToOne: false
            referencedRelation: "recommendation_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_items_recommended_fragrance_id_fkey"
            columns: ["recommended_fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_fragrances: {
        Row: {
          bottle_type: Database["public"]["Enums"]["bottle_type"]
          created_at: string
          fragrance_id: string
          id: string
          notes: string | null
          size_ml: number | null
          user_id: string
        }
        Insert: {
          bottle_type?: Database["public"]["Enums"]["bottle_type"]
          created_at?: string
          fragrance_id: string
          id?: string
          notes?: string | null
          size_ml?: number | null
          user_id: string
        }
        Update: {
          bottle_type?: Database["public"]["Enums"]["bottle_type"]
          created_at?: string
          fragrance_id?: string
          id?: string
          notes?: string | null
          size_ml?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_fragrances_fragrance_id_fkey"
            columns: ["fragrance_id"]
            isOneToOne: false
            referencedRelation: "fragrances"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: Record<PropertyKey, never>; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      bottle_type: "full_bottle" | "decant" | "sample"
      note_layer: "top" | "middle" | "base" | "unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never
