import patientData from '../../data/patients'
import { Patient, NewPatientEntry, NonSensitivePatient } from '../types/Patient'; 
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): NonSensitivePatient | undefined =>
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

export default {
  getEntries,
  addPatient,
  getPatientById
};