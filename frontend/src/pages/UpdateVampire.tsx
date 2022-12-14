import { Badge, Button, Card, Container, Group, Image, Loader, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVampire, useUpdateVampire, Vampire, VampireInsert } from "../api/vampires.type";
import bloodIcon from '../images/blood-svgrepo-com.svg';
import healthIcon from '../images/health-cross-svgrepo-com.svg';

interface FormValues {
    name: string
}

const UpdateVampire = () => {
    const { id } = useParams()
    const vampireId = parseInt(id!)  // react router wouldn't render this page if id was undefined

    const { data: vampire, isLoading, error } = useGetVampire(vampireId)

    if (isLoading) {
        return (
            <Container size="xs" px="xs">
                <Loader color="grape" />
            </Container>
        )
    }
    if (error) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error).message}</Text>
            </Container>
        )
    }

    return (
        <Container size="xs" px="xs">
            <UpdateForm vampire={vampire!} />
        </Container>
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

    const updateVampireMutation = useUpdateVampire({
        onSuccess: () => { setSubmitState(`Successfully updated ${existingVampire.name} -> ${form.values.name}`) },
        onError: (error) => { setSubmitState(`Oh no an error :( ${JSON.stringify(error)}`) }
    })

    const submitUpdateVampire = async (form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>, existingVampire: Vampire) => {
        const vampire: VampireInsert = {
            ...existingVampire,
            name: form.values.name,
        }

        updateVampireMutation.mutate(vampire)
    }

    return (
        <div>
            {updateVampireMutation.isLoading ? <Loader color="grape" /> : <h1>{submitState}</h1>}
            <form onSubmit={form.onSubmit((_values) => submitUpdateVampire(form, existingVampire))}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src="https://images.unsplash.com/photo-1635319520353-194ef0284701?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                            height={270}
                            alt="Vampire profile"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>
                            <TextInput
                                withAsterisk
                                label="Name"
                                placeholder="Nosferatu"
                                {...form.getInputProps('name')}
                            />
                        </Text>
                        <Badge color="pink" variant="light">
                            Lvl: 5
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                        This is a real cool vampire sample text lorem ipsum dolor sit amet
                    </Text>
                    <Text size="sm" color="dimmed">
                        {/* filter property for coloring svgs: https://codepen.io/sosuke/pen/Pjoqqp */}
                        <img alt="blood" src={healthIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} /> {existingVampire?.current_health} / {existingVampire?.max_health}
                    </Text>
                    <Text size="sm" color="dimmed">
                        <img alt="blood" src={bloodIcon} width="20" /> {existingVampire?.current_blood} / {existingVampire?.max_blood}
                    </Text>

                    <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                        Submit
                    </Button>
                </Card>
            </form>
        </div>
    )
}


export default UpdateVampire
