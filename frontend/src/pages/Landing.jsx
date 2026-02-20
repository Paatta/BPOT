import { Box, Typography, Grid, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import AuthButtons from "../components/AuthButtons";
import FeatureCard from "../components/FeatureCard";
import ProductIcon from "../components/icons/ProductIcon";
import PricingIcon from "../components/icons/PricingIcon";
import { colors } from "../constants/colors";
import BcgxIcon from "../components/icons/BcgxIcon";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Landing = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null)

    const { access_token, user, role } = useAuth()

    const body = "This is a landing page for the price optimization tool. It is a tool that helps you optimize your prices for your products.";

    useEffect(() => {
        if (alert) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [alert]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                background: colors.gradientLanding,
                color: colors.textPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
            }}
        >
            <Box
                width="100%"
                maxWidth="1400px"
                px={4}
                textAlign="center"
            >
                {alert && (
                    <Box sx={{ p: 3, m:4 }}>
                        <Alert
                            severity={alert.type}
                            onClose={() => setAlert(null)}
                        >
                            <AlertTitle>
                                {alert.type === "success" ? "Success" : "Error"}
                            </AlertTitle>
                            {alert.message}
                        </Alert>
                    </Box>
                )}

                <BcgxIcon />
                {/* Main Title */}
                <Typography
                    variant="h2"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        color: colors.textPrimary,
                    }}
                >
                    Price Optimization Tool
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="body1"
                    sx={{
                        mb: 8,
                        color: colors.textSecondary,
                        maxWidth: 800,
                        mx: "auto",
                    }}
                >
                    {body}
                </Typography>

                {/* Feature Cards */}
                {!access_token ? (
                    <AuthButtons alert={setAlert} />
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} sm={6} md={5} sx={{ maxWidth: "500px" }}>
                                <FeatureCard
                                    icon={<ProductIcon sx={{ fontSize: 80 }} />}
                                    title="Create and Manage Product"
                                    description={"Select to view prodcuts and demand forecats."}
                                    onClick={() => navigate("/products")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} sx={{ maxWidth: "500px" }}>
                                <FeatureCard
                                    icon={<PricingIcon sx={{ fontSize: 80 }} />}
                                    title="Pricing Optimization"
                                    description={"Select to vew products and their optimized prices."}
                                    onClick={() => navigate("/pricing")}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Landing;