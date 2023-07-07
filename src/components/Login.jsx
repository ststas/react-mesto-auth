import FormValidation from './Hooks/FormValidation'

function Login ({buttonText}){
  const {values, errors, isValid, handleChange, resetForm }  = FormValidation()
  const {email, password} = values

  function handleSubmit(event){
    event.preventDefault()

    resetForm()

  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form name="login" className="auth__form" onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        className="auth__field"
        required
        value={email ?? ''} 
        onChange={handleChange} 
      />
      <span className={`auth__error ${errors.email && 'auth__error_visible'}`}>{errors.email}</span>
      <input 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        className="auth__field"
        required
        value={password ?? ''} 
        onChange={handleChange} 
      />
      <span className={`auth__error ${errors.password  && 'auth__error_visible'}`}>{errors.password }</span>
      <button type="submit" className={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}>{buttonText}</button> 
      </form>
    </div>
  )

}
export default Login