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
import { CriminalsTable } from "src/sections/criminals/criminals-table";
import { CriminalsSearch } from "src/sections/criminals/criminals-search";
import * as criminalsApi from "../../api/criminals";
import { useAuth } from "src/hooks/use-auth";
import NextLink from 'next/link';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [criminals, setCriminals] = useState([]);
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

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      await criminalsApi.deleteCriminal(id, auth);
      getCriminals();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getCriminals = async () => {
    setLoading(true);
    setError(null);

    try {
      const criminals = await criminalsApi.getAllCriminals(searchValue, filter, auth);
      setCriminals(criminals);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchButtonClicked) {
      getCriminals();
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
        <title>Danh sách tội phạm</title>
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
              <Typography variant="h4">Danh sách tội phạm</Typography>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  component={NextLink}
                  href="/criminals/new-criminal"
                  variant="contained"
                >
                  Thêm tội phạm
                </Button>
              </div>
            </Stack>
            <CriminalsSearch
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onSearchButtonClick={handleSearchButtonClick}
            />
            <CriminalsTable
              count={criminals.length}
              items={criminals.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteCriminal={handleDelete}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
