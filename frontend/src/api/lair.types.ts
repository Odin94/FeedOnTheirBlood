import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase from "../utils/supabase";
import { Clan, updateClan } from "./clans.types";
import { Database } from "./database.types";
import { MutationFunctions } from "./types";

export const lairsKey = 'lairs'

export async function getLair(clanId: number) {
    const { data, error } = await supabase.from('lairs').select().eq("clan_id", clanId).single()

    if (error) throw error
    return data
}

export const useLair = (clanId: number) => {
    return useQuery(lairsKey, () => getLair(clanId))
}

const insertLair = async (lair: LairInsert) => {
    const { error } = await supabase.from('lairs').insert([{ ...lair }])
    return { error }
}
export const useInsertLair = (onSuccess?: () => void, onError?: (error: unknown) => void) => {
    return useMutation((lair: LairInsert) => insertLair(lair), { onSuccess, onError })
}

const updateLair = async (lair: LairInsert) => {
    const { error } = await supabase.from('lairs').update(lair).eq('id', lair.id)
    if (error) throw error
}
export const useUpdateLair = (options?: MutationFunctions) => {
    const queryClient = useQueryClient()

    return useMutation((lair: LairInsert) => updateLair(lair),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(lairsKey)
                if (options?.onSuccess) options.onSuccess()
            }, ...options
        }
    )
}

export const getAttributeUpgradeCost = (lair: Lair, attribute: LairAttribute) => {
    return (lair[attribute] * 100) * (lair[attribute] * 2)
}

export type LairAttribute = 'headquarter_defense' | 'headquarter_luxury' | 'headquarter_hidden' |
    'armory_weapons' | 'armory_armor' |
    'domain_control' | 'domain_herd' |
    'laboratory_equipment' | 'laboratory_worker_slots' |
    'notoriety_mask' | 'notoriety_data_access' | 'notoriety_political_influence'
const upgradeLair = async ({ lair, attribute, clan }: { lair: Lair, attribute: LairAttribute, clan: Clan }) => {
    const cost = getAttributeUpgradeCost(lair, attribute)

    if (clan.money >= cost) {
        clan.money -= cost
        lair[attribute] += 1

        // TODO: roll-back charging the cost if updateLair fails
        await updateClan(clan)
        await updateLair(lair)
    } else {
        throw new Error("Not enough money")
    }
}

export const useUpgradeLair = (options?: MutationFunctions) => {
    return useMutation(upgradeLair, options)
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
