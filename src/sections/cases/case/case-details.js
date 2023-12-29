import { useEffect, useReducer, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
  Box,
  Unstable_Grid2 as Grid,
  Skeleton,
} from '@mui/material';
import AccordionSection from 'src/layouts/dashboard/accordion-section';
import { format, parse } from 'date-fns';
import CaseGeneral from './case-general';
import CaseCriminals from './case-criminals/case-criminals';
import CaseVictims from './case-victims/case-victims';
import CaseWitnesses from './case-witnesses/case-witnesses';
import CaseEvidences from './case-evidences/case-evidences';
import CaseImages from './case-images';
import CaseWanted from './case-wanted/case-wanted';
import CaseInvestigators from './case-investigators';
import _ from 'lodash';
import { useAuth } from "src/hooks/use-auth";

const initialState = {
  casee: {
    status: '',
    typeOfViolation: '',
    startDate: '',
    endDate: '',
    charge: '',
    area: '',
    description: '',
    criminals: [],
    victims: [],
    witnesses: [],
    evidences: [],
    caseImages: [],
    wantedCriminalRequest: [],
    investigatorIds: [],
  },
  originalCase: {},
  changesMade: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ENABLE_EDIT':
      return {
        ...state,
        originalCase: { ...state.casee }
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        casee: { ...state.originalCase },
        changesMade: false
      };

    case 'UPDATE_CASE':
      const newObj = {
        ...state,
        casee: { ...state.casee, ...action.payload },
        changesMade: true
      }
      return newObj;
    case 'UPDATE_DATE_TIME':
      const { fieldNameTime, dateTime } = action.payload;
      return {
        ...state,
        casee: { ...state.casee, [fieldNameTime]: format(dateTime, 'HH:mm dd/MM/yyyy') },
        changesMade: true
      };

    // CRIMINALS
    case 'UPDATE_CRIMINALS':
      const currentCriminals = state.casee.criminals || [];
      const originalCriminals = state.originalCase.criminals || [];
      const criminals = _.cloneDeep(currentCriminals);
      const indexToUpdateC = action.payload.index;
      let originalCriminal;

      if (indexToUpdateC !== undefined && indexToUpdateC !== null) {
        if (originalCriminals.length > 0) {
          originalCriminal = originalCriminals[indexToUpdateC];
        }

        if (action.payload.id !== undefined && action.payload.id !== null && action.payload.id !== originalCriminal.id) {
          const newCriminal = {
            id: action.payload.id,
            charge: '',
            reason: '',
            weapon: '',
            typeOfViolation: '',
            testimony: '',
          }
          criminals[indexToUpdateC] = {
            ...criminals[indexToUpdateC],
            ...newCriminal
          };
        };

        if (action.payload.id === originalCriminal.id) {
          criminals[indexToUpdateC] = {
            ...criminals[indexToUpdateC],
            ...originalCriminal
          };
        };

        criminals[indexToUpdateC] = {
          ...criminals[indexToUpdateC],
          ...action.payload,
        };
      }

      const newObjC = {
        ...state,
        casee: { ...state.casee, criminals: criminals },
        changesMade: true
      }
      return newObjC;
    case 'UPDATE_DATE_TIME_CRIMINALS':
      const { fieldNameTimeCriminals, dateTimeCriminals, indexToUpdateDateTimeCriminals } = action.payload;
      const currentCriminalsDateTime = state.casee.criminals || [];
      const criminalsDateTime = _.cloneDeep(currentCriminalsDateTime);

      if (indexToUpdateDateTimeCriminals !== undefined && indexToUpdateDateTimeCriminals !== null) {
        criminalsDateTime[indexToUpdateDateTimeCriminals] = {
          ...criminalsDateTime[indexToUpdateDateTimeCriminals],
          [fieldNameTimeCriminals]: format(dateTimeCriminals, 'HH:mm dd/MM/yyyy'),
        };
      }

      const newObjCDT = {
        ...state,
        casee: { ...state.casee, criminals: criminalsDateTime },
        changesMade: true
      }
      return newObjCDT;
    case 'ADD_CRIMINAL':
      const currentCriminalsAdd = state.casee.criminals || [];
      const criminalsAdd = _.cloneDeep(currentCriminalsAdd);

      criminalsAdd.push({
        id: '',
        charge: '',
        reason: '',
        weapon: '',
        typeOfViolation: '',
        testimony: '',
      });

      const newObjCAdd = {
        ...state,
        casee: { ...state.casee, criminals: criminalsAdd },
        changesMade: true
      }
      return newObjCAdd;
    case 'DELETE_CRIMINAL':
      const currentCriminalsDelete = state.casee.criminals || [];
      const criminalsDelete = _.cloneDeep(currentCriminalsDelete);

      criminalsDelete.splice(action.payload, 1);
      // criminalsDelete = criminalsDelete.filter(criminal => criminal.id !== action.payload);
      console.log(criminalsDelete);

      const newObjCDelete = {
        ...state,
        casee: { ...state.casee, criminals: criminalsDelete },
        changesMade: true
      }
      return newObjCDelete;

    // VICTIMS
    case 'UPDATE_VICTIMS':
      const currentVictims = state.casee.victims || [];
      const victims = _.cloneDeep(currentVictims);
      const indexToUpdateV = action.payload.index;

      if (indexToUpdateV !== undefined && indexToUpdateV !== null) {
        victims[indexToUpdateV] = {
          ...victims[indexToUpdateV],
          ...action.payload,
        };
      }

      const newObjV = {
        ...state,
        casee: { ...state.casee, victims: victims },
        changesMade: true
      }
      return newObjV;
    case 'UPDATE_DATE_VICTIMS':
      const { fieldNameVictims, dateVictims, indexToUpdateDateVictims } = action.payload;
      const currentVictimsDate = state.casee.victims || [];
      const victimsDate = _.cloneDeep(currentVictimsDate);

      if (indexToUpdateDateVictims !== undefined && indexToUpdateDateVictims !== null) {
        victimsDate[indexToUpdateDateVictims] = {
          ...victimsDate[indexToUpdateDateVictims],
          [fieldNameVictims]: format(dateVictims, 'dd/MM/yyyy'),
        };
      }

      const newObjVD = {
        ...state,
        casee: { ...state.casee, victims: victimsDate },
        changesMade: true
      }
      return newObjVD;
    case 'UPDATE_DATE_TIME_VICTIMS':
      const { fieldNameTimeVictims, dateTimeVictims, indexToUpdateDateTimeVictims } = action.payload;
      const currentVictimsDateTime = state.casee.victims || [];
      const victimsDateTime = _.cloneDeep(currentVictimsDateTime);

      if (indexToUpdateDateTimeVictims !== undefined && indexToUpdateDateTimeVictims !== null) {
        victimsDateTime[indexToUpdateDateTimeVictims] = {
          ...victimsDateTime[indexToUpdateDateTimeVictims],
          [fieldNameTimeVictims]: format(dateTimeVictims, 'HH:mm dd/MM/yyyy'),
        };
      }

      const newObjVDT = {
        ...state,
        casee: { ...state.casee, victims: victimsDateTime },
        changesMade: true
      }
      return newObjVDT;
    case 'ADD_VICTIM':
      const currentVictimsAdd = state.casee.victims || [];
      const victimsAdd = _.cloneDeep(currentVictimsAdd);

      victimsAdd.push({
        id: -1,
        name: '',
        birthday: '',
        gender: '',
        citizenId: '',
        phoneNumber: '',
        address: '',
        date: '',
        testimony: '',
      });

      const newObjVAdd = {
        ...state,
        casee: { ...state.casee, victims: victimsAdd },
        changesMade: true
      }
      return newObjVAdd;
    case 'DELETE_VICTIM':
      const currentVictimsDelete = state.casee.victims || [];
      const victimsDelete = _.cloneDeep(currentVictimsDelete);

      victimsDelete.splice(action.payload, 1);

      const newObjVDelete = {
        ...state,
        casee: { ...state.casee, victims: victimsDelete },
        changesMade: true
      }
      return newObjVDelete;

    // WITNESSES
    case 'UPDATE_WITNESSES':
      const currentWitnesses = state.casee.witnesses || [];
      const witnesses = _.cloneDeep(currentWitnesses);
      const indexToUpdateW = action.payload.index;

      if (indexToUpdateW !== undefined && indexToUpdateW !== null) {
        witnesses[indexToUpdateW] = {
          ...witnesses[indexToUpdateW],
          ...action.payload,
        };
      }

      const newObjW = {
        ...state,
        casee: { ...state.casee, witnesses: witnesses },
        changesMade: true
      };
      return newObjW;
    case 'UPDATE_DATE_WITNESSES':
      const { fieldNameWitnesses, dateWitnesses, indexToUpdateDateWitnesses } = action.payload;
      const currentWitnessesDate = state.casee.witnesses || [];
      const witnessesDate = _.cloneDeep(currentWitnessesDate);

      if (indexToUpdateDateWitnesses !== undefined && indexToUpdateDateWitnesses !== null) {
        witnessesDate[indexToUpdateDateWitnesses] = {
          ...witnessesDate[indexToUpdateDateWitnesses],
          [fieldNameWitnesses]: format(dateWitnesses, 'dd/MM/yyyy'),
        };
      }

      const newObjWD = {
        ...state,
        casee: { ...state.casee, witnesses: witnessesDate },
        changesMade: true
      }
      return newObjWD;
    case 'UPDATE_DATE_TIME_WITNESSES':
      const { fieldNameTimeWitnesses, dateTimeWitnesses, indexToUpdateDateTimeWitnesses } = action.payload;
      const currentWitnessesDateTime = state.casee.witnesses || [];
      const witnessesDateTime = _.cloneDeep(currentWitnessesDateTime);

      if (indexToUpdateDateTimeWitnesses !== undefined && indexToUpdateDateTimeWitnesses !== null) {
        witnessesDateTime[indexToUpdateDateTimeWitnesses] = {
          ...witnessesDateTime[indexToUpdateDateTimeWitnesses],
          [fieldNameTimeWitnesses]: format(dateTimeWitnesses, 'HH:mm dd/MM/yyyy'),
        };
      }

      const newObjWDT = {
        ...state,
        casee: { ...state.casee, witnesses: witnessesDateTime },
        changesMade: true
      }
      return newObjWDT;
    case 'ADD_WITNESS':
      const currentWitnessesAdd = state.casee.witnesses || [];
      const witnessesAdd = _.cloneDeep(currentWitnessesAdd);

      witnessesAdd.push({
        id: -1,
        name: '',
        birthday: '',
        gender: '',
        citizenId: '',
        phoneNumber: '',
        address: '',
        date: '',
        testimony: '',
      });

      const newObjWAdd = {
        ...state,
        casee: { ...state.casee, witnesses: witnessesAdd },
        changesMade: true
      }
      return newObjWAdd;
    case 'DELETE_WITNESS':
      const currentWitnessesDelete = state.casee.witnesses || [];
      const witnessesDelete = _.cloneDeep(currentWitnessesDelete);

      witnessesDelete.splice(action.payload, 1);

      const newObjWDelete = {
        ...state,
        casee: { ...state.casee, witnesses: witnessesDelete },
        changesMade: true
      }
      return newObjWDelete;

    // EVIDENCES
    case 'UPDATE_EVIDENCES':
      const currentEvidences = state.casee.evidences || [];
      const evidences = _.cloneDeep(currentEvidences);
      const indexToUpdateE = action.payload.index;

      if (indexToUpdateE !== undefined && indexToUpdateE !== null) {
        evidences[indexToUpdateE] = {
          ...evidences[indexToUpdateE],
          ...action.payload,
        };
      }

      const newObjE = {
        ...state,
        casee: { ...state.casee, evidences: evidences },
        changesMade: true
      };
      return newObjE;
    case 'ADD_EVIDENCE':
      const currentEvidencesAdd = state.casee.evidences || [];
      const evidencesAdd = _.cloneDeep(currentEvidencesAdd);

      evidencesAdd.push({
        id: -1,
        name: '',
        description: '',
        evidenceImages: [],
      });

      const newObjEAdd = {
        ...state,
        casee: { ...state.casee, evidences: evidencesAdd },
        changesMade: true
      };
      return newObjEAdd;
    case 'DELETE_EVIDENCE':
      const currentEvidencesDelete = state.casee.evidences || [];
      const evidencesDelete = _.cloneDeep(currentEvidencesDelete);

      evidencesDelete.splice(action.payload, 1);

      const newObjEDelete = {
        ...state,
        casee: { ...state.casee, evidences: evidencesDelete },
        changesMade: true
      };
      return newObjEDelete;
    case 'ADD_IMAGE_EVIDENCE':
      const currentEvidencesAddImage = state.casee.evidences || [];
      const evidencesAddImage = _.cloneDeep(currentEvidencesAddImage);

      const indexToAddImageE = action.payload.index;
      const newImageE = action.payload.newImageEvidence;

      if (indexToAddImageE >= 0 && indexToAddImageE < evidencesAddImage.length) {
        evidencesAddImage[indexToAddImageE] = {
          ...evidencesAddImage[indexToAddImageE],
          evidenceImages: [...evidencesAddImage[indexToAddImageE].evidenceImages, newImageE],
        };
      }

      const newObjEAddImage = {
        ...state,
        casee: { ...state.casee, evidences: evidencesAddImage },
        changesMade: true
      };
      return newObjEAddImage;
    case 'DELETE_IMAGE_EVIDENCE':
      const currentEvidencesDeleteImage = state.casee.evidences || [];
      const evidencesDeleteImage = _.cloneDeep(currentEvidencesDeleteImage);

      const indexToDeleteImageE = action.payload.index;
      const imageIndex = action.payload.imageIndex;

      evidencesDeleteImage[indexToDeleteImageE].evidenceImages.splice(imageIndex, 1);

      const newObjEDeleteImage = {
        ...state,
        casee: { ...state.casee, evidences: evidencesDeleteImage },
        changesMade: true
      };
      return newObjEDeleteImage;

    // CASE IMAGES 
    case 'UPDATE_CASE_IMAGES':
      const currentCaseImages = state.casee.caseImages || [];
      const caseImages = _.cloneDeep(currentCaseImages);
      const indexToUpdateCI = action.payload.index;

      if (indexToUpdateCI !== undefined && indexToUpdateCI !== null) {
        caseImages[indexToUpdateCI] = {
          ...caseImages[indexToUpdateCI],
          ...action.payload,
        };
      }

      const newObjCI = {
        ...state,
        casee: { ...state.casee, caseImages: caseImages },
        changesMade: true
      };
      return newObjCI;
    case 'ADD_CASE_IMAGE':
      const currentCaseImagesAdd = state.casee.caseImages || [];
      const caseImagesAdd = _.cloneDeep(currentCaseImagesAdd);

      const newImageCI = action.payload.newImageCase;
      caseImagesAdd.push(newImageCI);

      const newObjCIAdd = {
        ...state,
        casee: { ...state.casee, caseImages: caseImagesAdd },
        changesMade: true
      };
      console.log("caseImagesAdd", caseImagesAdd);
      return newObjCIAdd;
    case 'DELETE_CASE_IMAGE':
      const currentCaseImagesDelete = state.casee.caseImages || [];
      const caseImagesDelete = _.cloneDeep(currentCaseImagesDelete);

      const imageIndexCI = action.payload.imageIndex;
      caseImagesDelete.splice(imageIndexCI, 1);
      console.log("caseImagesDelete", caseImagesDelete);

      const newObjCIDelete = {
        ...state,
        casee: { ...state.casee, caseImages: caseImagesDelete },
        changesMade: true
      };
      console.log("caseImagesDelete", caseImagesDelete);
      return newObjCIDelete;

    // WANTED CRIMINAL
    case 'UPDATE_WANTED':
      const currentWantedCriminals = state.casee.wantedCriminalRequest || [];
      const originalWantedCriminals = state.originalCase.wantedCriminalRequest || [];
      const wantedCriminals = _.cloneDeep(currentWantedCriminals);
      const indexToUpdateWC = action.payload.index;
      let originalWantedCriminal;

      if (indexToUpdateWC !== undefined && indexToUpdateWC !== null) {
        if (originalWantedCriminals.length > 0) {
          originalWantedCriminal = originalWantedCriminals[indexToUpdateWC];
        }

        if (action.payload.criminalId !== undefined && action.payload.criminalId !== null && action.payload.criminalId !== originalWantedCriminal.criminalId) {
          const newWantedCriminal = {
            criminalId: action.payload.id,
            wantedType: '',
            currentActitvity: '',
            wantedDecisionNo: '',
            wantedDecisionDay: '',
            decisionMakingUnit: '',
          }
          wantedCriminals[indexToUpdateWC] = {
            ...wantedCriminals[indexToUpdateWC],
            ...newWantedCriminal
          };
        };

        if (action.payload.criminalId === originalWantedCriminal.criminalId) {
          wantedCriminals[indexToUpdateWC] = {
            ...wantedCriminals[indexToUpdateWC],
            ...originalWantedCriminal
          };
        };

        wantedCriminals[indexToUpdateWC] = {
          ...wantedCriminals[indexToUpdateWC],
          ...action.payload,
        };

      }

      console.log(wantedCriminals);

      const newObjWC = {
        ...state,
        casee: { ...state.casee, wantedCriminalRequest: wantedCriminals },
        changesMade: true
      }
      return newObjWC;
    case 'UPDATE_DATE_WANTED':
      const { fieldNameWanted, dateWanted, indexToUpdateDateWanted } = action.payload;
      const currentWantedDate = state.casee.wantedCriminalRequest || [];
      const wantedDate = _.cloneDeep(currentWantedDate);

      if (indexToUpdateDateWanted !== undefined && indexToUpdateDateWanted !== null) {
        wantedDate[indexToUpdateDateWanted] = {
          ...wantedDate[indexToUpdateDateWanted],
          [fieldNameWanted]: format(dateWanted, 'dd/MM/yyyy'),
        };
      }

      const newObjWCD = {
        ...state,
        casee: { ...state.casee, wantedCriminalRequest: wantedDate },
        changesMade: true
      }
      return newObjWCD;
    case 'ADD_WANTED':
      const currentWantedAdd = state.casee.wantedCriminalRequest || [];
      const wantedAdd = _.cloneDeep(currentWantedAdd);

      wantedAdd.push({
        criminalId: '',
        wantedType: '',
        currentActitvity: '',
        wantedDecisionNo: '',
        wantedDecisionDay: '',
        decisionMakingUnit: '',
      });

      const newObjWCAdd = {
        ...state,
        casee: { ...state.casee, wantedCriminalRequest: wantedAdd },
        changesMade: true
      }
      return newObjWCAdd;
    case 'DELETE_WANTED':
      const currentWantedDelete = state.casee.wantedCriminalRequest || [];
      const wantedDelete = _.cloneDeep(currentWantedDelete);

      wantedDelete.splice(action.payload, 1);

      const newObjWCDelete = {
        ...state,
        casee: { ...state.casee, wantedCriminalRequest: wantedDelete },
        changesMade: true
      }
      return newObjWCDelete;

    // INVESTIGATORS
    case 'UPDATE_INVESTIGATORS':
      const newInvestigatorIds = action.payload?.map((investigator) => investigator.id);

      const newObjI = {
        ...state,
        casee: { ...state.casee, investigatorIds: newInvestigatorIds },
        changesMade: true
      }
      return newObjI;
    
    case 'SUBMIT_FORM':
      return { ...state, changesMade: false };

    default:
      return state;
  }
};

export const CaseDetails = (props) => {
  const { casee: initialCase, criminals, investigators, loadingSkeleton, loadingButtonDetails, loadingButtonPicture, onUpdate } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useAuth();
  const canEdit = auth.isAuthenticated ? auth.user.role !== 2 : false;

  useEffect(() => {
    if (initialCase) {
      dispatch({ type: 'CANCEL_EDIT' });
      dispatch({ type: 'UPDATE_CASE', payload: initialCase });
    }
  }, [initialCase]);

  const handleChangeGeneral = (event, index) => {
    if (event && event.target) {
      const { name, value } = event.target;
      console.log('Field Name:', name);
      console.log('Event:', event);

      const updatedValue =
        (name === 'typeOfViolation' || name === 'status')
          ? parseInt(value, 10)
          : value;

      dispatch({ type: 'UPDATE_CASE', payload: { [name]: updatedValue } });
    }
  };
  const handleDateTimeChange = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    dispatch({ type: 'UPDATE_DATE_TIME', payload: { fieldNameTime: fieldName, dateTime: date } });
  };

  // Handle Criminals
  const handleChangeCriminals = (event, selectedValue, index) => {
    const { name, value } = event.target;
    console.log('Field Name:', name);
    console.log('Value:', value);

    const updatedValue =
      name === 'typeOfViolation'
        ? parseInt(value, 10)
        : value;

    if (index !== undefined && index !== null) {
      if (selectedValue !== undefined && selectedValue !== null) {
        dispatch({ type: 'UPDATE_CRIMINALS', payload: { ['id']: selectedValue != '' ? selectedValue.id : selectedValue, index } });
      }
      else {
        dispatch({ type: 'UPDATE_CRIMINALS', payload: { [name]: updatedValue, index } });
      }

    }
  };
  const handleAddCriminal = () => {
    dispatch({ type: 'ADD_CRIMINAL' });
  };
  const handleDeleteCriminal = (index) => {
    dispatch({ type: 'DELETE_CRIMINAL', payload: index });
  };
  const handleDateTimeChangeCriminals = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_TIME_CRIMINALS', payload: { fieldNameTimeCriminals: fieldName, dateTimeCriminals: date, indexToUpdateDateTimeCriminals: index } });
    }
  };

  // Handle Victims
  const handleChangeVictims = (event, index) => {
    const { name, value } = event.target;
    console.log('Field Name:', name);
    console.log('Event:', event);

    const updatedValue = name === 'gender' ? value === 'true' : value;

    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_VICTIMS', payload: { [name]: updatedValue, index } });
    }
  };
  const handleDateChangeVictims = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_VICTIMS', payload: { fieldNameVictims: fieldName, dateVictims: date, indexToUpdateDateVictims: index } });
    }
  };
  const handleDateTimeChangeVictims = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_TIME_VICTIMS', payload: { fieldNameTimeVictims: fieldName, dateTimeVictims: date, indexToUpdateDateTimeVictims: index } });
    }
  };
  const handleAddVictim = () => {
    dispatch({ type: 'ADD_VICTIM' });
  };
  const handleDeleteVictim = (index) => {
    dispatch({ type: 'DELETE_VICTIM', payload: index });
  };

  // Handle Witnesses
  const handleChangeWitnesses = (event, index) => {
    const { name, value } = event.target;
    console.log('Field Name:', name);
    console.log('Event:', event);

    const updatedValue = name === 'gender' ? value === 'true' : value;

    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_WITNESSES', payload: { [name]: updatedValue, index } });
    }
  };
  const handleDateChangeWitnesses = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_WITNESSES', payload: { fieldNameWitnesses: fieldName, dateWitnesses: date, indexToUpdateDateWitnesses: index } });
    }
  };
  const handleDateTimeChangeWitnesses = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_TIME_WITNESSES', payload: { fieldNameTimeWitnesses: fieldName, dateTimeWitnesses: date, indexToUpdateDateTimeWitnesses: index } });
    }
  };
  const handleAddWitness = () => {
    dispatch({ type: 'ADD_WITNESS' });
  };
  const handleDeleteWitness = (index) => {
    dispatch({ type: 'DELETE_WITNESS', payload: index });
  };

  // Handle Evidences
  const handleChangeEvidences = (event, index) => {
    const { name, value } = event.target;
    console.log('Field Name:', name);
    console.log('Event:', event);

    // const updatedValue = name === 'gender' ? value === 'true' : value;

    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_EVIDENCES', payload: { [name]: value, index } });
    }
  };
  const handleAddEvidence = () => {
    dispatch({ type: 'ADD_EVIDENCE' });
  };
  const handleDeleteEvidence = (index) => {
    dispatch({ type: 'DELETE_EVIDENCE', payload: index });
  };
  const handleAddImageEvidence = (newImage, index) => {
    if (index !== undefined && index !== null) {
      dispatch({ type: 'ADD_IMAGE_EVIDENCE', payload: { newImageEvidence: newImage, index } });
    }
  };
  const handleDeleteImageEvidence = (imageIndex, index) => {
    if (index !== undefined && index !== null && imageIndex !== undefined && imageIndex !== null) {
      dispatch({ type: 'DELETE_IMAGE_EVIDENCE', payload: { imageIndex, index } });
    }
  };

  // Handle Case Images
  const handleAddCaseImage = (newImage) => {
    dispatch({ type: 'ADD_CASE_IMAGE', payload: { newImageCase: newImage } });
  };
  const handleDeleteCaseImage = (imageIndex) => {
    dispatch({ type: 'DELETE_CASE_IMAGE', payload: { imageIndex } });
  };

  // Handle Wanted Criminal
  const handleChangeWanted = (event, selectedValue, index) => {
    const { name, value } = event.target;
    console.log('Field Name:', name);
    console.log('Value:', value);

    const updatedValue =
      name === 'wantedType'
        ? parseInt(value, 10)
        : value;

    if (index !== undefined && index !== null) {
      if (selectedValue !== undefined && selectedValue !== null) {
        dispatch({ type: 'UPDATE_WANTED', payload: { ['criminalId']: selectedValue !== '' ? selectedValue.id : selectedValue, index } });
      }
      else {
        dispatch({ type: 'UPDATE_WANTED', payload: { [name]: updatedValue, index } });
      }

    }
  };
  const handleDateChangeWanted = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_WANTED', payload: { fieldNameWanted: fieldName, dateWanted: date, indexToUpdateDateWanted: index } });
    }
  };
  const handleAddWanted = () => {
    dispatch({ type: 'ADD_WANTED' });
  };
  const handleDeleteWanted = (index) => {
    dispatch({ type: 'DELETE_WANTED', payload: index });
  };

  // Handle Investigators
  const handleChangeInvestigators = (newValue) => {
    dispatch({ type: 'UPDATE_INVESTIGATORS', payload: newValue });
  }

  const handleSubmit = () => {
    // Additional logic for form submission if needed.
    // For now, we're just updating the criminal.
    dispatch({ type: 'SUBMIT_FORM' });
    if (state.changesMade && _.isEqual(state.casee, state.originalCase) === false) {
      onUpdate(state.casee);
    }
  };

  const handleEdit = () => {
    dispatch({ type: 'ENABLE_EDIT' });
  };

  const handleCancel = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}>
      <Box
        sx={{
          backgroundColor: 'transparent !important',
        }}
      >
        {loadingSkeleton ? (
          <>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary=""></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
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
                state={state}
                loading={loadingSkeleton}
                loadingButtonDetails={loadingButtonDetails}
                loadingButtonPicture={loadingButtonPicture}
                handleChangeGeneral={handleChangeGeneral}
                handleDateTimeChange={handleDateTimeChange}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                canEdit={canEdit}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin tội phạm" handleAdd={handleAddCriminal} addLabel="tội phạm">
              <CaseCriminals
                state={state}
                criminals={criminals}
                loading={loadingSkeleton}
                handleChangeCriminals={handleChangeCriminals}
                handleDateTimeChangeCriminals={handleDateTimeChangeCriminals}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleDeleteCriminal={handleDeleteCriminal}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin nạn nhân" handleAdd={handleAddVictim} addLabel="nạn nhân">
              <CaseVictims
                state={state}
                loading={loadingSkeleton}
                handleChangeVictims={handleChangeVictims}
                handleDateChangeVictims={handleDateChangeVictims}
                handleDateTimeChangeVictims={handleDateTimeChangeVictims}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleDeleteVictim={handleDeleteVictim}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin nhân chứng" handleAdd={handleAddWitness} addLabel="nhân chứng">
              <CaseWitnesses
                state={state}
                loading={loadingSkeleton}
                handleChangeWitnesses={handleChangeWitnesses}
                handleDateChangeWitnesses={handleDateChangeWitnesses}
                handleDateTimeChangeWitnesses={handleDateTimeChangeWitnesses}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleDeleteWitness={handleDeleteWitness}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin vật chứng" handleAdd={handleAddEvidence
            } addLabel="vật chứng">
              <CaseEvidences
                state={state}
                loading={loadingSkeleton}
                handleChangeEvidences={handleChangeEvidences}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleDeleteEvidence={handleDeleteEvidence}
                handleAddImageEvidence={handleAddImageEvidence}
                handleDeleteImageEvidence={handleDeleteImageEvidence}
              />
            </AccordionSection>

            <AccordionSection summary="Hình ảnh/video vụ án">
              <CaseImages
                state={state}
                loading={loadingSkeleton}
                loadingButtonDetails={loadingButtonDetails}
                loadingButtonPicture={loadingButtonPicture}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleAddCaseImage={handleAddCaseImage}
                handleDeleteCaseImage={handleDeleteCaseImage}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin truy nã" handleAdd={handleAddWanted} addLabel="truy nã">
              <CaseWanted
                state={state}
                criminals={criminals}
                loading={loadingSkeleton}
                handleChangeWanted={handleChangeWanted}
                handleDateChangeWanted={handleDateChangeWanted}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleDeleteWanted={handleDeleteWanted}
              />
            </AccordionSection>

            <AccordionSection summary="Thông tin điều tra viên">
              <CaseInvestigators
                state={state}
                investigators={investigators}
                loading={loadingSkeleton}
                handleChange={handleChangeGeneral}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleChangeInvestigators={handleChangeInvestigators}
              />
            </AccordionSection>

            {/* <AccordionSection
              summary="Thông tin phạm tội"
            >
              <CriminalInfo
                state={state}
                loading={loadingSkeleton}
                loadingButtonDetails={loadingButtonDetails}
                loadingButtonPicture={loadingButtonPicture}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
              />
            </AccordionSection> */}
            {/* {state.criminal.isWantedCriminal &&
              <AccordionSection
                summary="Thông tin truy nã"
              >
                <CriminalWanted
                  state={state}
                  loading={loadingSkeleton}
                  handleChange={handleChange}
                  handleDateChange={handleDateChange}
                />
              </AccordionSection>
            } */}
          </>
        )}
      </Box>
    </form >
  );
};
