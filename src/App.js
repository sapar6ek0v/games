import {useState, useEffect} from "react"
import axios from "axios"

function App() {
    const [poke, setPoke] = useState([])
    const [rithg, setRithg] = useState({})
    const [back, setBack] = useState([])
    const [score, setScore] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(({data}) => {
                setPoke(data.pokemon)
            })
    }, [])

    // const onChange = (e) => setFind(e.target.value.toLowerCase())

    const startSearchPok = () => {
        const random = Math.floor(Math.random() * 150)
        setRithg(poke.find(it => it.id === random))
        const numbers = [random, Math.floor(Math.random() * 150) + 1, Math.floor(Math.random() * 150) + 1, Math.floor(Math.random() * 150) + 1]
        setBack(numbers.map(pokemon => {
            return (
                poke.find(it => it.id === pokemon)
            )
        }))

    }

    const giveAnswer = (id) => {
        if (rithg.id === id) {
            setScore(+score + 1)
            setMessage("Вы выиграли")
        } else {
            setMessage("Вы проиграли")
        }


        startSearchPok()
    }

    return (
        <div className="App">
            <div className="container">
                <div className="app-block">
                    <div className='sub-block'>
                        <button onClick={startSearchPok} className='start-button'>start</button>
                        <div className='text'>{score}</div>
                        <img src={rithg.img} alt="pokemons" className='img'/>
                        {
                            back.map(it => {
                                return <button onClick={() => giveAnswer(it.id)} className='button'>{it.name}</button>
                            })
                        }
                        <div className='message'>{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App


