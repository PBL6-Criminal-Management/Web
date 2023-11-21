import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CriminalsTable } from 'src/sections/criminals/criminals-table';
import { CriminalsSearch } from 'src/sections/criminals/criminals-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    birthYear: 1991,
    area: 'Thanh Khê',
    status: 'Đang ngồi tù',
    latestCrimeDate: subDays(subHours(now, 7), 1).getTime(),
    crime: 'Cướp tài sản',
  },
];

const useCriminals = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCriminalIds = (criminals) => {
  return useMemo(
    () => {
      return criminals.map((criminal) => criminal.id);
    },
    [criminals]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const criminals = useCriminals(page, rowsPerPage);
  const criminalsIds = useCriminalIds(criminals);

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
            <CriminalsSearch />
            <CriminalsTable
              count={data.length}
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
