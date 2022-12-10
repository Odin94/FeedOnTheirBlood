import { Box, Center, Navbar, Stack, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { useMyClan } from "../api/clans.types";
import { useSession } from "../api/user.type"

import moonIcon from '../images/full-moon-halloween-svgrepo-com.svg';
import knifeIcon from '../images/knife-svgrepo-com.svg';

{/* filter property for coloring svgs: https://codepen.io/sosuke/pen/Pjoqqp */ }
const oliveSvgFilter = "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)"

const AppShellNavbar = () => {
    const { data: session } = useSession()
    const { data: clan } = useMyClan()

    return (
        <Navbar width={{ base: 300 }} p="xs" >
            <Navbar.Section mt="md">
                <img alt="moon" src={moonIcon} width="120" />
            </Navbar.Section>
            <Navbar.Section mt="md">
                <h1>Feast on their Blood</h1>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
                {
                    < div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100%" }}>
                        <Center style={{ height: "100%" }}>
                            <Box style={{ textAlign: "left", maxWidth: "250px" }} mx="auto">
                                {!session
                                    ? <Text component={Link} variant="link" to="/signup">
                                        <img alt="knife" src={knifeIcon} width="40" style={{ filter: oliveSvgFilter, marginRight: "10px" }} /> Signup
                                    </Text>
                                    : null
                                }
                                <br />
                                <Text component={Link} variant="link" to="/login">
                                    <img alt="knife" src={knifeIcon} width="40" style={{ filter: oliveSvgFilter, marginRight: "10px" }} /> Login
                                </Text>
                                <br />
                                <Text component={Link} variant="link" to="/">
                                    <img alt="knife" src={knifeIcon} width="40" style={{ filter: oliveSvgFilter, marginRight: "10px" }} /> Vampires
                                </Text>
                                <br />
                                <Text component={Link} variant="link" to="/create">
                                    <img alt="knife" src={knifeIcon} width="40" style={{ filter: oliveSvgFilter, marginRight: "10px" }} /> Create New Vampire
                                </Text>
                                <br />
                                <Text component={Link} variant="link" to="/hunt">
                                    <img alt="knife" src={knifeIcon} width="40" style={{ filter: oliveSvgFilter, marginRight: "10px" }} /> Hunt
                                </Text>
                            </Box>
                        </Center>
                    </div >
                }
            </Navbar.Section>
            <Navbar.Section grow mt="md">
                <Stack>
                    {
                        clan
                            ? <><Text>a</Text>
                                <Text>a</Text>
                                <Text>a</Text>
                                <Text>a</Text>
                            </>
                            : null
                    }

                </Stack>
            </Navbar.Section>
        </Navbar >
    )
}

export default AppShellNavbar