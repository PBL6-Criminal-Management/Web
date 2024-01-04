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
import { NewCriminalDetails } from 'src/sections/criminals/new-criminal/new-criminal-details/new-criminal-details';
import { NewCriminalPicture } from 'src/sections/criminals/new-criminal/new-criminal-picture';
import { useState, useCallback } from 'react';
import { useAuth } from "src/hooks/use-auth";
import * as messages from "../../constants/messages";
import * as imagesApi from "../../api/images";
import * as criminalsApi from "../../api/criminals";
import { LoadingButton } from '@mui/lab';
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const NewCriminalPage = () => {
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

  const formik = useFormik({
    initialValues: {
      name: '',
      anotherName: '',
      avatar: '',
      avatarLink: '',
      citizenId: '',
      gender: true,
      birthday: new Date(),
      phoneNumber: '',
      phoneModel: '',
      careerAndWorkplace: '',
      characteristics: '',
      homeTown: '',
      ethnicity: '',
      religion: '',
      nationality: '',
      fatherName: '',
      fatherCitizenId: '',
      fatherBirthday: '',
      motherName: '',
      motherCitizenId: '',
      motherBirthday: '',
      permanentResidence: '',
      currentAccommodation: '',
      entryAndExitInformation: '',
      facebook: '',
      zalo: '',
      otherSocialNetworks: '',
      gameAccount: '',
      bankAccount: '',
      research: '',
      vehicles: '',
      dangerousLevel: '',
      approachArrange: '',
      releaseDate: '',
      status: 0,
      otherInformation: '',
      criminalImages: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, messages.LIMIT_NAME)
        .required(messages.REQUIRED_NAME)
        .matches(/^[ '\p{L}]+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
      anotherName: Yup.string()
        .max(100, messages.LIMIT_ANOTHER_NAME)
        .required(messages.REQUIRED_ANOTHER_NAME)
        .matches(/^[ '\p{L}]+$/u, messages.ANOTHER_NAME_CONTAINS_VALID_CHARACTER),
      citizenId: Yup.string()
        .max(12, messages.LIMIT_CITIZEN_ID)
        .required(messages.REQUIRED_CITIZEN_ID)
        .matches(/^[0-9]+$/u, messages.CITIZEN_ID_VALID_CHARACTER),
      phoneNumber: Yup.string()
        .matches(/^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/, messages.INVALID_PHONE_NUMBER)
        .max(15, messages.LIMIT_PHONENUMBER)
        .required(messages.REQUIRED_PHONENUMBER),
      careerAndWorkplace: Yup.string()
        .max(300, messages.LIMIT_CAREER_AND_WORKPLACE)
        .required(messages.REQUIRED_CAREER_AND_WORKPLACE)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.CAREER_AND_WORKPLACE_VALID_CHARACTER),
      characteristics: Yup.string()
        .max(500, messages.LIMIT_CHARACTERISTICS)
        .required(messages.REQUIRED_CHARACTERISTICS)
        .matches(/^[\p{L}, ]+$/u, messages.CHARACTERISTICS_VALID_CHARACTER),
      homeTown: Yup.string()
        .max(200, messages.LIMIT_HOME_TOWN)
        .required(messages.REQUIRED_HOME_TOWN)
        .matches(/^[\p{L}0-9,. ]+$/u, messages.HOME_TOWN_VALID_CHARACTER),
      ethnicity: Yup.string()
        .max(50, messages.LIMIT_ETHNICITY)
        .required(messages.REQUIRED_ETHNICITY)
        .matches(/^[\p{L} ]+$/u, messages.ETHNICITY_VALID_CHARACTER),
      religion: Yup.string()
        .max(50, messages.LIMIT_RELIGION)
        .matches(/^[\p{L} ]+$/u, messages.RELIGION_VALID_CHARACTER),
      nationality: Yup.string()
        .max(50, messages.LIMIT_NATIONALITY)
        .required(messages.REQUIRED_NATIONALITY)
        .matches(/^[\p{L} ]+$/u, messages.NATIONALITY_VALID_CHARACTER),
      fatherName: Yup.string()
        .max(100, messages.LIMIT_FATHER_NAME)
        .required(messages.REQUIRED_FATHER_NAME)
        .matches(/^[\p{L} ']+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
      fatherCitizenId: Yup.string()
        .max(12, messages.LIMIT_FATHER_CITIZEN_ID)
        .required(messages.REQUIRED_FATHER_CITIZEN_ID)
        .matches(/^[0-9]+$/u, messages.CITIZEN_ID_VALID_CHARACTER),
      motherName: Yup.string()
        .max(100, messages.LIMIT_MOTHER_NAME)
        .required(messages.REQUIRED_MOTHER_NAME)
        .matches(/^[\p{L} ']+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
      motherCitizenId: Yup.string()
        .max(12, messages.LIMIT_MOTHER_CITIZEN_ID)
        .required(messages.REQUIRED_MOTHER_CITIZEN_ID)
        .matches(/^[0-9]+$/u, messages.CITIZEN_ID_VALID_CHARACTER),
      permanentResidence: Yup.string()
        .max(200, messages.LIMIT_PERMANENT_RESIDENCE)
        .required(messages.REQUIRED_PERMANENT_RESIDENCE)
        .matches(/^[\p{L}0-9,. ]+$/u, messages.PERMANENT_RESIDENCE_VALID_CHARACTER),
      currentAccommodation: Yup.string()
        .max(200, messages.LIMIT_CURRENT_ACCOMMODATION)
        .required(messages.REQUIRED_CURRENT_ACCOMMODATION)
        .matches(/^[\p{L}0-9,. ]+$/u, messages.CURRENT_ACCOMMODATION_VALID_CHARACTER),
      phoneModel: Yup.string()
        .max(100, messages.LIMIT_PHONE_MODEL)
        .required(messages.REQUIRED_PHONE_MODEL)
        .matches(/^[\p{L}0-9 ]+$/u, messages.PHONE_MODE_VALID_CHARACTER),
      entryAndExitInformation: Yup.string()
        .max(500, messages.LIMIT_ENTRY_AND_EXIT_INFORMATION)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.ENTRY_AND_EXIT_INFORMATION_VALID_CHARACTER),
      facebook: Yup.string()
        .max(100, messages.LIMIT_FACEBOOK)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.FACEBOOK_VALID_CHARACTER),
      zalo: Yup.string()
        .max(100, messages.LIMIT_ZALO)
        .matches(/^[0-9]+$/u, messages.ZALO_VALID_CHARACTER),
      otherSocialNetworks: Yup.string().max(300, messages.LIMIT_OTHER_SOCIAL_NETWORKS),
      gameAccount: Yup.string().max(100, messages.LIMIT_GAME_ACCOUNT),
      bankAccount: Yup.string()
        .nullable()
        .max(30, messages.LIMIT_BANK_ACCOUNT)
        .matches(/^[\p{L}0-9 ]+$/u, messages.BANK_ACCOUNT_VALID_CHARACTER),
      vehicles: Yup.string()
        .nullable()
        .max(100, messages.LIMIT_VEHICLES)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.VEHICLES_VALID_CHARACTER),
      dangerousLevel: Yup.string()
        .nullable()
        .max(200, messages.LIMIT_DANGEROUS_LEVEL)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.DANGEROUS_LEVEL_VALID_CHARACTER),
      otherInformation: Yup.string().nullable().max(500, messages.LIMIT_OTHER_INFORMATION),
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
      let { avatarLink, ...newCrimininal } = formik.values;
      newCrimininal = {
        ...newCrimininal,
        birthday: newCrimininal.birthday && format(newCrimininal.birthday, "dd/MM/yyyy"),
        fatherBirthday: newCrimininal.fatherBirthday && format(newCrimininal.fatherBirthday, "dd/MM/yyyy"),
        motherBirthday: newCrimininal.motherBirthday && format(newCrimininal.motherBirthday, "dd/MM/yyyy"),
        gender: newCrimininal.gender === true || newCrimininal.gender === "true",
        releaseDate: newCrimininal.releaseDate && format(newCrimininal.releaseDate, "dd/MM/yyyy"),
        status: Number(newCrimininal.status),
      }
      // console.log(newCrimininal);
      await criminalsApi.addCriminal(newCrimininal, auth);
      setSuccess("Thêm tội phạm thành công.");
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
          avatar: response[0].filePath,
          avatarLink: response[0].fileUrl,
        });
        setSuccess("Thêm ảnh đại diện tội phạm thành công.");
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

  return (
    <>
      <Head>
        <title>Tội phạm | Thêm tội phạm </title>
      </Head>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
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
                      Tội phạm
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
                      variant="h4"
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      Thêm tội phạm
                    </Typography>
                  </Breadcrumbs>
                )}
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid xs={12} md={12} lg={12}>
                    <NewCriminalPicture
                      imageLink={formik.values.avatarLink}
                      loadingSkeleton={loadingSkeleton}
                      loadingButtonDetails={loadingButtonDetails}
                      loadingButtonPicture={loadingButtonPicture}
                      onUpdate={updateAccountPicture}
                      isFieldDisabled={isFieldDisabled}
                      buttonDisabled={buttonDisabled}
                    />
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    <NewCriminalDetails
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
                              Thêm tội phạm
                            </LoadingButton>
                            <Button
                              disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                              variant="outlined"
                              component={NextLink}
                              href="/criminals"
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
                              Thêm tội phạm
                            </Button>
                            <Button
                              disabled={formik.isSubmitting || loadingButtonPicture || loadingButtonDetails || buttonDisabled}
                              variant="outlined"
                              component={NextLink}
                              href="/criminals"
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
                            router.push("/criminals");
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
      </form>
    </>
  );
};

NewCriminalPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewCriminalPage;