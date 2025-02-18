// Styles
import styles from '../styles/components.module.scss'

// Types
interface RecordTableProps {
    data: EnergyUsage[],
    fields: string[],
    headers: string[]
}

type EnergyUsage = {
    userId: string,
    date: string,
    energy: number,
}

const RecordsTable = ({
    data,
    fields,
    headers,
}:RecordTableProps) => {
    if (!data || !data.length || !fields || !fields.length) {
        return <p>No Data Available.</p>
    }

    return (
        <table className={styles['record-table']}>
        <thead>
        <tr className="">
        {headers && headers.map((col: string) => (
            <th key={col} className="">
            {col.charAt(0).toUpperCase() + col.slice(1)}
            </th>
        ))}
        </tr>
        </thead>
        <tbody>
        {data.map((item, indx: number) => (
            <tr key={indx} className="">
            {fields.map((field: string) => (
                <td key={field} className="">
                {item[field]}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
        </table>
    );
}

export default RecordsTable;
