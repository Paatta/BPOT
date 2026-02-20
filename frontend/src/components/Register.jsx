import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box, MenuItem, Alert, AlertTitle } from "@mui/material"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import BcgxIcon from "./icons/BcgxIcon"
import { colors } from "../constants/colors"
import { register } from "../api/authService"

const Register = ({ open, onClose, alert }) => {
    const [request, setRequest] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role:""
    })
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setRequest((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleRegister = async() => {
        try{
            const res = await register(request);
            if (res.status == 201){  
                navigate("/");
                alert({
                    type: "success",
                    message: res.message
                })
            }
            else if (res.error){
                alert({
                    type:"error",
                    message: res.error
                })
            }
        } catch (err) {
            console.log(err);
            alert({
                type:"error",
                message:"Internal server error. Please contact support"
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
            slotProps={{
                backdrop: {
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                },
            }}
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
                    Register
                </Typography>
                <TextField
                    name="first_name"
                    value={request.first_name}
                    fullWidth
                    label="First Name"
                    margin="normal"
                    onChange={handleInputChange}
                    variant="standard"
                />
                <TextField
                    name="last_name"
                    value={request.last_name}
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    onChange={handleInputChange}
                    variant="standard"
                />
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
                <TextField
                    name="role"
                    value={request.role}
                    fullWidth
                    label="Role"
                    margin="normal"
                    onChange={handleInputChange}
                    variant="standard"
                    select
                >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                </TextField>
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
                    onClick={handleRegister}
                    variant="contained"
                    sx={{
                        backgroundColor: colors.primary,
                        color: colors.textPrimary,
                        '&:hover': { backgroundColor: colors.primaryDark },
                    }}
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default Register;