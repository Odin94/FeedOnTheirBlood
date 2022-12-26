import { Button, Container, Grid, Group, Loader, Select, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetVampires } from "../api/vampires.type";
import GreyBox from "../components/GreyBox";
import VampireCard from "../components/vampire/VampireCard";
import fangsIcon from '../images/fangs-svgrepo-com.svg';

interface FormValues {
    targetVampireId: string
}

const ClanWar = () => {
    const { data: vampires, isLoading, error } = useGetVampires()
    const form = useForm<FormValues>({
        initialValues: {
            targetVampireId: "1",
        },

        validate: {
            targetVampireId: (_value: string) => null,
        },
    });

    const attackVampire = (values: FormValues) => {
        console.log({ values })
    }

    if (isLoading) {
        return (
            <Container size="xs" px="xs">
                <Loader color="grape" />
            </Container>
        )
    }
    if (error || !vampires) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error).message}</Text>
            </Container>
        )
    }

    const selectedVampire = vampires.find(vampire => vampire.id === parseInt(form.values.targetVampireId))
    return (
        <>
            {selectedVampire
                ? <Grid>
                    <Grid.Col span={3} />
                    <Grid.Col span={6}>
                        <VampireCard vampire={selectedVampire} />
                    </Grid.Col>
                    <Grid.Col span={3} />
                </Grid>
                : null}

            <Space h="xl" />

            <GreyBox>
                <form onSubmit={form.onSubmit((values) => attackVampire(values))}>
                    <Group position="center" mt="md">
                        <Select
                            label="Find a vampire to attack"
                            placeholder=""
                            data={vampires.map((vampire) => { return { value: `${vampire.id}`, label: vampire.name } })}
                            {...form.getInputProps('targetVampireId')}
                        />
                    </Group>

                    <Group position="center" mt="xl">
                        <Button
                            type="submit"
                            color="grape"
                            size="lg"
                            leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}
                        >Attack!</Button>
                    </Group>
                </form>
            </GreyBox>
        </>
    )
}

export default ClanWar