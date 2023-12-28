import {
  Button,
  Unstable_Grid2 as Grid,
  Divider,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import CriminalWantedItem from "./criminal-wanted-item";
import { Space } from "antd";

const CriminalWanted = (props) => {
  const { wantedCriminals, loading } = props;

  return (
    <Card
      sx={{
        p: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        border: "none",
      }}
    >
      <CardContent>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          {wantedCriminals.wantedCriminals &&
            wantedCriminals.wantedCriminals.map((wanted, index) => (
              <CriminalWantedItem key={index} title={index + 1} wanted={wanted} loading={loading} />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CriminalWanted;
