import diagnoseData from '../../data/diagnoses'
import { Diagnose } from '../types/Diagnose';

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};