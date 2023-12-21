import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients';
import { Patient } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () =>
{
    const { id } = useParams();
    const [matchedObj, setMatchedObj] = useState<Patient | undefined>(undefined);
    console.log(matchedObj)

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
      </>
  )
}

export default PatientPage