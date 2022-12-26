

import { Button, Grid, Loader, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGetMyVampires } from "../api/vampires.type";
import HuntingSection from "../components/vampire/HuntingSection";
import VampireCard from "../components/vampire/VampireCard";

const VampiresPage = () => {
    const navigate = useNavigate()
    const { data: vampires, isLoading, error } = useGetMyVampires()

    return (
        <>
            {isLoading ? <Loader color="grape" /> : null}
            {error ? (<Text color="red">{(error as Error).message}</Text>) : null}
            {vampires ? (
                <Grid>
                    {vampires.map((vampire) => (
                        <Grid.Col key={vampire.id} span={6}>
                            <VampireCard vampire={vampire}>
                                <>
                                    <HuntingSection vampire={vampire} />

                                    <Button variant="light" color="grape" fullWidth mt="md" radius="md" onClick={() => { navigate(`/vampires/${vampire.id}`) }}>
                                        Edit
                                    </Button>
                                </>
                            </VampireCard>
                        </Grid.Col>
                    ))}
                </Grid>
            ) : null}
        </>
    );
}

export default VampiresPage;
