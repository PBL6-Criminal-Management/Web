import { Card, CardContent } from "@mui/material";
import CaseWitnessItem from "./new-case-witness-item";
import { Space } from "antd";
import { useEffect } from "react";
import _ from "lodash";
const CaseWitnesses = (props) => {
  const { witnessInfo, loading, handleSubmit, handleDeleteWitness, isSubmitting, isFieldDisabled } =
    props;

  const handleSubmitWitnessInfo = (index, values, isReady) => {
    console.log("submit witness info");
    console.log([
      "4." + (index + 1),
      ...witnessInfo.slice(0, index),
      { ...values, id: -1 },
      ...witnessInfo.slice(index + 1),
    ]);
    handleSubmit(
      "4." + (index + 1),
      [...witnessInfo.slice(0, index), { ...values, id: -1 }, ...witnessInfo.slice(index + 1)],
      isReady
    );
  };

  useEffect(() => {
    if (isSubmitting && _.isEmpty(witnessInfo)) {
      handleSubmit(4, witnessInfo, true);
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
          {witnessInfo &&
            witnessInfo.map((witness, index) => (
              <CaseWitnessItem
                key={witness.key}
                witness={witness}
                index={index}
                loading={loading}
                handleSubmit={(values, isReady) => handleSubmitWitnessInfo(index, values, isReady)}
                handleDeleteWitness={handleDeleteWitness}
                isSubmitting={isSubmitting}
                isDisabled={isFieldDisabled}
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseWitnesses;
