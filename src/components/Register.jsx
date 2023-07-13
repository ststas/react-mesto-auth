import useFormValidation from '../hooks/useFormValidation'
import Form from './Form'
import Input from './Input'
import { Link } from "react-router-dom";

function Register ({ onRegister, isLoading }){

  const { values, errors, isValid, handleChange, resetForm }  = useFormValidation()
  const { email, password } = values
  
  function handleSubmit() {
    onRegister(email, password, resetForm)
  }
  
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <Form 
        name={'login'} 
        formClassName={'auth__form'}
        onSubmit={handleSubmit}
        submitButtonClassName={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}
        buttonText={`${isLoading ? 'Вход...' : 'Войти'}`} 
      >
        <Input 
          type={'email'}
          name={'email'}
          placeHolder={'Email'}
          inputClassName={'auth__field'}
          required={true}
          minLength={''}
          maxLength={''}
          value={email}
          onChange={handleChange}
          error={errors.email}
          spanClassName={'auth__error'}
        />
        <Input 
          type={'password'}
          name={'password'}
          placeHolder={'Пароль'}
          inputClassName={'auth__field'}
          required={true}
          minLength={''}
          maxLength={''}
          value={password}
          onChange={handleChange}
          error={errors.password}
          spanClassName={'auth__error'}
        />
        <Link to="/signin" className="auth__link">Уже зарегистрированы? Войти</Link>
      </Form>  
    </div>
  )

}
export default Register