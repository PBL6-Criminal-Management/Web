import axios from "./axios";
import Cookies from "js-cookie";

export const getAllWantedCriminals = async (filter) => {
  try {
    const params = {};

    if (filter.name !== "") {
      params.Name = filter.name;
    }

    if (filter.charge !== "") {
      params.Charge = filter.charge;
    }

    if (filter.characteristics !== "") {
      params.Characteristics = filter.characteristics;
    }

    if (filter.decisionMakingUnit !== "") {
      params.DecisionMakingUnit = filter.decisionMakingUnit;
    }

    if (filter.permanentResidence !== "") {
      params.PermanentResidence = filter.permanentResidence;
    }

    if (filter.weapon !== "") {
      params.Weapon = filter.weapon;
    }

    if (filter.yearOfBirth !== "") {
      params.YearOfBirth = filter.yearOfBirth;
    }
    if (filter.wantedType !== "") {
      params.WantedType = filter.wantedType;
    }
    const response = await axios.get(`/api/v1/wanted-criminal`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};

export const getWantedCriminalById = async (criminalId) => {
  try {
    const response = await axios.get(`/api/v1/criminal/${criminalId}`);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};