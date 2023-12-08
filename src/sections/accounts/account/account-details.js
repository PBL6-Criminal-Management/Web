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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parse } from 'date-fns';
import * as constants from '../../../constants/constants';
import { LoadingButton } from '@mui/lab';

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

export const AccountDetails = (props) => {
  const { account: initialAccount, loadingSkeleton, loadingButtonDetails, loadingButtonPicture, onUpdate } = props;
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
    const updatedValue = name === 'gender' ? value === 'true' : name === 'role' ? parseInt(value, 10) : value;

    // Update the state
    dispatch({ type: 'UPDATE_ACCOUNT', payload: { [name]: updatedValue } });
  };


  const handleDateChange = (date) => {
    dispatch({ type: 'UPDATE_BIRTHDAY', payload: date });
  };

  const handleSubmit = () => {
    // Additional logic for form submission if needed.
    // For now, we're just updating the user.
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
        <CardContent>
          <Grid container spacing={3}>
            {[
              { label: 'Họ và tên', name: 'name' },
              { label: 'Ngày sinh', name: 'birthday', md: 4, datePicker: true },
              { label: 'Giới tính', name: 'gender', md: 4, select: true, selectProps: constants.gender },
              { label: 'CMND/CCCD', name: 'citizenId', md: 4 },
              { label: 'Số điện thoại', name: 'phoneNumber', md: 4 },
              { label: 'Email', name: 'email', md: 4 },
              { label: 'Tên tài khoản', name: 'username', md: 4, disabled: true },
              { label: 'Địa chỉ', name: 'address', md: 8 },
              { label: 'Vai trò', name: 'role', md: 4, select: true, selectProps: constants.role }
            ].map((field) => (
              <Grid key={field.name} xs={12} md={field.md || 12}>
                {loadingSkeleton ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  field.datePicker ? (
                    // <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
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
                    // </LocalizationProvider>
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
                      value={state.account[field.name]}
                      sx={{
                        "& .MuiInputBase-input": {
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }
                      }}
                    >
                      {field.select &&
                        Object.entries(field.selectProps).map(([value, label]) => (
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
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>

          {loadingSkeleton ? (
            <Skeleton
              height={40}
              width={170}
              variant='rounded'
            >
            </Skeleton>
          ) : (
            loadingButtonDetails ? (
              <LoadingButton
                disabled
                loading={loadingButtonDetails}
                size="medium"
                variant="contained">
                Chỉnh sửa thông tin
              </LoadingButton>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={state.isFieldDisabled ? handleClick : handleSubmit}
                  disabled={loadingButtonPicture}
                >
                  {state.isFieldDisabled ? 'Chỉnh sửa thông tin' : 'Cập nhật thông tin'}
                </Button>
                {!state.isFieldDisabled && (
                  <Button variant="outlined" onClick={handleCancel}>
                    Hủy
                  </Button>
                )}
              </>
            )
          )}
        </CardActions>
      </Card>
    </form>
  );
};
