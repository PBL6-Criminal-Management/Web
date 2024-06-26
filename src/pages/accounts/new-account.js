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
import { useFormik } from "formik";
import * as Yup from "yup";
import { NewAccountDetails } from 'src/sections/accounts/new-account/new-account-details';
import { NewAccountPicture } from 'src/sections/accounts/new-account/new-account-picture';
import { useState, useCallback } from 'react';
import { useAuth } from "src/hooks/use-auth";
import * as messages from "../../constants/messages";
import * as imagesApi from "../../api/images";
import * as accountsApi from "../../api/accounts";
import { LoadingButton } from '@mui/lab';
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const NewAccountPage = () => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const [loadingButtonPicture, setLoadingButtonPicture] = useState(false);
    const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
    const [isFieldDisabled, setIsFieldDisabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(true);
    const auth = useAuth();
    const router = useRouter();
    const isAdmin = auth.isAuthenticated ? auth.user.role === 0 : false;
    if (!isAdmin) {
        router.push("/404");
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            citizenId: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthday: new Date(),
            role: 0,
            gender: true,
            image: '',
            imageLink: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(100, messages.LIMIT_NAME)
                .required(messages.REQUIRED_NAME)
                .matches(/^[ '\p{L}]+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
            citizenId: Yup.string()
                .max(12, messages.LIMIT_CITIZEN_ID)
                .required(messages.REQUIRED_CITIZEN_ID)
                .matches(/^[0-9]+$/, messages.CITIZEN_ID_VALID_CHARACTER),
            phoneNumber: Yup.string()
                .matches(/^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/, messages.INVALID_PHONE_NUMBER)
                .max(15, messages.LIMIT_PHONENUMBER)
                .required(messages.REQUIRED_PHONENUMBER),
            email: Yup.string()
                .email(messages.INVALID_EMAIL)
                .max(100, messages.LIMIT_EMAIL)
                .required(messages.REQUIRED_EMAIL),
            address: Yup.string()
                .max(200, messages.LIMIT_ADDRESS)
                .required(messages.REQUIRED_ADDRESS)
                .matches(/^[0-9,. \p{L}]+$/u, messages.ADDRESS_VALID_CHARACTER),
        }),
        onSubmit: async (values, helpers) => {
            try {
                handleSubmit();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleSubmit = async () => {
        try {
            setIsFieldDisabled(true);
            setLoadingButtonDetails(true);
            let { imageLink, ...newAccount } = formik.values;
            newAccount = {
                ...newAccount,
                birthday: format(newAccount.birthday, "dd/MM/yyyy"),
                gender: newAccount.gender === true || newAccount.gender === 'true',
                role: parseInt(newAccount.role, 10),
            }
            await accountsApi.addAccount(newAccount, auth);
            setSuccess("Thêm tài khoản thành công.");
            setError(null);
            setIsFieldDisabled(true);
            setButtonDisabled(true);
        } catch (error) {
            setIsFieldDisabled(false);
            setButtonDisabled(false);
            setSuccess(null);
            setError(error.message);
            console.log(error);
        } finally {
            setLoadingButtonDetails(false);
        }
    }

    const uploadImage = useCallback(
        async (newImage) => {
            try {
                const response = await imagesApi.uploadImage(newImage);
                formik.setValues({
                    ...formik.values,
                    image: response[0].filePath,
                    imageLink: response[0].fileUrl,
                });
                setSuccess("Thêm ảnh đại diện thành công.");
                setError(null);
            } catch (error) {
                setError(error.message);
                setSuccess(null);
                console.log(error);
            }
        },
        [formik.values]
    );

    const updateAccountPicture = useCallback(
        async (newImage) => {
            try {
                setLoadingButtonPicture(true);
                await uploadImage(newImage);
                setOpen(true);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingButtonPicture(false);
            }
        },
        [uploadImage]
    );

    return (isAdmin && (
        <>
            <Head>
                <title>Tài khoản | Thêm tài khoản</title>
            </Head>
            <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        flexGrow: 1,
                        mb: 2,
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
                                            Tài khoản
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
                                            href="/accounts"
                                            color="text.primary"
                                        >
                                            <Typography
                                                variant="h4"
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
                                            variant="h4"
                                            sx={{
                                                color: "primary.main",
                                            }}
                                        >
                                            Thêm tài khoản
                                        </Typography>
                                    </Breadcrumbs>
                                )}
                            </div>
                            <div>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={6} lg={4}>
                                        <NewAccountPicture
                                            imageLink={formik.values.imageLink}
                                            loadingSkeleton={loadingSkeleton}
                                            loadingButtonDetails={loadingButtonDetails}
                                            loadingButtonPicture={loadingButtonPicture}
                                            onUpdate={updateAccountPicture}
                                            isFieldDisabled={isFieldDisabled}
                                            buttonDisabled={buttonDisabled}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={6} lg={8}>
                                        <>
                                            <NewAccountDetails
                                                formik={formik}
                                                loadingSkeleton={loadingSkeleton}
                                                isFieldDisabled={isFieldDisabled}
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
                                                {formik.isSubmitting || loadingButtonDetails ?
                                                    (
                                                        <>
                                                            <LoadingButton
                                                                disabled
                                                                loading={formik.isSubmitting || loadingButtonDetails}
                                                                size="medium"
                                                                variant="contained"
                                                            >
                                                                Thêm tài khoản
                                                            </LoadingButton>
                                                            <Button
                                                                disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                                                                variant="outlined"
                                                                onClick={formik.handleReset}
                                                                color="error"
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button
                                                                disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                                                                variant="outlined"
                                                                component={NextLink}
                                                                href="/accounts"
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
                                                                disabled={formik.isSubmitting || loadingButtonPicture || buttonDisabled}
                                                                type="submit"
                                                                variant="contained"
                                                            >
                                                                Thêm tài khoản
                                                            </Button>
                                                            <Button
                                                                disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                                                                variant="outlined"
                                                                onClick={formik.handleReset}
                                                                color="error"
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button
                                                                disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                                                                variant="outlined"
                                                                component={NextLink}
                                                                href="/accounts"
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
                                                    )}
                                            </Stack>
                                        </>
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
                                                        router.push("/accounts");
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
                                                mt: 2,
                                                mb: 2,
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
            </form>
        </>
    ));
};

NewAccountPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewAccountPage;