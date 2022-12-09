import { Container } from "@mantine/core"

const Inner = ({ children }: { children: React.ReactElement }) => {
    return (
        <Container size={600}>
            {children}
        </Container>
    )
}

export default Inner