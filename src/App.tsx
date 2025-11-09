import './App.css'
import {TodolistItem} from "./TodolistItem";

export const App= () => {
  return (
      <div className="app">
        <TodolistItem title="What to learn"/>
        <TodolistItem title="Man City"/>
      </div>
  )
}


