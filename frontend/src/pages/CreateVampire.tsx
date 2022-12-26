import { Button, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { useForm, UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import { useQueryClient } from "react-query";
import { clansKey, getMyClan } from "../api/clans.types";
import { getVampireTurningCost, useGetMyVampires, useTurnNewVampire, VampireInsert } from "../api/vampires.type";
import bloodIcon from '../images/blood-svgrepo-com.svg';

interface FormValues {
    name: string
}

const CreateVampire = () => {
    const queryClient = useQueryClient()
    const [submitState, setSubmitState] = useState("")
    const { data: myVampires, isLoading, error } = useGetMyVampires()
    const [showConfirmButtons, setShowConfirmButtons] = useState(false)

    const form = useForm<FormValues>({
        initialValues: {
            name: '',
        },

        validate: {
            name: (value: string) => (value.length > 0 && value.length < 100 ? null : 'Invalid name'),
        },
    });
    const turnNewVampireMutation = useTurnNewVampire({
        onSuccess: () => {
            setSubmitState(`Successfully turned ${form.values.name}`)
            form.reset()
            queryClient.invalidateQueries(clansKey)
        },
        onError: (error) => { setSubmitState(`Oh no an error :( ${JSON.stringify(error)}`) }
    })

    const submitCreateVampire = async (form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>) => {
        const clan = await getMyClan()

        const vampire: VampireInsert = {
            max_health: 10,
            current_health: 10,
            max_blood: 10,
            current_blood: 10,
            name: form.values.name,
            clan_id: clan?.id
        }

        turnNewVampireMutation.mutate({ vampire, clan, vampireCount: myVampires?.length ?? 0 })
    }

    return (
        <>
            <h1>{submitState}</h1>
            <form onSubmit={form.onSubmit((_values) => submitCreateVampire(form))}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Nosferatu"
                    {...form.getInputProps('name')}
                />

                <Group position="center" mt="md">
                    <Tooltip label={<Text><img alt="money" src={bloodIcon} width="20" style={{ marginRight: "5px" }} /> {getVampireTurningCost(myVampires?.length ?? 0)}</Text>}>
                        <Button color="grape" disabled={isLoading || !!error || showConfirmButtons} onClick={() => { setShowConfirmButtons(true) }}>Turn new Vampire</Button>
                    </Tooltip>
                </Group>
                {showConfirmButtons
                    ? <Group position="apart" mt="md">
                        <Button color="red" disabled={isLoading || !!error} onClick={() => { setShowConfirmButtons(false) }}>Cancel</Button>
                        <Button type="submit" color="grape" disabled={isLoading || !!error}>Turn Vampire</Button>
                    </Group>
                    : null}
            </form>
        </>
    )
}


export default CreateVampire