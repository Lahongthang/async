import {useState, useEffect} from 'react'
export const headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'Accept': 'application/json'
}

function App() {
  const [todos, setTodos] = useState([])

  const fetchColor = id => {
    console.log('fetch color')
    return fetch(`http://localhost:8000/api/colors/${id}`, {headers})
  }
  const fetchTodos = color => {
    console.log('fetch todo')
    return fetch(`http://localhost:8000/api/todos?pageSize=100&colors=${color}`, {headers})
  }

  const fetch1 = () => {
    fetchColor(17)
      .then(res => res.json())
      .then(color => {
        console.log('color: ', color)
        fetchTodos(color.data.name)
          .then(res => res.json())
          .then(todos => {
            console.log('todo: ', todos)
            setTodos(todos.data)
          })
          .catch(error => {
            console.log('fetch todo eror: ', error)
          })
      })
      .catch(error => console.log('fetch color eror: ', error))
    return
  }

  const fetch2 = () => {
    let colorName
    fetchColor(17)
      .then(res => res.json())
      .then(color => {
        console.log('color: ', color)
        colorName = color.data.name
      })
      .catch(error => console.log('fetch color eror: ', error))

    fetchTodos(colorName)
      .then(res => res.json())
      .then(todos => {
        console.log('todo: ', todos)
        setTodos(todos.data)
      })
      .catch(error => console.log('fetch todo eror: ', error))
  }

  useEffect(() => {
    fetch1()
    // fetch2()
  }, [])

  // fetch2()

  const handleClick = () => {
    fetch1()
    // fetch2()
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.text}</td>
              <td>{todo.color?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClick}>Re Fetch</button>
    </div>
  );
}

export default App;
