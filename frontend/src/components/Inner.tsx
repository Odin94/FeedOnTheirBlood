import { Container } from "@mantine/core"

const Inner = ({ children }: { children: React.ReactElement }) => {
    return (
        <Container size="sm" px="xs">
            {children}
        </Container >
    )
}

export default Inner