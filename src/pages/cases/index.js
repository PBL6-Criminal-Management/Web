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
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CasesTable } from "src/sections/cases/cases-table";
import { CasesSearch } from "src/sections/cases/cases-search";
import axios from "axios";
import * as casesApi from "../../api/cases";
import { useAuth } from "src/hooks/use-auth";
import NextLink from 'next/link';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({});
  const [searchButtonClicked, setSearchButtonClicked] = useState(true);
  const auth = useAuth();
  const role = auth.isAuthenticated ? auth.user.role : null;
  const canAdd = role !== 2;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the number of rows per page changes
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  const handleSearchChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      await casesApi.deleteCase(id, auth);
      getCases();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getCases = async () => {
    setLoading(true);
    setError(null);

    try {
      const cases = await casesApi.getAllCases(searchValue, filter, auth);
      setCases(cases);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchButtonClicked) {
      getCases();
      setSearchButtonClicked(false); // Reset the search button state after fetching data
    }
  }, [searchButtonClicked]);
  {
    if (loading)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {<CircularProgress />}
        </div>
      );
  }

  return (
    <>
      <Head>
        <title>Danh sách vụ án</title>
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
              <Typography variant="h4">Danh sách vụ án</Typography>
              <div>
                {canAdd && (
                  <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  component={NextLink}
                  href="/cases/new-case"
                >
                  Thêm vụ án
                </Button>
                )}
              </div>
            </Stack>
            <CasesSearch
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onSearchButtonClick={handleSearchButtonClick}
            />
            <CasesTable
              count={cases.length}
              items={cases.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteCase={handleDelete}
              role={role}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
