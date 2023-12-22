import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../../EntryTypes";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([])
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [type, setType] = useState<EntryType>('Hospital');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [healthCheckRating, setHealthCheckRating] = useState<string>('0')
  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
      
    const baseEntry: {
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes?: Array<Diagnosis['code']> | string[];
    } = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch(type){
      case "HealthCheck":
        onSubmit ({
          type: "HealthCheck",
          ...baseEntry,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        }); 
        break;
      case "Hospital":
        onSubmit ({
            type: "Hospital",
            ...baseEntry,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
        }); 
        break;
      case "OccupationalHealthcare":
        onSubmit({
            type:  "OccupationalHealthcare",
            ...baseEntry,
            employerName: employerName,
            sickLeave: {
                startDate: startDate,
                endDate: endDate
            }
        })
    }
  };

  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Base Entry info</InputLabel>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          label="date"
          style={{marginTop: '15px'}}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              min: '2017-04-01',
              max: '2024-12-31',
            },
          }}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          fullWidth
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes([target.value])}
        />
        <InputLabel style={{ marginTop: 20 }}>Entry Types</InputLabel>
        <Select
            label="Type"
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value as EntryType)}
        >
            <MenuItem key="HealthCheck" value="HealthCheck">Health Check</MenuItem>
            <MenuItem key="Hospital" value="Hospital">Hospital</MenuItem>
            <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>
        {(() => {
          switch (type) {
            case 'HealthCheck':
              return (
                <>
                <InputLabel>Health Check Rating</InputLabel>
                <RadioGroup
                  row
                  name="healthCheckRating"
                  value={healthCheckRating}
                  onChange={(event) => setHealthCheckRating(event.target.value)}
                >
                  {[0, 1, 2, 3].map((rating) => (
                    <FormControlLabel
                      key={rating}
                      value={rating.toString()}
                      control={<Radio />}
                      label={rating.toString()}
                    />
                  ))}
                </RadioGroup>
                </>
              );

            case 'Hospital':
              return (
                <>
                  <TextField
                    type="date"
                    label="Discharge Date"
                    style={{marginTop: '15px'}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        min: '2017-04-01',
                        max: '2024-12-31',
                      },
                    }}
                    value={dischargeDate}
                    onChange={(event) => setDischargeDate(event.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Discharge Criteria"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => setDischargeCriteria(target.value)}
                  />
                </>
              );

            case 'OccupationalHealthcare':
              return (
                <>
                  <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
                  <TextField
                    type="date"
                    label="Start Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    fullWidth
                    style={{marginTop: '15px'}}
                  />
                  <TextField
                    type="date"
                    label="End Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    fullWidth
                    style={{marginTop: '15px'}}
                  />
                  <TextField
                    label="Employer Name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                  />                  
                </>
              );
            default:
              return null;
          }
        })()}
        <Grid style={{marginTop: '20px'}}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;