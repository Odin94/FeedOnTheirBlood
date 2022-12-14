import { Container } from "@mantine/core"

const Inner = ({ children }: { children: React.ReactElement }) => {
    return (
        <Container size="md" px="xs">
            {children}
        </Container >
    )
}

export default Inner