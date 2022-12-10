import { AuthError, Session, User } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "react-query"
import supabase from "../utils/supabase"


export type SessionResponse = { data: { session: Session } | { session: null }, error: AuthError | null }

const getSession = async (): Promise<Session> => {
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error
    if (data.session === null) throw new Error("Session not found")

    return data.session
}

export const useSession = () => {
    return useQuery('session', () => getSession())
}

export const getCurrentUser = async (): Promise<User> => {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw error
    if (data.user === null) throw new Error("User not found")

    return data.user
}

export const useCurrentUser = () => {
    return useQuery('user', () => getCurrentUser())
}

const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email, password,
    })

    if (error) throw error

    return data
}

export const useSignUpWithEmail = (email: string, password: string) => {
    return useMutation(() => signUpWithEmail(email, password))
}

const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })

    if (error) throw error

    return data
}

export const useSignInWithGithub = () => {
    const queryClient = useQueryClient()

    return useMutation('signIn', () => signInWithGithub(), {
        onSuccess: () => queryClient.invalidateQueries()
    })
}

const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password,
    })

    if (error) throw error

    return data
}

export const useSignInWithEmail = (email: string, password: string) => {
    const queryClient = useQueryClient()

    return useMutation(() => signInWithEmail(email, password), {
        onSuccess: () => queryClient.invalidateQueries()
    })
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
}

export const useSignOut = () => {
    const queryClient = useQueryClient()

    return useMutation(() => signOut(), {
        onSuccess: () => {
            queryClient.invalidateQueries('session')
            queryClient.removeQueries()
        }
    })
}
