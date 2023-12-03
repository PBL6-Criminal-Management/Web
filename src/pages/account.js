import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Alert, Box, Collapse, Container, IconButton, Skeleton, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountPicture } from 'src/sections/account/account-picture';
import { AccountDetails } from 'src/sections/account/account-details';
import * as accountsApi from '../api/accounts';
import * as imagesApi from '../api/images';


const Page = () => {
  const [account, setAccount] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const getAccount = useCallback(async () => {
    setLoadingImage(true);
    setLoadingDetails(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setAccount(user);
      console.log(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingImage(false);
      setLoadingDetails(false);
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, []);

  const updateLocalStorage = (updatedAccount) => {
    try {
      // Merge the updated account with the existing user data
      const updatedUserData = {
        ...account,
        ...updatedAccount,
      };

      // Update the user data in local storage
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('Error updating local storage:', error);
      setError('Error updating local storage:', error);
    }
  };

  const updateDetails = useCallback(async (updatedDetails) => {
    try {
      const { imageLink, ...user } = account;
      const updatedUser = {
        id: window.sessionStorage.getItem('userId'),
        ...user,
        ...updatedDetails,
      };

      await accountsApi.editAccount(updatedUser);
      updateLocalStorage(updatedDetails);
      getAccount();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }, [account]);

  const updateAccountDetails = useCallback(
    async (updatedDetails) => {
      try {
        setAccount((prevAccount) => ({ ...prevAccount, ...updatedDetails }));
        setOpen(true);
        await updateDetails(updatedDetails);
        setSuccess("Cập nhật thông tin chi tiết thành công.");
      }
      catch (error) {
        setError(error.message);
        console.log(error);
      }
    }, [setAccount, updateDetails]);

  const uploadImage = useCallback(async (newImage) => {
    try {
      const response = await imagesApi.uploadImage(newImage);
      const { imageLink, ...user } = account;
      const updatedUser = {
        id: window.sessionStorage.getItem('userId'),
        ...user,
        image: response[0].filePath,
      };
      
      await accountsApi.editAccount(updatedUser);
      updateLocalStorage({ image: response[0].filePath, imageLink: response[0].fileUrl });
      getAccount();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }, [account]);

  const updateAccountPicture = useCallback(
    async (newImage) => {
      setAccount((prevAccount) => ({ ...prevAccount, image: newImage }));
      setOpen(true);
      await uploadImage(newImage);
      setSuccess("Cập nhật ảnh đại diện thành công.");
    },
    [setAccount, uploadImage]
  );

  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Thông tin cá nhân</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountPicture
                    imageLink={account.imageLink}
                    loading={loadingImage}
                    onUpdate={updateAccountPicture}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountDetails
                    account={account}
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
