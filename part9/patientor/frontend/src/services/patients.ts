import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import { EntryWithoutId, Entry } from "../EntryTypes";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );
  return data;
};

const getOneById = async (id: string): Promise<Patient | undefined> => {
  try {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/api/patients/${id}`
    );
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

const addEntry = async (id: string, object: EntryWithoutId) =>
{
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/api/patients/${id}/entries`, object
  );

  return data;
}

export default {
  getAll, getOneById, create, addEntry
};

