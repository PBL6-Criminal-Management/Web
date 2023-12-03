import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CasesTable } from 'src/sections/cases/cases-table';
import { CasesSearch } from 'src/sections/cases/cases-search';
import axios from 'axios';
import * as casesApi from '../api/cases';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const getCases = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cases = await casesApi.getAllCases();
      setCases(cases);
      setIsLoading(false);
    }
    catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }
  
  useEffect(() => {
    getCases();
  }, []);
  {if (loading) 
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {<CircularProgress />}
    </div>
  }

  return (
    <>
      <Head>
        <title>
          Danh sách vụ án
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
                  Danh sách vụ án
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
                  Thêm vụ án
                </Button>
              </div>
            </Stack>
            <CasesSearch />
            <CasesTable
              count={cases.length}
              items={cases}
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
