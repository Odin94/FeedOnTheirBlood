import { Button, Image, Loader, Text, Tooltip } from "@mantine/core"
import { useContext } from "react"
import { getAttributeUpgradeCost, LairAttribute } from "../../api/lair.types"
import { LairContext } from "../../pages/MyLair"
import coinIcon from '../../images/coin-svgrepo-com.svg'

const LairUpgradeButton = ({ attribute }: { attribute: LairAttribute }) => {
    const lairContext = useContext(LairContext)
    if (!lairContext) {
        return (
            <Loader color="grape" />
        )
    }
    const { lair, upgradeLairMutation, buttonsDisabled, clan } = lairContext
    return (
        <Tooltip label={<Text><img alt="money" src={coinIcon} width="20" style={{ marginRight: "5px" }} /> {getAttributeUpgradeCost(lair, attribute)}</Text>}>
            <Button variant="light" color="grape" fullWidth radius="xl" onClick={() => upgradeLairMutation.mutate({ lair, attribute, clan })} disabled={buttonsDisabled}>
                <Image alt="increment" src={"https://www.svgrepo.com/show/316388/plus.svg"} width="20" style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(121deg) brightness(113%) contrast(101%)" }} />
            </Button>
        </Tooltip>
    )
}

export default LairUpgradeButton