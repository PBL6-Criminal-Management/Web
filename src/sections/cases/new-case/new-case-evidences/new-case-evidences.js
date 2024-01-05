import { Card, CardContent } from "@mui/material";
import CaseEvidenceItem from "./new-case-evidence-item";
import { Space } from "antd";
import { useEffect } from "react";
import _ from "lodash";
const CaseEvidences = (props) => {
  const {
    evidenceInfo,
    loading,
    handleSubmit,
    handleDeleteEvidence,
    isSubmitting,
    isFieldDisabled,
  } = props;

  const handleSubmitEvidenceInfo = (index, values, isReady) => {
    console.log("submit evidence info");
    console.log([
      ...evidenceInfo.slice(0, index),
      { ...values, id: -1 },
      ...evidenceInfo.slice(index + 1),
    ]);
    handleSubmit(
      "5." + (index + 1),
      [...evidenceInfo.slice(0, index), { ...values, id: -1 }, ...evidenceInfo.slice(index + 1)],
      isReady
    );
  };
  useEffect(() => {
    if (isSubmitting && _.isEmpty(evidenceInfo)) {
      handleSubmit(5, evidenceInfo, true);
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
          {evidenceInfo &&
            evidenceInfo.map((evidence, index) => (
              <CaseEvidenceItem
                key={evidence.key}
                evidence={evidence}
                index={index}
                loading={loading}
                handleSubmit={(values, isReady) => handleSubmitEvidenceInfo(index, values, isReady)}
                handleDeleteEvidence={handleDeleteEvidence}
                isSubmitting={isSubmitting}
                isDisabled={isFieldDisabled}
              />
            ))}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseEvidences;
