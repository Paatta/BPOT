import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box, Alert, AlertTitle } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BcgxIcon from "./icons/BcgxIcon"
import { colors } from "../constants/colors"
import { login } from "../api/authService"

const Login = ({ open, onClose, alert }) => {
    const [request, setRequest] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setRequest((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleLogin = async() => {
        try{
            const res = await login(request);
            if (res.status == 200){
                let access_token = res.access_token;
                localStorage.setItem("access_token", access_token);
                navigate("/");
                alert({
                    type: "success",
                    message: res.message
                })
            }
            else if (res.error){
                alert({
                    type: "error",
                    message: res.error
                })
            }
        } catch (err) {
            console.log(err)
            alert({
                type: "error",
                message: "Internal server error. Please contact support."
            })
        }

    };

    return(
    <>
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ pt: 3, pb: 0, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BcgxIcon />
                </Box>
            </DialogTitle>
            <DialogContent sx={{ px: 3, pt: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ color: colors.primary, textAlign: 'center', fontWeight: 600, mb: 2 }}
                    gutterBottom
                >
                    Login
                </Typography>
                <TextField
                    name="email"
                    value={request.email}
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    onChange={handleInputChange}
                    variant="standard"
                />
                <TextField
                    name="password"
                    value={request.password}
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    onChange={handleInputChange}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: colors.textPrimary,
                        borderColor: colors.borderColor,
                        '&:hover': {
                            borderColor: colors.textSecondary,
                            backgroundColor: colors.secondaryLight,
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    sx={{
                        backgroundColor: colors.primary,
                        color: colors.textPrimary,
                        '&:hover': { backgroundColor: colors.primaryDark },
                    }}
                >
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default Login;