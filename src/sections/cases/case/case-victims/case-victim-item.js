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
import * as constants from '../../../../constants/constants';
import { Collapse, Space, Button } from 'antd';
import { useState, useEffect } from 'react';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { parse } from 'date-fns';
import { vi } from 'date-fns/locale';

const CaseVictimItem = (props) => {
    const { state, victim, index, loading, handleChangeVictims, handleDateChangeVictims, handleDateTimeChangeVictims, handleSubmit, handleEdit, handleCancel, handleDeleteVictim } = props;
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

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

    const handleSubmitVictim = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleSubmit();
    }

    const handleCancelVictim = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleCancel();
    }

    const handleEditVictim = (e) => {
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
                        onClick={handleEditVictim}
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
                            onClick={handleSubmitVictim}
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
                            onClick={handleCancelVictim}
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

    // const getCriminal = async () => {
    //     const criminal = options.find(option => option.id === criminalId);
    //     setValue(criminal);
    // };

    const handleCollapseChange = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    };

    // useEffect(() => {
    //     if (criminalId) {
    //         getCriminal();
    //     }
    // }, [criminalId]);

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
                                    Nạn nhân {index + 1}{victim.name && `: ${victim.name}`}
                                </Typography>
                            </Stack >,
                        children:
                            <Grid container spacing={3}>
                                {[
                                    { label: 'Họ và tên', name: 'name', md: 3, required: true },
                                    { label: 'Ngày sinh', name: 'birthday', md: 2, datePicker: true },
                                    { label: 'Giới tính', name: 'gender', md: 1.5, required: true, select: true, selectProps: constants.gender },
                                    { label: 'CMND/CCCD', name: 'citizenId', md: 2.5, required: true },
                                    { label: 'Số điện thoại', name: 'phoneNumber', md: 3 },
                                    { label: 'Địa chỉ thường trú', name: 'address', md: 6 },
                                    { label: 'Thời gian lấy lời khai gần nhất', name: 'date', dateTimePicker: true, md: 6 },
                                    { label: 'Lời khai', name: 'testimony', textArea: true },
                                ].map((field) => (
                                    <Grid key={field.name} xs={12} md={field.md || 12}>
                                        {loading ? (
                                            <Skeleton variant="rounded">
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            field.datePicker ? (
                                                <DatePicker
                                                    disabled={isFieldDisabled || field.disabled}
                                                    label={field.label}
                                                    value={victim[field.name] ? parse(victim.birthday, 'dd/MM/yyyy', new Date()) : null}
                                                    onChange={(date) => handleDateChangeVictims(field.name, date, index)}
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
                                            ) : (
                                                field.dateTimePicker ? (
                                                    <DateTimePicker
                                                        disabled={isFieldDisabled || field.disabled}
                                                        label={field.label}
                                                        value={victim[field.name] ? parse(victim[field.name], 'HH:mm dd/MM/yyyy', new Date()) : null}
                                                        onChange={(date) => handleDateTimeChangeVictims(field.name, date, index)}
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
                                                        multiline={field.textArea || false}
                                                        disabled={isFieldDisabled || field.disabled}
                                                        fullWidth
                                                        label={field.label}
                                                        name={field.name}
                                                        onChange={(event) => handleChangeVictims(event, index)}
                                                        required={field.required || false}
                                                        select={field.select}
                                                        SelectProps={field.select ? { native: true } : undefined}
                                                        value={victim[field.name]}
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
                                                )))
                                        }
                                    </Grid>
                                ))}
                            </Grid>
                    },
                ]}
            />
            <Dialog open={openDeletePopup} onClose={handleDeleteCancel}>
                <DialogTitle>Xác nhận xóa nạn nhân {victim?.name}</DialogTitle>
                <DialogContent>
                    Bạn có chắc chắn muốn xóa nạn nhân này?
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

export default CaseVictimItem;