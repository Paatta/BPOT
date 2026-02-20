import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { colors } from '../../constants/colors';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: colors.secondary }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: colors.primary,
            fontWeight: 600,
          }}
        >
          Price Optimization Tool
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ color: colors.textPrimary }}>
            Welcome, <Typography variant="body1" sx={{color:colors.primary}} component="span">{user}</Typography>
          </Typography>
          <Avatar sx={{ bgcolor: colors.primaryLight, width: 32, height: 32 }} onClick={handleLogout} label="logout">
            <AccountCircle />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
