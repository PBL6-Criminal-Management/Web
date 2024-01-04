import { Card, CardContent } from "@mui/material";
import CaseWantedItem from "./case-wanted-item";
import { Space } from "antd";
const CaseWanted = (props) => {
  const { wantedInfo, criminals, loading, handleSubmit, handleDeleteWanted, canEdit, isSubmitting } = props;

  const handleSubmitWantedInfo = (index, values) => {
    console.log("submit wanted info");
    console.log([...wantedInfo.slice(0, index), { ...values }, ...wantedInfo.slice(index + 1)]);
    handleSubmit([...wantedInfo.slice(0, index), { ...values }, ...wantedInfo.slice(index + 1)]);
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
          {wantedInfo &&
            wantedInfo.map((wanted, index) => {
              return (
                <CaseWantedItem
                  key={wanted.key}
                  wanted={wanted}
                  wantedsOfCase={wantedInfo}
                  criminalsOfCase={criminals}
                  index={index}
                  loading={loading}
                  handleSubmit={(values) => handleSubmitWantedInfo(index, values)}
                  handleDeleteWanted={handleDeleteWanted}
                  canEdit={canEdit}
                />
              );
            })}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseWanted;
