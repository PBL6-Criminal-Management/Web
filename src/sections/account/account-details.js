import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Skeleton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const gender = [
  {
    value: false,
    label: 'Nam'
  },
  {
    value: true,
    label: 'Nữ'
  }
];

export const AccountDetails = ({ account, loading }) => {
  const [values, setValues] = useState({});
  const [buttonValue, setButtonValue] = useState('Chỉnh sửa thông tin');
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
  
  const handleClick = () => {
    if (buttonValue === 'Chỉnh sửa thông tin') {
      setButtonValue('Cập nhật thông tin');
      setIsTextFieldDisabled(false);
    } else {
      setButtonValue('Chỉnh sửa thông tin');
      setIsTextFieldDisabled(true);
    }
  }


  useEffect(() => {
    if (account) {
      setValues(account);
    }
  }, [account]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent sx={{ pt: 0, pb: 2 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Họ và tên"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Ngày sinh"
                    name="birthday"
                    onChange={handleChange}
                    required
                    value={values.birthday}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Giới tính"
                    name="gender"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    defaultValue={values.gender}
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
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="CMND/CCCD"
                    name="identityCard"
                    onChange={handleChange}
                    required
                    value={values.cmnd_cccd}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Số điện thoại"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={values.phoneNumber}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled
                    fullWidth
                    label="Tên tài khoản"
                    name="accountName"
                    onChange={handleChange}
                    value={values.accountName}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  <TextField
                    disabled={isTextFieldDisabled}
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        {loading ? (
            <Skeleton variant="rounded">
              <Button variant="outlined">
                Skeleton button
              </Button>
            </Skeleton>
          ) : (
            <Button variant="outlined">
              Đổi mật khẩu
            </Button>
          )}
          {loading ? (
            <Skeleton variant="rounded">
              <Button variant="contained">
                Skeleton button
              </Button>
            </Skeleton>
          ) : (
            <Button variant="contained" onClick={handleClick}>
              {buttonValue}
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};
