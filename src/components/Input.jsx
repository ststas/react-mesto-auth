function Input (props){

  return (
    <>
      <input 
        type={props.type}
        name={props.name}
        placeholder={props.placeHolder} 
        className={`popup__field ${props.inputClass} ${props.error && 'popup__field_type_error'}`}
        required={props.required}
        minLength={props.minLength} 
        maxLength={props.maxLength}
        value={props.value ?? ''}
        onChange={props.onChange} 
      />
      <span className={`popup__error ${props.error && 'popup__error_visible'}`}>{props.error}</span>
    </>
  )
}

export default Input