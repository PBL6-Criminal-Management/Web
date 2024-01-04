import {
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Skeleton,
  Autocomplete,
  Box,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState, useEffect } from "react";

const CaseInvestigators = (props) => {
  const {
    investigatorsOfCase,
    investigators,
    loading,
    loadingButtonDetails,
    loadingButtonPicture,
    handleSubmit,
    isSubmitting
  } = props;
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [investigatorState, setInvestigatorState] = useState(investigatorsOfCase);

  useEffect(() => {
    if (isSubmitting) {
      handleSubmitInvestigators();
    }
  }, [isSubmitting]);


  const handleSubmitInvestigators = () => {
    handleSubmit(investigatorState);
  };

  useEffect(() => {
    if (investigatorState && options) {
      console.log(
        "set value",
        investigators?.filter((investigator) =>
          investigatorState.map((i) => i.id).includes(investigator.id)
        )
      );
      setValue(
        investigators?.filter((investigator) =>
          investigatorState.map((i) => i.id).includes(investigator.id)
        )
      );
    }
    setOptions(investigators);
  }, [investigatorState, options]);

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
          {[{ label: "Điều tra viên", name: "investigatorIds", autoComplete: true }].map(
            (field) => (
              <Grid key={field.name} xs={12} md={field.md || 12}>
                {loading ? (
                  <Skeleton variant="rounded">
                    <TextField fullWidth />
                  </Skeleton>
                ) : (
                  field.autoComplete && (
                    <Autocomplete
                      id="autocomplete-investigators"
                      multiple
                      autoHighlight={true}
                      name={field.name}
                      label={field.label}
                      disablePortal
                      fullWidth
                      options={options}
                      getOptionLabel={(option) => (value ? option.name : "")}
                      // isOptionEqualToValue={(option, value) => {
                      //     if (value === null || value === undefined) {
                      //         return option === value;
                      //     }
                      //     return option.id === value.id;
                      // }}
                      // onChange={async (event, value) => {
                      //     if (value === null || value === undefined) {
                      //         setValue('');
                      //         handleChangeCriminals(event, '', index);
                      //     } else {
                      //         setValue(value);
                      //         handleChangeCriminals(event, value, index);
                      //     }

                      // }}

                      onChange={(event, value) => {
                        setInvestigatorState(value);
                        setValue(value);
                      }}
                      value={value}
                      renderOption={(props, option) => (
                        <Box component="li" key={option.id} {...props}>
                          <Avatar
                            sx={{
                              mr: 1.5,
                              height: 32,
                              width: 32,
                            }}
                            src={option?.imageLink}
                          />
                          ({option.name}) - {option.username}
                        </Box>
                      )} // Set the default value based on the criminal prop
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // disabled={isFieldDisabled || field.disabled}
                          label={field.label}
                          required={field.required || false}
                          sx={{
                            "& .MuiInputBase-input": {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      )}
                    />
                  )
                )}
              </Grid>
            )
          )}
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
              onClick={isFieldDisabled ? handleEditInvestigators : handleSubmitInvestigators}
              disabled={loadingButtonPicture}
            >
              {isFieldDisabled ? "Chỉnh sửa thông tin" : "Cập nhật thông tin"}
            </Button>
            {!isFieldDisabled && (
              <Button variant="outlined" onClick={handleCancelInvestigators}>
                Hủy
              </Button>
            )}
          </>
        )}
      </CardActions> */}
    </Card>
  );
};

export default CaseInvestigators;
