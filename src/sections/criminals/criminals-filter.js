import React, { useState } from 'react';
import * as constants from './../../constants/constants';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';

export const CriminalsFilter = ({ open, onClose, onSelectFilter }) => {
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [typeOfViolation, setTypeOfViolation] = useState('');
  const [charge, setCharge] = useState('');

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      let updatedValue;

      if (name === 'gender') {
        updatedValue = value === true || 'true'; // Convert string to boolean
        setGender(updatedValue);
      } else if (name === 'status' || name === 'typeOfViolation') {
        // Handle status and typeOfViolation
        // Convert the value to a number, use an empty string if it's falsy
        updatedValue = value ? parseInt(value, 10) : '';
        name === 'status' ? setStatus(updatedValue) : setTypeOfViolation(updatedValue);
      } else {
        // Handle other fields
        switch (name) {
          case 'area':
            setArea(value);
            break;
          case 'yearOfBirth':
            setYearOfBirth(value);
            break;
          case 'characteristic':
            setCharacteristic(value);
            break;
          case 'charge':
            setCharge(value);
            break;
          default:
            break;
        }
      }
    }
  };

  const handleApplyFilter = () => {
    // Convert yearOfBirth to an integer if it's a valid integer, otherwise set it to an empty string
    const yearOfBirthValue = /^\d+$/.test(yearOfBirth) ? parseInt(yearOfBirth, 10) : '';

    const selectedFilters = {
      status,
      area,
      yearOfBirth: yearOfBirthValue,
      gender,
      characteristic,
      charge,
      typeOfViolation,
    };

    // console.log(selectedFilters);
    onSelectFilter(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setStatus('');
    setArea('');
    setYearOfBirth('');
    setGender('');
    setCharacteristic('');
    setCharge('');
    setTypeOfViolation('');
  };

  const handleClose = () => {
    handleResetFilter();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
      <DialogContent sx={{ pb: 0.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="status"
              onChange={handleChange}
              value={status}
              fullWidth
              select
              label="Trạng thái"
              SelectProps={{ native: true }}
              margin="dense"
            >
              <option key="" value=""></option>
              {Object.entries(constants.criminalStatus).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="area"
              margin="dense"
              label="Khu vực"
              value={area}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="yearOfBirth"
              label="Năm sinh"
              value={yearOfBirth}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="gender"
              value={gender}
              fullWidth
              select
              label="Giới tính"
              SelectProps={{ native: true }}
              onChange={handleChange}
            >
              <option key="" value=""></option>
              {Object.entries(constants.gender).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="typeOfViolation"
              value={typeOfViolation}
              fullWidth
              select
              label="Loại vi phạm"
              SelectProps={{ native: true }}
              onChange={handleChange}
            >
              <option key="" value=""></option>
              {Object.entries(constants.typeOfViolation).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="characteristic"
              label="Đặc điểm nhận dạng"
              value={characteristic}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="charge"
              label="Tội danh"
              value={charge}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
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
