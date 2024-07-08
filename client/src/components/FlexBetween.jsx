import { Box } from '@mui/material'
import { styled } from '@mui/system'

const FlexBetween = styled(Box)({ // this box props allow to access the property of css 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween