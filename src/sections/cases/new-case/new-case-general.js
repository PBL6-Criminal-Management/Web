import { Unstable_Grid2 as Grid, TextField, Card, CardContent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Skeleton from "@mui/material/Skeleton";
import * as constants from "../../../constants/constants";
import * as messages from "../../../constants/messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format, parse } from "date-fns";
import { useEffect } from "react";

const CaseGeneral = (props) => {
  const { generalInfo, loading, handleSubmit, isSubmitting, isFieldDisabled } = props;

  const handleSubmitGeneral = (isValid) => {
    handleSubmit(
      {
        ...formik.values,
        status: parseInt(formik.values.status, 10),
        typeOfViolation: parseInt(formik.values.typeOfViolation, 10),
        startDate: generalInfo.startDate && format(formik.values.startDate, "HH:mm dd/MM/yyyy"),
        endDate: generalInfo.endDate && format(formik.values.endDate, "HH:mm dd/MM/yyyy"),
      },
      isValid
    );
  };

  useEffect(() => {
    if (isSubmitting) formik.handleSubmit();
  }, [isSubmitting]);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: generalInfo
      ? {
          ...generalInfo,
          startDate:
            generalInfo.startDate && parse(generalInfo.startDate, "HH:mm dd/MM/yyyy", new Date()),
          endDate:
            generalInfo.endDate && parse(generalInfo.endDate, "HH:mm dd/MM/yyyy", new Date()),
        }
      : null,
    validationSchema: Yup.object({
      charge: Yup.string()
        .max(100, messages.LIMIT_CHARGE)
        .required(messages.REQUIRED_CHARGE)
        .matches(/^[\p{L} ]+$/u, messages.CHARGE_VALID_CHARACTER),
      area: Yup.string()
        .max(200, messages.LIMIT_CRIME_SCENE)
        .required(messages.REQUIRED_CRIME_SCENE)
        .matches(/^[\p{L}0-9,. ]+$/u, messages.CRIME_SCENE_VALID_CHARACTER),
      description: Yup.string().nullable(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitGeneral(formik.isValid);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      handleSubmitGeneral(formik.isValid);
    }
  }, [formik.isValid, isSubmitting]);

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
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
                select: true,
                required: true,
                selectProps: constants.caseStatus,
              },
              {
                label: "Loại vi phạm",
                name: "typeOfViolation",
                md: 3,
                select: true,
                required: true,
                selectProps: constants.typeOfViolation,
              },
              {
                label: "Thời gian bắt đầu",
                name: "startDate",
                md: 3,
                dateTimePicker: true,
                required: true,
              },
              { label: "Thời gian kết thúc", name: "endDate", md: 3, dateTimePicker: true },
              { label: "Tội danh chính", name: "charge", required: true, md: 9 },
              { label: "Khu vực xảy ra", name: "area", md: 3, required: true },
              { label: "Chi tiết vụ án", name: "description", textArea: true },
            ].map((field) => (
              <Grid key={field.name} xs={12} md={field.md || 12}>
                {loading || formik.values === null || formik.values.charge === undefined ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : field.dateTimePicker ? (
                  <DateTimePicker
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
                    disabled={isFieldDisabled || field.disabled || isFieldDisabled}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required={field.required || false}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    )}
                    maxDate={new Date()}
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
                    disabled={isFieldDisabled || field.disabled || isFieldDisabled}
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
                onClick={isFieldDisabled ? handleEditGeneral : formik.handleSubmit}
                disabled={loadingButtonPicture}
              >
                {isFieldDisabled ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
              </Button>
              {!isFieldDisabled && (
                <Button variant="outlined" onClick={handleCancelGeneral}>
                  Hủy
                </Button>
              )}
            </>
          )}
        </CardActions> */}
      </Card>
    </form>
  );
};

export default CaseGeneral;
