import patientData from '../../data/patients'
import { Patient, NewPatientEntry } from '../types/Patient'; 
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const addPatient = ( entry: NewPatientEntry): Patient=> {
  const newPaitent = {
    id: uuid(),
    ...entry
  }

  patients.push(newPaitent);
  return newPaitent;
};

export default {
  getEntries,
  addPatient
};