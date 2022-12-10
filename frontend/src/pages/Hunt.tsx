import { Box, Button, Group, SegmentedControl } from "@mantine/core";
import { useForm } from "@mantine/form";
import fangsIcon from '../images/fangs-svgrepo-com.svg'

interface FormValues {
    time: string
}

const Hunt = () => {
    const form = useForm<FormValues>({
        initialValues: {
            time: "10",
        },

        validate: {
            time: (_value: string) => null,
        },
    });

    const startHunt = (values: FormValues) => {
        console.log({ values })
    }

    return (
        <form onSubmit={form.onSubmit((_values) => startHunt(form.values))}>
            <Group position="center" mt="md">

                <SegmentedControl
                    name="time"
                    color="red"
                    transitionDuration={200}
                    transitionTimingFunction="linear"
                    {...form.getInputProps('time')}
                    data={[
                        { label: 'Quick - 10 min', value: '10' },
                        { label: 'Medium - 30 min', value: '30' },
                        { label: 'Long - 60 min', value: '60' },
                        { label: 'Extensive - 120 min', value: '120' },
                    ]}
                />
            </Group>

            <Group position="center" mt="xl">
                <Button
                    type="submit"
                    color="grape"
                    size="lg"
                    leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}
                >Hunt!</Button>
            </Group>
        </form>
    )
}

export default Hunt