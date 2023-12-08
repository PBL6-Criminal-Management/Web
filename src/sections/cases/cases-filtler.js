import React, { useState } from 'react';
import * as constants from './../../constants/constants';
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

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      let updatedValue;

      if (name === 'status' || name === 'typeOfViolation') {
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
          case 'timeTakesPlace':
            setTimeTakesPlace(value);
            break;
          default:
            break;
        }
      }
    }
  };

  const handleApplyFilter = () => {
    const selectedFilters = {
      status: status,
      area: area,
      timeTakesPlace: timeTakesPlace,
      typeOfViolation: typeOfViolation
    };

    // console.log(selectedFilters);
    onSelectFilter(selectedFilters);
    onClose();
  };

  const handleResetFilter = () => {
    setStatus('');
    setArea('');
    setTimeTakesPlace('');
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
              name='typeOfViolation'
              onChange={handleChange}
              value={typeOfViolation}
              fullWidth
              select
              label="Loại vi phạm"
              SelectProps={{
                native: true,
              }}
              margin="dense"
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
              name='status'
              onChange={handleChange}
              value={status}
              fullWidth
              select
              label="Tình trạng"
              SelectProps={{
                native: true,
              }}
              margin="dense"
            >
              <option key="" value=""></option>
              {Object.entries(constants.caseStatus).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="area"
              label="Khu vực"
              value={area}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="timeTakesPlace"
              label="Thời gian diễn ra"
              value={timeTakesPlace}
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
