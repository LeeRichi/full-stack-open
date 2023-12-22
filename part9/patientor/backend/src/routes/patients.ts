import express from 'express';

const router = express.Router();

import patientService from '../services/patients'
import {toNewPatientEntry, toNewEntry} from '../utils';

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
      res.send(patient);
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

router.post('/:id/entries', (req, res) =>
{
  const patient = patientService.getPatientById(req.params.id);
  if( patient === undefined ){
    res.status(404).send(`patient not found`);
    return;
  }
  const newEntry = toNewEntry(req.body);
  
  const addedEntry = patientService.addEntry(patient, newEntry);
  res.send(addedEntry);
});

export default router;