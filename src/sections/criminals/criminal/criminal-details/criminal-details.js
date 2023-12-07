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
import CriminalGeneral from './criminal-general';
import CriminalInfo from './criminal-info';
import CriminalWanted from './criminal-wanted';


const initialState = {
  criminal: {
    name: '',
    birthday: null,
    gender: true,
    anotherName: '',
    phoneNumber: '',
    homeTown: '',
    nationality: '',
    ethnicity: '',
    religion: '',
    citizenId: '',
    careerAndWorkplace: '',
    permanentResidence: '',
    currentAccommodation: '',
    fatherName: '',
    fatherBirthday: null,
    fatherCitizenId: '',
    motherName: '',
    motherBirthday: null,
    motherCitizenId: '',
    characteristics: '',
    status: 0,
    relatedCases: '',
    dangerousLevel: '',
    dateOfMostRecentCrime: null,
    releaseDate: '2023-11-30',
    entryAndExitInformation: '',
    bankAccount: '',
    gameAccount: '',
    facebook: '',
    zalo: '',
    otherSocialNetworks: '',
    phoneModel: '',
    research: '',
    approachArrange: '',
    otherInformation: '',
    avatar: '',
    avatarLink: '',
    isWantedCriminal: true,
    vehicles: '',
    wantedCriminals: [],
  },
  originalCriminal: {},
  changesMade: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ENABLE_EDIT':
      return {
        ...state,
        originalCriminal: { ...state.criminal }
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        criminal: { ...state.originalCriminal },
        changesMade: false
      };

    case 'UPDATE_CRIMINAL':
      const newObj = {
        ...state,
        criminal: { ...state.criminal, ...action.payload },
        changesMade: true
      }
      console.log(newObj);
      return newObj;

    case 'UPDATE_CRIMINAL_WANTED':
      const currentWantedCriminals = state.criminal.wantedCriminals || [];
      const wantedCriminals = [...currentWantedCriminals];
      const indexToUpdate = action.payload.index;

      if (indexToUpdate !== undefined && indexToUpdate !== null) {
        wantedCriminals[indexToUpdate] = {
          ...wantedCriminals[indexToUpdate],
          ...action.payload,
        };
      }

      const newObj1 = {
        ...state,
        criminal: { ...state.criminal, wantedCriminals: wantedCriminals },
        changesMade: true
      }
      return newObj1;

    case 'UPDATE_DATE':
      const { fieldName, date } = action.payload;
      return {
        ...state,
        criminal: { ...state.criminal, [fieldName]: format(date, 'dd/MM/yyyy') },
        changesMade: true
      };

    case 'UPDATE_DATE_WANTED':
      const { fieldNameWanted, dateWanted, indexToUpdateDate } = action.payload
      const currentWantedCriminalsDate = state.criminal.wantedCriminals || [];
      const wantedCriminalsDate = [...currentWantedCriminalsDate];

      if (indexToUpdateDate !== undefined && indexToUpdateDate !== null) {
        wantedCriminalsDate[indexToUpdateDate] = {
          ...wantedCriminalsDate[indexToUpdateDate],
          [fieldNameWanted]: format(dateWanted, 'dd/MM/yyyy'),
        };
      }

      const newObj2 = {
        ...state,
        criminal: { ...state.criminal, wantedCriminals: wantedCriminalsDate },
        changesMade: true
      }
      // console.log(newObj2);
      return newObj2;

    case 'SUBMIT_FORM':
      return { ...state, isFieldDisabled: true, changesMade: false };

    default:
      return state;
  }
};

export const CriminalDetails = (props) => {
  const { criminal: initialCriminal, loadingSkeleton, loadingButtonDetails, loadingButtonPicture, onUpdate } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialCriminal) {
      dispatch({ type: 'CANCEL_EDIT' });
      dispatch({ type: 'UPDATE_CRIMINAL', payload: initialCriminal });
    }
  }, [initialCriminal]);

  const handleChange = (event, index) => {
    if (event && event.target) {
      const { name, value } = event.target;
      console.log('Field Name:', name);
      console.log('Event:', event);

      // Convert the string value to a boolean if the field is 'gender'
      const updatedValue = name === 'gender' ? value === 'true' : name === 'status' ? parseInt(value, 10) : value;

      if (index !== undefined && index !== null) {
        dispatch({ type: 'UPDATE_CRIMINAL_WANTED', payload: { [name]: updatedValue, index } });
      }
      else {
        dispatch({ type: 'UPDATE_CRIMINAL', payload: { [name]: updatedValue } });
      }
      // console.log(state)
    }
  };

  const handleDateChange = (fieldName, date, index) => {
    console.log('Field Name:', fieldName);
    console.log('Date:', date);
    if (index !== undefined && index !== null) {
      dispatch({ type: 'UPDATE_DATE_WANTED', payload: { fieldNameWanted: fieldName, dateWanted: date, indexToUpdateDate: index } });
    }
    else {
      dispatch({ type: 'UPDATE_DATE', payload: { fieldName, date } });
    }
  };

  const handleSubmit = () => {
    // Additional logic for form submission if needed.
    // For now, we're just updating the criminal.
    dispatch({ type: 'SUBMIT_FORM' });
    if (state.changesMade) {
      onUpdate(state.criminal);
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
              <AccordionSection summary="Thông tin chung"></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
                },
              }}
            >
              <AccordionSection summary="Thông tin tội phạm"></AccordionSection>
            </Skeleton>
            <Skeleton
              variant="rounded"
              sx={{
                '&:not(:last-child)': {
                  marginBottom: '16px',
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
            </AccordionSection>
            <AccordionSection
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
            </AccordionSection>
            {state.criminal.isWantedCriminal &&
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
            }
          </>
        )}
      </Box>
    </form>
  );
};
