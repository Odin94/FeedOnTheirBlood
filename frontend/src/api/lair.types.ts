import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase from "../utils/supabase";
import { Database } from "./database.types";
import { MutationFunctions } from "./types";

export async function getLair(clanId: number) {
    const { data, error } = await supabase.from('lairs').select().eq("clan_id", clanId).single()

    if (error) throw error
    return data
}

export const useLair = (clanId: number) => {
    return useQuery('lairs', () => getLair(clanId))
}

async function insertLair(headquarter: LairInsert) {
    const { error } = await supabase.from('lairs').insert([{ ...headquarter }])
    return { error }
}
export const useInsertLair = (onSuccess?: () => void, onError?: (error: unknown) => void) => {
    return useMutation((headquarter: LairInsert) => insertLair(headquarter), { onSuccess, onError })
}

async function updateLair(headquarter: LairInsert) {
    const { error } = await supabase.from('lairs').update(headquarter).eq('id', headquarter.id)
    if (error) throw error
}
export const useUpdateLair = (options?: MutationFunctions) => {
    const queryClient = useQueryClient()

    return useMutation((headquarter: LairInsert) => updateLair(headquarter),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('lairs')
                if (options?.onSuccess) options.onSuccess()
            }, ...options
        }
    )
}

async function getLairsForType() {
    return await supabase.from('lairs').select()
}
type LairsResponse = Awaited<ReturnType<typeof getLairsForType>>
export type LairsResponseSuccess = LairsResponse['data']
export type LairsResponseError = LairsResponse['error']

export type LairInsert = Database['public']['Tables']['lairs']['Insert']

export type Lairs = LairsResponse['data']
export type Lair = Exclude<LairsResponse['data'], null>[number]
