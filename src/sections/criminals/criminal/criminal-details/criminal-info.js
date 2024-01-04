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

const CriminalInfo = (props) => {
  const { criminalInfo, loading, loadingButtonDetails, loadingButtonPicture, handleSubmit, canEdit } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    if (!loadingButtonDetails && hasSubmitted) {
      setIsClicked(false);
      setHasSubmitted(false);
    }
  }, [loadingButtonDetails, hasSubmitted]);

  const handleEditInfo = () => {
    setIsClicked(false);
    setIsFieldDisabled(false);
    setChangesMade(false);
  };

  const handleSubmitInfo = () => {
    setIsFieldDisabled(true);
    setIsClicked(true);
    setHasSubmitted(true);
    if (changesMade)
      handleSubmit({
        ...formik.values,
        releaseDate: format(formik.values.releaseDate, "dd/MM/yyyy"),
        dateOfMostRecentCrime: format(formik.values.dateOfMostRecentCrime, "dd/MM/yyyy"),
        status: Number(formik.values.status),
      });
  };

  const handleCancelInfo = () => {
    setIsClicked(false);
    setIsFieldDisabled(true);
    formik.setValues(criminalInfo);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: criminalInfo
      ? {
          ...criminalInfo,
          releaseDate: parse(criminalInfo.releaseDate, "dd/MM/yyyy", new Date()),
          dateOfMostRecentCrime: parse(
            criminalInfo.dateOfMostRecentCrime,
            "dd/MM/yyyy",
            new Date()
          ),
        }
      : null,
    validationSchema: Yup.object({
      phoneModel: Yup.string()
        .max(100, messages.LIMIT_PHONE_MODEL)
        .required(messages.REQUIRED_PHONE_MODEL)
        .matches(/^[\p{L}0-9 ]+$/u, messages.PHONE_MODE_VALID_CHARACTER),
      entryAndExitInformation: Yup.string()
        .max(500, messages.LIMIT_ENTRY_AND_EXIT_INFORMATION)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.ENTRY_AND_EXIT_INFORMATION_VALID_CHARACTER),
      facebook: Yup.string()
        .max(100, messages.LIMIT_FACEBOOK)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.FACEBOOK_VALID_CHARACTER),
      zalo: Yup.string()
        .max(100, messages.LIMIT_ZALO)
        .matches(/^[0-9]+$/u, messages.ZALO_VALID_CHARACTER),
      otherSocialNetworks: Yup.string().max(300, messages.LIMIT_OTHER_SOCIAL_NETWORKS),
      // .matches(/^[\p{L}0-9,.: -]+$/u, messages.)
      gameAccount: Yup.string().max(100, messages.LIMIT_GAME_ACCOUNT),
      // .matches(/^[\p{L}0-9,.: -]+$/u, messages.CAREER_AND_WORKPLACE_VALID_CHARACTER),
      bankAccount: Yup.string()
        .nullable()
        .max(30, messages.LIMIT_BANK_ACCOUNT)
        .matches(/^[\p{L}0-9 ]+$/u, messages.BANK_ACCOUNT_VALID_CHARACTER),
      // research: Yup.string()
      //   .max(300, messages.LIMIT_CAREER_AND_WORKPLACE)
      //   .required(messages.REQUIRED_CAREER_AND_WORKPLACE)
      //   .matches(/^[\p{L}0-9,.: -]+$/u, messages.CAREER_AND_WORKPLACE_VALID_CHARACTER),
      vehicles: Yup.string()
        .nullable()
        .max(100, messages.LIMIT_VEHICLES)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.VEHICLES_VALID_CHARACTER),
      dangerousLevel: Yup.string()
        .nullable()
        .max(200, messages.LIMIT_DANGEROUS_LEVEL)
        .matches(/^[\p{L}0-9,.: -]+$/u, messages.DANGEROUS_LEVEL_VALID_CHARACTER),
      otherInformation: Yup.string().nullable().max(500, messages.LIMIT_OTHER_INFORMATION),
      // .required(messages.REQUIRED_CAREER_AND_WORKPLACE)
      // .matches(/^[\p{L}0-9,.: -]+$/u, messages.CAREER_AND_WORKPLACE_VALID_CHARACTER),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitInfo();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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
                required: true,
                select: true,
                selectProps: constants.criminalStatus,
              },
              { label: "Mức độ nguy hiểm", name: "dangerousLevel", md: 3 },
              {
                label: "Ngày phạm tội gần nhất",
                name: "dateOfMostRecentCrime",
                md: 3,
                datePicker: true,
                required: true,
              },
              {
                label: "Ngày được thả",
                name: "releaseDate",
                md: 3,
                datePicker: true,
                required: true,
              },
              { label: "Tội danh gần nhất", name: "charge", multiline: true, md: 6 },
              { label: "Vụ án liên quan", name: "relatedCases", multiline: true, md: 6 },
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
                {loading || formik.values === null || formik.values.status === undefined ? (
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
                      setChangesMade(true);
                      formik.setFieldValue(field.name, date);
                    }}
                    type={field.name}
                    value={formik.values[field.name]}
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
                      setChangesMade(true);
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
        <Divider />
        {canEdit && (
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
          </CardActions>
        )}
        
      </Card>
    </form>
  );
};

export default CriminalInfo;
