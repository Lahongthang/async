import {useState, useEffect} from 'react'
import axios from 'axios'
import { headers } from './App'

const App1 = () => {
    const [todos, setTodos] = useState([])

    const fetchColor = id => {
        return axios.get(`http://localhost:8000/api/colors/${id}`, {headers})
    }

    const fetchTodos = color => {
        return axios.get(`http://localhost:8000/api/todos?pageSize=100&colors=${color}`, {headers})
    }

    const fetchData = async () => {
        const response1 = await fetchColor(1)
        const color = await response1.data
        console.log('color: ', color)

        const response2 = await fetchTodos(color.data.name)
        const todos = await response2.data
        setTodos(todos.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log('todos: ', todos)

    return (
        <div>
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
            <button>Re Fetch</button>
        </div>
    )
}

export default App1