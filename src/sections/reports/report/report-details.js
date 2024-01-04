import React, { useState, useReducer, useEffect } from "react";
import {
 TextField,
 Unstable_Grid2 as Grid,
 Skeleton,
 Card,
 CardContent,
 CardActions,
 Divider,
 Button
} from "@mui/material";
import * as constants from "../../../constants/constants";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import * as messages from "../../../constants/messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import ReactPlayer from "react-player";
import * as imagesApi from "../../../api/images";

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

  case "UPDATE_REPORT":
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

export const ReportDetails = (props) => {
 const [state, dispatch] = useReducer(reducer, initialState);
 const [originalReport, setOriginalReport] = useState({});
 const [previewVisible, setPreviewVisible] = useState(false);
 const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
 const [progress, setProgress] = useState(0);

 const {
  report: initialReport,
  loadingSkeleton,
  loadingButtonDetails,
  onUpdate,
 } = props;

 const formik = useFormik({
  enableReinitialize: true,
  initialValues: initialReport
   ? {
    ...initialReport,
   }
   : null,
  validationSchema: Yup.object({
   reporterName: Yup.string()
    .max(100, messages.LIMIT_NAME)
    .required(messages.REQUIRED_REPORTER_NAME)
    .matches(/^[ '\p{L}]+$/u, messages.NAME_CONTAINS_VALID_CHARACTER),
   reporterPhone: Yup.string()
    .matches(/^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/, messages.INVALID_PHONE_NUMBER)
    .max(15, messages.LIMIT_PHONENUMBER)
    .required(messages.REQUIRED_REPORTER_PHONE),
   reporterEmail: Yup.string()
    .email(messages.INVALID_EMAIL)
    .max(100, messages.LIMIT_EMAIL)
    .required(messages.REQUIRED_REPORTER_EMAIL),
   reporterAddress: Yup.string()
    .max(200, messages.LIMIT_ADDRESS)
    .required(messages.REQUIRED_REPORTER_ADDRESS)
    .matches(/^[0-9,. \p{L}]+$/u, messages.ADDRESS_VALID_CHARACTER),
   content: Yup.string()
    .max(65535, messages.LIMIT_CONTENT)
    .required(messages.REQUIRED_CONTENT),
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

 const getFileType = (url) => {
  const extension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
  const imageExtensions = ["jpg", "png", "gif", "jpeg"]; // Additional image extensions
  const videoExtensions = ["mp3", "mp4", "mpeg"]; // Additional video extensions

  if (imageExtensions.includes(extension.toLowerCase())) {
   return "image";
  } else if (videoExtensions.includes(extension.toLowerCase())) {
   return "video";
  } else {
   return "unknown";
  }
 };
 const [fileList, setFileList] = useState(
  initialReport.reportingImages?.map((image, index) => ({
   uid: index,
   name: image.fileName,
   status: "done",
   path: image.filePath,
   url: image.fileUrl,
  }))
 );

 const handleSuccess = (response, filename) => {
  const newImage = {
   fileName: filename,
   filePath: response[0].filePath,
   fileUrl: response[0].fileUrl,
  };
  formik.setValues({
   ...formik.values,
   reportingImages: [...formik.values.reportingImages, newImage],
  });
 };

 const handleError = (error) => {
  console.log("handleError", error);
  formik.setValues({
   ...formik.values,
   reportingImages: initialReport.reportingImages,
  });
 };

 const handleRemove = async (file) => {
  try {
   const imageIndex = fileList.findIndex((media) => media.uid === file.uid);
   const filePath = file.path;
   const messages = await imagesApi.deleteImage(filePath);
   console.log("messages", messages);
   formik.setValues({
    ...formik.values,
    reportingImages: [...formik.values.reportingImages].filter((_, id) => id !== imageIndex),
   });
  } catch (e) {
   console.error(e);
  }
 };

 const uploadImage = async (options) => {
  const { onProgress, onSuccess, onError, file } = options;

  const fmData = new FormData();
  const config = {
   headers: { "content-type": "multipart/form-data" },
   onUploadProgress: (event) => {
    const percent = Math.floor((event.loaded / event.total) * 100);
    setProgress(percent);
    if (percent === 100) {
     setTimeout(() => setProgress(0), 1000);
    }
    onProgress({ percent: (event.loaded / event.total) * 100 });
   },
  };
  fmData.append("Files", file);
  try {
   const response = await imagesApi.uploadImage(fmData, config);
   onSuccess(response, file.name);
  } catch (error) {
   onError(error);
  }
 };

 const uploadButton = (
  <div>
   <PlusOutlined />
   <div
    style={{
     marginTop: 2,
    }}
   >
    Tải lên hình ảnh/video <br /> bằng chứng
   </div>
  </div>
 );

 const handlePreviewImages = async (file) => {
  const fileIndex = fileList.findIndex((image) => image.uid === file.uid);
  setCurrentPreviewIndex(fileIndex);
  setPreviewVisible(true);
 };

 const hidePreview = () => {
  setPreviewVisible(false);
 };

 const handleChangeImages = async ({ fileList: newFileList }) => {
  setFileList(newFileList);
  setChangesMade(true);
 };

 const handleChange = (e) => {
  dispatch({ type: "UPDATE_REPORT" });
  formik.handleChange(e);
 };

 const handleSubmit = () => {
  if (state.changesMade) {
   onUpdate({
    reporterName: formik.values.reporterName,
    reporterEmail: formik.values.reporterEmail,
    reporterPhone: formik.values.reporterPhone,
    reporterAddress: formik.values.reporterAddress,
    content: formik.values.content,
    status: parseInt(formik.values.status, 10),
    note: formik.values.note,
    reportingImages: formik.values.reportingImages,
   });
  }
  dispatch({ type: "SUBMIT_FORM" });
 };

 const handleClick = () => {
  dispatch({ type: "ENABLE_EDIT" });
  setOriginalReport(formik.values);
 };

 const handleCancel = () => {
  dispatch({ type: "CANCEL_EDIT" });
  formik.setValues(originalReport);
 };

 return (
  <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
   <Card>
    <CardContent>
     <Grid container>
      {[
       { label: "Họ và tên người báo cáo", name: "reporterName", disabled: true },
       { label: "Email người báo cáo", name: "reporterEmail", disabled: true },
       { label: "Số điện thoại người báo cáo", name: "reporterPhone", disabled: true },
       { label: "Địa chỉ người báo cáo", name: "reporterAddress", disabled: true },
       { label: "Nội dung báo cáo", name: "content", disabled: true, textArea: true },
       { label: "Hình ảnh/video báo cáo", name: "reportingImages", disabled: true, upload: true },
       { label: "Trạng thái", name: "status", select: true, selectProps: constants.reportStatus },
       { label: "Ghi chú", name: "note", textArea: true },
      ].map((field) => (
       <Grid key={field.name} xs={12} md={field.md || 12}>
        {loadingSkeleton || formik.values === null ? (
         <Skeleton variant="rounded">
          <TextField fullWidth />
         </Skeleton>
        ) : field.upload && !_.isEmpty(formik.values.reportingImages) ? (
         <>
          <Upload
           disabled={state.isFieldDisabled || field.disabled}
           accept="image/*,video/*"
           name={field.name}
           customRequest={(options) =>
            uploadImage({
             ...options,
             onSuccess: handleSuccess,
             onError: handleError,
            })
           }
           onChange={handleChangeImages}
           onRemove={handleRemove}
           listType="picture-card"
           fileList={fileList}
           onPreview={handlePreviewImages}
          >
           {/* {uploadButton} */}
          </Upload>
          {previewVisible && (
           <Image.PreviewGroup
            preview={{
             visible: previewVisible,
             onVisibleChange: hidePreview,
             ...(currentPreviewIndex !== null && { current: currentPreviewIndex }),
             onChange: (index) => setCurrentPreviewIndex(index),
             toolbarRender: (originalNode, info) => {
              return getFileType(fileList[info.current].url) !== "image"
               ? null
               : originalNode;
             },
             imageRender: (originalNode, info) => {
              return getFileType(fileList[info.current].url) === "image" ? (
               originalNode
              ) : (
               <ReactPlayer
                url={fileList[info.current].url}
                controls
                height="100%"
                width="100%"
               />
              );
             },
            }}
            items={fileList.map((file) => file.url)}
           />
          )}
         </>
        ) : (
         // </LocalizationProvider>
         <TextField
          error={!!(formik.touched[field.name] && formik.errors[field.name])}
          fullWidth
          helperText={formik.touched[field.name] && formik.errors[field.name]}
          disabled={state.isFieldDisabled || field.disabled}
          multiline={field.textArea || false}
          label={field.label}
          name={field.name}
          onBlur={formik.handleBlur}
          onChange={handleChange}
          type={field.name}
          value={
           field.name === "role"
            ? constants.role[formik.values[field.name]]
            : formik.values[field.name]
          }
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
          {/* {field.select &&
                      Object.entries(field.selectProps).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))} */}

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
      </>
     ) : loadingButtonDetails ? (
      <>
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
        variant="contained"
        onClick={state.isFieldDisabled ? handleClick : formik.handleSubmit}
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
