import {
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Skeleton from "@mui/material/Skeleton";
import { LoadingButton } from "@mui/lab";
import * as constants from "../../../../constants/constants";
import * as messages from "../../../../constants/messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format, parse } from "date-fns";
import { useState, useEffect } from "react";

const NewCriminalInfo = (props) => {
  const {
    formik,
    loadingSkeleton,
    isFieldDisabled
  } = props;

  return (
    <Card
      sx={{
        p: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <CardContent>
        <Grid container spacing={3}>
          {[
            {
              label: "Tình trạng",
              name: "status",
              md: 3,
              required: true,
              select: true,
              selectProps: constants.criminalStatus,
            },
            { label: "Mức độ nguy hiểm", name: "dangerousLevel", md: 6 },
            {
              label: "Ngày được thả",
              name: "releaseDate",
              md: 3,
              datePicker: true,
            },
            { label: "Thông tin xuất, nhập cảnh", name: "entryAndExitInformation", md: 6 },
            { label: "Phương tiện di chuyển", name: "vehicles", md: 6 },
            { label: "Tài khoản ngân hàng", name: "bankAccount", md: 6 },
            { label: "Tài khoản game", name: "gameAccount", md: 6 },
            { label: "Facebook", name: "facebook", md: 6 },
            { label: "Zalo", name: "zalo", md: 6 },
            { label: "Mạng xã hội khác", name: "otherSocialNetworks", md: 6 },
            { label: "Model điện thoại", name: "phoneModel", md: 6, required: true },
            { label: "Nghiên cứu", name: "research", md: 6 },
            { label: "Bố trí tiếp cận", name: "approachArrange", md: 6 },
            { label: "Thông tin khác", name: "otherInformation", md: 12 },
          ].map((field) => (
            <Grid key={field.name} xs={12} md={field.md || 12}>
              {loadingSkeleton || formik.values === null || formik.values.status === undefined ? (
                <Skeleton variant="rounded">
                  <TextField fullWidth />
                </Skeleton>
              ) : field.datePicker ? (
                <DatePicker
                  error={!!(formik.touched[field.name] && formik.errors[field.name])}
                  fullWidth
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={(date) => {
                    formik.setFieldValue(field.name, date);
                  }}
                  type={field.name}
                  value={formik.values[field.name] || null}
                  disabled={isFieldDisabled || field.disabled}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      required={field.required || false}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  )}
                  maxDate={field.name === "releaseDate" ? null : new Date()} // Assuming current date is the maximum allowed
                />
              ) : (
                <TextField
                  error={!!(formik.touched[field.name] && formik.errors[field.name])}
                  fullWidth
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  type={field.name}
                  value={formik.values[field.name]}
                  multiline={field.textArea || false}
                  disabled={isFieldDisabled || field.disabled}
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
      {/* <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {isClicked ? (
            loadingButtonDetails && (
              <LoadingButton
                disabled
                loading={loadingButtonDetails}
                size="medium"
                variant="contained"
              >
                Chỉnh sửa thông tin
              </LoadingButton>
            )
          ) : (
            <>
              <Button
                variant="contained"
                onClick={isFieldDisabled ? handleEditInfo : formik.handleSubmit}
                disabled={loadingButtonPicture}
              >
                {isFieldDisabled ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
              </Button>
              {!isFieldDisabled && (
                <Button variant="outlined" onClick={handleCancelInfo}>
                  Hủy
                </Button>
              )}
            </>
          )}
        </CardActions> */}
    </Card>
  );
};

export default NewCriminalInfo;
