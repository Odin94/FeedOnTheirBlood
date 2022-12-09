import supabase from '../utils/supabase'
import { Database } from './database.types'

export async function getVampires() {
    return await supabase.from('vampires').select()
}

export async function insertVampire(vampire: VampireInsert) {
    const { error } = await supabase.from('vampires').insert([{ ...vampire }])
    return { error }
}

export async function updateVampire(vampire: VampireInsert) {
    const { error } = await supabase.from('vampires').update(vampire).eq('id', vampire.id)
    return { error }
}

export async function getVampire(id: number) {
    const { data, error } = await supabase.from('vampires').select().eq('id', id).single()
    return { data, error }
}

type VampiresResponse = Awaited<ReturnType<typeof getVampires>>
export type VampiresResponseSuccess = VampiresResponse['data']
export type VampiresResponseError = VampiresResponse['error']

export type VampireInsert = Database['public']['Tables']['vampires']['Insert']

export type Vampires = VampiresResponse['data']
export type Vampire = Exclude<VampiresResponse['data'], null>[number]
