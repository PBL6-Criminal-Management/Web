import {
  TextField,
  Unstable_Grid2 as Grid,
  Skeleton,
  SvgIcon,
  Stack,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button as ButtonMUI,
} from "@mui/material";
import * as constants from "../../../../constants/constants";
import * as messages from "../../../../constants/messages";
import { Collapse, Button } from "antd";
import { useState } from "react";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { format, parse } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

const CaseVictimItem = (props) => {
  const { victim, index, loading, handleSubmit, handleDeleteVictim } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const handleDeleteConfirm = () => {
    handleDeleteVictim(index);
    setOpenDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDeletePopup(true);
  };

  const handleSubmitVictim = () => {
    console.log("changemade", changesMade);
    console.log("submit", {
      ...formik.values,
      birthday: format(formik.values.birthday, "dd/MM/yyyy"),
      date: format(formik.values.date, "HH:mm dd/MM/yyyy"),
      gender: formik.values.gender === "true",
    });
    // e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    if (changesMade) {
      handleSubmit({
        ...formik.values,
        birthday: format(formik.values.birthday, "dd/MM/yyyy"),
        date: format(formik.values.date, "HH:mm dd/MM/yyyy"),
        gender: formik.values.gender === "true",
      });
    }
  };

  const handleCancelVictim = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    formik.setValues({
      ...victim,
      birthday: parse(victim.birthday, "dd/MM/yyyy", new Date()),
      date: parse(victim.date, "HH:mm dd/MM/yyyy", new Date()),
    });
    formik.setTouched({}, false);
    setChangesMade(false);
  };

  const handleEditVictim = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    setChangesMade(false);
  };

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: victim
      ? {
          ...victim,
          birthday: parse(victim.birthday, "dd/MM/yyyy", new Date()),
          date: parse(victim.date, "HH:mm dd/MM/yyyy", new Date()),
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
        .matches(/^[0-9]+$/u, messages.CITIZEN_ID_VALID_CHARACTER),
      phoneNumber: Yup.string()
        .matches(/^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/, messages.INVALID_PHONE_NUMBER)
        .max(15, messages.LIMIT_PHONENUMBER)
        .required(messages.REQUIRED_PHONENUMBER),
      address: Yup.string()
        .max(200, messages.LIMIT_ADDRESS)
        .required(messages.REQUIRED_ADDRESS)
        .matches(/^[0-9,. \p{L}]+$/u, messages.ADDRESS_VALID_CHARACTER),
      testimony: Yup.string()
        .max(65535, messages.LIMIT_TESTIMONY)
        .required(messages.REQUIRED_TESTIMONY),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitVictim();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const extraBtns = () => (
    <Stack direction="row" spacing={-0.5} justifyContent="flex-end" alignItems="center">
      {isFieldDisabled && (
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={
              <SvgIcon fontSize="small">
                <PencilSquareIcon />
              </SvgIcon>
            }
            shape="circle"
            onClick={handleEditVictim}
          />
        </Tooltip>
      )}

      {!isFieldDisabled && (
        <>
          <Tooltip title="Cập nhật">
            <Button
              type="text"
              icon={
                <SvgIcon fontSize="small">
                  <CheckCircleIcon />
                </SvgIcon>
              }
              shape="circle"
              onClick={formik.handleSubmit}
            />
          </Tooltip>
          <Tooltip title="Hủy">
            <Button
              type="text"
              icon={
                <SvgIcon fontSize="small">
                  <XCircleIcon />
                </SvgIcon>
              }
              shape="circle"
              onClick={handleCancelVictim}
            />
          </Tooltip>
        </>
      )}

      <Tooltip title="Xóa">
        <Button
          type="text"
          icon={
            <SvgIcon fontSize="small">
              <TrashIcon />
            </SvgIcon>
          }
          shape="circle"
          onClick={handleDeleteClick}
        />
      </Tooltip>
    </Stack>
  );

  const handleCollapseChange = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Collapse
        onChange={handleCollapseChange}
        items={[
          {
            extra: isExpanded ? extraBtns() : null,
            label: (
              <Stack direction="row" spacing={0.5}>
                <Typography>
                  Nạn nhân {index + 1}
                  {formik.values.name && `: ${formik.values.name}`}
                </Typography>
              </Stack>
            ),
            children: (
              <Grid container spacing={3}>
                {[
                  { label: "Họ và tên", name: "name", md: 3, required: true },
                  { label: "Ngày sinh", name: "birthday", md: 2, datePicker: true },
                  {
                    label: "Giới tính",
                    name: "gender",
                    md: 1.5,
                    required: true,
                    select: true,
                    selectProps: constants.gender,
                  },
                  { label: "CMND/CCCD", name: "citizenId", md: 2.5, required: true },
                  { label: "Số điện thoại", name: "phoneNumber", md: 3 },
                  { label: "Địa chỉ thường trú", name: "address", md: 6 },
                  {
                    label: "Thời gian lấy lời khai gần nhất",
                    name: "date",
                    dateTimePicker: true,
                    md: 6,
                  },
                  { label: "Lời khai", name: "testimony", textArea: true },
                ].map((field) => (
                  <Grid key={field.name} xs={12} md={field.md || 12}>
                    {loading ? (
                      <Skeleton variant="rounded">
                        <TextField fullWidth />
                      </Skeleton>
                    ) : field.datePicker ? (
                      <DatePicker
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
                            disabled={isFieldDisabled || field.disabled}
                            {...params}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required={!field.disabled}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        )}
                        maxDate={new Date()} // Assuming current date is the maximum allowed
                      />
                    ) : field.dateTimePicker ? (
                      <DateTimePicker
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
                            disabled={isFieldDisabled || field.disabled}
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
            ),
          },
        ]}
      />
      <Dialog open={openDeletePopup} onClose={handleDeleteCancel}>
        <DialogTitle>Xác nhận xóa nạn nhân {victim?.name}</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa nạn nhân này?</DialogContent>
        <DialogActions>
          <ButtonMUI onClick={handleDeleteCancel} color="primary">
            Hủy
          </ButtonMUI>
          <ButtonMUI onClick={handleDeleteConfirm} color="error">
            Xác nhận
          </ButtonMUI>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CaseVictimItem;
