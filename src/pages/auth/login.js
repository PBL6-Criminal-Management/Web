import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { LoadingButton } from '@mui/lab';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [open, setOpen] = useState(true);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required('Trường này là bắt buộc.'),
      password: Yup
        .string()
        .max(255)
        .required('Trường này là bắt buộc.')
    }),
    onSubmit: async (values, helpers) => {
      try {
        setOpen(true);
        await auth.signIn(values.username, values.password);
        router.push('/');
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Đăng nhập
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Đăng nhập
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Tên tài khoản"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="username"
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mật khẩu"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {/* {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )} */}
              {auth.loading ?
                <LoadingButton
                  disabled
                  loading={auth.loading}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  variant="contained">
                  Đăng nhập
                </LoadingButton>
                : <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Đăng nhập
                </Button>}
              {formik.errors.submit && (
                <Box sx={{ 
                  width: '100%',
                  mt: 3
                  }}>
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
                        {formik.errors.submit}
                      </Typography>
                    </Alert>
                  </Collapse>
                </Box>
              )}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
