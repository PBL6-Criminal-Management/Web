import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, CircularProgress } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountsTable } from 'src/sections/accounts/accounts-table';
import { AccountsSearch } from 'src/sections/accounts/accounts-search';
import { applyPagination } from 'src/utils/apply-pagination';
import * as accountsApi from '../../api/accounts'
import { filter } from 'lodash';

const useAccounts = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAccountIds = (accounts) => {
  return useMemo(
    () => {
      return accounts.map((account) => account.id);
    },
    [accounts]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [accountData, setAccountData] = useState([]);
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

  const getAccount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accounts = await accountsApi.getAllAccounts(searchValue, filter);
      setAccountData(accounts);
      setIsLoading(false);
    }
    catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      await accountsApi.deleteAccount(id);
      getAccount();
    }
    catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  
  useEffect(() => {
    getAccount();
  }, [searchValue, filter]);
  {if (loading) 
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {<CircularProgress />}
    </div>
  }

  return (
    <>
      <Head>
        <title>
          Danh sách tài khoản
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
                  Danh sách tài khoản
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
                  Thêm tài khoản
                </Button>
              </div>
            </Stack>
            <AccountsSearch 
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
            />
            <AccountsTable
              count={accountData.length}
              items={accountData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteAccount={handleDelete}
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
