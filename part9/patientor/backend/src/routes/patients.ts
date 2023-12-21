import express from 'express';

const router = express.Router();

import patientService from '../services/patients'
import {toNewPatientEntry, toNonSensitivePatient} from '../utils';

router.get('/', (_req, res) =>
{
  const data = patientService.getEntries();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const patient = patientService.getPatientById(id);

    if (patient) {
      const nonSensitivePatient = toNonSensitivePatient(patient);
      res.send(nonSensitivePatient);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/', (req, res) => {
  const newPaitent = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPaitent)
  res.send(addedPatient);
});

export default router;