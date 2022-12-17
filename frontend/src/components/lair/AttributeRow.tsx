import { Button, Grid, Image, Text } from "@mantine/core"

const AttributeRow = ({ element, attributeName, onClick, buttonDisabled }: { element: any, attributeName: string, onClick?: () => void, buttonDisabled: boolean }) => {
    return (
        <>
            <Grid.Col span={9}>
                <Text>{attributeName.toUpperCase()}: {element[attributeName]}</Text>
            </Grid.Col>
            <Grid.Col span={3}>
                <Button variant="light" color="grape" fullWidth radius="xl" onClick={onClick} disabled={buttonDisabled}>
                    <Image alt="increment" src={"https://www.svgrepo.com/show/316388/plus.svg"} width="20" style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(121deg) brightness(113%) contrast(101%)" }} />
                </Button>
            </Grid.Col>
        </>
    )
}

export default AttributeRow