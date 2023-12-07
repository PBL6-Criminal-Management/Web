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
import { CasesFilter } from './cases-filtler'; 
import debounce from 'lodash/debounce';

export const CasesSearch = ({ onSearchChange, onFilterChange }) => {
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
          placeholder="Tìm kiếm vụ án"
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

      <CasesFilter
        open={openFilterPopup}
        onClose={handleCloseFilterPopup}
        onSelectFilter={handleSelectFilter}
      />
    </div>
  );
};
