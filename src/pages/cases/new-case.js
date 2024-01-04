import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Head from "next/head";
import {
  Alert,
  Box,
  Collapse,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Breadcrumbs,
  Link,
  Button
} from "@mui/material";
import NextLink from "next/link";
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from "src/hooks/use-auth";
import * as criminalsApi from "../../api/criminals";
import * as casesApi from "../../api/cases";
import * as accountsApi from "../../api/accounts";
import CloseIcon from "@mui/icons-material/Close";
import { NewCaseDetails } from 'src/sections/cases/new-case/new-case-details';
import { format } from "date-fns";

const NewCasePage = () => {
  const [casee, setCasee] = useState({
    startDate: format(new Date(), "HH:mm dd/MM/yyyy"),
    endDate: '',
    typeOfViolation: 0,
    status: 0,
    charge: '',
    area: '',
    description: '',
    evidences: [],
    witnesses: [],
    caseImages: [],
    criminals: [],
    investigatorIds: [],
    victims: [],
    wantedCriminalRequest: []
  });
  const [criminals, setCriminals] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useAuth();

  const getData = useCallback(async () => {
    setLoadingSkeleton(true);
    setError(null);
    try {
      const criminals = await criminalsApi.getAllCriminals("", "", auth);
      const investigators = await accountsApi.getAllAccounts("", { role: 2 }, auth);
      setCriminals(criminals);
      setInvestigators(investigators);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSkeleton(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // const updateDetails = useCallback(
  //   async (updatedDetails) => {
  //     try {

  //       const updatedCase = { // dung params de truyen id
  //         ...casee,
  //         ...updatedDetails,
  //       };
  //       console.log("updatedCase", updatedCase);
  //       // await casesApi.editCase(updatedCase, auth);
  //       // getCase();
  //       // setSuccess("Cập nhật thông tin chi tiết vụ án thành công.");
  //       // setError(null);
  //     } catch (error) {
  //       setSuccess(null);
  //       setError(error.message);
  //       console.log(error);
  //     }
  //   },
  //   [casee]
  // );

  const updateCaseDetails = useCallback(
    async (updatedDetails) => {
      try {
        console.log("submitdata", updatedDetails);
        setLoadingButtonDetails(true);
        setCasee((prevCasee) => ({ ...prevCasee, ...updatedDetails }));
        setOpen(true);
        setIsSubmitting(false);
        // await updateDetails(updatedDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingButtonDetails(false);
      }
    },
    [casee]
  );

  useEffect(() => {
    console.log("isSubmitting", isSubmitting);
  }, [isSubmitting]) 

  const handleSubmit = () => {
    setIsSubmitting(true);
  }

  return (
    <>
      <Head>
        <title>Vụ án | Thêm vụ án</title>
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
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    href="/cases"
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
                      Vụ án
                    </Typography>
                  </Link>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    Thêm vụ án
                  </Typography>
                </Breadcrumbs>
              )}
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  <NewCaseDetails
                    casee={casee}
                    criminals={criminals}
                    investigators={investigators}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    onUpdate={updateCaseDetails}
                    isSubmitting={isSubmitting}
                  />
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mt: 2,
                    }}
                  >
                    {loadingSkeleton ? (
                      <>
                        <Skeleton height={40} width={120} variant="rounded"></Skeleton>
                        <Skeleton height={40} width={70} variant="rounded"></Skeleton>
                      </>
                    ) : (loadingButtonDetails ?
                      (
                        <>
                          <LoadingButton
                            disabled
                            loading={loadingButtonDetails}
                            size="medium"
                            variant="contained"
                          >
                            Thêm vụ án
                          </LoadingButton>
                          <Button
                            // disabled={loadingButtonDetails || buttonDisabled}
                            variant="outlined"
                            component={NextLink}
                            href="/cases"
                            sx={{
                              color: 'neutral.500',
                              borderColor: 'neutral.500',
                            }}
                          >
                            Huỷ
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleSubmit}
                            // disabled={formik.isSubmitting || loadingButtonPicture || buttonDisabled}
                            type="submit"
                            variant="contained"
                          >
                            Thêm vụ án
                          </Button>
                          <Button
                            // disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                            variant="outlined"
                            component={NextLink}
                            href="/cases"
                            sx={{
                              color: 'neutral.500',
                              borderColor: 'neutral.500',
                              '&:hover': {
                                borderColor: 'neutral.600',
                                backgroundColor: 'neutral.100',
                              }
                            }}
                          >
                            Huỷ
                          </Button>
                        </>
                      ))}
                  </Stack>
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
NewCasePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewCasePage;