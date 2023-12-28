import Head from 'next/head';
import NextLink from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Alert, Box, Breadcrumbs, Collapse, Container, IconButton, Skeleton, Stack, Typography, Unstable_Grid2 as Grid, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CriminalPicture } from 'src/sections/criminals/criminal/criminal-picture';
import { CriminalDetails } from 'src/sections/criminals/criminal/criminal-details/criminal-details';
import * as criminalsApi from '../../api/criminals';
import * as imagesApi from '../../api/images';
import { useRouter } from 'next/router';

const Page = () => {
  const [criminal, setCriminal] = useState({});
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loadingButtonPicture, setLoadingButtonPicture] = useState(false);
  const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const criminalId = decodeURIComponent(router.query.id);
  const criminalName = decodeURIComponent(router.query.name); // dung params de truyen id

  const getCriminal = useCallback(async () => {
    setLoadingSkeleton(true);
    setError(null);
    try {
      const criminal = await criminalsApi.getCriminalById(criminalId);
      setCriminal(criminal);
      console.log(criminal);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSkeleton(false);
    }
  }, []);

  useEffect(() => {
    getCriminal();
  }, []);

  const updateDetails = useCallback(async (updatedDetails) => {
    try {
      const updatedCriminal = {
        id: criminalId, // dung params de truyen id
        ...criminal,
        ...updatedDetails,
      };

      const {
        relatedCases,
        charge,
        isWantedCriminal,
        wantedCriminals,
        avatarLink,
        ...updated
      } = updatedCriminal;
      // console.log(updated);
      await criminalsApi.editCriminal(updated);
      // getCriminal();
      setSuccess("Cập nhật thông tin chi tiết tội phạm thành công.");
      setError(null);
    } catch (error) {
      setSuccess(null);
      setError(error.message);
      console.log(error);
    }
  }, [criminal]);

  const updateCriminalDetails = useCallback(
    async (updatedDetails) => {
      try {
        setLoadingButtonDetails(true);
        setCriminal((prevCriminal) => ({ ...prevCriminal, ...updatedDetails }));
        setOpen(true);
        await updateDetails(updatedDetails);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoadingButtonDetails(false);
      }
    }, [setCriminal, updateDetails]);

  const uploadImage = useCallback(async (newImage) => {
    try {
      const response = await imagesApi.uploadImage(newImage);
      const updatedCriminal = {
        id: criminalId,
        ...criminal,
        avatar: response[0].filePath,
      };

      const {
        relatedCases,
        charge,
        isWantedCriminal,
        wantedCriminals,
        avatarLink,
        ...updated
      } = updatedCriminal;
      // console.log(updated);
      await criminalsApi.editCriminal(updated);
      // getCriminal();
      setSuccess("Cập nhật ảnh đại diện tội phạm thành công.");
      setError(null);
    } catch (error) {
      setSuccess(null);
      setError(error.message);
      console.log(error);
    }
  }, [criminal]);

  const updateCriminalPicture = useCallback(
    async (newImage) => {
      try {
        setLoadingButtonPicture(true);
        setCriminal((prevCriminal) => ({ ...prevCriminal, avatar: newImage }));
        setOpen(true);
        await uploadImage(newImage);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoadingButtonPicture(false);
      }
    },
    [setCriminal, uploadImage]
  );

  return (
    <>
      <Head>
        <title>Tội phạm | {criminalName}</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          mb: 2
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={0}
            pb={1}
          >
            <div>
                <Breadcrumbs
                  sx={{
                    mb: 1.3
                  }}
                  separator="›"
                  aria-label="breadcrumb">
                  <Link
                    component={NextLink}
                    underline="none"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    href="/criminals"
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
                      Tội phạm
                    </Typography>
                  </Link>
                  <Typography
                    variant='h4'
                    sx={{
                      color: 'primary.main',
                    }}
                  >
                    {criminalName}
                  </Typography>
                </Breadcrumbs>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  <CriminalPicture
                    imageLink={criminal.avatarLink}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    loadingButtonPicture={loadingButtonPicture}
                    onUpdate={updateCriminalPicture}
                    success={success}
                  />
                </Grid>

                <Grid xs={12} md={12} lg={12}>
                  <CriminalDetails
                    criminal={criminal}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    loadingButtonPicture={loadingButtonPicture}
                    onUpdate={updateCriminalDetails}
                    success={success}
                  />
                </Grid>
              </Grid>
            </div>
            <div>
              {success &&
                <Collapse in={open}>
                  <Alert
                    variant='outlined'
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
                    <Typography
                      color="success"
                      variant="subtitle2"
                    >
                      {success}
                    </Typography>
                  </Alert>
                </Collapse>
              }
              {error &&
                <Collapse in={open}>
                  <Alert
                    variant='outlined'
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
                      borderRadius: '12px',
                    }}
                  >
                    <Typography
                      color="error"
                      variant="subtitle2"
                    >
                      {error}
                    </Typography>
                  </Alert>
                </Collapse>
              }
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
