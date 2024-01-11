import {
  TextField,
  Unstable_Grid2 as Grid,
  Skeleton,
  SvgIcon,
  Stack,
  Tooltip,
  Autocomplete,
  Box,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button as ButtonMUI,
} from "@mui/material";
import * as constants from "../../../../constants/constants";
import * as messages from "../../../../constants/messages";
import { Collapse, Button } from "antd";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import NextLink from "next/link";
import { format, parse } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

const CaseCriminalItem = (props) => {
  const {
    criminal,
    criminals,
    criminalsOfCase,
    index,
    loading,
    handleSubmit,
    handleDeleteCriminal,
    canEdit
  } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({});
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const getAllowedItems = (originalList, valuesList, idToExclude) => {
    const idsToRemove = valuesList.map((item) => item.id);
    return originalList.filter((item) => {
      const isIdToExclude = item.id === idToExclude;
      const isIdInValuesList = idsToRemove.includes(item.id);
      return isIdToExclude || !isIdInValuesList;
    });
  };

  const handleDeleteConfirm = () => {
    handleDeleteCriminal(index);
    setOpenDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDeletePopup(true);
  };

  useEffect(() => {
    if (!criminal.id) {
      setIsFieldDisabled(false);
    }
  }, [criminal]);
  const fillEmpty = () => {
    if (!criminal.id) setChangesMade(false);
    setValue(null);
    formik.setValues({
      key: criminal.key,
      id: null,
      name: "",
      anotherName: "",
      birthday: "",
      gender: "",
      citizenId: "",
      homeTown: "",
      permanentResidence: "",
      currentAccommodation: "",
      nationality: "",
      ethnicity: "",
      charge: "",
      reason: "",
      testimony: "",
      date: new Date(),
      typeOfViolation: 0,
      weapon: "",
    });
  };

  const handleSubmitCriminal = () => {
    if (value === null) return;
    console.log("changemade", changesMade);
    console.log("submit", {
      ...formik.values,
      date: formik.values.date && format(formik.values.date, "HH:mm dd/MM/yyyy"),
    });
    // e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    if (changesMade) {
      handleSubmit({
        ...formik.values,
        date: formik.values.date && format(formik.values.date, "HH:mm dd/MM/yyyy"),
        typeOfViolation: formik.values.typeOfViolation && parseInt(formik.values.typeOfViolation, 10)
      });
    }
  };

  const handleCancelCriminal = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    if (criminal.id) {
      setValue(options.find((option) => option.id === criminal.id));
      formik.setValues({
        ...criminal,
        date: criminal.date && parse(criminal.date, "HH:mm dd/MM/yyyy", new Date()),
        typeOfViolation: parseInt(criminal.typeOfViolation, 10),
      });
      setChangesMade(false);
    } else fillEmpty();
    formik.setTouched({}, false);
  };

  const handleEditCriminal = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    setChangesMade(false);
  };

  useEffect(() => {
    if (criminals && criminal) {
      const options = getAllowedItems(criminals, criminalsOfCase, criminal.id);
      setOptions(options);
    }
  }, [criminal, criminalsOfCase, criminals]);

  useEffect(() => {
    if (options) {
      if (
        changesMade &&
        value &&
        !options.find((option) => option.id === value.id)
        // criminalsOfCase.find((c) => c.id === value.id) &&
        // formik.values.key &&
        // criminalsOfCase.find((c) => c.id === value.id).key !== formik.values.key
      ) {
        fillEmpty();
      } else if (!changesMade) {
        setValue(options.find((option) => option.id === criminal.id));
        formik.setValues({
          ...criminal,
          date: criminal.date && parse(criminal.date, "HH:mm dd/MM/yyyy", new Date()),
          typeOfViolation: criminal.typeOfViolation && parseInt(criminal.typeOfViolation, 10),
        });
      }
    }
  }, [criminal, options]);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: criminal
      ? {
          ...criminal,
          date: criminal.date && parse(criminal.date, "HH:mm dd/MM/yyyy", new Date()),
          typeOfViolation: parseInt(criminal.typeOfViolation, 10),
        }
      : null,
    validationSchema: Yup.object({
      id: Yup.string().required(messages.REQUIRED_CRIMINAL),
      testimony: Yup.string()
        .max(65535, messages.LIMIT_TESTIMONY)
        .required(messages.REQUIRED_TESTIMONY),
      charge: Yup.string()
        .max(100, messages.LIMIT_CHARGE)
        .required(messages.REQUIRED_CHARGE)
        .matches(/^[\p{L} ,]+$/u, messages.CHARGE_VALID_CHARACTER),
      reason: Yup.string().nullable().max(500, messages.LIMIT_REASON),
      // .matches(/^[\p{L} ,]+$/u, messages.CHARGE_VALID_CHARACTER),
      weapon: Yup.string()
        .nullable()
        .max(100, messages.LIMIT_WEAPON)
        .matches(/^[\p{L}0-9, ]+$/u, messages.WEAPON_NAME_VALID_CHARACTER),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitCriminal();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const extraBtns = () => (
    <Stack direction="row" spacing={-0.5} justifyContent="flex-end" alignItems="center">
      {isFieldDisabled && canEdit && (
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={
              <SvgIcon fontSize="small">
                <PencilSquareIcon />
              </SvgIcon>
            }
            shape="circle"
            onClick={handleEditCriminal}
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
              onClick={handleCancelCriminal}
            />
          </Tooltip>
        </>
      )}
      {canEdit && (
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
      )}
      
    </Stack>
  );

  const handleCollapseChange = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    options && (
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Collapse
          onChange={handleCollapseChange}
          items={[
            {
              extra: isExpanded ? extraBtns() : null,
              label: (
                <Stack direction="row" spacing={0.5}>
                  <Typography>Tội phạm {index + 1}</Typography>
                  {value && (
                    <>
                      <Typography>: </Typography>
                      <Tooltip title="Xem chi tiết tội phạm này">
                        <Typography
                          color="primary"
                          component={NextLink}
                          href={{
                            pathname: "/criminals/[id]",
                            query: {
                              id: encodeURIComponent(value.id),
                              name: encodeURIComponent(value.name),
                            },
                          }}
                        >
                          {value?.name}
                        </Typography>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              ),
              children: (
                <Grid container spacing={3}>
                  {[
                    {
                      label: "Liên kết tội phạm",
                      name: "id",
                      md: 3,
                      required: true,
                      autoComplete: true,
                    },
                    { label: "Tên khác", name: "anotherName", md: 3, disabled: true, info: true },
                    { label: "Ngày sinh", name: "birthday", md: 2, disabled: true, info: true },
                    { label: "Giới tính", name: "gender", md: 1.5, disabled: true, info: true },
                    { label: "CMND/CCCD", name: "citizenId", md: 2.5, disabled: true, info: true },
                    { label: "Quê quán", name: "homeTown", md: 4, disabled: true, info: true },
                    {
                      label: "Nơi ĐKTT",
                      name: "permanentResidence",
                      md: 4,
                      disabled: true,
                      info: true,
                    },
                    {
                      label: "Nơi ở hiện tại",
                      name: "currentAccommodation",
                      md: 4,
                      disabled: true,
                      info: true,
                    },
                    { label: "Quốc tịch", name: "nationality", md: 6, disabled: true, info: true },
                    { label: "Dân tộc", name: "ethnicity", md: 6, disabled: true, info: true },
                    { label: "Tội danh", name: "charge", md: 3, required: true },
                    { label: "Nguyên nhân", name: "reason", md: 3 },
                    { label: "Vũ khí", name: "weapon", md: 3 },
                    {
                      label: "Loại vi phạm",
                      name: "typeOfViolation",
                      md: 3,
                      select: true,
                      selectProps: constants.typeOfViolation,
                      required: true
                    },
                    {
                      label: "Thời gian lấy lời khai gần nhất",
                      name: "date",
                      dateTimePicker: true,
                    },
                    { label: "Lời khai", name: "testimony", textArea: true, required: true },
                  ].map((field) => (
                    <Grid key={field.name} xs={12} md={field.md || 12}>
                      {loading ? (
                        <Skeleton variant="rounded">
                          <TextField fullWidth />
                        </Skeleton>
                      ) : field.autoComplete ? (
                        <Autocomplete
                          id="autocomplete-criminal"
                          autoHighlight={true}
                          disabled={isFieldDisabled || field.disabled}
                          name={field.name}
                          label={field.label}
                          disablePortal
                          fullWidth
                          options={options}
                          getOptionLabel={(option) => {
                            return value ? option.code + "-" + option.name : "";
                          }}
                          isOptionEqualToValue={(option, value) => {
                            if (value === null || value === undefined) {
                              return option === value;
                            }
                            return option.id === value.id;
                          }}
                          onChange={async (event, value) => {
                            if (value === null || value === undefined) {
                              fillEmpty();
                            } else {
                              setValue(value);
                              if (value.id === criminal.id) {
                                formik.setValues({
                                  ...criminal,
                                  date: parse(criminal.date, "HH:mm dd/MM/yyyy", new Date()),
                                  typeOfViolation: parseInt(criminal.typeOfViolation, 10),
                                });
                                setChangesMade(false);
                              } else {
                                formik.setValues({
                                  ...value,
                                  key: criminal.key,
                                  charge: "",
                                  reason: "",
                                  testimony: "",
                                  date: new Date(),
                                  typeOfViolation: 0,
                                  weapon: "",
                                });
                                setChangesMade(true);
                              }
                            }
                          }}
                          value={value}
                          renderOption={(props, option) => (
                            <Box component="li" key={option.id} {...props}>
                              <Avatar
                                sx={{
                                  mr: 1.5,
                                  height: 32,
                                  width: 32,
                                }}
                                src={option?.avatarLink}
                              />
                              ({option.code}) - {option.name}
                            </Box>
                          )} // Set the default value based on the criminal prop
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!(formik.touched[field.name] && formik.errors[field.name])}
                              helperText={formik.touched[field.name] && formik.errors[field.name]}
                              disabled={isFieldDisabled || field.disabled}
                              label={field.label}
                              required={field.required || false}
                              sx={{
                                "& .MuiInputBase-input": {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                },
                              }}
                            />
                          )}
                        />
                      ) : field.dateTimePicker ? (
                        <DateTimePicker
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
                          value={formik.values[field.name] ?? ""}
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
                            Object.entries(field.selectProps).map(([value, label], index) => (
                              <option key={index} value={value}>
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
          <DialogTitle>Xác nhận xóa tội phạm {value?.name}</DialogTitle>
          <DialogContent>Bạn có chắc chắn muốn xóa tội phạm này?</DialogContent>
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
    )
  );
};

export default CaseCriminalItem;
