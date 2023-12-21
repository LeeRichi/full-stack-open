import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );
  console.log(data);
  return data;
};

const getOneById = async (id: string): Promise<Patient | undefined> => {
  try {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/api/patients/${id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

export default {
  getAll, getOneById, create
};

