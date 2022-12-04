import supabase from "../utils/supabase"

export async function getVampires() {
    const { data, error } = await supabase.from('Vampires').select()
    return { data, error }
}

type VampiresResponse = Awaited<ReturnType<typeof getVampires>>
export type VampiresResponseSuccess = VampiresResponse['data']
export type VampiresResponseError = VampiresResponse['error']

export type Vampires = VampiresResponse["data"]
export type Vampire = Exclude<VampiresResponse["data"], null>[number] | null
