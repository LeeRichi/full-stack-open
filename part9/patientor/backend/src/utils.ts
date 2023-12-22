import { NewPatientEntry, Patient } from "./types/Patient";
import { Discharge, EntryWithoutId, HealthCheckRating, SickLeave, Diagnosis, HealthCheckEntry } from './types/FullEntries';
import { Gender } from "./types/Patient";

const parseString = (value: unknown, field: string): string => {
  if (!value || typeof value !== 'string') {
    throw new Error(`Invalid or missing ${field}: ${value}`);
  }
  return value;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry =>
{
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object
        && 'occupation' in object
    ) {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender as Gender),
            occupation: parseString(object.occupation, 'occupation'),
        };

        return newEntry;
    };
    throw new Error('Incorrect data: some fields are missing');
}

const toNonSensitivePatient = (object: unknown): Patient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'id' in object
  ) {
    const newEntry: Patient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'ssn'),
      entries: [],
      gender: parseGender(object.gender as Gender),
      occupation: parseString(object.occupation, 'occupation'),
      id: parseString(object.id, 'id'),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseGender = (value: Gender): Gender => {
  if (!value || !Object.values(Gender).includes(value)) {
    throw new Error(`Invalid or missing gender: ${value}`);
  }
  return value as Gender;
};

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
//     if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//       return [] as Array<Diagnosis['code']>;
//     }
  
//     return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object') {
    return [] as Array<Diagnosis['code']>;
  }
  return object as Array<Diagnosis['code']>;
};



const parseHealthCheckRating = (value: HealthCheckRating): HealthCheckRating =>
{
  if (!HealthCheckRating.hasOwnProperty(value)) {
    throw new Error(`Invalid or missing healthCheckRating: ${value}`);
  }
  return value as HealthCheckRating;
};

const parseSickLeave = (value: SickLeave): SickLeave => {
  if (!value) {
    throw new Error(`Invalid or missing sickLeave: ${value}`);
  }
  if( 'startDate' in value
    && 'endDate' in value){
      const sickLeave: SickLeave = {
        startDate: parseString(value.startDate, 'startDate'),
        endDate: parseString(value.endDate, 'endDate')
      };
      return sickLeave;
  }
  throw new Error('Incorrect data: a field missing');
};

const parseDischarge = (value: Discharge): Discharge => {
  if (!value) {
    throw new Error(`Invalid or missing discharge: ${value}`);
  }

  if ('date' in value
    && 'criteria' in value) { 
      const discharge: Discharge = {
        date: parseString(value.date, 'date'),
        criteria: parseString(value.criteria, 'criteria')
      };
      return discharge;
    }
  throw new Error('Incorrect data: a field missing');
};

const toNewEntry = (object: unknown): EntryWithoutId =>
{
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object) {
    const newBaseEntry: EntryWithoutId = 'diagnosisCodes' in object ?
    {
      description: parseString(object.description, 'description'),
      date: parseString(object.date, 'date'),
      specialist: parseString(object.specialist, 'specialist'),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    } as EntryWithoutId
    : 
    {
      description: parseString(object.description, 'description'),
      date: parseString(object.date, 'date'),
      specialist: parseString(object.specialist, 'specialist'),
    } as Omit<HealthCheckEntry, 'id'>;
    
    if('type' in object){
      switch(object.type){
        case 'HealthCheck':
          if('healthCheckRating' in object){
            const healthCheckEntry: EntryWithoutId = {
                ...newBaseEntry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating as HealthCheckRating)
            };
            return healthCheckEntry;
        }
        throw new Error("Incorrect data: health check rating missing");

        case 'OccupationalHealthcare':
          if('employerName' in object){

              let occupationalHealthcareEntry: EntryWithoutId;

              'sickLeave' in object ?
              occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type:'OccupationalHealthcare',
                  employerName: parseString(object.employerName, 'employerName'),
                  sickLeave: parseSickLeave(object.sickLeave as SickLeave)
              }
              :
              occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type:'OccupationalHealthcare',
                  employerName: parseString(object.employerName, 'employerName'),
              };
              return occupationalHealthcareEntry;
          }
          throw new Error("Incorrect data: employer name missing");
          
        case 'Hospital':
          if('discharge' in object){
              const hospitalEntry: EntryWithoutId = {
                  ...newBaseEntry,
                  type: 'Hospital',
                  discharge: parseDischarge(object.discharge as Discharge)
              };
              return hospitalEntry;
          }
          throw new Error("Incorrect data: discharge missing");
        }
      }
    }
  throw new Error('Incorrect data: a field missing');
}

export { toNewPatientEntry, toNonSensitivePatient, toNewEntry };