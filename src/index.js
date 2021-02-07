import './styles.css'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { rootReduser } from './redux/rootReducer'
import { decrement, increment, asyncIncrement, changeTheme } from './redux/actions'
import { composeWithDevTools } from 'redux-devtools-extension';

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//    return function(next) {
//       return function(action) {
//          return next(action)
//       }
//    }
// }

const store = createStore(
   rootReduser,
   composeWithDevTools(
      applyMiddleware(thunk, logger)
   )
)

addBtn.addEventListener('click', () => {
   store.dispatch(increment())
})
subBtn.addEventListener('click', () => {
   store.dispatch(decrement())
})
asyncBtn.addEventListener('click', () => {
   store.dispatch(asyncIncrement())
})
themeBtn.addEventListener('click', () => {
   const newTheme = document.body.classList.contains('light')
      ? 'dark'
      : 'light'
   store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
   const state = store.getState()

   counter.textContent = state.counter
   document.body.className = state.theme.value;

   [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
      btn.disabled = state.theme.disabled
   });
})

store.dispatch({type: 'INIT_APLICATION'})