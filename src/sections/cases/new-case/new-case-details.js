import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import AccordionSection from "src/layouts/dashboard/accordion-section";
import CaseGeneral from "./new-case-general";
import CaseCriminals from "./new-case-criminals/new-case-criminals";
import CaseVictims from "./new-case-victims/new-case-victims";
import CaseWitnesses from "./new-case-witnesses/new-case-witnesses";
import CaseEvidences from "./new-case-evidences/new-case-evidences";
import CaseImages from "./new-case-images";
import CaseWanted from "./new-case-wanted/new-case-wanted";
import CaseInvestigators from "./new-case-investigators";
import _ from "lodash";
import { format } from "date-fns";

export const NewCaseDetails = (props) => {
  const {
    casee: initialCase,
    criminals,
    investigators,
    loadingSkeleton,
    loadingButtonDetails,
    onUpdate,
    isSubmitting,
    setIsSubmitting,
  } = props;
  const [caseDetail, setCaseDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [listReady, setListReady] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(initialCase) && isFirst) {
      const { wantedCriminalResponse, ...remainFields } = initialCase;
      setCaseDetail({
        ...remainFields,
        evidences:
          remainFields.evidences &&
          remainFields.evidences.map((v, index) => {
            return { ...v, key: index };
          }),
        witnesses:
          remainFields.witnesses &&
          remainFields.witnesses.map((v, index) => {
            return { ...v, key: index };
          }),
        criminals:
          remainFields.criminals &&
          remainFields.criminals.map((v, index) => {
            return { ...v, key: index };
          }),
        victims:
          remainFields.victims &&
          remainFields.victims.map((v, index) => {
            return { ...v, key: index };
          }),
        wantedCriminalRequest:
          wantedCriminalResponse &&
          wantedCriminalResponse.map((v, index) => {
            return { ...v, key: index };
          }),
      });
      setIsFirst(false);
    }
  }, [initialCase]);

  //Criminals
  const handleAddCriminal = () => {
    const currentCriminalsAdd = caseDetail.criminals || [];
    const criminalsAdd = _.cloneDeep(currentCriminalsAdd);

    criminalsAdd.push({
      key: criminalsAdd.length > 0 ? criminalsAdd[criminalsAdd.length - 1].key + 1 : 1,
      id: null,
      charge: "",
      reason: "",
      weapon: "",
      typeOfViolation: 0,
      testimony: "",
      date: format(new Date(), "HH:mm dd/MM/yyyy"),
    });
    setCaseDetail({ ...caseDetail, criminals: criminalsAdd });
  };
  const handleDeleteCriminal = (index) => {
    const currentCriminalsDelete = caseDetail.criminals || [];
    var wantedsOfCase = caseDetail.wantedCriminalRequest || [];
    const criminalsDelete = _.cloneDeep(currentCriminalsDelete);
    wantedsOfCase = wantedsOfCase.filter(
      (w) => !w.criminalId || (w.criminalId && w.criminalId !== criminalsDelete[index].id)
    );
    criminalsDelete.splice(index, 1);
    setCaseDetail({
      ...caseDetail,
      criminals: criminalsDelete,
      wantedCriminalRequest: wantedsOfCase,
    });
    submitData({
      ...caseDetail,
      criminals: criminalsDelete,
      wantedCriminalRequest: wantedsOfCase,
    });
  };

  //Victims
  const handleAddVictim = () => {
    const currentVictimsAdd = caseDetail.victims || [];
    const victimsAdd = _.cloneDeep(currentVictimsAdd);

    victimsAdd.push({
      key: victimsAdd.length > 0 ? victimsAdd[victimsAdd.length - 1].key + 1 : 1,
      id: null,
      name: "",
      birthday: format(new Date(), "dd/MM/yyyy"),
      gender: true,
      citizenId: "",
      phoneNumber: "",
      address: "",
      date: format(new Date(), "HH:mm dd/MM/yyyy"),
      testimony: "",
    });

    setCaseDetail({ ...caseDetail, victims: victimsAdd });
  };
  const handleDeleteVictim = (index) => {
    const currentVictimsDelete = caseDetail.victims || [];
    const victimsDelete = _.cloneDeep(currentVictimsDelete);

    victimsDelete.splice(index, 1);

    setCaseDetail({ ...caseDetail, victims: victimsDelete });
    submitData({ ...caseDetail, victims: victimsDelete });
  };

  //Witnesses
  const handleAddWitness = () => {
    const currentWitnessesAdd = caseDetail.witnesses || [];
    const witnessesAdd = _.cloneDeep(currentWitnessesAdd);

    witnessesAdd.push({
      key: witnessesAdd.length > 0 ? witnessesAdd[witnessesAdd.length - 1].key + 1 : 1,
      id: null,
      name: "",
      birthday: format(new Date(), "dd/MM/yyyy"),
      gender: true,
      citizenId: "",
      phoneNumber: "",
      address: "",
      date: format(new Date(), "HH:mm dd/MM/yyyy"),
      testimony: "",
    });

    setCaseDetail({ ...caseDetail, witnesses: witnessesAdd });
  };
  const handleDeleteWitness = (index) => {
    const currentWitnessesDelete = caseDetail.witnesses || [];
    const witnessesDelete = _.cloneDeep(currentWitnessesDelete);

    witnessesDelete.splice(index, 1);

    setCaseDetail({ ...caseDetail, witnesses: witnessesDelete });
    submitData({ ...caseDetail, witnesses: witnessesDelete });
  };

  //Evidences
  const handleAddEvidence = () => {
    const currentEvidencesAdd = caseDetail.evidences || [];
    const evidencesAdd = _.cloneDeep(currentEvidencesAdd);

    evidencesAdd.push({
      key: evidencesAdd.length > 0 ? evidencesAdd[evidencesAdd.length - 1].key + 1 : 1,
      id: null,
      name: "",
      description: "",
      evidenceImages: [],
    });

    setCaseDetail({ ...caseDetail, evidences: evidencesAdd });
  };
  const handleDeleteEvidence = (index) => {
    const currentEvidencesDelete = caseDetail.evidences || [];
    const evidencesDelete = _.cloneDeep(currentEvidencesDelete);

    evidencesDelete.splice(index, 1);

    setCaseDetail({ ...caseDetail, evidences: evidencesDelete });
    submitData({ ...caseDetail, evidences: evidencesDelete });
  };

  // Handle Case Images
  const handleAddCaseImage = (newImage) => {
    const currentCaseImagesAdd = caseDetail.caseImages || [];
    const caseImagesAdd = _.cloneDeep(currentCaseImagesAdd);

    caseImagesAdd.push(newImage);

    console.log("caseImagesAdd", caseImagesAdd);

    setCaseDetail({ ...caseDetail, caseImages: caseImagesAdd });
  };
  const handleDeleteCaseImage = (imageIndex) => {
    const currentCaseImagesDelete = caseDetail.caseImages || [];
    const caseImagesDelete = _.cloneDeep(currentCaseImagesDelete);

    caseImagesDelete.splice(imageIndex, 1);
    console.log("caseImagesDelete", caseImagesDelete);

    setCaseDetail({ ...caseDetail, caseImages: caseImagesDelete });
  };

  //Wanteds
  const handleAddWanted = () => {
    const currentWantedAdd = caseDetail.wantedCriminalRequest || [];
    const wantedAdd = _.cloneDeep(currentWantedAdd);

    wantedAdd.push({
      key: wantedAdd.length > 0 ? wantedAdd[wantedAdd.length - 1].key + 1 : 1,
      criminalId: null,
      wantedType: 0,
      currentActitvity: "",
      wantedDecisionNo: "",
      wantedDecisionDay: format(new Date(), "dd/MM/yyyy"),
      decisionMakingUnit: "",
    });

    setCaseDetail({ ...caseDetail, wantedCriminalRequest: wantedAdd });
  };
  const handleDeleteWanted = (index) => {
    const currentWantedDelete = caseDetail.wantedCriminalRequest || [];
    const wantedDelete = _.cloneDeep(currentWantedDelete);
    wantedDelete.splice(index, 1);

    setCaseDetail({
      ...caseDetail,
      wantedCriminalRequest: wantedDelete,
    });

    submitData({
      ...caseDetail,
      wantedCriminalRequest: wantedDelete,
    });
  };

  const handleSubmit = (key, value) => {
    if (key === "general") {
      console.log("submit values: ", { ...caseDetail, ...value });
      setCaseDetail({ ...caseDetail, ...value });
      submitData({ ...caseDetail, ...value });
    } else if (key === "investigatorIds") {
      console.log("submit values: ", {
        ...caseDetail,
        investigatorIds: value?.map((i) => parseInt(i.id, 10)),
      });
      setCaseDetail({ ...caseDetail, investigators: value });
      submitData({
        ...caseDetail,
        investigatorIds: value?.map((i) => parseInt(i.id, 10)),
      });
    } else if (key === "caseImages") {
      console.log("submit values: ", {
        ...caseDetail,
        caseImages: value,
      });
      setCaseDetail({ ...caseDetail, caseImages: value });
      submitData({
        ...caseDetail,
        caseImages: value,
      });
    } else {
      console.log("submit values: ", { ...caseDetail, [key]: value });
      setCaseDetail({ ...caseDetail, [key]: value });
      submitData({ ...caseDetail, [key]: value });
    }
  };

  const submitData = (submitData) => {
    submitData = {
      ...submitData,
      evidences: submitData.evidences?.filter((e) => e.id !== null),
      criminals: submitData.criminals?.filter((c) => c.id !== null),
      wantedCriminalRequest: submitData.wantedCriminalRequest?.filter((w) => w.criminalId !== null),
      witnesses: submitData.witnesses?.filter((w) => w.id !== null),
      victims: submitData.victims?.filter((v) => v.id !== null),
    };
    setFormData(submitData);
  };

  useEffect(() => {
    console.log("list ready", listReady);
    console.log("list ready unique", _.uniq(listReady.map((i) => i.id)));
    if (_.uniq(listReady.map((i) => i.id)).length === 8) {
      console.log(listReady.every((v) => v.isReady === true) ? "pass" : "fail");
      if (listReady.every((v) => v.isReady === true)) {
        onUpdate(formData);
      } else {
        setIsSubmitting(false);
        setListReady([]);
      }
    }
  }, [listReady]);

  return (
    <Box
      sx={{
        backgroundColor: "transparent !important",
      }}
    >
      {loadingSkeleton || caseDetail === null || caseDetail.status === undefined ? (
        <>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              "&:not(:last-child)": {
                marginBottom: "16px",
              },
            }}
          >
            <AccordionSection summary=""></AccordionSection>
          </Skeleton>
        </>
      ) : (
        <>
          <AccordionSection summary="Thông tin sơ bộ">
            <CaseGeneral
              generalInfo={{
                status: caseDetail.status,
                typeOfViolation: caseDetail.typeOfViolation,
                startDate: caseDetail.startDate,
                endDate: caseDetail.endDate,
                charge: caseDetail.charge,
                area: caseDetail.area,
                description: caseDetail.description,
              }}
              loading={loadingSkeleton}
              loadingButtonDetails={loadingButtonDetails}
              handleSubmit={(value, isReady) => {
                handleSubmit("general", value);
                setListReady((listReady) => [...listReady, { id: 1, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection
            summary="Thông tin tội phạm"
            handleAdd={handleAddCriminal}
            addLabel="tội phạm"
          >
            <CaseCriminals
              criminalInfo={caseDetail.criminals}
              criminals={criminals}
              loading={loadingSkeleton}
              handleDeleteCriminal={handleDeleteCriminal}
              handleSubmit={(value, isReady) => {
                handleSubmit("criminals", value);
                setListReady((listReady) => [...listReady, { id: 2, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection
            summary="Thông tin nạn nhân"
            handleAdd={handleAddVictim}
            addLabel="nạn nhân"
          >
            <CaseVictims
              victimInfo={caseDetail.victims}
              handleDeleteVictim={handleDeleteVictim}
              loading={loadingSkeleton}
              handleSubmit={(value, isReady) => {
                handleSubmit("victims", value);
                setListReady((listReady) => [...listReady, { id: 3, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection
            summary="Thông tin nhân chứng"
            handleAdd={handleAddWitness}
            addLabel="nhân chứng"
          >
            <CaseWitnesses
              witnessInfo={caseDetail.witnesses}
              handleDeleteWitness={handleDeleteWitness}
              loading={loadingSkeleton}
              handleSubmit={(value, isReady) => {
                handleSubmit("witnesses", value);
                setListReady((listReady) => [...listReady, { id: 4, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection
            summary="Thông tin vật chứng"
            handleAdd={handleAddEvidence}
            addLabel="vật chứng"
          >
            <CaseEvidences
              evidenceInfo={caseDetail.evidences}
              handleDeleteEvidence={handleDeleteEvidence}
              loading={loadingSkeleton}
              handleSubmit={(value, isReady) => {
                handleSubmit("evidences", value);
                setListReady((listReady) => [...listReady, { id: 5, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection summary="Hình ảnh/video vụ án">
            <CaseImages
              caseImages={caseDetail.caseImages}
              loading={loadingSkeleton}
              loadingButtonDetails={loadingButtonDetails}
              handleAddCaseImage={handleAddCaseImage}
              handleDeleteCaseImage={handleDeleteCaseImage}
              handleSubmit={(value, isReady) => {
                handleSubmit("caseImages", value);
                setListReady((listReady) => [...listReady, { id: 6, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection
            summary="Thông tin truy nã"
            handleAdd={handleAddWanted}
            addLabel="truy nã"
          >
            <CaseWanted
              wantedInfo={caseDetail.wantedCriminalRequest}
              criminals={caseDetail.criminals}
              handleDeleteWanted={handleDeleteWanted}
              loading={loadingSkeleton}
              handleSubmit={(value, isReady) => {
                handleSubmit("wantedCriminalRequest", value);
                setListReady((listReady) => [...listReady, { id: 7, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>

          <AccordionSection summary="Thông tin điều tra viên">
            <CaseInvestigators
              investigatorsOfCase={caseDetail.investigators}
              investigators={investigators}
              loading={loadingSkeleton}
              handleSubmit={(value, isReady) => {
                handleSubmit("investigatorIds", value);
                setListReady((listReady) => [...listReady, { id: 8, isReady: isReady }]);
              }}
              isSubmitting={isSubmitting}
            />
          </AccordionSection>
        </>
      )}
    </Box>
  );
};
