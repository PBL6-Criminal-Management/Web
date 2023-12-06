import { Unstable_Grid2 as Grid, TextField, Button, Card, CardContent, CardActions, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Skeleton from '@mui/material/Skeleton';
import * as constants from '../../../../constants/constants';
import { format, parse } from 'date-fns';
import { useState } from 'react';

const CriminalGeneral = (props) => {
    const { state, loading, handleChange, handleDateChange, handleSubmit, handleEdit, handleCancel } = props;
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);

    const handleEditGeneral = () => {
        setIsFieldDisabled(false);
        handleEdit();
    }

    const handleSubmitGeneral = () => {
        setIsFieldDisabled(true);
        handleSubmit();
    }

    const handleCancelGeneral = () => {
        setIsFieldDisabled(true);
        handleCancel();
    }

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
                        { label: 'Họ và tên', name: 'name', md: 3, required: true },
                        { label: 'Tên khác', name: 'anotherName', md: 3 },
                        { label: 'Ngày sinh', name: 'birthday', md: 2, datePicker: true, required: true },
                        { label: 'Giới tính', name: 'gender', md: 1.5, select: true, required: true, selectProps: constants.gender },
                        { label: 'CMND/CCCD', name: 'citizenId', md: 2.5, required: true },
                        { label: 'Số điện thoại', name: 'phoneNumber', md: 2 },
                        { label: 'Quê quán', name: 'homeTown', md: 7, required: true },
                        { label: 'Quốc tịch', name: 'nationality', md: 3, required: true },
                        { label: 'Dân tộc', name: 'ethnicity', md: 3 },
                        { label: 'Tôn giáo', name: 'religion', md: 3 },
                        { label: 'Nghề nghiệp, nơi làm việc', name: 'careerAndWorkplace', md: 6 },
                        { label: 'Nơi ĐKTT', name: 'permanentResidence', md: 6, required: true },
                        { label: 'Nơi ở hiện tại', name: 'currentAccommodation', md: 6, required: true },
                        { label: 'Họ và tên cha', name: 'fatherName', md: 6 },
                        { label: 'Ngày sinh cha', name: 'fatherBirthday', md: 3, datePicker: true },
                        { label: 'CMND/CCCD cha', name: 'fatherCitizenId', md: 3 },
                        { label: 'Họ và tên mẹ', name: 'motherName', md: 6 },
                        { label: 'Ngày sinh mẹ', name: 'motherBirthday', md: 3, datePicker: true },
                        { label: 'CMND/CCCD mẹ', name: 'motherCitizenId', md: 3 },
                        { label: 'Đặc điểm nhận dạng', name: 'characteristics', textArea: true, required: true },
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
                                        value={state.criminal[field.name] ? parse(state.criminal[field.name], 'dd/MM/yyyy', new Date()) : null}
                                        onChange={(date) => handleDateChange(field.name, date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
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
                                        onChange={handleChange}
                                        required={field.required || false}
                                        select={field.select}
                                        SelectProps={field.select ? { native: true } : undefined}
                                        value={state.criminal[field.name]}
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
                <Button
                    variant="contained"
                    onClick={isFieldDisabled ? handleEditGeneral : handleSubmitGeneral}
                >
                    {isFieldDisabled ? 'Chỉnh sửa thông tin' : 'Cập nhật thông tin'}
                </Button>
                {!isFieldDisabled && (
                    <Button variant="outlined" onClick={handleCancelGeneral}>
                        Hủy
                    </Button>
                )}
            </CardActions>
        </Card>
    )
};

export default CriminalGeneral;