import React, { useState, useEffect } from "react";
import {
 TextField,
 Unstable_Grid2 as Grid,
 Skeleton,
 Card,
 CardContent,
 CardActions,
 Divider,
 Button,
 Typography,
} from "@mui/material";
import _ from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import ReactPlayer from "react-player";
import * as imagesApi from "../../../../api/images";
import { useAuth } from "src/hooks/use-auth";

const NewCriminalImages = (props) => {
 const {
  formik,
  loadingSkeleton,
  isFieldDisabled
 } = props;

 const [previewVisible, setPreviewVisible] = useState(false);
 const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
 const [progress, setProgress] = useState(0);
 const [message, setMessage] = useState('');
 const auth = useAuth();

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
  formik.values.criminalImages?.map((image, index) => ({
   uid: index,
   name: image.fileName,
   status: "done",
   path: image.filePath,
   url: image.fileUrl,
  }))
 );

 useEffect(() => {
  setFileList(formik.values.criminalImages?.map((image, index) => ({
   uid: index,
   name: image.fileName,
   status: "done",
   path: image.filePath,
   url: image.fileUrl,
  })));
 }, [formik.values.criminalImages])

 const handleSuccess = (response, filename) => {
  if (_.isArray(response)) {
   const newImages = response.map((image, index) => ({
    fileName: '',
    filePath: image.filePath,
    fileUrl: image.fileUrl,
   }));
   formik.setValues({
    ...formik.values,
    criminalImages: [...formik.values.criminalImages, ...newImages],
   });
  }
  else {
   const newImage = {
    fileName: filename,
    filePath: response[0].filePath,
    fileUrl: response[0].fileUrl,
   };
   formik.setValues({
    ...formik.values,
    criminalImages: [...formik.values.criminalImages, newImage],
   });
  }
 };

 const handleError = (error) => {
  setMessage(error);
  formik.setValues({
   ...formik.values,
   criminalImages: [...formik.values.criminalImages],
  });
 };

 const handleRemove = async (file) => {
  try {
   const imageIndex = fileList.findIndex((media) => media.uid === file.uid);
   const filePath = file.path;
   const messages = await imagesApi.deleteImage(filePath);
   formik.values.criminalImages.splice(imageIndex, 1);
  } catch (e) {
   console.error(e);
  }
 };

 const uploadImage = async (options) => {
  const { onProgress, onSuccess, onError, file } = options;
  const fmData = new FormData();

  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
   onError("Hình ảnh/video tải lên không hợp lệ. Vui lòng thử lại.")
   return;
  }
  setMessage('');

  if (file.type.startsWith('image/')) {
   fmData.append("Files", file);
   try {
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
    const response = await imagesApi.uploadImage(fmData, config);
    console.log("response", response);
    onSuccess(response, file.name);
   } catch (error) {
    onError(error);
   }
  }
  else if (file.type.startsWith('video/')) {
   fmData.append("Files", file);
   fmData.append("NumberImagesEachSecond", 2);

   let result = await auth.refreshToken();
   if (!result.isSuccessfully) {
    throw new Error(result.data);
   }

   const config = {
    headers: {
     "content-type": "multipart/form-data",
     Authorization: `Bearer ${result.data}`,
    },
    onUploadProgress: (event) => {
     const percent = Math.floor((event.loaded / event.total) * 100);
     setProgress(percent);
     if (percent === 100) {
      setTimeout(() => setProgress(0), 1000);
     }
     onProgress({ percent: (event.loaded / event.total) * 100 });
    },
   };
   try {
    const response = await imagesApi.splitVideo(fmData, config);
    console.log("response", response);
    onSuccess(response);
   } catch (error) {
    onError(error);
   }
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
    Tải lên hình ảnh/video <br /> tội phạm
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
      { label: "Hỉnh ảnh/video tội phạm", name: "criminalImages", upload: true },
     ].map((field) => (
      <Grid key={field.name} xs={12} md={field.md || 12}>
       {loadingSkeleton || formik.values === null || formik.values.name === undefined ? (
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

export default NewCriminalImages;
