import React, { useState, useEffect } from "react";
import * as reportsApi from "../../api/reports";
import Header from "src/sections/wanted-criminals/wanted-criminal-header";
import { Unstable_Grid2 as Grid, Divider, Typography, Stack, Button, Collapse, Alert, IconButton } from "@mui/material";
import { useRouter } from 'next/router';
import { Scrollbar } from 'src/components/scrollbar';
import { styled } from '@mui/material/styles';
import { useAuth } from "src/hooks/use-auth";
import { useFormik } from "formik";
import NextLink from "next/link";
import * as Yup from "yup";
import * as messages from "../../constants/messages";
import { NewReportDetails } from "src/sections/wanted-criminals/new-report/new-report-details";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const NewReportPage = () => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loadingButtonDetails, setLoadingButtonDetails] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const auth = useAuth();
  const router = useRouter();
  const ScrollableContainer = styled(Scrollbar)({
    overflowY: 'auto',
    maxHeight: '100vh',
    // zIndex: 9999,
  });

  const formik = useFormik({
    initialValues: {
      reporterName: '',
      reporterEmail: '',
      reporterPhone: '',
      reporterAddress: '',
      content: '',
      status: 0,
      note: '',
      reportingImages: [],
    },
    validationSchema: Yup.object({
      reporterName: Yup.string()
        .max(100, messages.LIMIT_NAME)
        .required(messages.REQUIRED_REPORTER_NAME)
        .matches(/^[ '\p{L}]+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
      reporterPhone: Yup.string()
        .matches(/^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/, messages.INVALID_PHONE_NUMBER)
        .max(15, messages.LIMIT_PHONENUMBER)
        .required(messages.REQUIRED_REPORTER_PHONE),
      reporterEmail: Yup.string()
        .email(messages.INVALID_EMAIL)
        .max(100, messages.LIMIT_EMAIL)
        .required(messages.REQUIRED_REPORTER_EMAIL),
      reporterAddress: Yup.string()
        .max(200, messages.LIMIT_ADDRESS)
        .required(messages.REQUIRED_REPORTER_ADDRESS)
        .matches(/^[0-9,. \p{L}]+$/u, messages.ADDRESS_VALID_CHARACTER),
      content: Yup.string()
        .max(65535, messages.LIMIT_CONTENT)
        .required(messages.REQUIRED_CONTENT),
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
      await reportsApi.addReport(formik.values);
      setSuccess("Gửi báo cáo thành công.");
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


  return (
    // <ScrollableContainer>
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Header />
        <Grid
          maxWidth={900}
          container
          sx={{
            alignItems: "center",
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            mt={3}
            mb={0}
          >
            <Typography
              sx={{
                color: "error.main",
                textAlign: "center"
              }}
              variant='h5'
              mb={1}
            >
              Báo cáo tội phạm
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            m={0}
            p={0}
            mb={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid xs={12} md={12} lg={12}>
              <NewReportDetails
                formik={formik}
                loadingSkeleton={loadingSkeleton}
                isFieldDisabled={isFieldDisabled}
              />
              <Stack
                direction="row"
                justifyContent="center"
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
                        Gửi báo cáo
                      </LoadingButton>
                      <Button
                        disabled={formik.isSubmitting || loadingButtonDetails || buttonDisabled}
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
                        disabled={formik.isSubmitting || buttonDisabled}
                        type="submit"
                        variant="contained"
                        color="error"
                      >
                        Gửi báo cáo
                      </Button>
                      <Button
                        disabled={formik.isSubmitting || loadingButtonDetails || buttonDisabled}
                        variant="outlined"
                        component={NextLink}
                        href="/wanted-criminals"
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
    // </ScrollableContainer>
  );
};

export default NewReportPage;
