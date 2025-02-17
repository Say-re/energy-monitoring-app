import { useState } from 'react';
// API
import postData from '../api/post.ts';

// User Auth
import { useAuth } from "react-oidc-context";

const ManualData = () => {
  const [date, setDate] = useState<string>(null);
  const [energy, setEnergy] = useState<number>(null);
  const [error, setError] = useState<{[key: string]: string}>({});

  const auth = useAuth();
  if (date) {
    const isValid = /^\d{4}-([0][1-9]|1[0-2])-([0][1-9]|[1-2]\d|3[01])$/g.test(date);
    setError({
      ...error,
      date: isValid,
    });
  }
  if (energy) {
    const isValid = Number(energy) && energy > 0;
    setError({
      ...error,
      energy: isValid,
    });
  }

  const handleDateInput = (e) => {
     if (e.target.value) {
        setDate(e.target.value);
     }
  }

  const handleEnergyInput = (e) => {
    if (e.target.value) {
      setEnergy(e.target.value);
    }
  }

  return (
    <form>
      <div>
        <label for='date'> Please enter the date of energy usage (YYYY-MM-DD) </label>
        <input id='date' onChange={handleDateInput}/>
      </div>
      <div>
        <label for='energy'> Please enter the total energy usage in (kWh) </label>
        <input id='energy' onChange={handleEnergyInput}/>
      </div>
      <button type='submit' onClick={(e) => {
        e.preventDefault();
        const data = {
          date,
          energy,
          accessToken: auth.user.access_token,
          user_id: auth.user.profile['cognito:username'],
        };
        if (data && data.accessToken && data.user_id) {
          postData({
            endpoint: '', // Insert Endpoint
            data,
          });
        }
        console.log('EVENT', e)
      }}>Submit</button>
    </form>
  )
};

export default ManualData;
