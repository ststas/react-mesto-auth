import api from '../utils/api'
import * as auth from '../utils/auth'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'
import ImagePopup from './ImagePopup'
import Login from "./Login"
import Register from "./Register"
import InfoTooltip from "./InfoTooltip"
import ProtectedRoute from "./ProtectedRoute"
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'

function App() {
//устанавливаем стейты и определяем константы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false)
  const [isLogSuccessful, setIsLogSuccessful] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

//ФУНКЦИИ ОТКРЫТИЯ ПОПАПОВ
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    handleAddListener()
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    handleAddListener()
  }
  function handleAddNewPlaceClick() {
    setIsAddPlacePopupOpen(true)
    handleAddListener()
  }
  function handleDeleteNewPlaceClick(card) {
    setCardToDelete(card)
    setIsDeleteCardPopupOpen(true)
    handleAddListener()
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
    handleAddListener()
  }
  function handleInfoToolClick () {
    setIsInfoPopupOpen(true)
    handleAddListener()
  }
//ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ
//функция установки стейта для попапов
  const setAllPopupsStates = useCallback(()=> {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoPopupOpen(false)
    setSelectedCard(null)
    setCardToDelete(null)
}, [])
//функции закрытия попапа при нажатии на ESC 
  const handleCloseOnEsc = useCallback((event) => {
      if (event.key === 'Escape') {
        setAllPopupsStates()   
        document.removeEventListener('keydown', handleCloseOnEsc)
      }
  }, [setAllPopupsStates])
//функции закрытия попапов
  const closeAllPopups = useCallback(() => {
    setAllPopupsStates()
    document.removeEventListener('keydown', handleCloseOnEsc)
  },[setAllPopupsStates, handleCloseOnEsc])
//функция установки слушалтеля
  function handleAddListener() {
    document.addEventListener('keydown', handleCloseOnEsc)
  }  
// функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? updatedCard : currentCard))
      })
      .catch(err => console.error(`Ошибка добавления/удаления лайка карточки: ${err}`)) 
  }
// функция удаления карточки
  function handleDeleteCard(card) {
    setIsLoading(true)
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))
        closeAllPopups()
      })
      .catch(err => console.error(`Ошибка удаления карточки: ${err}`))
      .finally(() => setIsLoading(false))
  }
// функция обновления данных профиля
  function handleUpdateUser(userData) {
    setIsLoading(true)
    api.setUserInfo(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData)
        closeAllPopups()
      })
      .catch(err => console.error(`Ошибка редактирования профиля: ${err}`))
      .finally(() => setIsLoading(false))
  }
// функция обновления аватара
  function handleUpdateAvatar(userData) {
    setIsLoading(true)
    api.setUserAvatar(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData)
        closeAllPopups()
      })
      .catch((err) => console.error(`Ошибка редактирования аватара профиля: ${err}`))
      .finally(() => setIsLoading(false))
  }
// функция создания новой карточки
  function handleAddPlaceSubmit (cardData) {
    setIsLoading(true)
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.error(`Ошибка добавления карточки: ${err}`))
      .finally(() => setIsLoading(false))
  }
// загрузка данных с сервера
  useEffect(() => { 
    if (isLoggedIn) {
      setIsFetching(true)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
        setIsFetching(false)
      })
      .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
  }},[isLoggedIn])  
// функция регистрации нового пользователя
  function handleRegister(email, password) {
    setIsLoading(true)
    auth.register(email, password)
    .then(() => {
      setIsLogSuccessful(true)
      handleInfoToolClick()
      navigate('/signin', {replace: true})
    })
    .catch(err => {
      handleInfoToolClick()
      console.error(`Ошибка регистрации пользователя: ${err}`)
    })
    .finally(() => {setIsLoading(false)})
  }
// функция авторизации
  function handleLogin (email, password) {
    setIsLoading(true)
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("isLoggedIn", true);
      setUserEmail(email)
      setIsLoggedIn(true)
      navigate('/', {replace: true})
    }
    )
    .catch(err => {
      setIsLogSuccessful(false)
      handleInfoToolClick()
      console.error(`Ошибка авторизации пользователя: ${err}`)
    })
    .finally(() => setIsLoading(false))
  }
// функция выхода из профиля
  function handleSignOut () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/signin', {replace: true})
  }
// функции проверки наличия токена  
  const handleTokenCheck = useCallback(()=>{
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        setUserEmail(res.data.email)
        setIsLoggedIn(true)
        navigate('/', {replace: true})
      })
      .catch(err => console.error(`Ошибка авторизации пользователя: ${err}`))
    }
  }, [setUserEmail, setIsLoggedIn, navigate])

  useEffect(() => {
    handleTokenCheck();
  },[handleTokenCheck])

// возвращаем разметку
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} userEmail={userEmail}/>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute 
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleAddNewPlaceClick}
                onDeleteCard={handleDeleteNewPlaceClick}
                onClickCard={handleCardClick}
                onLikeCard={handleCardLike}
                cards={cards}
                isFetching={isFetching}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route 
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                isLoading={isLoading}
              />
            }
          />
          <Route 
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />
            }
          />
        </Routes>

        {isLoggedIn && <Footer/>}
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
  
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
        />
        
        <ImagePopup
          name='picture'
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name='info-tooltip'
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          isLogSuccessful={isLogSuccessful}
        />

      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
