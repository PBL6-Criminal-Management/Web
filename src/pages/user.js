import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserPicture } from "src/sections/user/user-picture";
import { UserDetails } from "src/sections/user/user-details";
import * as profileApi from "../api/profile";
import * as imagesApi from "../api/images";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const [user, setUser] = useState({});
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loadingButtonPicture, setLoadingButtonPicture] = useState(false);
  const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const auth = useAuth();

  const getUser = useCallback(async () => {
    setLoadingSkeleton(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSkeleton(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const updateLocalStorage = (updatedUser) => {
    try {
      // Merge the updated account with the existing user data
      const updatedUserData = {
        ...user,
        ...updatedUser,
      };

      // Update the user data in local storage
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Error updating local storage:", error);
      setError("Error updating local storage:", error);
    }
  };

  const updateDetails = useCallback(
    async (updatedDetails) => {
      try {
        setSuccess(null);
        setError(null);
        const { imageLink, ...userWithoutImageLink } = user;
        const updatedUser = {
          // id: window.sessionStorage.getItem("userId"),
          ...userWithoutImageLink,
          ...updatedDetails,
        };

        await profileApi.editProfile(updatedUser, auth);
        updateLocalStorage(updatedDetails);
        getUser();
        setSuccess("Cập nhật thông tin cá nhân thành công.");
        setError(null);
      } catch (error) {
        setError(error.message);
        setSuccess(null);
        console.log(error);
      }
    },
    [user]
  );

  const updateUserDetails = useCallback(
    async (updatedDetails) => {
      try {
        setLoadingButtonDetails(true);
        setUser((prevUser) => ({ ...prevUser, ...updatedDetails }));
        setOpen(true);
        await updateDetails(updatedDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingButtonDetails(false);
      }
    },
    [setUser, updateDetails]
  );

  const uploadImage = useCallback(
    async (newImage) => {
      try {
        setSuccess(null);
        setError(null);
        const response = await imagesApi.uploadImage(newImage);
        const { imageLink, ...userWithoutImageLink } = user;
        const updatedUser = {
          ...userWithoutImageLink,
          image: response[0].filePath,
        };

        await profileApi.editProfile(updatedUser, auth);
        updateLocalStorage({ image: response[0].filePath, imageLink: response[0].fileUrl });
        getUser();
        setSuccess("Cập nhật ảnh đại diện thành công.");
        setError(null);
      } catch (error) {
        setError(error.message);
        setSuccess(null);
        console.log(error);
      }
    },
    [user]
  );

  const updateUserPicture = useCallback(
    async (newImage) => {
      try {
        setLoadingButtonPicture(true);
        setUser((prevUser) => ({ ...prevUser, image: newImage }));
        setOpen(true);
        await uploadImage(newImage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingButtonPicture(false);
      }
    },
    [setUser, uploadImage]
  );

  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          mt: 0.5,
          mb: 1
        }}>
        <Container maxWidth="lg">
          <Stack
            spacing={2}
          >
            <div>
              <Typography variant="h4">Thông tin cá nhân</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <UserPicture
                    imageLink={user.imageLink}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    loadingButtonPicture={loadingButtonPicture}
                    onUpdate={updateUserPicture}
                    success={success}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <UserDetails
                    user={user}
                    loadingSkeleton={loadingSkeleton}
                    loadingButtonDetails={loadingButtonDetails}
                    loadingButtonPicture={loadingButtonPicture}
                    onUpdate={updateUserDetails}
                    success={success}
                  />
                </Grid>
              </Grid>
            </div>
            <div
              sx={{
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex: "1000",
                mb: 2,
                mr: 2,
              }}
            >
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
                      mb: 1.5,
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
                      mb: 1.5,
                      borderRadius: '12px',
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
