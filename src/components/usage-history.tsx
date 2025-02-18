// Hooks
import { useState } from 'react';
import { useAuth } from 'react-oidc-context';

// Api
import getData from '../api/get';

// Components
import InputField from './input';
import RecordsTable from './records';

// Types
interface HandleValidationDateProps {
    date: string,
    key: string,
}

const EnergyUsage = () => {
    const [usageHistory, setUsageHistory] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setError] = useState({});

    const auth = useAuth();

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
        return true;
    }

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
        return true;
    }

    const handleValidationDate = ({date, key}: HandleValidationDateProps) => {
        return () => {
            const isValid = /^\d{4}-([0][1-9]|1[0-2])-([0][1-9]|[1-2]\d|3[01])$/gi.test(date);
            setError({
                ...errors,
                [key]: !isValid,
            });
            return isValid;

        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate both fields
        if (errors.startDate || errors.endDate) {
            return null;
        }
        const authToken = auth.user?.id_token || '';
        const userId = auth.user?.profile?.sub;

        const querystring = 'userId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate;

        const res = await getData({
            authToken,
            endpoint: 'history',
            querystring,
        });

        if (res.body.Items && res.body.Items.length) {
            setUsageHistory(res.body.Items);
        }
    }

    const errorMessageDate = 'Invalid Date format provided. Please enter a date in the format YYYY-MM-DD';

    return (
        <div>
        <InputField 
        handleChange={handleChangeStartDate}
        handleValidation={handleValidationDate({date: startDate, key: 'startDate'})}
        labelText={'Start Date'}
        id={'startDate'}
        errorText={errors?.startDate ? errorMessageDate : ''}
        /> 
        <InputField 
        handleChange={handleChangeEndDate}
        handleValidation={handleValidationDate({date: endDate, key: 'endDate'})}
        labelText={'End Date'}
        id={'endDate'}
        errorText={errors?.endDate ? errorMessageDate : ''}
        /> 
        <button onClick={handleFormSubmit}>Get Historical Data</button>
        {usageHistory && <div>
                <RecordsTable 
                    data={usageHistory}
                    fields={['date', 'energy']}
                    headers={['date', 'Consumption (kWh)']}
                />
            </div>
        }
        </div>
    );
}

export default EnergyUsage;
