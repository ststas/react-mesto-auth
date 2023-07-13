function Input (props){

  return (
    <>
      <input 
        type={props.type}
        name={props.name}
        placeholder={props.placeHolder} 
        className={props.inputClassName}
        required={props.required}
        minLength={props.minLength} 
        maxLength={props.maxLength}
        value={props.value ?? ''}
        onChange={props.onChange} 
      />
      <span className={`${props.spanClassName} ${props.error && `${props.spanClassName}_visible`}`}>{props.error}</span>
    </>
  )
}

export default Input