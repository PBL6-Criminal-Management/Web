import Head from 'next/head';
import { Box, Container, Skeleton, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountPicture } from 'src/sections/account/account-picture';
import { AccountDetails } from 'src/sections/account/account-details';
import axios from '../api/axios';
import { useState, useEffect } from 'react';
import * as accountsApi from '../api/accounts'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN1cGVyYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJub3JlcGx5LmNyaW1pbmFsbWFuYWdlbWVudEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU3VwZXJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk2MzY1NDJ9.HxgFnOkLn-rgfAnvedgZWQyopIGmY3NQwu-wt4wyvlA';

const Page = () => {
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await accountsApi.getAccountById(1);
      setAccount(response.data.data);
      setIsLoading(false);
    }
    catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <Head>
        <title>
          Thông tin cá nhân
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              
              <Typography variant="h4">
                {loading ? <Skeleton /> : 'Thông tin cá nhân'}
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountPicture imageLink={account.imageLink} loading={loading}/>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountDetails account={account} loading={loading} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );

}


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
