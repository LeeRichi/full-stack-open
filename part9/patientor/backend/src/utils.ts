import { NewPatientEntry, Patient } from "./types/Patient";
import { Gender } from "./types/Patient";

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
  

const parseString = (value: unknown, field: string): string => {
  if (!value || typeof value !== 'string') {
    throw new Error(`Invalid or missing ${field}: ${value}`);
  }
  return value;
};

const parseGender = (value: Gender): Gender => {
  if (!value || !Object.values(Gender).includes(value)) {
    throw new Error(`Invalid or missing gender: ${value}`);
  }
  return value as Gender;
};


export { toNewPatientEntry, toNonSensitivePatient };