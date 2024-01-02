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
import { CaseDetails } from "src/sections/cases/case/case-details";
import * as criminalsApi from "../../api/criminals";
import * as casesApi from "../../api/cases";
import * as accountsApi from "../../api/accounts";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const [casee, setCasee] = useState({});
  const [criminals, setCriminals] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loadingButtonPicture, setLoadingButtonPicture] = useState(false);
  const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const caseId = decodeURIComponent(router.query.id);
  const caseCode = decodeURIComponent(router.query.code);

  const auth = useAuth();

  const getCase = useCallback(async () => {
    setLoadingSkeleton(true);
    setError(null);
    try {
      const casee = await casesApi.getCaseById(caseId, auth);
      const criminals = await criminalsApi.getAllCriminals("", "", auth);
      const investigators = await accountsApi.getAllAccounts("", { role: 2 }, auth);
      setCasee(casee);
      setCriminals(criminals);
      setInvestigators(investigators);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSkeleton(false);
    }
  }, []);

  useEffect(() => {
    getCase();
  }, []);

  const updateDetails = useCallback(
    async (updatedDetails) => {
      try {
        const updatedCase = {
          id: caseId, // dung params de truyen id
          ...casee,
          ...updatedDetails,
        };
        console.log(updatedCase);
        await casesApi.editCase(updatedCase, auth);
        // getCase();
        setSuccess("Cập nhật thông tin chi tiết vụ án thành công.");
        setError(null);
      } catch (error) {
        setSuccess(null);
        setError(error.message);
        console.log(error);
      }
    },
    [casee]
  );

  const updateCaseDetails = useCallback(
    async (updatedDetails) => {
      try {
        console.log("submitdata", updatedDetails);
        setLoadingButtonDetails(true);
        setCasee((prevCasee) => ({ ...prevCasee, ...updatedDetails }));
        setOpen(true);
        await updateDetails(updatedDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingButtonDetails(false);
      }
    },
    [setCasee, updateDetails]
  );

  return (
    <>
      <Head>
        <title>Vụ án | {casee?.code}</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={0}>
            <div>
              {loadingSkeleton ? (
                <Skeleton variant="rounded">
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2.5,
                    }}
                  >
                    Vụ án
                  </Typography>
                </Skeleton>
              ) : (
                <Breadcrumbs
                  sx={{
                    mb: 2.5,
                  }}
                  separator="›"
                  aria-label="breadcrumb"
                >
                  <Link
                    component={NextLink}
                    underline="hover"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    href="/cases"
                    color="text.primary"
                  >
                    <Typography variant="h4">Vụ án</Typography>
                  </Link>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    {casee?.code}
                  </Typography>
                </Breadcrumbs>
              )}
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  <CaseDetails
                    casee={casee}
                    criminals={criminals}
                    investigators={investigators}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    loadingButtonPicture={loadingButtonPicture}
                    onUpdate={updateCaseDetails}
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
                      mb: 2,
                      borderRadius: "12px",
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
                      mb: 2,
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
