import React from 'react'
import { Entry } from '../../EntryTypes'

import BadgeIcon from '@mui/icons-material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) =>
{
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry}/>;
        default:
            return assertNever(entry)
    }
}

const HospitalEntry: React.FC<{entry: Entry}> = ({entry}) =>
{
    return (
        <div style={{ border: '1px solid black' }}>
            <div>{entry.type}</div>
            <div>{entry.date}</div>
            <div>{entry.description}</div>
            <div>diagnose by {entry.specialist}</div>
        </div>
    )
}

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = ({entry}) =>
{
    if (entry.type !== 'OccupationalHealthcare') {
        return null; 
    }
    return (
        <div style={{ border: '1px solid black' }}>
            <div>{entry.type}</div>
            <div>{entry.date}<BadgeIcon />{entry.employerName}</div>
            <div>{entry.description}</div>        
            <div>diagnose by {entry.specialist}</div>
        </div>
    )
}

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    const getIconColor = () =>
    {
        if (entry.type === 'HealthCheck') {
            switch (entry.healthCheckRating) {
                case 0:
                    return 'green';
                case 1:
                    return 'yellow';
                case 2:
                    return 'red';
                case 3:
                    return 'purple';
                default:
                    return 'green';
            }
        }
  };

  return (
    <div style={{ border: '1px solid black' }}>
      <div>{entry.type}</div>
      <div>{entry.date}<LocalHospitalIcon /></div>
      <div>{entry.description}</div>
      <FavoriteIcon style={{ color: getIconColor() }} />
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails

function assertNever(entry: Entry): React.ReactNode
{
    throw new Error('Function not implemented.');
}
