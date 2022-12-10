import { Box } from "@mantine/core"

const GreyBox = ({ children }: { children: React.ReactElement }) => {
    return (
        <Box sx={(theme) => ({ maxWidth: 300, backgroundColor: "#282c34", padding: theme.spacing.xl, borderRadius: theme.radius.md, })} mx="auto">
            {children}
        </Box>
    )
}

export default GreyBox