import { Container, Grid, Header } from "@mantine/core"

const AppShellHeader = () => {
    return (
        <Header height={60} p="xs">{
            <div style={{ justifyContent: "center", display: "flex" }}>
                {/* offsetting navbar which is 300px wide to be centered the same as the inner content */}
                <h1 style={{ float: "left", marginLeft: "300px" }}>Feast on their Blood</h1>

            </div>

        }</Header>
    )
}

export default AppShellHeader