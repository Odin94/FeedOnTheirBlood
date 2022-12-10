import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import { getMyClan } from "../api/clans.types";
import { useInsertVampire, VampireInsert } from "../api/vampires.type";

interface FormValues {
    name: string
}

const CreateVampire = () => {
    const [submitState, setSubmitState] = useState("")


    const form = useForm<FormValues>({
        initialValues: {
            name: '',
        },

        validate: {
            name: (value: string) => (value.length > 0 && value.length < 100 ? null : 'Invalid name'),
        },
    });
    const insertVampireMutation = useInsertVampire(
        () => { setSubmitState(`Successfully created ${form.values.name}`); form.reset() },
        (error) => { setSubmitState(`Oh no an error :( ${JSON.stringify(error)}`) }
    )

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

        insertVampireMutation.mutate(vampire)
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

                <Group position="right" mt="md">
                    <Button type="submit" color="grape">Submit</Button>
                </Group>
            </form>
        </>
    )
}


export default CreateVampire