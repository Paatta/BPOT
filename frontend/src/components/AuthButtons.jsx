import { Box, Button } from "@mui/material";
import { colors } from "../constants/colors";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthButtons = ({alert}) => {
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const handleOpenLogin = () => setOpenLogin(true)
    const handleCloseLogin = () => setOpenLogin(false)
    const handleOpenRegister = () => setOpenRegister(true)
    const handleCloseRegister = () => setOpenRegister(false)
   
    return(
        <Box display="flex" gap={2} sx={{ justifyContent: "center" }}>
            <Button
                variant="contained"
                sx={{
                    color: colors.textPrimary,
                    backgroundColor: colors.primary,
                    '&:hover': {
                        backgroundColor: colors.primaryDark,
                    },
                    minWidth: "150px"
                }}
                onClick={handleOpenLogin}
            >
                Login
            </Button>

            <Button
                variant="outlined"
                sx={{
                    color: colors.textPrimary,
                    borderColor: colors.primary,
                    '&:hover': {
                        borderColor: colors.primaryDark,
                    },
                    minWidth: "150px"
                }}
                onClick={handleOpenRegister}
            >
                Register
            </Button>
            <Login open={openLogin} onClose={handleCloseLogin} alert={alert}/>
            <Register open={openRegister} onClose={handleCloseRegister} alert={alert}/>
        </Box>
    );
}

export default AuthButtons;