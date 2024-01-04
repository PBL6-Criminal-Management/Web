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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import NextLink from "next/link";
import { format, parse } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

const CaseWantedItem = (props) => {
  const {
    wanted,
    wantedsOfCase,
    criminalsOfCase,
    index,
    loading,
    handleSubmit,
    handleDeleteWanted,
    isSubmitting,
    isDisabled,
  } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({});
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const getAllowedItems = (originalList, valuesList, idToExclude) => {
    const idsToRemove = valuesList.map((item) => item.criminalId);
    return originalList.filter((item) => {
      const isIdToExclude = item.id === idToExclude;
      const isIdInValuesList = idsToRemove.includes(item.id);
      return item.id && (isIdToExclude || !isIdInValuesList);
    });
  };

  useEffect(() => {
    if (!wanted.criminalId) {
      setIsFieldDisabled(false);
    }
  }, [wanted]);

  const handleDeleteConfirm = () => {
    handleDeleteWanted(index);
    setOpenDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDeletePopup(true);
  };

  const fillEmpty = () => {
    if (!wanted.criminalId) setChangesMade(false);
    setValue(null);
    formik.setValues({
      key: wanted.key,
      criminalId: null,
      wantedType: 0,
      currentActivity: "",
      wantedDecisionNo: "",
      wantedDecisionDay: new Date(),
      decisionMakingUnit: "",
      weapon: "",
    });
  };

  const handleSubmitWanted = (isValid) => {
    // e.stopPropagation();
    console.log("changemade", changesMade);
    console.log("submit", {
      ...formik.values,
      wantedDecisionDay: format(formik.values.wantedDecisionDay, "dd/MM/yyyy"),
    });
    setIsFieldDisabled((prev) => !prev);
    handleSubmit(
      {
        ...formik.values,
        wantedDecisionDay: format(formik.values.wantedDecisionDay, "dd/MM/yyyy"),
      },
      isValid
    );
  };

  const handleCancelWanted = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    if (wanted.criminalId) {
      setValue(options.find((option) => option.id === wanted.criminalId));
      formik.setValues({
        ...wanted,
        wantedDecisionDay: parse(wanted.wantedDecisionDay, "dd/MM/yyyy", new Date()),
      });
      setChangesMade(false);
    } else fillEmpty();
    formik.setTouched({}, false);
  };

  const handleEditWanted = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    setChangesMade(false);
  };

  useEffect(() => {
    if (criminalsOfCase && wanted && wantedsOfCase) {
      const options = getAllowedItems(criminalsOfCase, wantedsOfCase, wanted.criminalId);
      setOptions(options);
    }
  }, [wanted, wantedsOfCase, criminalsOfCase]);

  useEffect(() => {
    if (options) {
      if (changesMade && value && !options.find((option) => option.id === value.id)) {
        fillEmpty();
      } else if (!changesMade) {
        setValue(options.find((option) => option.id === wanted.criminalId));
        formik.setValues({
          ...wanted,
          wantedDecisionDay:
            wanted.wantedDecisionDay && parse(wanted.wantedDecisionDay, "dd/MM/yyyy", new Date()),
        });
      }
    }
  }, [wanted, options]);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: wanted
      ? {
          ...wanted,
          wantedDecisionDay:
            wanted.wantedDecisionDay && parse(wanted.wantedDecisionDay, "dd/MM/yyyy", new Date()),
        }
      : null,
    validationSchema: Yup.object({
      criminalId: Yup.string().required(messages.REQUIRED_CRIMINAL),
      currentActivity: Yup.string().nullable().max(200, messages.LIMIT_CURRENT_ACTIVITY),
      wantedDecisionNo: Yup.string()
        .max(50, messages.LIMIT_WANTED_DECISION_NO)
        .required(messages.REQUIRED_WANTED_DECISION_NO)
        .matches(/^[\p{L}0-9. -]+$/u, messages.WANTED_DECISION_NO_VALID_CHARACTER),
      decisionMakingUnit: Yup.string()
        .max(100, messages.LIMIT_DECISION_MAKING_UNIT)
        .required(messages.REQUIRED_DECISION_MAKING_UNIT)
        .matches(/^[\p{L}0-9,. -]+$/u, messages.DECISION_MAKING_UNIT_VALID_CHARACTER),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitWanted(formik.isValid);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      formik.handleSubmit();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      handleSubmitWanted(formik.isValid);
    }
  }, [formik.isValid, isSubmitting]);

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
            onClick={handleEditWanted}
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
              onClick={handleCancelWanted}
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
    options && (
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Collapse
          onChange={handleCollapseChange}
          items={[
            {
              extra: isExpanded ? extraBtns() : null,
              label: (
                <Stack direction="row" spacing={0.5}>
                  <Typography>Tội phạm truy nã {index + 1}</Typography>
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
                      name: "criminalId",
                      md: 3,
                      required: true,
                      autoComplete: true,
                    },
                    {
                      label: "Loại truy nã",
                      name: "wantedType",
                      md: 2,
                      select: true,
                      selectProps: constants.wantedType,
                      required: true,
                    },
                    { label: "Hoạt động hiện hành", name: "currentActivity", md: 7 },
                    { label: "Số ra quyết định", name: "wantedDecisionNo", md: 3, required: true },
                    {
                      label: "Ngày ra quyết định",
                      name: "wantedDecisionDay",
                      md: 2,
                      datePicker: true,
                    },
                    {
                      label: "Đơn vị ra quyết định",
                      name: "decisionMakingUnit",
                      md: 7,
                      required: true,
                    },
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
                          disabled={isFieldDisabled || field.disabled || isDisabled}
                          name={field.name}
                          label={field.label}
                          disablePortal
                          fullWidth
                          options={options}
                          getOptionLabel={(option) =>
                            value ? option.code + "-" + option.name : ""
                          }
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
                              if (value.id === wanted.criminalId) {
                                formik.setValues({
                                  ...wanted,
                                  wantedDecisionDay: parse(
                                    wanted.wantedDecisionDay,
                                    "dd/MM/yyyy",
                                    new Date()
                                  ),
                                });
                                setChangesMade(false);
                              } else {
                                formik.setValues({
                                  key: wanted.key,
                                  criminalId: value.id,
                                  wantedType: 0,
                                  currentActivity: "",
                                  wantedDecisionNo: "",
                                  wantedDecisionDay: new Date(),
                                  decisionMakingUnit: "",
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
                              disabled={isFieldDisabled || field.disabled || isDisabled}
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
                          disabled={isFieldDisabled || field.disabled || isDisabled}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              disabled={isFieldDisabled || field.disabled || isDisabled}
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
                            setChangesMade(true);
                            formik.handleChange(e);
                          }}
                          type={field.name}
                          value={formik.values[field.name] ?? ""}
                          multiline={field.textArea || false}
                          disabled={isFieldDisabled || field.disabled || isDisabled}
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
          <DialogTitle>Xác nhận xóa tội phạm truy nã {value?.name}</DialogTitle>
          <DialogContent>Bạn có chắc chắn muốn xóa tội phạm truy nã này?</DialogContent>
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

export default CaseWantedItem;
