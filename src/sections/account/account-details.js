import React, { useEffect, useReducer } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import vi from 'date-fns/locale/vi';
import { format, parse } from 'date-fns';
import * as constants from '../../constants/constants';

const initialState = {
  account: {
    name: '',
    birthday: null,
    gender: false,
    citizenId: '',
    phoneNumber: '',
    email: '',
    username: '',
    address: '',
    role: ''
  },
  isFieldDisabled: true,
  originalAccount: {},
  changesMade: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ENABLE_EDIT':
      return {
        ...state,
        isFieldDisabled: false,
        originalAccount: { ...state.account }
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        account: { ...state.originalAccount },
        isFieldDisabled: true,
        changesMade: false
      };

    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: { ...state.account, ...action.payload },
        changesMade: true
      };

    case 'UPDATE_BIRTHDAY':
      return {
        ...state,
        account: { ...state.account, birthday: format(action.payload, 'dd/MM/yyyy') },
        changesMade: true
      };
    case 'SUBMIT_FORM':
      return { ...state, isFieldDisabled: true, changesMade: false };

    default:
      return state;
  }
};

export const AccountDetails = ({ account: initialAccount, loading, onUpdate }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialAccount) {
      dispatch({ type: 'CANCEL_EDIT' });
      dispatch({ type: 'UPDATE_ACCOUNT', payload: initialAccount });
    }
  }, [initialAccount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Convert the string value to a boolean if the field is 'gender'
    const updatedValue = name === 'gender' ? value === 'true' : value;
  
    // Update the state
    dispatch({ type: 'UPDATE_ACCOUNT', payload: { [name]: updatedValue } });
  };
  

  const handleDateChange = (date) => {
    dispatch({ type: 'UPDATE_BIRTHDAY', payload: date });
  };

  const handleSubmit = () => {
    // Additional logic for form submission if needed.
    // For now, we're just updating the account.
    dispatch({ type: 'SUBMIT_FORM' });
    if (state.changesMade) {
      onUpdate(state.account);
    }
  };

  const handleClick = () => {
    dispatch({ type: 'ENABLE_EDIT' });
  };

  const handleCancel = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}>
      <Card>
        <CardContent sx={{ pt: 0, pb: 2 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {[
                { label: 'Họ và tên', name: 'name' },
                { label: 'Ngày sinh', name: 'birthday', md: 4, datePicker: true },
                { label: 'Giới tính', name: 'gender', md: 4, select: true },
                { label: 'CMND/CCCD', name: 'citizenId', md: 4 },
                { label: 'Số điện thoại', name: 'phoneNumber', md: 4 },
                { label: 'Email', name: 'email', md: 4 },
                { label: 'Tên tài khoản', name: 'username', md: 4, disabled: true },
                { label: 'Địa chỉ', name: 'address', md: 8 },
                { label: 'Vai trò', name: 'role', md: 4, disabled: true}
              ].map((field) => (
                <Grid key={field.name} xs={12} md={field.md || 12}>
                  {loading ? (
                    <Skeleton variant="rounded">
                      <TextField fullWidth />
                    </Skeleton>
                  ) : (
                    field.datePicker ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                        <DatePicker
                          disabled={state.isFieldDisabled || field.disabled}
                          label={field.label}
                          value={state.account[field.name] ? parse(state.account.birthday, 'dd/MM/yyyy', new Date()) : null}
                          onChange={(date) => handleDateChange(date)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              required={!field.disabled}
                              onKeyDown={(e) => e.preventDefault()}
                            />
                          )}
                          maxDate={new Date()} // Assuming current date is the maximum allowed
                        />
                      </LocalizationProvider>
                    ) : (
                      <TextField
                        disabled={state.isFieldDisabled || field.disabled}
                        fullWidth
                        label={field.label}
                        name={field.name}
                        onChange={handleChange}
                        required={!field.disabled}
                        select={field.select}
                        SelectProps={field.select ? { native: true } : undefined}
                        value={field.name == 'role' ? constants.role[state.account[field.name]] : state.account[field.name]}
                        sx={{
                          "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }
                        }}
                      >
                        {field.select &&
                          Object.entries(constants.gender).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                      </TextField>
                    )
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {loading ? (
            <Skeleton variant="rounded">
              <Button variant="outlined">Skeleton button</Button>
            </Skeleton>
          ) : (
            <Button variant="outlined">Đổi mật khẩu</Button>
          )}
          {!loading && (
            <>
              <Button
                variant="contained"
                onClick={state.isFieldDisabled ? handleClick : handleSubmit}
              >
                {state.isFieldDisabled ? 'Chỉnh sửa thông tin' : 'Cập nhật thông tin'}
              </Button>
              {!state.isFieldDisabled && (
                <Button variant="outlined" onClick={handleCancel}>
                  Hủy
                </Button>
              )}
            </>
          )}
        </CardActions>
      </Card>
    </form>
  );
};
