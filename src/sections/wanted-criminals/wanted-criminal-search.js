import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import * as constants from './../../constants/constants';
const AdvancedSearchBox = ({ onSearch, onResetFilter }) => {
  const [name, setName] = useState('');
  const [charge, setCharge] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [decisionMakingUnit, setDecisionMakingUnit] = useState('');
  const [permanentResidence, setPermanentResidence] = useState('');
  const [weapon, setWeapon] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [wantedType, setWantedType] = useState('');

  const handleSearch = () => {
    const searchCriteria = {
      name,
      charge,
      characteristics,
      decisionMakingUnit,
      permanentResidence,
      weapon,
      yearOfBirth,
      wantedType
    };
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setName('');
    setCharge('');
    setCharacteristics('');
    setDecisionMakingUnit('');
    setPermanentResidence('');
    setWeapon('');
    setYearOfBirth('');
    setWantedType('');
    onResetFilter();
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, margin: 4, width: '100%', maxWidth: 850 }}>
      <Typography 
        variant="h6" 
        sx={{marginBottom: 2}}>
        Tìm kiếm đối tượng truy nã
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Tội danh"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Đặc điểm"
            value={characteristics}
            onChange={(e) => setCharacteristics(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Đơn vị ra quyết định"
            value={decisionMakingUnit}
            onChange={(e) => setDecisionMakingUnit(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Hộ khẩu thường trú"
            value={permanentResidence}
            onChange={(e) => setPermanentResidence(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Vũ khí"
            value={weapon}
            onChange={(e) => setWeapon(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Năm sinh"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
            <TextField
              name="wantedType"
              onChange={(e) => setWantedType(e.target.value)}
              value={wantedType}
              fullWidth
              select
              label="Mức độ nguy hiểm"
              SelectProps={{ native: true }}
            >
              <option key="" value=""></option>
              {Object.entries(constants.wantedType).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
          <Button 
            variant="outlined" 
            onClick={handleReset} 
            fullWidth>
            Khôi phục
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button 
            variant="contained" 
            onClick={handleSearch} 
            fullWidth>
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdvancedSearchBox;
