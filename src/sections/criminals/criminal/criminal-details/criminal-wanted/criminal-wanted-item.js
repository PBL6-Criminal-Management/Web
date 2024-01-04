import { TextField, Unstable_Grid2 as Grid, Skeleton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as constants from "../../../../../constants/constants";
import { parse } from "date-fns";
import { Collapse, Space } from "antd";

const CriminalWantedItem = (props) => {
  const { title, wanted, loading } = props;

  return (
    <Collapse
      items={[
        {
          label: `Lần ${title}`,
          children: (
            <Grid container spacing={3}>
              {[
                { label: "Mã vụ án", name: "caseId", md: 3, disabled: true },
                { label: "Tội danh", name: "charge", md: 6.5, disabled: true },
                {
                  label: "Loại truy nã",
                  name: "wantedType",
                  md: 2.5,
                  disabled: true,
                  selectProps: constants.wantedType,
                },
                { label: "Vũ khí", name: "weapon", md: 5.5, disabled: true },
                { label: "Hoạt động hiện hành", md: 6.5, name: "currentActivity", disabled: true },
                { label: "Số ra quyết định", name: "wantedDecisionNo", md: 3, disabled: true },
                { label: "Ngày ra quyết định", name: "wantedDecisionDay", md: 2.5, disabled: true },
                {
                  label: "Đơn vị ra quyết định",
                  name: "decisionMakingUnit",
                  md: 6.5,
                  disabled: true,
                },
              ].map((field) => (
                <Grid key={field.name} xs={12} md={field.md || 12}>
                  {loading ? (
                    <Skeleton variant="rounded">
                      <TextField fullWidth />
                    </Skeleton>
                  ) : field.datePicker ? (
                    <DatePicker
                      disabled={true}
                      label={field.label}
                      value={
                        wanted[field.name]
                          ? parse(wanted[field.name], "dd/MM/yyyy", new Date())
                          : null
                      }
                      onChange={(date) => handleDateChange(field.name, date, index)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          required={field.required || false}
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      )}
                      maxDate={new Date()} // Assuming the current date is the maximum allowed
                    />
                  ) : (
                    <TextField
                      multiline={field.textArea || false}
                      disabled={true}
                      fullWidth
                      label={field.label}
                      name={field.name}
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={
                        field.selectProps
                          ? field.selectProps[wanted[field.name]]
                          : wanted[field.name]
                      }
                      required={field.required || false}
                      sx={{
                        "& .MuiInputBase-input": {
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    ></TextField>
                  )}
                </Grid>
              ))}
            </Grid>
          ),
        },
      ]}
    />
    // <AccordionSection
    //     summary={`Lần ${title}`}
    //     summaryVariant="h6"
    //     sx={{
    //         p: 0,
    //         borderBottomLeftRadius: 0,
    //         borderBottomRightRadius: 0,
    //         m: '16px'
    //     }}
    // >
    //     <Grid container spacing={3}>
    //         {[
    //             { label: 'Mã vụ án', name: 'caseId', md: 3, disabled: true},
    //             { label: 'Tội danh', name: 'charge', md: 6.5, disabled: true},
    //             { label: 'Loại truy nã', name: 'wantedType', md: 2.5, disabled: true, selectProps: constants.wantedType },
    //             { label: 'Hoạt động hiện hành', name: 'currentActivity', disabled: true },
    //             { label: 'Số ra quyết định', name: 'wantedDecisionNo', md: 3, disabled: true },
    //             { label: 'Ngày ra quyết định', name: 'wantedDecisionDay', md: 2.5, datePicker: true, disabled: true },
    //             { label: 'Đơn vị ra quyết định', name: 'decisionMakingUnit', md: 6.5, disabled: true },
    //         ].map((field) => (
    //             <Grid key={field.name} xs={12} md={field.md || 12}>
    //                 {loading ? (
    //                     <Skeleton variant="rounded">
    //                         <TextField fullWidth />
    //                     </Skeleton>
    //                 ) : (
    //                     field.datePicker ? (
    //                         <DatePicker
    //                             disabled={state.isFieldDisabled || field.disabled}
    //                             label={field.label}
    //                             value={wanted[field.name] ? parse(wanted[field.name], 'dd/MM/yyyy', new Date()) : null}
    //                             onChange={(date) => handleDateChange(field.name, date, index)}
    //                             renderInput={(params) => (
    //                                 <TextField
    //                                     {...params}
    //                                     fullWidth
    //                                     InputLabelProps={{ shrink: true }}
    //                                     required={field.required || false}
    //                                     onKeyDown={(e) => e.preventDefault()}
    //                                 />
    //                             )}
    //                             maxDate={new Date()} // Assuming the current date is the maximum allowed
    //                         />
    //                     ) : (
    //                         <TextField
    //                             multiline={field.textArea || false}
    //                             disabled={state.isFieldDisabled || field.disabled}
    //                             fullWidth
    //                             label={field.label}
    //                             name={field.name}
    //                             onChange={(event) => handleChange(event, index)}
    //                             defaultValue={field.selectProps ? field.selectProps[wanted[field.name]] : wanted[field.name]}
    //                             required={field.required || false}
    //                             sx={{
    //                                 "& .MuiInputBase-input": {
    //                                     overflow: "hidden",
    //                                     textOverflow: "ellipsis"
    //                                 }
    //                             }}
    //                         >
    //                         </TextField>
    //                     )
    //                 )}
    //             </Grid>
    //         ))}
    //     </Grid>
    // </AccordionSection>
  );
};

export default CriminalWantedItem;
