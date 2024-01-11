import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Unstable_Grid2 as Grid,
  Skeleton,
  Card,
  CardContent,
  Typography,
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

export const NewReportDetails = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const {
    formik,
    loadingSkeleton,
    isFieldDisabled
  } = props;

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
    formik.values.reportingImages?.map((image, index) => ({
      uid: index,
      name: image.fileName,
      status: "done",
      path: image.filePath,
      url: image.fileUrl,
    }))
  );

  useEffect(() => {
    setFileList(formik.values.reportingImages?.map((image, index) => ({
      uid: index,
      name: image.fileName,
      status: "done",
      path: image.filePath,
      url: image.fileUrl,
    })));
  }, [formik.values.reportingImages])

  const handleSuccess = (response, filename) => {
    // console.log(response, filename);
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
    setMessage(error);
    formik.setValues({
      ...formik.values,
      reportingImages: [...formik.values.reportingImages],
    });
  };

  const handleRemove = async (file) => {
    try {
      const imageIndex = fileList.findIndex((media) => media.uid === file.uid);
      const filePath = file.path;
      const messages = await imagesApi.deleteImage(filePath);
      // formik.setValues({
      //   ...formik.values,
      //   // reportingImages: [...formik.values.reportingImages].filter((_, id) => id !== imageIndex),
      //   reportingImages: formik.values.reportingImages.splice(imageIndex, 1),
      // });
      formik.values.reportingImages.splice(imageIndex, 1);
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

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      onError("Hình ảnh/video tải lên không hợp lệ. Vui lòng thử lại.")
      return;
    }
    setMessage('');

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
        Tải lên hình ảnh/video <br /> báo cáo
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

  const handleChangeImages = ({ fileList: newFileList }) => {
    console.log("newFileList", newFileList);
    setFileList(newFileList);
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          {[
            { label: "Họ và tên người báo cáo", name: "reporterName", required: true },
            { label: "Email người báo cáo", name: "reporterEmail", required: true, md: 6 },
            { label: "Số điện thoại người báo cáo", name: "reporterPhone", required: true, md: 6 },
            { label: "Địa chỉ người báo cáo", name: "reporterAddress", required: true },
            { label: "Nội dung báo cáo", name: "content", required: true, textArea: true },
            { label: "Hình ảnh/video báo cáo", name: "reportingImages", upload: true },
          ].map((field) => (
            <Grid key={field.name} xs={12} md={field.md || 12}>
              {loadingSkeleton ? (
                <Skeleton variant="rounded">
                  <TextField fullWidth />
                </Skeleton>
              ) : field.upload ? (
                <>
                  <Upload
                    disabled={isFieldDisabled || field.disabled}
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
                    {uploadButton}
                  </Upload>
                  <Typography
                    sx={{
                      mt: 0.75,
                      color: "error.main",
                    }}
                  >
                    {message}
                  </Typography>
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
                  disabled={isFieldDisabled || field.disabled}
                  multiline={field.textArea || false}
                  label={field.label}
                  name={field.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={field.name}
                  value={formik.values[field.name]}
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
    </Card>
  );
};
