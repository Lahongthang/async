import {useState, useEffect} from 'react'
import { headers } from "./App"

const App2 = () => {
    const [todos, setTodos] = useState([])

    const fetchColor = async id => {
        return fetch(`http://localhost:8000/api/colors/${id}`, {headers})
            .then(response => response.json())
            .then(color => color)
            .catch(error => {throw new Error(error)})
    }

    const status = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'completed')
    })

    const fetchTodos = (color, status) => {
        return fetch(`http://localhost:8000/api/todos?pageSize=100&colors=${color}&status=${status}`, {headers})
    }

    useEffect(() => {
        Promise.all([fetchColor(1), status]).then(value => {
            console.log('value: ', value)
            fetchTodos(value[0].data.id, value[1])
                .then(response => response.json())
                .then(todos => {
                    console.log('todos: ', todos)
                    setTodos(todos.data)
                })
                .catch(error => {throw new Error(error)})
        })
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Color</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.text}</td>
                            <td>{todo.color?.name}</td>
                            <td>{todo.completed ? 'completed' : 'active'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <button>Re Fetch</button> */}
        </div>
    )
}

export default App2