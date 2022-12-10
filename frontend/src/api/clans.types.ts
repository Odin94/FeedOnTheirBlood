import { useQuery } from "react-query";
import supabase from "../utils/supabase";
import { Database } from "./database.types";
import { getCurrentUser } from "./user.type";

export async function getClans() {
    return await supabase.from('clans').select()
}

export async function getMyClan() {
    const user = await getCurrentUser()

    const { data, error } = await supabase.from('clans').select().eq('user_id', user.id).single()

    if (error) throw error

    return data
}

export const useMyClan = () => {
    return useQuery('clans', () => getMyClan())
}

type ClansResponse = Awaited<ReturnType<typeof getClans>>
export type ClansResponseSuccess = ClansResponse['data']
export type ClansResponseError = ClansResponse['error']

export type VampireInsert = Database['public']['Tables']['clans']['Insert']

export type Clans = ClansResponse['data']
export type Clan = Exclude<ClansResponse['data'], null>[number]
