import { useMutation, useQuery } from 'react-query'
import supabase from '../utils/supabase'
import { Clan, updateClan } from './clans.types'
import { Database } from './database.types'
import { MutationFunctions } from './types'
import { getCurrentUser } from './user.type'

export const vampiresKey = 'vampires'

const getVampires = async (): Promise<Vampires> => {
    const { data, error } = await supabase.from('vampires').select()

    if (error) throw error
    return data
}

export const useGetVampires = () => {
    return useQuery(vampiresKey, () => getVampires())
}

export const getMyVampires = async (): Promise<Vampires> => {
    const user = await getCurrentUser()
    const { data, error } = await supabase.from('vampires').select('*, clans!inner(*)').eq('clans.user_id', user.id)

    if (error) throw error

    // TODO: Fix query to not include 'clans' in output in the first place
    data.forEach((data) => delete (data as any).clans)
    return data.sort((a, b) => a.id - b.id)
}

export const useGetMyVampires = () => {
    return useQuery(vampiresKey, () => getMyVampires())
}


async function getVampire(id: number) {
    const { data, error } = await supabase.from('vampires').select().eq('id', id).single()

    if (error) throw error
    return data
}

export const useGetVampire = (id: number) => {
    return useQuery([vampiresKey, id], () => getVampire(id))
}

async function insertVampire(vampire: VampireInsert) {
    const { error } = await supabase.from('vampires').insert([{ ...vampire }])
    return { error }
}

export const getVampireTurningCost = (vampireCount: number) => {
    return (vampireCount * 1000) * (vampireCount)
}
const turnNewVampire = async ({ vampire, clan, vampireCount }: { vampire: VampireInsert, clan: Clan, vampireCount: number }) => {
    const cost = getVampireTurningCost(vampireCount)

    if (clan.blood >= cost) {
        clan.blood -= cost

        // TODO: roll-back charging the cost if insertVampire fails
        await updateClan(clan)
        await insertVampire(vampire)
    } else {
        throw new Error("Not enough money")
    }
}
export const useTurnNewVampire = (options?: MutationFunctions) => {
    return useMutation(turnNewVampire, options)
}

async function updateVampire(vampire: VampireInsert) {
    const { error } = await supabase.from('vampires').update(vampire).eq('id', vampire.id)
    if (error) throw error
}

export const useUpdateVampire = (options?: MutationFunctions) => {
    return useMutation((vampire: VampireInsert) => updateVampire(vampire), options)
}

async function getVampiresForType() {
    return await supabase.from('vampires').select()
}
type VampiresResponse = Awaited<ReturnType<typeof getVampiresForType>>
export type VampiresResponseSuccess = VampiresResponse['data']
export type VampiresResponseError = VampiresResponse['error']

export type VampireInsert = Database['public']['Tables']['vampires']['Insert']

export type Vampires = VampiresResponse['data']
export type Vampire = Exclude<VampiresResponse['data'], null>[number]
