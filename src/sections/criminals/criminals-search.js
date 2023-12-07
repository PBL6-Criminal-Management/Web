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
import { CriminalsFilter } from './criminals-filter'; 

export const CriminalsSearch = ({ onSearchChange, onFilterChange }) => {
  const [openFilterPopup, setOpenFilterPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState({});

  const handleOpenFilterPopup = () => {
    setOpenFilterPopup(true);
  };

  const handleCloseFilterPopup = () => {
    setOpenFilterPopup(false);
  };

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    handleCloseFilterPopup();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onSearchChange(value); 
  };

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OutlinedInput
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          placeholder="Tìm kiếm tội phạm"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 800 }}
        />
          <SvgIcon color="action" fontSize="small" sx={{ marginLeft: 2 }} onClick={handleOpenFilterPopup}>
            <AdjustmentVerticalIcon />
          </SvgIcon>
        </Box>
      </Card>

      <CriminalsFilter
        open={openFilterPopup}
        onClose={handleCloseFilterPopup}
        onSelectFilter={handleSelectFilter}
      />
    </div>
  );
};
