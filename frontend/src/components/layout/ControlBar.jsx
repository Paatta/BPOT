import { Box, Switch, FormControlLabel, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Button, Divider, Typography } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { colors } from '../../constants/colors';
import NavigationBar from './NavigationBar'
import { useState } from 'react';

const ControlBar = ({
  pageTitle,
  withDemandForecast = false,
  onDemandForecastChange,
  handleFilter,
  handleSearch,
  categories = ['Stationary', 'Electronics', 'Clothing'],
  actionButtons = []
}) => {
  const [categoryValue, setCategoryValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
    handleSearch(e.target.value)  
  }
  return (
    <Box
      sx={{
        backgroundColor: colors.secondaryDark,
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <NavigationBar pageTitle={pageTitle} />
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          height: 45

        }}
      >
        {/* Left Section */}
      <FormControlLabel
        control={
          <Switch
            checked={withDemandForecast}
            onChange={(e) => onDemandForecastChange?.(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: colors.primary,
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: colors.primary,
              },
            }}
          />
        }
        label={<Typography variant="body2">With Demand Forecast</Typography>}
        sx={{ color: colors.textPrimary}}
      />
      <Divider orientation="vertical" flexItem sx={{ borderRight: `1px solid ${colors.borderColor}` }} />
      {/* Middle Section */}
      <TextField
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: colors.primary }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flexGrow: 1,
          maxWidth: 300,
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.secondaryDark,
            '& fieldset': {
              borderColor: colors.primary,
            },
            '&:hover fieldset': {
              borderColor: colors.textSecondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputBase-input': {
            color: colors.textSecondary
          },
        }}
      />

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel sx={{ color: colors.textSecondary}}>Category</InputLabel>
        <Select
          value={categoryValue}
          onChange={handleCategoryChange}
          label="Category"
          sx={{
            backgroundColor: colors.secondaryDark,
            color: colors.textPrimary,
            '& .MuiSelect-icon': {
              color: colors.primary,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
          <MenuItem key="all" value=''>All</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={() => handleFilter(categoryValue)}
        sx={{
          color: colors.textPrimary,
          borderColor: colors.primary,
          '&:hover': {
            borderColor: colors.textSecondary,
            backgroundColor: colors.secondaryLight,
          },
          fontSize: 11
        }}
      >
        Filter
      </Button>

      {/* Right Section - Action Buttons */}
      {actionButtons.map((button, index) => (
        <Button
          key={index}
          variant="contained"
          startIcon={button.icon}
          onClick={button.onClick}
          sx={{
            backgroundColor: colors.primary,
            color: colors.secondaryDark,
            '&:hover': {
              backgroundColor: colors.primaryDark,
            },
            fontSize: 11
          }}
        >
          {button.label}
        </Button>
      ))}


      </Box>
      
    </Box>
  );
};

export default ControlBar;
