import { Unstable_Grid2 as Grid, TextField, Button, Card, CardContent, CardActions, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Skeleton from '@mui/material/Skeleton';
import * as constants from '../../../../constants/constants';
import { format, parse } from 'date-fns';
import { useState } from 'react';

const CriminalInfo = ({ state, loading, handleChange, handleDateChange, handleSubmit, handleEdit, handleCancel }) => {
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);

    const handleEditInfo = () => {
        setIsFieldDisabled(false);
        handleEdit();
    }

    const handleSubmitInfo = () => {
        setIsFieldDisabled(true);
        handleSubmit();
    }

    const handleCancelInfo = () => {
        setIsFieldDisabled(true);
        handleCancel();
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    {[
                        { label: 'Tình trạng', name: 'status', md: 3, required: true, select: true, required: true, selectProps: constants.criminalStatus },
                        { label: 'Mức độ nguy hiểm', name: 'dangerousLevel', md: 3, required: true },
                        { label: 'Ngày phạm tội gần nhất', name: 'dateOfMostRecentCrime', md: 3, datePicker: true, required: true },
                        { label: 'Ngày được thả', name: 'releaseDate', md: 3, datePicker: true, required: true },
                        { label: 'Tội danh gần nhất', name: 'charge', multiline: true, md: 6 },
                        { label: 'Vụ án liên quan', name: 'relatedCases', multiline: true, md: 6 },
                        { label: 'Thông tin xuất, nhập cảnh', name: 'entryAndExitInformation', md: 6 },
                        { label: 'Phương tiện di chuyển', name: 'vehicles', md: 6 },
                        { label: 'Tài khoản ngân hàng', name: 'bankAccount', md: 6 },
                        { label: 'Tài khoản game', name: 'gameAccount', md: 6 },
                        { label: 'Facebook', name: 'facebook', md: 6 },
                        { label: 'Zalo', name: 'zalo', md: 6 },
                        { label: 'Mạng xã hội khác', name: 'otherSocialNetworks', md: 6 },
                        { label: 'Model điện thoại', name: 'phoneModel', md: 6 },
                        { label: 'Nghiên cứu', name: 'research', md: 6 },
                        { label: 'Bố trí tiếp cận', name: 'approachArrange', md: 6 },
                        { label: 'Thông tin khác', name: 'otherInformation', md: 12 },
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
            <Divider/>
            <CardActions 
                sx={{ justifyContent: 'flex-end' }}
            >
                <Button
                variant="contained"
                onClick={isFieldDisabled ? handleEditInfo : handleSubmitInfo}
              >
                {isFieldDisabled ? 'Chỉnh sửa thông tin' : 'Cập nhật thông tin'}
              </Button>
              {!isFieldDisabled && (
                <Button variant="outlined" onClick={handleCancelInfo}>
                  Hủy
                </Button>
              )}
            </CardActions>
        </Card>
    )
};

export default CriminalInfo;