import {
 Unstable_Grid2 as Grid,
 TextField,
 Button,
 Card,
 CardContent,
 CardActions,
 Divider,
 Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Skeleton from "@mui/material/Skeleton";
import { LoadingButton } from "@mui/lab";
import * as constants from "../../../../constants/constants";
import * as messages from "../../../../constants/messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import _ from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import ReactPlayer from "react-player";
import { useAuth } from "src/hooks/use-auth";
import * as imagesApi from "../../../../api/images";

const CriminalImages = (props) => {
 const { criminalImages, loading, loadingButtonDetails, loadingButtonPicture, handleSubmit, canEdit } = props;
 const [isFieldDisabled, setIsFieldDisabled] = useState(true);
 const [isClicked, setIsClicked] = useState(false);
 const [hasSubmitted, setHasSubmitted] = useState(false);
 const [changesMade, setChangesMade] = useState(false);
 const [previewVisible, setPreviewVisible] = useState(false);
 const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
 const [progress, setProgress] = useState(0);
 const [message, setMessage] = useState('');
 const auth = useAuth();

 useEffect(() => {
  if (!loadingButtonDetails && hasSubmitted) {
   setIsClicked(false);
   setHasSubmitted(false);
  }
 }, [loadingButtonDetails, hasSubmitted]);

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
  criminalImages &&
  criminalImages.map((image, index) => ({
   uid: index,
   name: image.fileName,
   status: "done",
   path: image.filePath,
   url: image.fileUrl,
  }))
 );

 const handleSuccess = (response, filename) => {
  if (_.isArray(response)) {
   const newImages = response.map((image, index) => ({
    fileName: '',
    filePath: image.filePath,
    fileUrl: image.fileUrl,
   }));
   formik.setValues([...formik.values, ...newImages]);
  }
  else {
   const newImage = {
    fileName: filename,
    filePath: response[0].filePath,
    fileUrl: response[0].fileUrl,
   };
   formik.setValues({
    ...formik.values,
    criminalImages: [...formik.values, newImage],
   });
  }
 };

 const handleError = (error) => {
  setMessage(error);
  setFileList(
   criminalImages &&
   criminalImages.map((image, index) => ({
    uid: index,
    name: image.fileName,
    status: "done",
    path: image.filePath,
    url: image.fileUrl,
   }))
  );
  formik.setValues(caseImages);
 };

 const handleRemove = async (file) => {
  try {
   const imageIndex = fileList.findIndex((media) => media.uid === file.uid);
   const filePath = file.path;
   const messages = await imagesApi.deleteImage(filePath);
   formik.values.splice(imageIndex, 1);
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

 const handleEditImages = () => {
  setIsFieldDisabled(false);
  setIsClicked(false);
  setChangesMade(false);
 };

 const handleSubmitImages = () => {
  setIsFieldDisabled(true);
  setIsClicked(true);
  setHasSubmitted(true);
  if (changesMade)
   handleSubmit(formik.values);
 };

 const handleCancelImages = () => {
  setIsClicked(false);
  setIsFieldDisabled(true);
  setChangesMade(false);
  formik.setValues(criminalImages);
  formik.setTouched({}, false);
 };

 const formik = useFormik({
  enableReinitialize: true,
  initialValues: criminalImages
   ? criminalImages
   : null,
  onSubmit: async (values, helpers) => {
   try {
    handleSubmitImages();
   } catch (err) {
    helpers.setStatus({ success: false });
    helpers.setErrors({ submit: err.message });
    helpers.setSubmitting(false);
   }
  },
 });

 useEffect(() => {
  setFileList(
   formik.values?.map((image, index) => ({
    uid: index,
    name: image.fileName,
    status: "done",
    path: image.filePath,
    url: image.fileUrl,
   }))
  );
 }, [formik.values]);

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
       { label: "Hình ảnh/video tội phạm", name: "criminalImages", upload: true },
      ].map((field) => (
       <Grid key={field.name} xs={12} md={field.md || 12}>
        {loading || formik.values === null ? (
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
         onClick={isFieldDisabled ? handleEditImages : formik.handleSubmit}
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
    )}

   </Card>
  </form>
 );
};

export default CriminalImages;
