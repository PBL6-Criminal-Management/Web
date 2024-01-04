import { Card, CardContent } from "@mui/material";
import CaseVictimItem from "./new-case-victim-item";
import { Space } from "antd";
const CaseVictims = (props) => {
  const { victimInfo, loading, handleSubmit, handleDeleteVictim, isSubmitting } = props;

  const handleSubmitVictimInfo = (index, values, isReady) => {
    console.log("submit victim info");
    console.log([
      ...victimInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...victimInfo.slice(index + 1),
    ]);
    handleSubmit([
      ...victimInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...victimInfo.slice(index + 1),
    ], isReady);
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
          {victimInfo &&
            victimInfo.map((victim, index) => (
              <CaseVictimItem
                key={victim.key}
                victim={victim}
                index={index}
                loading={loading}
                handleSubmit={(values, isReady) => handleSubmitVictimInfo(index, values, isReady)}
                handleDeleteVictim={handleDeleteVictim}
                isSubmitting={isSubmitting}
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseVictims;
