import { SvgIcon } from '@mui/material';

const PricingIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 100 100">
      {/* Three human figures */}
      <circle cx="20" cy="70" r="8" fill="currentColor" />
      <path d="M 20 78 L 20 85 M 15 82 L 20 78 L 25 82" stroke="currentColor" strokeWidth="2" fill="none" />
      
      <circle cx="40" cy="65" r="8" fill="currentColor" />
      <path d="M 40 73 L 40 80 M 35 77 L 40 73 L 45 77" stroke="currentColor" strokeWidth="2" fill="none" />
      
      <circle cx="60" cy="60" r="8" fill="currentColor" />
      <path d="M 60 68 L 60 75 M 55 72 L 60 68 L 65 72" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Upward trending line graph */}
      <polyline
        points="15,75 30,70 45,65 60,60 75,55"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      
      {/* Magnifying glass */}
      <circle cx="80" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="88" y1="38" x2="95" y2="45" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  );
};

export default PricingIcon;
