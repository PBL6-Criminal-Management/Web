import Head from 'next/head';
import NextLink from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Alert, Box, Breadcrumbs, Collapse, Container, IconButton, Skeleton, Stack, Typography, Unstable_Grid2 as Grid, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CriminalPicture } from 'src/sections/criminals/criminal/criminal-picture';
import { CriminalDetails } from 'src/sections/criminals/criminal/criminal-details/criminal-details';
import * as criminalsApi from '../api/criminals';
import * as imagesApi from '../api/images';


const Page = () => {
  const [criminal, setCriminal] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const criminalId = 24; // dung params de truyen id

  const getCriminal = useCallback(async () => {
    setLoadingImage(true);
    setLoadingDetails(true);
    setError(null);

    try {
      const criminal = await criminalsApi.getCriminalById(criminalId)
      setCriminal(criminal);
      console.log(criminal);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingImage(false);
      setLoadingDetails(false);
    }
  }, []);

  useEffect(() => {
    getCriminal();
  }, []);

  const updateDetails = useCallback(async (updatedDetails) => {
    try {
      const { avatarLink, ...criminalWithoutAvatarLink } = criminal;
      const updatedCriminal = {
        id: criminalId, // dung params de truyen id
        ...criminalWithoutAvatarLink,
        ...updatedDetails,
      };
      console.log(updatedCriminal);
      await criminalsApi.editCriminal(updatedCriminal);
      getCriminal();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }, [criminal]);

  const updateAccountDetails = useCallback(
    async (updatedDetails) => {
      try {
        setCriminal((prevCriminal) => ({ ...prevCriminal, ...updatedDetails }));
        setOpen(true);
        await updateDetails(updatedDetails);
        setSuccess("Cập nhật thông tin chi tiết tội phạm thành công.");
      }
      catch (error) {
        setError(error.message);
        console.log(error);
      }
    }, [setCriminal, updateDetails]);

  const uploadImage = useCallback(async (newImage) => {
    try {
      const response = await imagesApi.uploadImage(newImage);
      const { avatarLink, ...criminalWithoutAvatarLink } = criminal;
      const updatedCriminal = {
        id: criminalId,
        ...criminalWithoutAvatarLink,
        avatar: response[0].filePath,
      };
      console.log(updatedCriminal);
      await criminalsApi.editCriminal(updatedCriminal);
      getCriminal();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }, [criminal]);

  const updateAccountPicture = useCallback(
    async (newImage) => {
      setCriminal((prevCriminal) => ({ ...prevCriminal, avatar: newImage }));
      setOpen(true);
      await uploadImage(newImage);
      setSuccess("Cập nhật ảnh đại diện tội phạm thành công.");
    },
    [setCriminal, uploadImage]
  );

  return (
    <>
      <Head>
        <title>Tội phạm | {criminal.name}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={0}>
            <div>
              {loadingDetails || loadingImage ? (
                <Skeleton variant="rounded">
                  <Typography variant='h4'>
                    Tội phạm
                  </Typography>
                </Skeleton>
              ) : (
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb">
                  <Link
                    component={NextLink}
                    underline="hover"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    href="/criminals"
                    color="text.primary"
                  >
                    <Typography variant='h4'>
                      Tội phạm
                    </Typography>
                  </Link>
                  <Typography
                    variant='h4'
                    sx={{
                      color: 'primary.main',
                    }}
                  >
                    {criminal.name}
                  </Typography>
                </Breadcrumbs>
              )}
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  <CriminalPicture
                    imageLink={criminal.avatarLink}
                    loading={loadingImage}
                    onUpdate={updateAccountPicture}
                  />
                </Grid>

                <Grid xs={12} md={12} lg={12}>
                  <CriminalDetails
                    criminal={criminal}
                    loading={loadingDetails}
                    onUpdate={updateAccountDetails}
                  />
                </Grid>
              </Grid>
            </div>
            <div
              sx={{
                position: 'fixed',
                bottom: '0',
                right: '0',
                zIndex: '1000',
                mb: 2,
                mr: 2,
              }}>
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
                      mb: 2,
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
                      mb: 2,
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
