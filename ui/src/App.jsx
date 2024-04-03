import { useState } from 'react'
import FoodTables from './FoodTables'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <FoodTables />
        </div>
    )
}

export default App
