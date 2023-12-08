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
import * as constants from './../../constants/constants';

export const AccountsFilter = ({ open, onClose, onSelectFilter }) => {
  const [role, setRole] = useState('');
  const [area, setArea] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      let updatedValue;

      if (name === 'role') {
        updatedValue = value ? parseInt(value, 10) : '';
        setRole(updatedValue);
      } else {
        // Handle other fields
        switch (name) {
          case 'area':
            setArea(value);
            break;
          case 'yearOfBirth':
            // updatedValue = parseInt(value, 10) || ''; // Convert string to integer
            setYearOfBirth(value);
            break;
          default:
            break;
        }
      }
    }
  };

  // const handleRoleChange = (event) => {
  //   setRole(event.target.value);
  // };

  // const handleAreaChange = (event) => {
  //   setArea(event.target.value);
  // };

  // const handleYearOfBirthChange = (event) => {
  //   setYearOfBirth(event.target.value);
  // };

  const handleApplyFilter = () => {
    const yearOfBirthValue = /^\d+$/.test(yearOfBirth) ? parseInt(yearOfBirth, 10) : '';

    const selectedFilters = {
      role: role,
      area: area,
      yearOfBirth: yearOfBirthValue,
    };

    // console.log(selectedFilters);
    onSelectFilter(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setRole('');
    setArea('');
    setYearOfBirth('');
  };

  const handleClose = () => {
    handleResetFilter();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
      <DialogContent
        sx={{
          pb: 0.5
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name='role'
              onChange={handleChange}
              value={role}
              fullWidth
              select
              label="Vai trò"
              SelectProps={{
                native: true,
              }}
              margin="dense"
            >
              <option key="" value=""></option>
              {Object.entries(constants.role).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              name='area'
              label="Khu vực"
              value={area}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name='yearOfBirth'
              label="Năm sinh"
              value={yearOfBirth}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetFilter} color="secondary">
          Khôi phục
        </Button>
        <Button onClick={handleClose} color="primary">
          Thoát
        </Button>
        <Button onClick={handleApplyFilter} color="primary">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};
