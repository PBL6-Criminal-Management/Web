import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import AdjustmentVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Box,
} from '@mui/material';
import debounce from 'lodash/debounce';

export const ReportsSearch = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value); 
  };

  const debouncedSearch = debounce((value) => {
    onSearchChange(value);
  }, 1000);

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OutlinedInput
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          placeholder="Tìm kiếm báo cáo"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 800 }}
        />
        </Box>
      </Card>
    </div>
  );
};
