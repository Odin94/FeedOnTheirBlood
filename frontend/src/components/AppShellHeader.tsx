import { Container, Header } from "@mantine/core"

const AppShellHeader = () => {
    return (
        <Header height={60} p="xs">{
            <Container style={{ justifyContent: "center", display: "flex" }}>
                <h1>Feast on their Blood</h1>
            </Container>

        }</Header>
    )
}

export default AppShellHeader