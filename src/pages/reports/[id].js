import Head from "next/head";
import NextLink from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
 Alert,
 Box,
 Breadcrumbs,
 Collapse,
 Container,
 IconButton,
 Skeleton,
 Stack,
 Typography,
 Unstable_Grid2 as Grid,
 Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ReportDetails } from "src/sections/reports/report/report-details";
import * as reportsApi from "../../api/reports";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
 const [report, setReport] = useState({});
 const [loadingSkeleton, setLoadingSkeleton] = useState(false);
 const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
 const [success, setSuccess] = useState(null);
 const [error, setError] = useState(null);

 const router = useRouter();
 const reportId = decodeURIComponent(router.query.id); // dung params de truyen id
 const reportCode = decodeURIComponent(router.query.code);
 const [open, setOpen] = useState(true);

 const auth = useAuth();

 const getReport = useCallback(async () => {
  setLoadingSkeleton(true);
  setError(null);
  try {
   const report = await reportsApi.getReportById(reportId, auth);
   setReport(report);
   console.log(report);
  } catch (error) {
   setError(error.message);
  } finally {
   setLoadingSkeleton(false);
  }
 }, []);

 useEffect(() => {
  getReport();
 }, []);

 const updateDetails = useCallback(
  async (updatedDetails) => {
   try {
    const updatedReport = {
     id: reportId, // dung params de truyen id
     ...report,
     ...updatedDetails,
    };

    const { reporterName, reporterEmail, reporterPhone, reporterAddress, content, reportingImages, ...updated } = updatedReport;
    console.log(updated);
    await reportsApi.editReport(updated, auth);
    // getReport();
    setSuccess("Cập nhật thông tin chi tiết báo cáo thành công.");
    setError(null);
   } catch (error) {
    setError(error.message);
    setSuccess(null);
    console.log(error);
   }
  },
  [report]
 );

 const updateReportDetails = useCallback(
  async (updatedDetails) => {
   try {
    setLoadingButtonDetails(true);
    setReport((prevReport) => ({ ...prevReport, ...updatedDetails }));
    setOpen(true);
    await updateDetails(updatedDetails);
   } catch (error) {
    console.log(error);
   } finally {
    setLoadingButtonDetails(false);
   }
  },
  [setReport, updateDetails]
 );

 return (
  <>
   <Head>
    <title>Báo cáo | {reportCode}</title>
   </Head>
   <Box
    sx={{
     flexGrow: 1,
     mb: 2,
    }}
   >
    <Container maxWidth="lg">
     <Stack
      spacing={0}
      pb={1}
     >
      <div>
       {loadingSkeleton ? (
        <Skeleton variant="rounded">
         <Typography
          variant="h4"
          sx={{
           mb: 2.5,
          }}
         >
          Báo cáo
         </Typography>
        </Skeleton>
       ) : (
        <Breadcrumbs
         sx={{
          mb: 1.5,
         }}
         separator="›"
         aria-label="breadcrumb"
        >
         <Link
          component={NextLink}
          underline="none"
          sx={{
           display: "flex",
           alignItems: "center",
          }}
          href="/reports"
          color="text.primary"
         >
          <Typography
           variant='h4'
           sx={{
            marginLeft: '-8px',
            marginRight: '-8px',
            padding: '6px 8px',
            '&:hover': {
             transition: '0.2s all ease-in-out',
             backgroundColor: 'divider',
             padding: '6px 8px',
             borderRadius: '8px'
            }
           }}
          >
           Báo cáo
          </Typography>
         </Link>
         <Typography
          variant="h4"
          sx={{
           color: "primary.main",
          }}
         >
          {reportCode}
         </Typography>
        </Breadcrumbs>
       )}
      </div>
      <div>
       <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
         <ReportDetails 
          report={report}
          loadingSkeleton={loadingSkeleton}
          loadingButtonDetails={loadingButtonDetails}
          onUpdate={updateReportDetails}
         />
        </Grid>
       </Grid>
      </div>
      <div>
       {success && (
        <Collapse in={open}>
         <Alert
          variant="outlined"
          open={open}
          severity="success"
          action={
           <IconButton
            aria-label="close"
            color="success"
            size="small"
            onClick={() => {
             setOpen(false);
            }}
           >
            <CloseIcon fontSize="inherit" />
           </IconButton>
          }
          sx={{
           mt: 2,
           borderRadius: '12px',
          }}
         >
          <Typography color="success" variant="subtitle2">
           {success}
          </Typography>
         </Alert>
        </Collapse>
       )}
       {error && (
        <Collapse in={open}>
         <Alert
          variant="outlined"
          open={open}
          severity="error"
          action={
           <IconButton
            aria-label="close"
            color="error"
            size="small"
            onClick={() => {
             setOpen(false);
            }}
           >
            <CloseIcon fontSize="inherit" />
           </IconButton>
          }
          sx={{
           mt: 2,
           borderRadius: "12px",
          }}
         >
          <Typography color="error" variant="subtitle2">
           {error}
          </Typography>
         </Alert>
        </Collapse>
       )}
      </div>
     </Stack>
    </Container>
   </Box>
  </>
 );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
