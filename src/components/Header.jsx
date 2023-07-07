
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header ({isLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = (location.pathname === '/signin') ? '/signup' : '/signin';
  const linkName = (location.pathname === '/signin') ? 'Регистрация' : 'Войти';


  const menuButton = document.querySelector(".header__nav-button")
  const page = document.querySelector(".page")

  function onMenuButtonClick() {
    menuButton.classList.toggle('header__nav-button_clicked')
    page.classList.toggle('page_clicked')
  }

  return (
    <header className="header">  
        <div className="header__logo"></div>
        {isLoggedIn 
        ? (
          <>
            <div className="header__nav-button-container" onClick={onMenuButtonClick}>
              <div className="header__nav-button" ></div>
            </div>
            <div className="header__nav">
              <p className="header__nav-email">email@email.com</p>
              <button className="header__button-logout">Выйти</button> 
            </div>
          </>
          ) 
          : (
            <Link to={path} className="header__link">{linkName}</Link> 
          )
        }


    </header>
  )
}

export default Header


