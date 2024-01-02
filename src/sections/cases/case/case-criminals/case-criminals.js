import { Card, CardContent } from "@mui/material";
import CaseCriminalItem from "./case-criminal-item";
import { Space } from "antd";
const CaseCriminals = (props) => {
  const { criminalInfo, criminals, loading, handleSubmit, handleDeleteCriminal } = props;

  const handleSubmitInfo = (index, values) => {
    console.log("submit info");
    console.log([...criminalInfo.slice(0, index), { ...values }, ...criminalInfo.slice(index + 1)]);
    handleSubmit([
      ...criminalInfo.slice(0, index),
      { ...values },
      ...criminalInfo.slice(index + 1),
    ]);
  };

  return (
    <Card
      sx={{
        p: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
          {criminalInfo &&
            criminalInfo.map((criminal, index) => {
              return (
                <CaseCriminalItem
                  key={criminal.key}
                  criminal={criminal}
                  criminals={criminals}
                  criminalsOfCase={criminalInfo}
                  index={index}
                  loading={loading}
                  handleSubmit={(values) => handleSubmitInfo(index, values)}
                  handleDeleteCriminal={handleDeleteCriminal}
                />
              );
            })}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseCriminals;
