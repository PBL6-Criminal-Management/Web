import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ReportsTable } from 'src/sections/reports/reports-table';
import { ReportsSearch } from 'src/sections/reports/reports-search';
import { applyPagination } from 'src/utils/apply-pagination';
import * as reportsApi from '../../api/reports'

const useReports = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useReportIds = (reports) => {
  return useMemo(
    () => {
      return reports.map((report) => report.id);
    },
    [reports]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      await reportsApi.deleteReport(id);
      getReport();
    }
    catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  const getReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const reports = await reportsApi.getAllReports(searchValue);
      setReportData(reports);
    }
    catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }
  
  useEffect(() => {
    getReport();
  }, [searchValue]);
  {if (loading) 
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {<CircularProgress />}
    </div>
  }

  return (
    <>
      <Head>
        <title>
          Danh sách báo cáo
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
                  Danh sách báo cáo
              </Typography>
            </Stack>
            <ReportsSearch 
              onSearchChange={handleSearchChange}
            />
            <ReportsTable
              count={reportData.length}
              items={reportData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteReport={handleDelete}
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
