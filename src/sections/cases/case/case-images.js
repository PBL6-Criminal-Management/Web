import {
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import * as imagesApi from "../../../api/images";
import * as messages from "../../../constants/messages";
import ReactPlayer from "react-player";
import { useFormik } from "formik";
import * as Yup from "yup";

const CaseImages = (props) => {
  const { caseImages, loading, loadingButtonDetails, loadingButtonPicture, handleSubmit } = props;
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
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
    caseImages &&
      caseImages.map((image, index) => ({
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
    formik.setValues([...formik.values, newImage]);
    // setFileList((prevFileList) => [
    //   ...prevFileList,
    //   {
    //     uid: prevFileList.length,
    //     name: filename,
    //     status: "done",
    //     path: response[0].filePath,
    //     url: response[0].fileUrl,
    //   },
    // ]);
    // console.log("fileList success", fileList);
  };

  const handleError = (error) => {
    console.log("handleError", error);
    formik.setValues(caseImages);
    // setFileList(
    //   caseImages &&
    //     caseImages.map((image, index) => ({
    //       uid: index,
    //       name: image.fileName,
    //       status: "done",
    //       path: image.filePath,
    //       url: image.fileUrl,
    //     }))
    // );
  };

  const handleRemove = async (file) => {
    try {
      const imageIndex = fileList.findIndex((media) => media.uid === file.uid);
      const filePath = file.path;
      const messages = await imagesApi.deleteImage(filePath);
      console.log("messages", messages);
      formik.setValues([...formik.values].filter((_, id) => id !== imageIndex));
    } catch (err) {
      console.error(err);
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

  const formik = useFormik({
    initialValues: caseImages ? caseImages : null,
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
      caseImages &&
        caseImages.map((image, index) => ({
          uid: index,
          name: image.fileName,
          status: "done",
          path: image.filePath,
          url: image.fileUrl,
        }))
    );
  }, [caseImages]);

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
        Tải lên hình ảnh/video liên quan đến vụ án
      </div>
    </div>
  );

  const handleEditImages = () => {
    setIsFieldDisabled(false);
    setIsClicked(false);
  };

  const handleSubmitImages = () => {
    setIsFieldDisabled(true);
    setIsClicked(true);
  };

  const handleCancelImages = () => {
    setIsClicked(false);
    setIsFieldDisabled(true);
  };

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
          {[{ label: "Hình ảnh", name: "caseImages", required: true, upload: true }].map(
            (field) => (
              <Grid key={field.name} xs={12} md={field.md || 12}>
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  field.upload && (
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
                  )
                )}
              </Grid>
            )
          )}
        </Grid>
      </CardContent>
      <Divider />
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
              onClick={isFieldDisabled ? handleEditImages : handleSubmitImages}
              disabled={loadingButtonPicture}
            >
              {isFieldDisabled ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
            </Button>
            {!isFieldDisabled && (
              <Button variant="outlined" onClick={handleCancelImages}>
                Hủy
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CaseImages;
