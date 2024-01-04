import PropTypes from "prop-types";
import { Box, Card, CardHeader, CardContent, TextField, Typography, useTheme } from "@mui/material";
import { Chart } from "src/components/chart";
import { useState, useCallback, useEffect } from "react";
import * as statisticsApi from "../../api/statistics";
import { useAuth } from "src/hooks/use-auth";

export const OverviewCriminalStructure = (props) => {
  const useChartOptions = (labels) => {
    const theme = useTheme();

    return {
      chart: {
        background: "transparent",
      },
      colors:
        Object.keys(trafficData).length < 7
          ? ["#5ee173", "#3a82ef", "#ff495f", "#ffb038", "#f8dfd4", "#ee3cd2"]
          : undefined,
      dataLabels: {
        enabled: true,
        fontSize: 20,
        style: {
          fontSize: "17",
        },
      },
      labels,
      legend: {
        show: true,
        position: "bottom",
        fontSize: 20,
        itemMargin: {
          horizontal: 10,
          vertical: 10,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
          },
          expandOnClick: true,
        },
      },
      // states: {
      //   active: {
      //     filter: {
      //       type: "none",
      //     },
      //   },
      //   hover: {
      //     filter: {
      //       type: "none",
      //     },
      //   },
      // },

      // stroke: {
      //   width: 0,
      // },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        fillSeriesColor: true,
      },
    };
  };

  const { sx } = props;
  const auth = useAuth();
  const [trafficData, setTrafficData] = useState({});
  const year = new Date().getFullYear();
  const yearDistance = 20;
  const [listYearOptions, setListYearOptions] = useState(
    Array.from({ length: yearDistance + 1 }, (_, i) => i + (year - yearDistance))
  );
  const [selectedYear, setSelectedYear] = useState(year);
  const chartOptions = useChartOptions(Object.entries(trafficData).map(([_, t]) => t.charge));
  const chartSeries = Object.entries(trafficData).map(([_, t]) => t.percent);

  const getCriminalStructure = useCallback(async (year) => {
    try {
      var data = await statisticsApi.getCriminalStructure(year, auth);
      console.log(data);
      setTrafficData(data);
      // setSuccess("Cập nhật thông tin cá nhân thành công.");
      // setError(null);
    } catch (error) {
      // setError(error.message);
      // setSuccess(null);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCriminalStructure(selectedYear);
  }, [selectedYear]);

  return (
    <Card sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "20px",
          paddingBottom: "0px",
        }}
      >
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
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {chartSeries.length > 0 ? (
          <Chart
            height={500}
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width="100%"
          />
        ) : (
          <Typography
            sx={{
              height: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Không có vụ án nào trong năm {selectedYear}
          </Typography>
        )}
        <CardHeader sx={{ padding: 0 }} title={`Cơ cấu tội phạm năm ${selectedYear}`} />
      </CardContent>
    </Card>
  );
};

OverviewCriminalStructure.propTypes = {
  sx: PropTypes.object,
};
