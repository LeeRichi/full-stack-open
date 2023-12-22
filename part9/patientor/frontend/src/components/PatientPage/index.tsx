import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients';
import { Gender, Patient } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from './EntryDetails';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal/index';
import { EntryWithoutId } from '../../EntryTypes';
import axios from 'axios';

const PatientPage = () =>
{
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchOnePatient = async () => {
      const patientData = await patientService.getOneById(id as string);
      setPatient(patientData || null);
    };
    void fetchOnePatient();
  }, [id])
  
  const [matchedObj, setMatchedObj] = useState<Patient | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const newEntry = await patientService.addEntry(id, values);
        setPatient((prevPatient: Patient | null) => {
          if (prevPatient === null) {
            return {
              entries: [newEntry],
              id: '',
              name: '',
              occupation: '',
              gender: Gender.Other,
            };
          }
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newEntry],
        };
      });
        setModalOpen(false);
      }     
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOneById(id);
        setMatchedObj(patient);
      }
    };

    fetchPatient();
  }, [id]);

    return (
      <>
        <h1>{matchedObj?.name}{matchedObj?.gender == 'male' ? <MaleIcon /> : <FemaleIcon />}</h1> 
        <div>ssn: {matchedObj?.ssn}</div>
        <div>occupation: {matchedObj?.occupation}</div>
        <h3>entries</h3>
        {matchedObj?.entries?.map(entry =>
          <EntryDetails entry={entry} />
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </>
  )
}

export default PatientPage