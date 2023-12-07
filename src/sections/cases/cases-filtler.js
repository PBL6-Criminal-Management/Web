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

export const CasesFilter = ({ open, onClose, onSelectFilter }) => {
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [timeTakesPlace, setTimeTakesPlace] = useState('');
  const [typeOfViolation, setTypeOfViolation] = useState('');

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleApplyFilter = () => {
    const selectedFilters = {
      status: status,
      area: area,
      timeTakesPlace: timeTakesPlace,
      typeOfViolation: typeOfViolation
    };

    onSelectFilter(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setStatus('');
    setArea('');
    setTimeTakesPlace('');
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
              <MenuItem value={0}>Chưa xét xử</MenuItem>
              <MenuItem value={1}>Đang điều tra</MenuItem>
              <MenuItem value={2}>Đã xét xử</MenuItem>
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
                label="Thời gian diễn ra"
                value={timeTakesPlace}
                onChange={(event) => setTimeTakesPlace(event.target.value)}
                fullWidth
                />
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
