import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CriminalsTable } from 'src/sections/criminals/criminals-table';
import { CriminalsSearch } from 'src/sections/criminals/criminals-search';
import axios from 'axios';
import * as criminalsApi from '../../api/criminals';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({});

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearchChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const getCriminals = async () => {
    setLoading(true);
    setError(null);

    try {
      const criminals = await criminalsApi.getAllCriminals(searchValue, filter);
      setCriminals(criminals);
      setLoading(false);
    }
    catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    getCriminals();
  }, [searchValue, filter]);
  {
    if (loading)
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {<CircularProgress />}
      </div>
  }

  return (
    <>
      <Head>
        <title>
          Danh sách tội phạm
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">
                Danh sách tội phạm
              </Typography>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Thêm tội phạm
                </Button>
              </div>
            </Stack>
            <CriminalsSearch
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
            />
            <CriminalsTable
              count={criminals.length}
              items={criminals}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
