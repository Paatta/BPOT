import { Box, Button } from '@mui/material';
import { colors } from '../../constants/colors';

const Footer = ({ onCancel, onSave, cancelLabel = 'Cancel', saveLabel = 'Save' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.secondary,
        px: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{
          color: colors.textPrimary,
          borderColor: colors.primary,
          '&:hover': {
            borderColor: colors.textSecondary,
            backgroundColor: colors.secondaryLight,
          },
        }}
      >
        {cancelLabel}
      </Button>
      <Button
        variant="contained"
        onClick={onSave}
        sx={{
          backgroundColor: colors.primary,
          color: colors.secondaryDark,
          '&:hover': {
            backgroundColor: colors.primaryDark,
          },
        }}
      >
        {saveLabel}
      </Button>
    </Box>
  );
};

export default Footer;
