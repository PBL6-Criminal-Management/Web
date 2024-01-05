import { Card, CardContent } from "@mui/material";
import CaseCriminalItem from "./new-case-criminal-item";
import { Space } from "antd";
import { useEffect } from "react";
import _ from "lodash";

const CaseCriminals = (props) => {
  const {
    criminalInfo,
    criminals,
    loading,
    handleSubmit,
    handleDeleteCriminal,
    isSubmitting,
    isFieldDisabled,
  } = props;

  const handleSubmitInfo = (index, values, isReady) => {
    console.log("submit info");
    console.log([...criminalInfo.slice(0, index), { ...values }, ...criminalInfo.slice(index + 1)]);
    handleSubmit(
      "2." + (index + 1),
      [...criminalInfo.slice(0, index), { ...values }, ...criminalInfo.slice(index + 1)],
      isReady
    );
  };

  useEffect(() => {
    if (isSubmitting && _.isEmpty(criminalInfo)) {
      handleSubmit(2, criminalInfo, true);
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
                  handleSubmit={(values, isReady) => handleSubmitInfo(index, values, isReady)}
                  handleDeleteCriminal={handleDeleteCriminal}
                  isSubmitting={isSubmitting}
                  isDisabled={isFieldDisabled}
                />
              );
            })}
        </Space>
      </CardContent>
    </Card>
  );
};

export default CaseCriminals;
