

import { Grid, Loader } from "@mantine/core";
import { useGetMyVampires } from "../api/vampires.type";
import VampireCard from "../components/VampireCard";

const VampiresPage = () => {
    const { data: vampires, isLoading, error } = useGetMyVampires()

    return (
        <div className='App-header'>
            {isLoading ? <Loader /> : null}
            {error ? (<p>{(error as Error).message}</p>) : null}
            {vampires ? (
                <div className="vampires">
                    <div className="vampire-grid">
                        <Grid>
                            {vampires.map((vampire) => (
                                <Grid.Col key={vampire.id} span={6}>
                                    <VampireCard vampire={vampire} />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default VampiresPage;
