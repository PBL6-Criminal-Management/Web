import PropTypes from "prop-types";
import { Box, Card, CardHeader, TextField } from "@mui/material";
import { Chart } from "src/components/chart";
import { useState, useCallback, useEffect } from "react";
import * as statisticsApi from "../../api/statistics";
import { useAuth } from "src/hooks/use-auth";

export const OverviewSituationDevelopments = (props) => {
  const { sx } = props;

  const auth = useAuth();
  const [situationDevelopmentsData, setSituationDevelopmentsData] = useState([]);
  const year = new Date().getFullYear();
  const yearDistance = 10;

  const listYearOptions = Array.from(
    { length: yearDistance + 1 },
    (_, i) => i + (year - yearDistance)
  );

  const [selectedYear, setSelectedYear] = useState(year);

  const getSituationDevelopments = useCallback(async (year) => {
    try {
      var data = await statisticsApi.getSituationDevelopments(year, auth);
      setSituationDevelopmentsData(data);
      // setSuccess("Cập nhật thông tin cá nhân thành công.");
      // setError(null);
    } catch (error) {
      // setError(error.message);
      // setSuccess(null);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSituationDevelopments(selectedYear);
  }, [selectedYear]);

  return (
    <Card sx={sx}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box>
          <TextField
            label={"Năm"}
            onChange={(e) => {
              console.log("target", e.target);
              setSelectedYear(e.target.value);
            }}
            value={selectedYear}
            select={true}
            SelectProps={{ native: true }}
            sx={{
              "& .MuiInputBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          >
            {Object.entries(listYearOptions).map(([value, label]) => (
              <option key={value} value={label}>
                {label}
              </option>
            ))}
          </TextField>
        </Box>
        <Chart
          height={500}
          type="line"
          stacked={false}
          options={{
            stroke: {
              curve: "smooth",
            },
            dataLabels: {
              enabled: false,
            },
            labels: situationDevelopmentsData.map((sd) => `Tháng ${sd.month}`),
            xaxis: {
              type: "category",
            },
            yaxis: [
              {
                title: {
                  text: "Số lượng",
                },
              },
            ],
            fill: {
              type: "solid",
              opacity: [1, 1],
            },
            colors: ["#ff495f", "#509cdb", "#15ff73"],
          }}
          series={[
            {
              name: "Số vụ án",
              data: situationDevelopmentsData.map((sd) => sd.caseCount),
            },
            {
              name: "Số tội phạm",
              data: situationDevelopmentsData.map((sd) => sd.criminalCount),
            },
            {
              name: "Số nạn nhân",
              data: situationDevelopmentsData.map((sd) => sd.victimCount),
            },
          ]}
          width="100%"
        />
        <CardHeader
          sx={{ padding: 0, alignSelf: "center" }}
          title={`Diễn biến tình hình phạm tội qua các tháng trong năm ${selectedYear}`}
        />
      </Box>
    </Card>
  );
};

OverviewSituationDevelopments.propTypes = {
  sx: PropTypes.object,
};
