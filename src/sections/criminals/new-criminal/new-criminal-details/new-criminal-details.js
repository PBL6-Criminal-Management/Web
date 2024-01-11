import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import AccordionSection from "src/layouts/dashboard/accordion-section";
import NewCriminalGeneral from "./new-criminal-general";
import NewCriminalInfo from "./new-criminal-info";
import NewCriminalImages from "./new-criminal-images";

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
            <NewCriminalGeneral
              formik={formik}
              loadingSkeleton={loadingSkeleton}
              isFieldDisabled={isFieldDisabled}
            />
          </AccordionSection>
          <AccordionSection summary="Thông tin phạm tội">
            <NewCriminalInfo
              formik={formik}
              loadingSkeleton={loadingSkeleton}
              isFieldDisabled={isFieldDisabled}
            />
          </AccordionSection>
          <AccordionSection summary="Hình ảnh/video tội phạm">
            <NewCriminalImages
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
