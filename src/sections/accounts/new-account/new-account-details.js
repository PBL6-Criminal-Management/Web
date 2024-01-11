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
export const NewAccountDetails = (props) => {
  const {
    formik,
    loadingSkeleton,
    isFieldDisabled,
  } = props;

  return (
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
            { label: "Email", name: "email", md: 8, required: true },
            { label: "Địa chỉ", name: "address", md: 8, required: true },
            { label: "Vai trò", name: "role", md: 4, select: true, selectProps: constants.role },
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
                  disabled={isFieldDisabled || field.disabled}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={(date) => {
                    // dispatch({ type: "UPDATE_USER" });
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
                  disabled={isFieldDisabled || field.disabled}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
    </Card>
  );
};
