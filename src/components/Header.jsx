import { Link, useLocation} from "react-router-dom";

function Header ({ isLoggedIn, onSignOut, userEmail }) {
  const location = useLocation();

  const linkPath = (location.pathname === '/signin') ? '/signup' : '/signin';
  const linkText = (location.pathname === '/signin') ? 'Регистрация' : 'Войти';

  const menuButton = document.querySelector(".header__nav-button")
  const page = document.querySelector(".page")

  function onMenuButtonClick() {
    menuButton.classList.toggle('header__nav-button_clicked')
    page.classList.toggle('page_clicked')
  }

  function signOut () {
    menuButton.classList.toggle('header__nav-button_clicked')
    page.classList.remove('page_clicked')
    onSignOut()
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
              <p className="header__nav-email">{userEmail}</p>
              <button className="header__button-logout" onClick={signOut}>Выйти</button> 
            </div>
          </>
          ) 
          : (
            <Link to={linkPath} className="header__link">{linkText}</Link> 
          )
        }


    </header>
  )
}

export default Header


