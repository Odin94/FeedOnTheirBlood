
import { useEffect, useState } from "react";

import { Grid } from "@mantine/core";
import VampireCard from "../components/VampireCard";
import { getVampires, Vampires } from "../lib/vampires.type";

const VampiresPage = () => {
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [vampires, setVampires] = useState<Vampires | null>(null)
    useEffect(() => {
        const fetchVampires = async () => {
            const { data, error } = await getVampires()

            if (error) {
                setFetchError("Failed to fetch vampires")
                setVampires(null)
                console.log(error)
            }
            if (data) {
                setVampires(data)
                setFetchError(null)
            }
        }

        fetchVampires()
    }, [])

    return (
        <div className='App-header'>
            {fetchError ? (<p>{fetchError}</p>) : null}
            {vampires ? (
                <div className="vampires">
                    <div className="vampire-grid">
                        <Grid>
                            {vampires.map((vampire) => (
                                <Grid.Col span={6}>
                                    <VampireCard key={vampire.id} vampire={vampire} />
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
