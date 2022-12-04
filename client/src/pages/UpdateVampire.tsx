import { useForm, UseFormReturnType } from '@mantine/form';
import { Box, Button, Group, TextInput } from "@mantine/core";
import { getVampire, updateVampire, Vampire, VampireInsert } from "../api/vampires.type";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface FormValues {
    name: string
}

const UpdateVampire = () => {
    const { id } = useParams()
    const [vampire, setVampire] = useState<Vampire | null>(null)

    useEffect(() => {
        const fetchVampire = async () => {
            if (id) {
                const { data, error } = await getVampire(parseInt(id))
                if (error) {

                }
                if (data) {
                    setVampire(data)
                }
            }
        }

        fetchVampire()
    }, [id])

    if (!vampire || !id) {
        return (
            <div></div>
        )
    }

    return (
        <UpdateForm vampire={vampire} />
    )
}

const UpdateForm = ({ vampire: existingVampire }: { vampire: Vampire }) => {
    const [submitState, setSubmitState] = useState("")

    const form = useForm<FormValues>({
        initialValues: {
            name: existingVampire?.name || "",
        },

        validate: {
            name: (value: string) => (value.length > 0 && value.length < 100 ? null : 'Invalid name'),
        },
    });

    const submitUpdateVampire = async (form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>, existingVampire: Vampire) => {
        const vampire: VampireInsert = {
            ...existingVampire,
            name: form.values.name,
        }

        const { error } = await updateVampire(vampire)

        if (error) {
            setSubmitState(`Oh no an error :( ${JSON.stringify(error)}`)
        }
        else {
            setSubmitState(`Successfully updated ${existingVampire.name} -> ${form.values.name}`)
            form.reset()
        }
    }

    return (
        <div>
            <h1>{submitState}</h1>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((_values) => submitUpdateVampire(form, existingVampire))}>
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


export default UpdateVampire