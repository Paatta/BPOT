import { Box, Typography, Link, Divider } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../constants/colors';

const NavigationBar = ({ pageTitle, showBack = true }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        px: 3,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexGrow: 1
      }}

    >
      {showBack && (
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate(-1)}
          sx={{
            color: colors.textPrimary,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            '&:hover': {
              color: colors.primary,
            },
          }}
        >
          <ArrowBackIos sx={{ fontSize: 14, color: colors.primary}} />
          Back
        </Link>
      )}
      <Divider orientation="vertical" flexItem sx={{ borderRight: `1px solid ${colors.borderColor}` }} />

      <Typography variant="body1" sx={{ color: colors.textPrimary, fontWeight: 500 }}>
        {pageTitle}
      </Typography>
    </Box>
  );
};

export default NavigationBar;
