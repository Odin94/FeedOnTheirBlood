import { Navbar, Text } from "@mantine/core"
import { Link } from "react-router-dom"

const AppShellNavbar = () => {

    return (
        <Navbar width={{ base: 300 }} p="xs" >
            {
                < div style={{ display: "flex", flexDirection: "column" }}>
                    <Text component={Link} variant="link" to="/signup">
                        Signup
                    </Text>
                    <Text component={Link} variant="link" to="/login">
                        Login
                    </Text>
                    <Text component={Link} variant="link" to="/">
                        Vampires
                    </Text>
                    <Text component={Link} variant="link" to="/create">
                        Create New Vampire
                    </Text>
                    <Text component={Link} variant="link" to="/hunt">
                        Hunt
                    </Text>
                </div >
            }</Navbar >
    )
}

export default AppShellNavbar