import { Unstable_Grid2 as Grid, TextField, Button, Card, CardContent, CardActions, Divider } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Skeleton from '@mui/material/Skeleton';
import { LoadingButton } from '@mui/lab';
import * as constants from '../../../constants/constants';
import { parse } from 'date-fns';
import { useState, useEffect } from 'react';


const CaseGeneral = (props) => {
    const { state, loading, loadingButtonDetails, loadingButtonPicture, handleChangeGeneral, handleDateTimeChange, handleSubmit, handleEdit, handleCancel } = props;
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (!loadingButtonDetails && hasSubmitted) {
            setIsClicked(false);
            setHasSubmitted(false);
        }
    }, [loadingButtonDetails, hasSubmitted]);

    const handleEditGeneral = () => {
        setIsFieldDisabled(false);
        setIsClicked(false);
        handleEdit();
    }

    const handleSubmitGeneral = () => {
        setIsFieldDisabled(true);
        setIsClicked(true);
        setHasSubmitted(true);
        handleSubmit();
    }

    const handleCancelGeneral = () => {
        setIsClicked(false);
        setIsFieldDisabled(true);
        handleCancel();
    }

    console.log

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
                        { label: 'Tình trạng', name: 'status', md: 3, select: true, required: true, selectProps: constants.caseStatus },
                        { label: 'Loại vi phạm', name: 'typeOfViolation', md: 3, select: true, required: true, selectProps: constants.typeOfViolation },
                        { label: 'Thời gian bắt đầu', name: 'startDate', md: 3, dateTimePicker: true, required: true },
                        { label: 'Thời gian kết thúc', name: 'endDate', md: 3, dateTimePicker: true },
                        { label: 'Tội danh chính', name: 'charge', required: true, md: 9 },
                        { label: 'Khu vực xảy ra', name: 'area', md: 3 },
                        { label: 'Chi tiết vụ án', name: 'description', textArea: true },
                    ].map((field) => (
                        <Grid key={field.name} xs={12} md={field.md || 12}>
                            {loading ? (
                                <Skeleton variant="rounded">
                                    <TextField fullWidth />
                                </Skeleton>
                            ) : (
                                field.dateTimePicker ? (
                                    <DateTimePicker
                                        disabled={isFieldDisabled || field.disabled}
                                        label={field.label}
                                        value={state.casee[field.name] ? parse(state.casee[field.name], 'HH:mm dd/MM/yyyy', new Date()) : null}
                                        onChange={(date) => handleDateTimeChange(field.name, date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
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
                                        onChange={e => handleChangeGeneral(e)}
                                        required={field.required || false}
                                        select={field.select}
                                        SelectProps={field.select ? { native: true } : undefined}
                                        value={state.casee[field.name]}
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
                                )
                            )}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
            <Divider />
            <CardActions
                sx={{ justifyContent: 'flex-end' }}
            >
                {isClicked ? (
                    loadingButtonDetails && (
                        <LoadingButton
                            disabled
                            loading={loadingButtonDetails}
                            size="medium"
                            variant="contained">
                            Chỉnh sửa thông tin
                        </LoadingButton>
                    )
                ) : (
                    <>
                        <Button
                            variant="contained"
                            onClick={isFieldDisabled ? handleEditGeneral : handleSubmitGeneral}
                            disabled={loadingButtonPicture}
                        >
                            {isFieldDisabled ? 'Chỉnh sửa thông tin' : 'Cập nhật thông tin'}
                        </Button>
                        {!isFieldDisabled && (
                            <Button variant="outlined" onClick={handleCancelGeneral}>
                                Hủy
                            </Button>
                        )}
                    </>
                )}
            </CardActions>
        </Card>
    )
};

export default CaseGeneral;