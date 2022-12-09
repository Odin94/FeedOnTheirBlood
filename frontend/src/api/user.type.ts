import { AuthError, Session, UserResponse } from "@supabase/supabase-js"
import supabase from "../utils/supabase"


export type SessionResponse = { data: { session: Session } | { session: null }, error: AuthError | null }

export const getSession = async (): Promise<SessionResponse> => {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
}

export const getCurrentUser = async (): Promise<UserResponse> => {
    return await supabase.auth.getUser()
}