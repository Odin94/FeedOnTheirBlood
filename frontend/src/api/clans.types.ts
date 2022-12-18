import { useMutation, useQuery } from "react-query";
import supabase from "../utils/supabase";
import { Database } from "./database.types";
import { getCurrentUser } from "./user.type";

export const clansKey = 'clans'

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
    return useQuery(clansKey, () => getMyClan())
}

async function insertClan(clan: ClanInsert) {
    const { error } = await supabase.from('clans').insert([{ ...clan }])
    return { error }
}
export const useInsertClan = (onSuccess?: () => void, onError?: (error: unknown) => void) => {
    return useMutation((clan: ClanInsert) => insertClan(clan), { onSuccess, onError })
}

export const updateClan = async (clan: ClanInsert) => {
    const { error } = await supabase.from('clans').update(clan).eq('id', clan.id)
    if (error) throw error
}

type ClansResponse = Awaited<ReturnType<typeof getClans>>
export type ClansResponseSuccess = ClansResponse['data']
export type ClansResponseError = ClansResponse['error']

export type ClanInsert = Database['public']['Tables']['clans']['Insert']

export type Clans = ClansResponse['data']
export type Clan = Exclude<ClansResponse['data'], null>[number]
