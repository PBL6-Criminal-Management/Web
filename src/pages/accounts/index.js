import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountsTable } from "src/sections/accounts/accounts-table";
import { AccountsSearch } from "src/sections/accounts/accounts-search";
import { applyPagination } from "src/utils/apply-pagination";
import * as accountsApi from "../../api/accounts";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({});
  const [searchButtonClicked, setSearchButtonClicked] = useState(true);
  const auth = useAuth();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the number of rows per page changes
  };

  const handleSearchChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  const getAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const accounts = await accountsApi.getAllAccounts(searchValue, filter, auth);
      setAccountData(accounts);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      await accountsApi.deleteAccount(id, auth);
      getAccount();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchButtonClicked) {
      getAccount();
      setSearchButtonClicked(false); // Reset the search button state after fetching data
    }
  }, [searchButtonClicked]);

  return (
    <>
      <Head>
        <title>Danh sách tài khoản</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Danh sách tài khoản</Typography>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Thêm tài khoản
                </Button>
              </div>
            </Stack>
            <AccountsSearch
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onSearchButtonClick={handleSearchButtonClick}
            />
            <AccountsTable
              count={accountData.length}
              items={accountData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteAccount={handleDelete}
              isFetching={loading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
