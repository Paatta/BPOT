import { createTheme } from '@mui/material/styles';
import { colors } from '../constants/colors';

/**
 * Minimal custom theme: dark mode palette + only the component overrides we need.
 * Does not override MUI base typography, breakpoints, or unused components.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: colors.textPrimary,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.textPrimary,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textDisabled,
    },
    error: {
      main: colors.error,
    },
    divider: colors.divider,
  },
  typography:{
    fontSize:12
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.inputBackground,
            borderRadius: 4,
            borderColor: colors.primary,
            '& fieldset': { borderColor: colors.primary }, //borderColor
            '&:hover fieldset': { borderColor: colors.primary },//textSecondary
            '&.Mui-focused fieldset': { borderColor: colors.primary },
          },
          '& .MuiInputLabel-root': { color: colors.textSecondary },
          '& .MuiInputBase-input': { color: colors.textPrimary },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.inputBackground,
          borderRadius: 4,
          '& fieldset': {
            borderColor: colors.primary,
          },
          '&:hover fieldset': {
            borderColor: colors.primaryLight,
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary,
            borderWidth: 2,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.backgroundPaper,
          borderRadius: 8,
          border: `1px solid ${colors.divider}`,
        },
        '& .MuiPaper-root': {
          background: colors.backgroundPaper
        }
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          backgroundColor: colors.secondary,
          border: "none",
          "--DataGrid-rowBorderColor": "transparent", 
          "& .action-cell": {
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          "& .MuiDataGrid-cell": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
          "& .MuiDataGrid-row.Mui-selected:hover":{
            backgroundColor: colors.tableRowHover,
          }
        },
  
        columnHeaders: {
          backgroundColor: colors.secondaryDark,
          color: colors.textPrimary,
        },
  
        cell: {
          color: colors.secondaryDark,
          borderBottom: "none",
          borderRight: `1px solid ${colors.secondaryDark}`,
        },
  
        columnHeader: {
          borderRight: `1px solid ${colors.secondaryDark}`,
        },
  
        row: {
          "&:nth-of-type(even)": {
            backgroundColor: colors.tableRowEven,
            borderBottom: "none"
          },
          "&:nth-of-type(odd)": {
            backgroundColor: colors.tableRowOdd,
            borderBottom: "none"
          },
          "&:hover": {
            backgroundColor: colors.tableRowHover,
          },
          "&.Mui-selected": {
            // backgroundColor: colors.primaryLight,
            // color: colors.textPrimary,
          },
          "&.Mui-selected:hover": {
            backgroundColor: colors.primaryDark,
          },
        },
      },
    },
  
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.secondaryDark,
          "&.Mui-checked": {
            color: colors.primary,
          },
        },
      },
    },
  },
});

export default theme;
