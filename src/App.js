import React from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import { useEffect } from 'react'
import Loader from './Loader'
import AddTodo from './Todo/AddTodo'

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

  function toggleTodo(id){
    setTodos (todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      complited: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
    <div className="wrapper">
        <h1>Todo list</h1>
        <AddTodo onCreate={addTodo}/>
        {loading && <Loader />}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> : (
          loading ? null : <p>No todos</p>
        )}
    </div>
    </Context.Provider>
  );
}

export default App;
