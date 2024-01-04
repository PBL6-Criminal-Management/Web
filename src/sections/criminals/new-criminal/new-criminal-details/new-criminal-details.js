import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import AccordionSection from "src/layouts/dashboard/accordion-section";
import CriminalGeneral from "./new-criminal-general";
import CriminalInfo from "./new-criminal-info";

export const NewCriminalDetails = (props) => {
  const {
    formik,
    loadingSkeleton,
    isFieldDisabled
  } = props;

  return (
    <Box
      sx={{
        backgroundColor: "transparent !important",
      }}
    >
      {loadingSkeleton ? (
        <>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary="Thông tin chung"></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary="Thông tin tội phạm"></AccordionSection>
          </Skeleton>
        </>
      ) : (
        <>
          <AccordionSection summary="Thông tin chung">
            <CriminalGeneral
              formik={formik}
              loadingSkeleton={loadingSkeleton}
              isFieldDisabled={isFieldDisabled}
            />
          </AccordionSection>
          <AccordionSection summary="Thông tin phạm tội">
            <CriminalInfo
              formik={formik}
              loadingSkeleton={loadingSkeleton}
              isFieldDisabled={isFieldDisabled}
            />
          </AccordionSection>
        </>
      )}
    </Box>
  );
};
