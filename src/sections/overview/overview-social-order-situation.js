import PropTypes from "prop-types";
import { Box, Card, CardHeader, TextField, Typography } from "@mui/material";
import { Chart } from "src/components/chart";
import { useState, useCallback, useEffect } from "react";
import * as statisticsApi from "../../api/statistics";
import { useAuth } from "src/hooks/use-auth";

export const OverviewSocialOrderSituation = (props) => {
  const { sx } = props;

  const auth = useAuth();
  const [socialOrderSituationData, setSocialOrderSituationData] = useState([]);
  const year = new Date().getFullYear();
  const yearDistance = 10;

  const listMonthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const listYearOptions = Array.from(
    { length: yearDistance + 1 },
    (_, i) => i + (year - yearDistance)
  );

  const [selectedFromYear, setSelectedFromYear] = useState(year - 2);
  const [selectedToYear, setSelectedToYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const getSocialOrderSituation = useCallback(async (month, year) => {
    try {
      var data = await statisticsApi.getSocialOrderSituation(month, year, auth);
      setSocialOrderSituationData(data);
      // setSuccess("Cập nhật thông tin cá nhân thành công.");
      // setError(null);
    } catch (error) {
      // setError(error.message);
      // setSuccess(null);
      console.log(error);
    }
  }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedFromYear > selectedToYear) {
      setMessage("Năm từ không thể lớn hơn năm đến");
    } else {
      setMessage("");
      const yearRange = [];
      for (let i = selectedFromYear; i <= selectedToYear; i++) {
        yearRange.push(i);
      }
      getSocialOrderSituation(selectedMonth, yearRange);
    }
  }, [selectedMonth, selectedFromYear, selectedToYear]);

  return (
    <Card sx={sx}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 10px",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography>Tháng</Typography>
            <Box>
              <TextField
                label={"Tháng"}
                onChange={(e) => setSelectedMonth(e.target.value)}
                value={selectedMonth}
                select={true}
                SelectProps={{ native: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  marginRight: 1,
                }}
              >
                {Object.entries(listMonthOptions).map(([value, label]) => (
                  <option key={value} value={label}>
                    {label}
                  </option>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              position: "relative",
            }}
          >
            <Typography>Năm</Typography>
            <Box
              sx={{
                marginBottom: message ? 2 : 0,
              }}
            >
              <TextField
                label={"Từ"}
                onChange={(e) => setSelectedFromYear(e.target.value)}
                value={selectedFromYear}
                select={true}
                SelectProps={{ native: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  marginRight: 1,
                }}
              >
                {Object.entries(listYearOptions).map(([value, label]) => (
                  <option key={value} value={label}>
                    {label}
                  </option>
                ))}
              </TextField>
              <TextField
                label={"Đến"}
                onChange={(e) => setSelectedToYear(e.target.value)}
                value={selectedToYear}
                type="number"
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
              <Typography
                sx={{
                  mt: 0.75,
                  color: "error.main",
                  position: "absolute",
                  left: -100,
                }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Chart
          height={500}
          options={{
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
              },
            },
            dataLabels: {
              enabled: false,
            },
            colors:
              selectedToYear - selectedFromYear + 1 < 4
                ? ["#ff495f", "#ffb038", "#363062"]
                : undefined,
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },
            xaxis: {
              categories: ["Số vụ xảy ra", "Số vụ đã xét xử", "Số đối tượng bị bắt giữ, xử lý"],
              labels: {
                rotate: 0,
                offsetX: 1, // Adjust this value to set the offset between values on the x-axis
              },
            },
            yaxis: {
              title: {
                text: "Số lượng",
              },
            },
            fill: {
              opacity: 1,
            },
            tooltip: {
              y: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                  switch (dataPointIndex) {
                    case 0:
                    case 1:
                      return val + " vụ";
                    case 2:
                      return val + " đối tượng";
                    default:
                      return val;
                  }
                },
              },
            },
          }}
          series={socialOrderSituationData.map((d) => {
            return {
              name: `Tháng ${d.month}/${d.year}`,
              data: [d.caseCount, d.triedCaseCount, d.arrestedOrHandledCriminalCount],
            };
          })}
          type="bar"
          width="100%"
        />
        <CardHeader
          sx={{ padding: 0, alignSelf: "center" }}
          title={"Tình hình phạm tội về TTXH qua các năm"}
        />
      </Box>
    </Card>
  );
};

OverviewSocialOrderSituation.propTypes = {
  sx: PropTypes.object,
};
