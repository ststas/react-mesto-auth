import api from '../utils/api'
import * as auth from '../utils/auth';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'
import ImagePopup from './ImagePopup'
import ProtectedRoute from "./ProtectedRoute"
import Login from "./Login"
import Register from "./Register"
import { useState, useEffect, useCallback } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';


function App() {
//устанавливаем стейты
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  
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
//ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ
//функция установки стейта для попапов
  const setAllPopupsStates = useCallback(()=> {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsImagePopupOpen(false)
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
    isLoggedIn ??
    setIsLoading(true)
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData)
      setCards(cardsData)
      setIsLoading(false)
    })
    .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
  },[])
// функция регистрации нового пользователя

  function handleRegister({email, password}) {
    console.log(email)
    console.log(password)

  }

// функция авторизации
function handleLogin({email, password}) {
  console.log(email)
  console.log(password)
}

// возвращаем разметку Main и попапы
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn}/>
        
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
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route 
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                buttonText={"Войти"}
              />
            }
          />
          <Route 
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                buttonText={"Зарегистрироваться"}
              />
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
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
