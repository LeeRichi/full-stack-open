import patientData from '../../data/patients'
import { Patient, NewPatientEntry } from '../types/Patient'; 
import { Entry, EntryWithoutId } from '../types/FullEntries';
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined =>
{
  const foundPaitent = patients.find((patient) => patient.id === id);
  return foundPaitent;
};

const addPatient = ( entry: NewPatientEntry ): Patient=> {
  const newPaitent = {
    id: uuid(),
    entries: [],
    ...entry
  }

  patients.push(newPaitent);
  return newPaitent;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry =>
{
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patient.entries.push(newEntry)
  return newEntry
}

export default {
  getEntries,
  addPatient,
  getPatientById,
  addEntry
};