import { Card, CardContent } from "@mui/material";
import CaseEvidenceItem from "./case-evidence-item";
import { Space } from "antd";
const CaseEvidences = (props) => {
  const { evidenceInfo, loading, handleSubmit, handleDeleteEvidence } = props;

  const handleSubmitEvidenceInfo = (index, values) => {
    console.log("submit evidence info");
    console.log([
      ...evidenceInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...evidenceInfo.slice(index + 1),
    ]);
    handleSubmit([
      ...evidenceInfo.slice(0, index),
      { ...values, id: values.id ? values.id : -1 },
      ...evidenceInfo.slice(index + 1),
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
          {evidenceInfo &&
            evidenceInfo.map((evidence, index) => (
              <CaseEvidenceItem
                key={evidence.key}
                evidence={evidence}
                index={index}
                loading={loading}
                handleSubmit={(values) => handleSubmitEvidenceInfo(index, values)}
                handleDeleteEvidence={handleDeleteEvidence}
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseEvidences;
