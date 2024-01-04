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
import * as constants from "../../../../constants/constants";

const NewCriminalGeneral = (props) => {
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
            { label: "Họ và tên", name: "name", md: 3, required: true },
            { label: "Tên khác", name: "anotherName", md: 3 },
            { label: "Ngày sinh", name: "birthday", md: 2, datePicker: true, required: true },
            {
              label: "Giới tính",
              name: "gender",
              md: 1.5,
              select: true,
              required: true,
              selectProps: constants.gender,
            },
            { label: "CMND/CCCD", name: "citizenId", md: 2.5, required: true },
            { label: "Số điện thoại", name: "phoneNumber", md: 2, required: true },
            { label: "Quê quán", name: "homeTown", md: 7, required: true },
            { label: "Quốc tịch", name: "nationality", md: 3, required: true },
            { label: "Dân tộc", name: "ethnicity", md: 3, required: true },
            { label: "Tôn giáo", name: "religion", md: 3 },
            {
              label: "Nghề nghiệp, nơi làm việc",
              name: "careerAndWorkplace",
              md: 6,
              required: true,
            },
            { label: "Nơi ĐKTT", name: "permanentResidence", md: 6, required: true },
            { label: "Nơi ở hiện tại", name: "currentAccommodation", md: 6, required: true },
            { label: "Họ và tên cha", name: "fatherName", md: 6, required: true },
            { label: "Ngày sinh cha", name: "fatherBirthday", md: 3, datePicker: true },
            { label: "CMND/CCCD cha", name: "fatherCitizenId", md: 3, required: true },
            { label: "Họ và tên mẹ", name: "motherName", md: 6, required: true },
            { label: "Ngày sinh mẹ", name: "motherBirthday", md: 3, datePicker: true },
            { label: "CMND/CCCD mẹ", name: "motherCitizenId", md: 3, required: true },
            {
              label: "Đặc điểm nhận dạng",
              name: "characteristics",
              textArea: true,
              required: true,
            },
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
                  maxDate={new Date()} // Assuming current date is the maximum allowed
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
  );
};

export default NewCriminalGeneral;
