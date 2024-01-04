import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import AccordionSection from "src/layouts/dashboard/accordion-section";
import CriminalGeneral from "./criminal-general";
import CriminalInfo from "./criminal-info";
import CriminalWanted from "./criminal-wanted/criminal-wanted";
import { useAuth } from "src/hooks/use-auth";

export const CriminalDetails = (props) => {
  const [generalInformation, setGeneralInformation] = useState(null);
  const [criminalInformation, setCriminalInformation] = useState(null);
  const [wantedInformation, setWantedInformation] = useState(null);
  const auth = useAuth();
  const canEdit = auth.isAuthenticated ? auth.user.role !== 2 : false;

  const {
    criminal: initialCriminal,
    loadingSkeleton,
    loadingButtonDetails,
    loadingButtonPicture,
    onUpdate,
  } = props;

  useEffect(() => {
    if (initialCriminal) {
      setGeneralInformation({
        name: initialCriminal.name,
        anotherName: initialCriminal.anotherName,
        birthday: initialCriminal.birthday,
        gender: initialCriminal.gender,
        citizenId: initialCriminal.citizenId,
        phoneNumber: initialCriminal.phoneNumber,
        homeTown: initialCriminal.homeTown,
        nationality: initialCriminal.nationality,
        ethnicity: initialCriminal.ethnicity,
        religion: initialCriminal.religion,
        careerAndWorkplace: initialCriminal.careerAndWorkplace,
        permanentResidence: initialCriminal.permanentResidence,
        currentAccommodation: initialCriminal.currentAccommodation,
        fatherName: initialCriminal.fatherName,
        fatherBirthday: initialCriminal.fatherBirthday,
        fatherCitizenId: initialCriminal.fatherCitizenId,
        motherName: initialCriminal.motherName,
        motherBirthday: initialCriminal.motherBirthday,
        motherCitizenId: initialCriminal.motherCitizenId,
        characteristics: initialCriminal.characteristics,
      });
      setCriminalInformation({
        status: initialCriminal.status,
        dangerousLevel: initialCriminal.dangerousLevel,
        dateOfMostRecentCrime: initialCriminal.dateOfMostRecentCrime,
        releaseDate: initialCriminal.releaseDate,
        charge: initialCriminal.charge,
        relatedCases: initialCriminal.relatedCases,
        entryAndExitInformation: initialCriminal.entryAndExitInformation,
        vehicles: initialCriminal.vehicles,
        bankAccount: initialCriminal.bankAccount,
        gameAccount: initialCriminal.gameAccount,
        facebook: initialCriminal.facebook,
        zalo: initialCriminal.zalo,
        otherSocialNetworks: initialCriminal.otherSocialNetworks,
        phoneModel: initialCriminal.phoneModel,
        research: initialCriminal.research,
        approachArrange: initialCriminal.approachArrange,
        otherInformation: initialCriminal.otherInformation,
      });
      setWantedInformation({
        isWantedCriminal: initialCriminal.isWantedCriminal,
        wantedCriminals: initialCriminal.wantedCriminals,
      });
    }
  }, [initialCriminal]);

  const handleSubmit = (values) => {
    onUpdate({ ...generalInformation, ...criminalInformation, ...wantedInformation, ...values });
  };

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
            <AccordionSection summary="Thông tin truy nã"></AccordionSection>
          </Skeleton>
        </>
      ) : (
        <>
          <AccordionSection summary="Thông tin chung">
            <CriminalGeneral
              generalInfo={generalInformation}
              loading={loadingSkeleton}
              loadingButtonDetails={loadingButtonDetails}
              loadingButtonPicture={loadingButtonPicture}
              handleSubmit={handleSubmit}
              canEdit={canEdit}
            />
          </AccordionSection>
          <AccordionSection summary="Thông tin phạm tội">
            <CriminalInfo
              criminalInfo={criminalInformation}
              loading={loadingSkeleton}
              loadingButtonDetails={loadingButtonDetails}
              loadingButtonPicture={loadingButtonPicture}
              handleSubmit={handleSubmit}
              canEdit={canEdit}
            />
          </AccordionSection>
          {wantedInformation && wantedInformation.isWantedCriminal && (
            <AccordionSection summary="Thông tin truy nã">
              <CriminalWanted
                wantedCriminals={wantedInformation}
                loading={loadingSkeleton}
              />
            </AccordionSection>
          )}
        </>
      )}
    </Box>
  );
};
