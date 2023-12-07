// AccountsFilter.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

export const AccountsFilter = ({ open, onClose, onSelectFilter }) => {
  const [role, setRole] = useState('');
  const [area, setArea] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleYearOfBirthChange = (event) => {
    setYearOfBirth(event.target.value);
  };

  const handleApplyFilter = () => {
    const selectedFilters = {
      role: role,
      area: area,
      yearOfBirth: parseInt(yearOfBirth, 10),
    };

    onSelectFilter(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setRole('');
    setArea('');
    setYearOfBirth('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
                label="Vai trò" 
                value={role}
                onChange={handleRoleChange} 
                fullWidth
            >
              <MenuItem value={0}>Admin</MenuItem>
              <MenuItem value={1}>Officer</MenuItem>
              <MenuItem value={2}>Investigator</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Khu vực"
                value={area}
                onChange={handleAreaChange}
                fullWidth
                />
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Năm sinh"
                value={yearOfBirth}
                onChange={handleYearOfBirthChange}
                fullWidth
                />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetFilter} color="secondary">
          Khôi phục
        </Button>
        <Button onClick={onClose} color="primary">
          Thoát
        </Button>
        <Button onClick={handleApplyFilter} color="primary">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};
