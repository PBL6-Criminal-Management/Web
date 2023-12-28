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
    Button as ButtonMUI
} from '@mui/material';
import { Collapse, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Image } from 'antd';
import * as imagesApi from '../../../../api/images';
import ReactPlayer from 'react-player';

// import { useSnackbar } from 'notistack';

// const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });

const CaseEvidenceItem = (props) => {
    const { state, evidence, index, loading, handleChangeEvidences, handleSubmit, handleEdit, handleCancel, handleDeleteEvidence, handleAddImageEvidence, handleDeleteImageEvidence } = props;
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const getFileType = (url) => {
        const extension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg']; // Additional image extensions
        const videoExtensions = ['mp4', 'webm', 'avi', 'mkv', 'mov', 'flv', 'wmv']; // Additional video extensions

        if (imageExtensions.includes(extension.toLowerCase())) {
            return 'image';
        } else if (videoExtensions.includes(extension.toLowerCase())) {
            return 'video';
        } else {
            return 'unknown';
        }
    };
    const [fileList, setFileList] = useState(
        state.casee.evidences[index].evidenceImages.map((image, index) => ({
            uid: index,
            name: image.fileName,
            status: 'done',
            path: image.filePath,
            url: image.fileUrl,
        }))
    );

    const handleSuccess = (response, filename) => {
        const newImage = {
            fileName: filename,
            filePath: response[0].filePath,
            fileUrl: response[0].fileUrl
        }
        handleAddImageEvidence(newImage, index);
        setFileList(prevFileList => [...prevFileList, {
            uid: prevFileList.length,
            name: filename,
            status: 'done',
            path: response[0].filePath,
            url: response[0].fileUrl,
        }]);
        console.log("fileList success", fileList);
    };

    const handleError = (error) => {
        console.log("handleError", error);
        setFileList(
            state.casee.evidences[index].evidenceImages.map((image, index) => ({
                uid: index,
                name: image.fileName,
                status: 'done',
                path: image.filePath,
                url: image.fileUrl,
            }))
        );
    }

    const handleRemove = async (file) => {
        try {
            const imageIndex = fileList.findIndex(media => media.uid === file.uid);
            const filePath = file.path;
            const messages = await imagesApi.deleteImage(filePath);
            console.log("messages", messages);
            handleDeleteImageEvidence(imageIndex, index);
        } catch (e) {
            console.error(e);
        }

    };

    const uploadImage = async (options) => {
        const { onProgress, onSuccess, onError, file } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("Files", file);
        try {
            const response = await imagesApi.uploadImage(fmData, config);
            onSuccess(response, file.name);
        } catch (error) {
            onError(error);
        }
    };

    useEffect(() => {
        setFileList(
            state.casee.evidences[index].evidenceImages.map((image, index) => ({
                uid: index,
                name: image.fileName,
                status: 'done',
                path: image.filePath,
                url: image.fileUrl,
            }))
        );
    }, [state.casee.evidences[index].evidenceImages]);

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
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleSubmit();
    }

    const handleCancelEvidence = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleCancel();
    }

    const handleEditEvidence = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleEdit();
    }

    const extraBtns = () => (
        <Stack
            direction="row"
            spacing={-0.5}
            justifyContent="flex-end"
            alignItems="center"
        >
            {isFieldDisabled && (
                <Tooltip title="Chỉnh sửa">
                    <Button
                        type='text'
                        icon={
                            <SvgIcon fontSize="small">
                                <PencilSquareIcon />
                            </SvgIcon>
                        }
                        shape='circle'
                        onClick={handleEditEvidence}
                    />
                </Tooltip>
            )}

            {!isFieldDisabled && (
                <>
                    <Tooltip title="Cập nhật">
                        <Button
                            type='text'
                            icon={
                                <SvgIcon fontSize="small">
                                    <CheckCircleIcon />
                                </SvgIcon>
                            }
                            shape='circle'
                            onClick={handleSubmitEvidence}
                        />
                    </Tooltip>
                    <Tooltip title="Hủy">
                        <Button
                            type='text'
                            icon={
                                <SvgIcon fontSize="small">
                                    <XCircleIcon />
                                </SvgIcon>
                            }
                            shape='circle'
                            onClick={handleCancelEvidence}
                        />
                    </Tooltip>
                </>
            )}

            <Tooltip title="Xóa">
                <Button
                    type='text'
                    icon={
                        <SvgIcon fontSize="small">
                            <TrashIcon />
                        </SvgIcon>
                    }
                    shape='circle'
                    onClick={handleDeleteClick}
                />
            </Tooltip>
        </Stack>
    );

    const handleCollapseChange = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <>
            <Collapse
                onChange={handleCollapseChange}
                items={[
                    {
                        extra: isExpanded ? extraBtns() : null,
                        label:
                            <Stack direction="row" spacing={0.5}>
                                <Typography >
                                    Vật chứng {index + 1}{evidence.name && `: ${evidence.name}`}
                                </Typography>
                            </Stack >,
                        children:
                            <Grid container spacing={3}>
                                {[
                                    { label: 'Tên', name: 'name', required: true },
                                    { label: 'Mô tả', name: 'description', textArea: true },
                                    { label: 'Hình ảnh', name: 'evidenceImages', required: true, upload: true },
                                ].map((field) => (
                                    <Grid key={field.name} xs={12} md={field.md || 12}>
                                        {loading ? (
                                            <Skeleton variant="rounded">
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            field.upload ? (
                                                <>
                                                    <Upload
                                                        disabled={isFieldDisabled || field.disabled}
                                                        accept="image/*,video/*"
                                                        name={field.name}
                                                        customRequest={(options) => uploadImage({ ...options, onSuccess: handleSuccess, onError: handleError })}
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
                                                                    return getFileType(fileList[info.current].url) !== 'image'
                                                                        ? null
                                                                        : originalNode
                                                                },
                                                                imageRender: (originalNode, info) => {
                                                                    return getFileType(fileList[info.current].url) === 'image' ? (
                                                                        originalNode
                                                                    ) : (
                                                                        <ReactPlayer
                                                                            url={fileList[info.current].url}
                                                                            controls
                                                                            height="100%"
                                                                            width="100%"
                                                                        />
                                                                    );
                                                                }
                                                            }}
                                                            items={fileList.map((file) => file.url)}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <TextField
                                                    multiline={field.textArea || false}
                                                    disabled={isFieldDisabled || field.disabled}
                                                    fullWidth
                                                    label={field.label}
                                                    name={field.name}
                                                    onChange={(event) => handleChangeEvidences(event, index)}
                                                    required={field.required || false}
                                                    select={field.select}
                                                    SelectProps={field.select ? { native: true } : undefined}
                                                    value={evidence[field.name]}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"
                                                        }
                                                    }}
                                                >
                                                    {field.select &&
                                                        Object.entries(field.selectProps).map(([value, label]) => (
                                                            <option key={value} value={value}>
                                                                {label}
                                                            </option>
                                                        ))}
                                                </TextField>
                                            ))
                                        }
                                    </Grid>
                                ))}
                            </Grid>
                    },
                ]}
            />
            <Dialog open={openDeletePopup} onClose={handleDeleteCancel}>
                <DialogTitle>Xác nhận xóa bằng chứng {evidence?.name}</DialogTitle>
                <DialogContent>
                    Bạn có chắc chắn muốn xóa bằng chứng này?
                </DialogContent>
                <DialogActions>
                    <ButtonMUI onClick={handleDeleteCancel} color="primary">
                        Hủy
                    </ButtonMUI>
                    <ButtonMUI onClick={handleDeleteConfirm} color="error">
                        Xác nhận
                    </ButtonMUI>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CaseEvidenceItem;