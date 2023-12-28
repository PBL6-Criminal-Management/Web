import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { Alert, Box, Collapse, Container, IconButton, Skeleton, Stack, Typography, Unstable_Grid2 as Grid, Breadcrumbs, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountPicture } from 'src/sections/accounts/account/account-picture';
import { AccountDetails } from 'src/sections/accounts/account/account-details';
import * as accountsApi from '../../api/accounts';
import * as imagesApi from '../../api/images';
import { useRouter } from 'next/router';

const Page = () => {
    const [account, setAccount] = useState({});
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [loadingButtonPicture, setLoadingButtonPicture] = useState(false);
    const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(true);

    const router = useRouter();
    const accountId = decodeURIComponent(router.query.id);
    const accountName = decodeURIComponent(router.query.name);

    const getAccount = useCallback(async () => {
        setLoadingSkeleton(true);
        try {
            if (accountId !== undefined && accountId !== 0) {
                const account = await accountsApi.getAccountById(accountId);
                setAccount(account);
            }

            // const account = await accountsApi.getAccountById(accountId);
            // setAccount(account);

            else if (accountId === 0) {
                setAccount({
                    name: 'string',
                    birthday: '12/12/2002',
                    gender: false,
                    citizenId: '1234567890',
                    phoneNumber: '1234567890',
                    email: 'abc@gmail.com',
                    username: 'aaaaaaaaaaaa',
                    address: 'aaaaaaaaaaaaaaaaa',
                    role: 0
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingSkeleton(false);
        }
    }, []);

    useEffect(() => {
        getAccount();
    }, []);

    const updateDetails = useCallback(async (updatedDetails) => {
        try {
            const { imageLink, ...accountWithoutImageLink } = account;
            const updatedAccount = {
                id: accountId,
                ...accountWithoutImageLink,
                ...updatedDetails,
            };

            // console.log(updatedAccount);
            await accountsApi.editAccount(updatedAccount);
            // getAccount();
            setSuccess("Cập nhật thông tin tài khoản thành công.");
            setError(null);
        } catch (error) {            
            setSuccess(null);
            setError(error.message);
            console.log(error);
        }
    }, [account]);

    const updateAccountDetails = useCallback(
        async (updatedDetails) => {
            try {
                setLoadingButtonDetails(true);
                setAccount((prevAccount) => ({ ...prevAccount, ...updatedDetails }));
                setOpen(true);
                await updateDetails(updatedDetails);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoadingButtonDetails(false);
            }
        }, [setAccount, updateDetails]);

    const uploadImage = useCallback(async (newImage) => {
        try {
            const response = await imagesApi.uploadImage(newImage);
            const { imageLink, ...accountWithoutImageLink } = account;
            const updatedAccount = {
                id: accountId,
                ...accountWithoutImageLink,
                image: response[0].filePath,
            };

            await accountsApi.editAccount(updatedAccount);
            // getAccount();
            setSuccess("Cập nhật ảnh đại diện thành công.");
            setError(null);
        } catch (error) {            
            setSuccess(null);
            setError(error.message);
            console.log(error);
        }
    }, [account]);

    const updateAccountPicture = useCallback(
        async (newImage) => {
            try {
                setLoadingButtonPicture(true);
                setAccount((prevAccount) => ({ ...prevAccount, image: newImage }));
                setOpen(true);
                await uploadImage(newImage);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoadingButtonPicture(false);
            }
        }, [setAccount, uploadImage]
    );

    return (
        <>
            <Head>
                <title>Tài khoản | {accountName}</title>
            </Head>
            <Box
                sx={{
                    flexGrow: 1,
                    mb: 2
                }}
            >
                <Container
                    maxWidth="lg"
                >
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
                                    href="/accounts"
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
                                        Tài khoản
                                    </Typography>
                                </Link>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: 'primary.main',
                                    }}
                                >
                                    {accountName}
                                </Typography>
                            </Breadcrumbs>
                        </div>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={6} lg={4}>
                                    <AccountPicture
                                        imageLink={account.imageLink}
                                        loadingSkeleton={loadingSkeleton}
                                        loadingButtonDetails={loadingButtonDetails}
                                        loadingButtonPicture={loadingButtonPicture}
                                        onUpdate={updateAccountPicture}
                                        success={success}
                                    />
                                </Grid>
                                <Grid xs={12} md={6} lg={8}>
                                    <AccountDetails
                                        account={account}
                                        loadingSkeleton={loadingSkeleton}
                                        loadingButtonDetails={loadingButtonDetails}
                                        loadingButtonPicture={loadingButtonPicture}
                                        onUpdate={updateAccountDetails}
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
