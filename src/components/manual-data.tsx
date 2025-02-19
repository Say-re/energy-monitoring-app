import { ChangeEvent, useState } from 'react';
// API
import postData from '../api/post';

// User Auth
import { useAuth } from "react-oidc-context";

const ManualData = () => {
    const [date, setDate] = useState<string>('');
    const [energy, setEnergy] = useState<number>(0);
    const [error, setError] = useState<{[key: string]: boolean}>({});

    const auth = useAuth();

    const handleDateInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== date) {
            setDate(e.target.value);
        }
    }

    const validateDate = () => {
        const isValid = /^\d{4}-([0][1-9]|1[0-2])-([0][1-9]|[1-2]\d|3[01])$/gi.test(date);
        setError({
            ...error,
            date: !isValid,
        });
        return isValid;
    };

    const handleEnergyInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) && Number(e.target.value) !== energy) {
            setEnergy(Number(e.target.value));
        }
    }

    const validateEnergy = () => {
        const isValid = Boolean(Number(energy) && energy > 0);
        setError({
            ...error,
            energy: !isValid,
        });
        return isValid;

    }

    return (
        <form>
        <div>
        <label htmlFor='date'> Please enter the date of energy usage (YYYY-MM-DD) </label>
        <input id='date' onChange={handleDateInput} onBlur={validateDate}/>
        </div>
        <div>
        <label htmlFor='energy'> Please enter the total energy usage in (kWh) </label>
        <input id='energy' onChange={handleEnergyInput} onBlur={validateEnergy}/>
        <p>{error.energy}</p>
        </div>
        <button type='submit' onClick={async (e) => {
            e.preventDefault();
            const isValid = validateEnergy() && validateDate();
            console.log('errors', error, isValid);
            if (isValid) {
                const data = {
                    date,
                    energy,
                    userId: auth.user?.profile?.sub || '',
                };
                console.log("Data", data, !error.date);
                if (data && data.userId && !error.date) {
                    const res = await postData({
                        auth: auth.user?.id_token || '',
                        data,
                        endpoint: 'input',
                    });
                    console.log("REsponse", res);
                }
            }
            console.log('EVENT', e)
        }}>Submit</button>
        </form>
    )
};

export default ManualData;
