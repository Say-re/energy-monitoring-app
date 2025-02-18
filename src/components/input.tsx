interface InputFieldProps {
    errorText: string,
    id: string,
    labelText: string,
    handleChange:<T> (event: T) => boolean,
    handleValidation: <T>(event: T) => boolean,
}

const InputField = ({
    errorText,
    id,
    labelText,
    handleChange,
    handleValidation,
}:InputFieldProps) => {

    return (
        <div>
        <label htmlFor={id}>{labelText}</label>
        <input id={id} onChange={handleChange} onBlur={handleValidation}/>
        <p>{errorText}</p>
        </div>
    )
};

export default InputField;
