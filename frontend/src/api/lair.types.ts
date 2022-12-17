import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase from "../utils/supabase";
import { Database } from "./database.types";
import { MutationFunctions } from "./types";

export async function getHeadquarter(clanId: number) {
    const { data, error } = await supabase.from('headquarters').select().eq("clan_id", clanId).single()

    if (error) throw error
    return data
}

export const useHeadquarter = (clanId: number) => {
    return useQuery('headquarters', () => getHeadquarter(clanId))
}

async function insertHeadquarter(headquarter: HeadquarterInsert) {
    const { error } = await supabase.from('headquarters').insert([{ ...headquarter }])
    return { error }
}
export const useInsertHeadquarter = (onSuccess?: () => void, onError?: (error: unknown) => void) => {
    return useMutation((headquarter: HeadquarterInsert) => insertHeadquarter(headquarter), { onSuccess, onError })
}

async function updateHeadquarter(headquarter: HeadquarterInsert) {
    const { error } = await supabase.from('headquarters').update(headquarter).eq('id', headquarter.id)
    if (error) throw error
}
export const useUpdateHeadquarter = (options?: MutationFunctions) => {
    const queryClient = useQueryClient()

    return useMutation((headquarter: HeadquarterInsert) => updateHeadquarter(headquarter),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('headquarters')
                if (options?.onSuccess) options.onSuccess()
            }, ...options
        }
    )
}

async function getHeadquartersForType() {
    return await supabase.from('headquarters').select()
}
type HeadquartersResponse = Awaited<ReturnType<typeof getHeadquartersForType>>
export type HeadquartersResponseSuccess = HeadquartersResponse['data']
export type HeadquartersResponseError = HeadquartersResponse['error']

export type HeadquarterInsert = Database['public']['Tables']['headquarters']['Insert']

export type Headquarters = HeadquartersResponse['data']
export type Headquarter = Exclude<HeadquartersResponse['data'], null>[number]
