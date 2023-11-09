import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const gender = [
  {
    value: '0',
    label: 'Nam'
  },
  {
    value: '1',
    label: 'Nữ'
  },
  {
    value: '2',
    label: 'Khác'
  }
];

export const AccountProfileDetails = ({ account }) => {
  const accountData = account;
  const [values, setValues] = useState(accountData);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  name="birthday"
                  onChange={handleChange}
                  required
                  value={values.birthday}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Giới tính"
                  name="gender"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  defaultValue={values.state}
                >
                  {gender.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="CMND/CCCD"
                  name="identityCard"
                  onChange={handleChange}
                  required
                  value={values.identityCard}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Tên tài khoản"
                  name="accountName"
                  onChange={handleChange}
                  value={values.accountName}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Chỉnh sửa thông tin
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
