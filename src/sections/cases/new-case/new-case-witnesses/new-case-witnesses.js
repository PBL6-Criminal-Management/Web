import { Card, CardContent } from "@mui/material";
import CaseWitnessItem from "./new-case-witness-item";
import { Space } from "antd";
const CaseWitnesses = (props) => {
  const { witnessInfo, loading, handleSubmit, handleDeleteWitness, isSubmitting } = props;

  const handleSubmitWitnessInfo = (index, values, isReady) => {
    console.log("submit witness info");
    console.log([
      ...witnessInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...witnessInfo.slice(index + 1),
    ]);
    handleSubmit([
      ...witnessInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...witnessInfo.slice(index + 1),
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
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseWitnesses;
