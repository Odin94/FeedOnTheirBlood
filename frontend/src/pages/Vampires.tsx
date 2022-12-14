

import { Grid, Loader, Text } from "@mantine/core";
import { useGetMyVampires } from "../api/vampires.type";
import VampireCard from "../components/VampireCard";

const VampiresPage = () => {
    const { data: vampires, isLoading, error } = useGetMyVampires()

    return (
        <>
            {isLoading ? <Loader color="grape" /> : null}
            {error ? (<Text color="red">{(error as Error).message}</Text>) : null}
            {vampires ? (
                <Grid>
                    {vampires.map((vampire) => (
                        <Grid.Col key={vampire.id} span={6}>
                            <VampireCard vampire={vampire} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : null}
        </>
    );
}

export default VampiresPage;
