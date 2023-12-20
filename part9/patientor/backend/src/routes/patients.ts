import express from 'express';

const router = express.Router();

import patientService from '../services/patients'
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) =>
{
  const data = patientService.getEntries();
  res.send(data);
});

router.post('/', (req, res) => {
  const newPaitent = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPaitent)
  res.send(addedPatient);
});

export default router;