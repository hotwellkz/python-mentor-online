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
      admin_users: {
        Row: {
          id: string
          password: string
        }
        Insert: {
          id?: string
          password: string
        }
        Update: {
          id?: string
          password?: string
        }
        Relationships: []
      }
      business_analyst_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          lesson_id: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      completed_lessons: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      data_science_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          lesson_id: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      devops_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          lesson_id: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      favorite_courses: {
        Row: {
          course_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          chat_messages: Json | null
          created_at: string
          generated_text: string | null
          id: string
          lesson_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          chat_messages?: Json | null
          created_at?: string
          generated_text?: string | null
          id?: string
          lesson_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          chat_messages?: Json | null
          created_at?: string
          generated_text?: string | null
          id?: string
          lesson_id: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lesson_prompts: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          prompt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          prompt: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id: string
          prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          tokens: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          tokens?: number
          updated_at: string
        }
        Update: {
          created_at?: string
          id: string
          tokens?: number
          updated_at?: string
        }
        Relationships: []
      }
      visitors: {
        Row: {
          id: string
          visitor_count: number | null
          daily_count: number | null
          date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          visitor_count?: number | null
          daily_count?: number | null
          date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          visitor_count?: number | null
          daily_count?: number | null
          date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
