import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewSituationDevelopments } from "src/sections/overview/overview-situation-developments";
import { OverviewCriminalStructure } from "src/sections/overview/overview-criminal-structure";
import { OverviewSocialOrderSituation } from "src/sections/overview/overview-social-order-situation";

const Page = () => {
  const now = new Date();

  return (
    <>
      <Head>
        <title>Tổng quan</title>
      </Head>
      <Box component="main">
        <Container maxWidth="xl">
          <Typography variant="h4" p={"20px"}>
            Tổng quan
          </Typography>
          <Grid container spacing={3} sx={{ display: "flex", alignItems: "center" }}>
            <Grid xs={12} lg={8}>
              <OverviewSituationDevelopments sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewCriminalStructure />
            </Grid>
            <Grid xs={12} md={12} lg={12} sx={{ width: "100%" }}>
              <OverviewSocialOrderSituation
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
