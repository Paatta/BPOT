import { Typography, Box } from "@mui/material"
import { colors } from "../../constants/colors"

const BcgxIcon = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography 
          variant="h4" 
          sx={{ 
              mb: 3,
              fontWeight: 600,
              color: colors.textPrimary,
              textAlign: "center",
            }}
      >
          BCG<span style={{ color: colors.primaryDark }}>X</span>
      </Typography>

    </Box>
  )
}

export default BcgxIcon