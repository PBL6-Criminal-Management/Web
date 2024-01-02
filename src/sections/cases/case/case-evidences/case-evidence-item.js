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
import { Collapse, Button } from "antd";
import * as messages from "../../../../constants/messages";
import React, { useState, useEffect } from "react";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import * as imagesApi from "../../../../api/images";
import ReactPlayer from "react-player";
import { useFormik } from "formik";
import * as Yup from "yup";

const CaseEvidenceItem = (props) => {
  const { evidence, index, loading, handleSubmit, handleDeleteEvidence } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [changesMade, setChangesMade] = useState(false);

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
    evidence.evidenceImages.map((image, index) => ({
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
      evidenceImages: [...formik.values.evidenceImages, newImage],
    });
  };

  const handleError = (error) => {
    console.log("handleError", error);
    formik.setValues({
      ...formik.values,
      evidenceImages: evidence.evidenceImages,
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
        evidenceImages: [...formik.values.evidenceImages].filter((_, id) => id !== imageIndex),
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

  const handleDeleteConfirm = () => {
    handleDeleteEvidence(index);
    setOpenDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDeletePopup(true);
  };

  const handleSubmitEvidence = (e) => {
    console.log("changemade", changesMade);
    console.log("submit", {
      ...formik.values,
    });
    // e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    if (changesMade) {
      handleSubmit({
        ...formik.values,
      });
    }
  };

  const handleCancelEvidence = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    formik.setValues(evidence);
    formik.setTouched({}, false);
    setChangesMade(false);
  };

  const handleEditEvidence = (e) => {
    e.stopPropagation();
    setIsFieldDisabled((prev) => !prev);
    setChangesMade(false);
  };

  const formik = useFormik({
    initialValues: evidence ? evidence : null,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, messages.LIMIT_NAME)
        .required(messages.REQUIRED_EVIDENCE_NAME)
        .matches(/^[\p{L}0-9 ]+$/u, messages.EVIDENCE_NAME_VALID_CHARACTER),
      description: Yup.string().nullable().max(500, messages.LIMIT_DESCRIPTION),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmitEvidence();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    setFileList(
      formik.values.evidenceImages.map((image, index) => ({
        uid: index,
        name: image.fileName,
        status: "done",
        path: image.filePath,
        url: image.fileUrl,
      }))
    );
  }, [formik.values.evidenceImages]);

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
            onClick={handleEditEvidence}
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
              onClick={handleCancelEvidence}
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
                  Vật chứng {index + 1}
                  {formik.values.name && `: ${formik.values.name}`}
                </Typography>
              </Stack>
            ),
            children: (
              <Grid container spacing={3}>
                {[
                  { label: "Tên", name: "name", required: true },
                  { label: "Mô tả", name: "description", textArea: true },
                  { label: "Hình ảnh", name: "evidenceImages", required: true, upload: true },
                ].map((field) => (
                  <Grid key={field.name} xs={12} md={field.md || 12}>
                    {loading ? (
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
        <DialogTitle>Xác nhận xóa bằng chứng {evidence?.name}</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa bằng chứng này?</DialogContent>
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

export default CaseEvidenceItem;
