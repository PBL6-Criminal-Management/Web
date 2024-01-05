import { Card, CardContent } from "@mui/material";
import CaseWantedItem from "./new-case-wanted-item";
import { Space } from "antd";
import { useEffect } from "react";
import _ from "lodash";
const CaseWanted = (props) => {
  const {
    wantedInfo,
    criminals,
    loading,
    handleSubmit,
    handleDeleteWanted,
    isSubmitting,
    isFieldDisabled,
  } = props;

  const handleSubmitWantedInfo = (index, values, isReady) => {
    console.log("submit wanted info");
    console.log([...wantedInfo.slice(0, index), { ...values }, ...wantedInfo.slice(index + 1)]);
    handleSubmit(
      "7." + (index + 1),
      [...wantedInfo.slice(0, index), { ...values }, ...wantedInfo.slice(index + 1)],
      isReady
    );
  };

  useEffect(() => {
    if (isSubmitting && _.isEmpty(wantedInfo)) {
      handleSubmit(7, wantedInfo, true);
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
                  handleSubmit={(values, isReady) => handleSubmitWantedInfo(index, values, isReady)}
                  handleDeleteWanted={handleDeleteWanted}
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

export default CaseWanted;
