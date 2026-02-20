import { SvgIcon } from '@mui/material';

const ProductIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 100 100">
      {/* Three connected cube-like shapes with dotted lines */}
      <rect x="10" y="30" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
      <rect x="15" y="35" width="10" height="10" fill="currentColor" opacity="0.3" />
      
      <line x1="30" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
      
      <rect x="50" y="30" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
      <rect x="55" y="35" width="10" height="10" fill="currentColor" opacity="0.3" />
      
      <line x1="70" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
      
      <rect x="80" y="30" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
      <rect x="85" y="35" width="10" height="10" fill="currentColor" opacity="0.3" />
    </SvgIcon>
  );
};

export default ProductIcon;
