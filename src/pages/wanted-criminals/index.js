import React, { useState, useEffect } from 'react';
import WantedCriminalCard from '../../sections/wanted-criminals/wanted-criminal-card';
import * as wantedCriminalsApi from '../../api/wanted-criminals';
import Header from 'src/sections/wanted-criminals/wanted-criminal-header';
import { Grid } from '@mui/material';
import AdvancedSearchBox from 'src/sections/wanted-criminals/wanted-criminal-search';

const WantedCriminalsPage = () => {
  const [wantedCriminals, setWantedCriminals] = useState([]);
  const [filter, setFilter] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const data = await wantedCriminalsApi.getAllWantedCriminals(filter);
      setWantedCriminals(data);
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleResetFilter = () => {
    setFilter({});
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Header />
      <AdvancedSearchBox 
        onSearch={handleFilterChange}
        onResetFilter={handleResetFilter} />
      <Grid container 
        rowSpacing={1} 
        display="flex"
        columnSpacing={{ xs: 3, md: 5 }} 
        maxWidth={900}
        sx={{ alignItems: 'center', justifyContent: 'space-around' }}
      >
        {wantedCriminals.map((criminal) => (
          <Grid 
            item 
            key={criminal.id} 
            xs={12} 
            md={6}>
            <WantedCriminalCard criminal={criminal} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WantedCriminalsPage;
