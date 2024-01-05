import { Card, CardContent } from "@mui/material";
import CaseVictimItem from "./new-case-victim-item";
import { Space } from "antd";
import { useEffect } from "react";
import _ from "lodash";
const CaseVictims = (props) => {
  const { victimInfo, loading, handleSubmit, handleDeleteVictim, isSubmitting, isFieldDisabled } =
    props;

  const handleSubmitVictimInfo = (index, values, isReady) => {
    console.log("submit victim info");
    console.log([
      ...victimInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...victimInfo.slice(index + 1),
    ]);
    handleSubmit(
      "3." + (index + 1),
      [
        ...victimInfo.slice(0, index),
        { ...values, id: values.id ? values.id : -1 },
        ...victimInfo.slice(index + 1),
      ],
      isReady
    );
  };

  useEffect(() => {
    if (isSubmitting && _.isEmpty(victimInfo)) {
      handleSubmit(3, victimInfo, true);
    }
  }, [isSubmitting]);

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
                isDisabled={isFieldDisabled}
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseVictims;
