import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import AdjustmentVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Box,
  Button
} from '@mui/material';
import { CriminalsFilter } from './criminals-filter'; 
import debounce from 'lodash/debounce';

export const CriminalsSearch = ({ onSearchChange, onFilterChange, onSearchButtonClick }) => {
  const [openFilterPopup, setOpenFilterPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState({});

  const handleSearchButtonClick = () => {
    onSearchChange(inputValue);
    onSearchButtonClick(); 
  };

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
          onChange={(e) => setInputValue(e.target.value)}
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
          <SvgIcon 
            color="action" fontSize="small" 
            sx={{ marginLeft: 2, cursor: 'pointer' }} 
            onClick={handleOpenFilterPopup}>
            <AdjustmentVerticalIcon />
          </SvgIcon>
          <Button 
            variant="outlined" 
            sx={{marginLeft: 2}} onClick={handleSearchButtonClick}>
            Tìm kiếm
          </Button>
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
