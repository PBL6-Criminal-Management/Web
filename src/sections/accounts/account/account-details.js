import React, { useReducer, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Skeleton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parse } from "date-fns";
import * as constants from "../../../constants/constants";
import * as messages from "../../../constants/messages";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialState = {
  isFieldDisabled: true,
  changesMade: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ENABLE_EDIT":
      return {
        ...state,
        isFieldDisabled: false,
        changesMade: false,
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        isFieldDisabled: true,
        changesMade: false,
      };

    case "UPDATE_ACCOUNT":
      return {
        ...state,
        changesMade: true,
      };
    case "SUBMIT_FORM":
      return { ...state, isFieldDisabled: true, changesMade: false };

    default:
      return state;
  }
};

export const AccountDetails = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [originalAccount, setOriginalAccount] = useState({});

  const {
    account: initialAccount,
    loadingSkeleton,
    loadingButtonDetails,
    loadingButtonPicture,
    onUpdate,
  } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialAccount
      ? {
        ...initialAccount,
        birthday: parse(initialAccount.birthday, "dd/MM/yyyy", new Date()),
      }
      : null,
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

  const handleToggleActivation = () => {
    dispatch({ type: "UPDATE_ACCOUNT" });
    formik.setValues({
      ...formik.values,
      isActive: !formik.values.isActive,
      changesMade: true,
    });
    formik.handleSubmit();
  };

  const handleChange = (e) => {
    dispatch({ type: "UPDATE_ACCOUNT" });
    formik.handleChange(e);
  };

  const handleSubmit = () => {
    dispatch({ type: "SUBMIT_FORM" });
    if (state.changesMade) {
      onUpdate({
        ...formik.values,
        birthday: format(formik.values.birthday, "dd/MM/yyyy"),
        gender: formik.values.gender === "true",
        role: parseInt(formik.values.role, 10),
        isActive: formik.values.isActive,
      });
    }
    dispatch({ type: 'SUBMIT_FORM' });
  };

  const handleClick = () => {
    dispatch({ type: "ENABLE_EDIT" });
    setOriginalAccount(formik.values);
  };

  const handleCancel = () => {
    dispatch({ type: "CANCEL_EDIT" });
    formik.setValues(originalAccount);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {[
              { label: "Họ và tên", name: "name", required: true },
              { label: "Ngày sinh", name: "birthday", md: 4, datePicker: true },
              {
                label: "Giới tính",
                name: "gender",
                md: 4,
                select: true,
                selectProps: constants.gender,
              },
              { label: "CMND/CCCD", name: "citizenId", md: 4, required: true },
              { label: "Số điện thoại", name: "phoneNumber", md: 4, required: true },
              { label: "Email", name: "email", md: 4, required: true },
              { label: "Tên tài khoản", name: "username", md: 4, disabled: true },
              { label: "Địa chỉ", name: "address", md: 4, required: true },
              { label: "Vai trò", name: "role", md: 4, select: true, selectProps: constants.role },
              { label: "Trạng thái kích hoạt tài khoản", name: "isActive", md: 4, selectProps: constants.isActive, disabled: true }
            ].map((field) => (
              <Grid key={field.name} xs={12} md={field.md || 12}>
                {loadingSkeleton || formik.values === null || formik.values.name === undefined ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : field.datePicker ? (
                  <DatePicker
                    error={!!(formik.touched[field.name] && formik.errors[field.name])}
                    fullWidth
                    helperText={formik.touched[field.name] && formik.errors[field.name]}
                    disabled={state.isFieldDisabled || field.disabled}
                    label={field.label}
                    name={field.name}
                    onBlur={formik.handleBlur}
                    onChange={(date) => {
                      dispatch({ type: "UPDATE_USER" });
                      formik.setFieldValue("birthday", date);
                    }}
                    type={field.name}
                    value={formik.values[field.name]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required={field.required || false}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    )}
                    maxDate={new Date()} // Assuming current date is the maximum allowed
                  />
                ) : (
                  <TextField
                    error={!!(formik.touched[field.name] && formik.errors[field.name])}
                    fullWidth
                    helperText={formik.touched[field.name] && formik.errors[field.name]}
                    disabled={state.isFieldDisabled || field.disabled}
                    label={field.label}
                    name={field.name}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    type={field.name}
                    value={!field.select && field.selectProps ? field.selectProps[formik.values[field.name]] : formik.values[field.name]}
                    required={field.required || false}
                    select={field.select}
                    SelectProps={field.select ? { native: true } : undefined}
                    sx={{
                      "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  >
                    {field.select &&
                      Object.entries(field.selectProps).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {loadingSkeleton ? (
            <>
              <Skeleton height={40} width={170} variant="rounded"></Skeleton>
              <Skeleton height={40} width={170} variant="rounded"></Skeleton>
              <Skeleton height={40} width={170} variant="rounded"></Skeleton>
            </>
          ) : loadingButtonDetails ? (
            <>
              <Button
                variant="outlined"
                color={formik.values.isActive ? 'error' : 'success'}
                onClick={handleToggleActivation}
                disabled={loadingButtonPicture}
              >
                {formik.values.isActive ? "Khoá tài khoản" : "Mở khoá tài khoản"}
              </Button>
              <Button
                variant="contained"
                color='error'
                onClick={() => { }}
                disabled={loadingButtonPicture}
              >
                Đặt lại mật khẩu
              </Button>
              <LoadingButton
                disabled
                loading={loadingButtonDetails}
                size="medium"
                variant="contained"
              >
                Chỉnh sửa thông tin
              </LoadingButton>
            </>

          ) : (
            <>
              <Button
                variant="outlined"
                color={formik.values.isActive ? 'error' : 'success'}
                onClick={handleToggleActivation}
                disabled={loadingButtonPicture}
              >
                {formik.values.isActive ? "Khoá tài khoản" : "Mở khoá tài khoản"}
              </Button>
              <Button
                variant="contained"
                color='error'
                onClick={() => { }}
                disabled={loadingButtonPicture}
              >
                Đặt lại mật khẩu
              </Button>
              <Button
                variant="contained"
                onClick={state.isFieldDisabled ? handleClick : formik.handleSubmit}
                disabled={loadingButtonPicture}
              >
                {state.isFieldDisabled ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
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
