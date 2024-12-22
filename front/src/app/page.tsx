"use client"

import { TableData } from "@/components/TableData"
import { Book } from "@/types/Book"
import { useEffect, useState } from "react"

const Home = () => {

    const [data, setData] = useState<Book[]>()
    const [tituloInput, setTituloInput] = useState('')
    const [autorInput, setAutorInput] = useState('')

    const getData = async () => {
        const response = await fetch("http://localhost:5000")
        const json = await response.json()
        setData(json)
    }

    useEffect(() => {
        getData()
    }, [data])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/insertItem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                titulo: tituloInput,
                autor: autorInput,
              }),
            });
        } catch(error){
            console.log(error)
        }
        setTituloInput("")
        setAutorInput("")

    }
    return(
        <div className="w-screen  flex  justify-center">
            <div className="w-1/2 mt-5">
                <div>
                    <h1 className="text-3xl">Inserir novo item</h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="flex flex-col">
                                Título
                                <input 
                                    type="text" 
                                    className="border border-black p-1 rounded-md"
                                    value={tituloInput}
                                    onChange={e => setTituloInput(e.target.value)}
                                    required
                                />
                            </label>
                            
                        </div>
                        <div>
                            <label className="flex flex-col">
                                Autor
                                <input 
                                type="text" 
                                className="border border-black p-1 rounded-md"
                                value={autorInput}
                                onChange={e => setAutorInput(e.target.value)}
                                required
                            />
                            </label>
                            
                        </div>

                        <button className="bg-blue-400 text-white w-full p-1 mt-3 rounded-md hover:bg-blue-600">Inserir</button>
                    </form>
                </div>

                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-3">Tabela de Livros</h2>

                    <table className="w-full ">
                        <thead className="bg-gray-200">
                            <tr className="border border-gray-400">
                                <th className="p-2 border-r border-gray-400">Id</th>
                                <th className="border-r border-gray-400">Título</th>
                                <th className="border-r border-gray-400">Autor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.map((item) => (
                                <TableData key={item.id} data={item}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default Home