import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { colors } from '../constants/colors';

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        backgroundColor: '#ffffff',
        color: '#000000',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Box sx={{ mb: 3, color: '#000' }}>{icon}</Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#000',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: '#666',
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>
        <Box sx={{ alignSelf: 'flex-start', mt: 'auto' }}>
          <IconButton
            sx={{
              color: '#000',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
