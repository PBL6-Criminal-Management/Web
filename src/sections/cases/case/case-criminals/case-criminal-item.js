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
} from '@mui/material';
import * as constants from '../../../../constants/constants';
import { Collapse, Button } from 'antd';
import { useState, useEffect, memo } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import NextLink from 'next/link';
import { parse } from 'date-fns';

const CaseCriminalItem = (props) => {
    const { state, criminal, criminals, index, loading, handleChangeCriminals, handleDateTimeChangeCriminals, handleSubmit, handleEdit, handleCancel, handleDeleteCriminal } = props;
    const [originalCriminal, setOriginalCriminal] = useState(criminal);
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState({});
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    useEffect(() => {
        if (criminal) {
            setOriginalCriminal(criminal);
        }
    }, [criminal]);    

    const removeItemsById = (originalList, valuesList, idToExclude) => {
        const idsToRemove = valuesList.map(item => item.id);
        return originalList.filter(item => {
            const isIdToExclude = item.id === idToExclude;
            const isIdInValuesList = idsToRemove.includes(item.id);
            return isIdToExclude || !isIdInValuesList;
        });
    };

    useEffect(() => {
        if (criminals && originalCriminal) {
            const options = removeItemsById(criminals, state.casee.criminals, originalCriminal.id);
            setOptions(options);
        }
    }, [originalCriminal]);

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

    const handleSubmitCriminal = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleSubmit();
        setOriginalCriminal(value);

    }

    const handleCancelCriminal = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleCancel();
        setValue(options.find(option => option.id === originalCriminal?.id));
    }

    const handleEditCriminal = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleEdit();
    }

    useEffect(() => {
        if (options && originalCriminal) {
            const newValue = options.find(option => option.id === originalCriminal.id);
            setValue(newValue);
        }
    }, [originalCriminal, options]);

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
                        onClick={handleEditCriminal}
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
                            onClick={handleSubmitCriminal}
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
                            onClick={handleCancelCriminal}
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

    return options && (
        <>
            <Collapse
                onChange={handleCollapseChange}
                items={[
                    {
                        extra: isExpanded ? extraBtns() : null,
                        label:
                            <Stack direction="row" spacing={0.5}>
                                <Typography>
                                    Tội phạm {index + 1}
                                </Typography>
                                {
                                    value && (
                                        <>
                                            <Typography>: </Typography>
                                            <Tooltip title="Xem chi tiết tội phạm này">
                                                <Typography
                                                    color='primary'
                                                    component={NextLink}
                                                    href={{
                                                        pathname: '/criminals/[id]',
                                                        query: { id: encodeURIComponent(value.id), name: encodeURIComponent(value.name) },
                                                    }}
                                                >
                                                    {value?.name}
                                                </Typography>
                                            </Tooltip>
                                        </>
                                    )
                                }
                            </Stack >,
                        children:
                            <Grid container spacing={3}>
                                {[
                                    { label: 'Liên kết tội phạm', name: 'id', md: 3, required: true, autoComplete: true },
                                    { label: 'Tên khác', name: 'anotherName', md: 3, disabled: true, info: true },
                                    { label: 'Ngày sinh', name: 'birthday', md: 2, disabled: true, info: true },
                                    { label: 'Giới tính', name: 'gender', md: 1.5, disabled: true, info: true },
                                    { label: 'CMND/CCCD', name: 'citizenId', md: 2.5, disabled: true, info: true },
                                    { label: 'Quê quán', name: 'homeTown', md: 4, disabled: true, info: true },
                                    { label: 'Nơi ĐKTT', name: 'permanentResidence', md: 4, disabled: true, info: true },
                                    { label: 'Nơi ở hiện tại', name: 'currentAccommodation', md: 4, disabled: true, info: true },
                                    { label: 'Quốc tịch', name: 'nationality', md: 6, disabled: true, info: true },
                                    { label: 'Dân tộc', name: 'ethnicity', md: 6, disabled: true, info: true },
                                    { label: 'Tội danh', name: 'charge', md: 3 },
                                    { label: 'Nguyên nhân', name: 'reason', md: 3 },
                                    { label: 'Vũ khí', name: 'weapon', md: 3 },
                                    { label: 'Loại vi phạm', name: 'typeOfViolation', md: 3, select: true, selectProps: constants.typeOfViolation },
                                    { label: 'Thời gian lấy lời khai gần nhất', name: 'date', dateTimePicker: true },
                                    { label: 'Lời khai', name: 'testimony', textArea: true }
                                ].map((field) => (
                                    <Grid key={field.name} xs={12} md={field.md || 12}>
                                        {loading ? (
                                            <Skeleton variant="rounded">
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            field.autoComplete ? (
                                                <Autocomplete
                                                    id="autocomplete-criminal"
                                                    autoHighlight={true}
                                                    disabled={isFieldDisabled || field.disabled}
                                                    name={field.name}
                                                    label={field.label}
                                                    disablePortal
                                                    fullWidth
                                                    options={options}
                                                    getOptionLabel={option => option.name ?? ''}
                                                    isOptionEqualToValue={(option, value) => {
                                                        if (value === null || value === undefined) {
                                                            return option === value;
                                                        }
                                                        return option.id === value.id;
                                                    }}
                                                    onChange={async (event, value) => {
                                                        if (value === null || value === undefined) {
                                                            setValue('');
                                                            handleChangeCriminals(event, '', index);
                                                        } else {
                                                            setValue(value);
                                                            handleChangeCriminals(event, value, index);
                                                        }
                                                        
                                                    }}
                                                    value={value}
                                                    renderOption={(props, option) => (
                                                        <Box
                                                            component="li"
                                                            key={option.id}
                                                            {...props}
                                                        >
                                                            <Avatar
                                                                sx={{
                                                                    mr: 1.5,
                                                                    height: 32,
                                                                    width: 32
                                                                }}
                                                                src={option?.avatarLink}
                                                            />

                                                            ({option.code}) - {option.name}
                                                        </Box>
                                                    )}  // Set the default value based on the criminal prop
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            disabled={isFieldDisabled || field.disabled}
                                                            label={field.label}
                                                            required={field.required || false}
                                                            sx={{
                                                                "& .MuiInputBase-input": {
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis"
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            ) : (
                                                field.dateTimePicker ? (
                                                    <DateTimePicker
                                                        disabled={isFieldDisabled || field.disabled}
                                                        label={field.label}
                                                        value={criminal[field.name] ? parse(criminal[field.name], 'HH:mm dd/MM/yyyy', new Date()) : null}
                                                        onChange={(date) => handleDateTimeChangeCriminals(field.name, date, index)}
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
                                                        onChange={(event) => handleChangeCriminals(event, null, index)}
                                                        required={field.required || false}
                                                        select={field.select}
                                                        SelectProps={field.select ? { native: true } : undefined}
                                                        value={value ? (field.info ? (field.name === 'gender' ? constants.gender[value[field.name]] : value[field.name]) : (criminal ? criminal[field.name] : '')) : ''}
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
                <DialogTitle>Xác nhận xóa tội phạm {value?.name}</DialogTitle>
                <DialogContent>
                    Bạn có chắc chắn muốn xóa tội phạm này?
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

export default CaseCriminalItem;