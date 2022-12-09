import { useForm, UseFormReturnType } from '@mantine/form';
import { Box, Button, Group, TextInput } from "@mantine/core";
import { insertVampire, VampireInsert } from "../api/vampires.type";
import { useState } from 'react';

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

    const submitCreateVampire = async (form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>) => {
        console.log(form.values.name)

        const vampire: VampireInsert = {
            max_health: 10,
            current_health: 10,
            max_blood: 10,
            current_blood: 10,
            name: form.values.name,
        }

        const { error } = await insertVampire(vampire)

        if (error) {
            setSubmitState(`Oh no an error :( ${JSON.stringify(error)}`)
        }
        else {
            setSubmitState(`Successfully created ${form.values.name}`)
            form.reset()
        }
    }

    return (
        <div>
            <h1>{submitState}</h1>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((_values) => submitCreateVampire(form))}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Nosferatu"
                        {...form.getInputProps('name')}
                    />


                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    )
}


export default CreateVampire