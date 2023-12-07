import React, { useState } from 'react';
import { gender } from './../../constants/constants';
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

export const CriminalsFilter = ({ open, onClose, onSelectFilter }) => {
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [typeOfViolation, setTypeOfViolation] = useState('');
  const [charge, setCharge] = useState('');

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleYearOfBirthChange = (event) => {
    setYearOfBirth(event.target.value);
  };

  const handleApplyFilter = () => {
    const selectedFilters = {
      status: status,
      area: area,
      yearOfBirth: parseInt(yearOfBirth, 10),
      gender: gender,
      characteristic: characteristic,
      charge: charge,
      typeOfViolation: typeOfViolation
    };

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
                label="Trang thai" 
                value={status}
                onChange={(event) => setStatus(event.target.value)} 
                fullWidth
            >
              <MenuItem value={0}>Đang ngồi tù</MenuItem>
              <MenuItem value={1}>Đã được thả</MenuItem>
              <MenuItem value={2}>Bị truy nã</MenuItem>
              <MenuItem value={3}>Chưa kết án</MenuItem>
              <MenuItem value={4}>Án treo</MenuItem>
              <MenuItem value={5}>Đã bị bắt</MenuItem>
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
          <Grid item xs={6}>
            <Select
                label="Gioi tinh" 
                value={gender}
                onChange={(event) => setGender(event.target.value)} 
                fullWidth
            >
              <MenuItem value={false}>Nam</MenuItem>
              <MenuItem value={true}>Nu</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
                label="Loai vi pham" 
                value={typeOfViolation}
                onChange={(event) => setTypeOfViolation(event.target.value)} 
                fullWidth
            >
              <MenuItem value={0}>Vi phạm dân sự</MenuItem>
              <MenuItem value={1}>Vi phạm hình sự</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Dac diem nhan dang"
                value={characteristic}
                onChange={(event) => setCharacteristic(event.target.value)}
                fullWidth
                />
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Toi danh"
                value={charge}
                onChange={(event) => setCharge(event.target.value)}
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
