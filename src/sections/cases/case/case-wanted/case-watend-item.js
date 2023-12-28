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
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import Link from 'next/link';
import { parse } from 'date-fns';

const CaseWantedItem = (props) => {
    const { state, wanted, criminals, index, loading, handleChangeWanted, handleDateChangeWanted, handleSubmit, handleEdit, handleCancel, handleDeleteWanted } = props;
    const [originalWanted, setOriginalWanted] = useState(wanted);
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState({});
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    useEffect(() => {
        if (wanted) {
            setOriginalWanted(wanted);
        }
    }, [wanted]);

    const removeItemsById = (originalList, valuesList, idToExclude) => {
        const idsToRemove = valuesList.map(item => item.criminalId);
        return originalList.filter(item => {
            const isIdToExclude = item.id === idToExclude;
            const isIdInValuesList = idsToRemove.includes(item.id);
            return isIdToExclude || !isIdInValuesList;
        });
    };

    const removeItems = (originalList, valuesList) => {
        const idsToKeep = valuesList.map(item => item.id);
        return originalList.filter(item => {
            return idsToKeep.includes(item.id);
        });
    };

    useEffect(() => {
        if (criminals && originalWanted) {
            const originalOptions = removeItems(criminals, state.casee.criminals);
            const options = removeItemsById(originalOptions, state.casee.wantedCriminalRequest, originalWanted.criminalId);
            console.log(options, index);
            setOptions(options);
        }
    }, [originalWanted, state.casee.wantedCriminalRequest]);

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

    const handleSubmitWanted = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleSubmit();
        const {id, ...values} = value;
        setOriginalWanted({
            criminalId: id,
            ...values,
        });
    }

    const handleCancelWanted = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleCancel();
        setValue(options.find(option => option.id === originalWanted.criminalId));
    }

    const handleEditWanted = (e) => {
        e.stopPropagation();
        setIsFieldDisabled(prev => !prev);
        handleEdit();
    }

    useEffect(() => {
        if (options && originalWanted) {
            const newValue = options.find(option => option.id === originalWanted.criminalId);
            setValue(newValue);
        }
    }, [originalWanted, options]);

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
                        onClick={handleEditWanted}
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
                            onClick={handleSubmitWanted}
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
                            onClick={handleCancelWanted}
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
                                    Tội phạm truy nã {index + 1}
                                </Typography>
                                {
                                    value && (
                                        <>
                                            <Typography>: </Typography>
                                            <Tooltip title="Xem chi tiết tội phạm này">
                                                <Typography
                                                    color='primary'
                                                    component={Link}
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
                                    { label: 'Liên kết tội phạm', name: 'criminalId', md: 3, required: true, autoComplete: true },
                                    { label: 'Loại truy nã', name: 'wantedType', md: 2, select: true, selectProps: constants.wantedType },
                                    { label: 'Hoạt động hiện hành', name: 'currentActivity', md: 7 },
                                    { label: 'Số ra quyết định', name: 'wantedDecisionNo', md: 3 },
                                    { label: 'Ngày ra quyết định', name: 'wantedDecisionDay', md: 2, datePicker: true },
                                    { label: 'Đơn vị ra quyết định', name: 'decisionMakingUnit', md: 7 },
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
                                                            handleChangeWanted(event, '', index);
                                                        } else {
                                                            setValue(value);
                                                            handleChangeWanted(event, value, index);
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
                                                field.datePicker ? (
                                                    <DatePicker
                                                        disabled={state.isFieldDisabled || field.disabled}
                                                        label={field.label}
                                                        value={wanted[field.name] ? parse(wanted[field.name], 'dd/MM/yyyy', new Date()) : null}
                                                        onChange={(date) => handleDateChangeWanted(field.name, date, index)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                fullWidth
                                                                disabled={isFieldDisabled || field.disabled}
                                                                InputLabelProps={{ shrink: true }}
                                                                required={field.required || false}
                                                                onKeyDown={(e) => e.preventDefault()}
                                                            />
                                                        )}
                                                        maxDate={new Date()} // Assuming current date is the maximum allowed
                                                    />
                                                ) : (
                                                    <TextField
                                                        multiline={field.textArea || false}
                                                        disabled={isFieldDisabled || field.disabled}
                                                        fullWidth
                                                        label={field.label}
                                                        name={field.name}
                                                        onChange={(event) => handleChangeWanted(event, null, index)}
                                                        required={field.required || false}
                                                        select={field.select}
                                                        SelectProps={field.select ? { native: true } : undefined}
                                                        value={value ? wanted[field.name] : ''}
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
                <DialogTitle>Xác nhận xóa tội phạm truy nã {value?.name}</DialogTitle>
                <DialogContent>
                    Bạn có chắc chắn muốn xóa tội phạm truy nã này?
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

export default CaseWantedItem;