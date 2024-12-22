import { Book } from "@/types/Book"
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
    data: Book
}

export const TableData = ({ data }: Props) => {

    const [isEdit, setIsEdit] = useState(false)
    const [tituloInput, setTituloInput] = useState('')
    const [autorInput, setAutorInput] = useState('')

    useEffect(() => {
        setTituloInput(data.titulo)
        setAutorInput(data.autor)
    }, [])

    const deleteItem = async (id: number) => {
        const response = await fetch(`http://localhost:5000/deleteItem/${id}`, {
            method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
        })

        const data = await response.json()
    }

    const editItem = async (id: number) => {
        const response = await fetch(`http://localhost:5000/updateItem/${id}`, {
            method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                titulo: tituloInput,
                autor: autorInput,
              }),
        })

        const data = await response.json()
        setIsEdit(false)
    }

    return(
        <tr className="border border-gray-400">
            <td className="p-2 border-r border-gray-400 text-center font-bold">#{data.id}</td>
            <td className="pl-2 border-r border-gray-400">
                {!isEdit &&
                    <>
                        {data.titulo}
                    </>
                }

                {isEdit &&
                    <input 
                        type="text"
                        className="w-full h-full py-3 px-2 outline-none"
                        value={tituloInput}
                        onChange={e => setTituloInput(e.target.value)}
                        required
                    />
                }
                
            </td>
            <td className="pl-2 border-r border-gray-400">
                {!isEdit &&
                    <>
                        {data.autor}
                    </>
                }

                {isEdit &&
                    <input 
                        type="text"
                        className="w-full h-full py-3 px-2 outline-none"
                        value={autorInput}
                        onChange={e => setAutorInput(e.target.value)}
                        required
                    />
                }
            </td>
            <td className="pl-2 flex gap-2 justify-center items-center">
                {!isEdit &&
                    <>
                        <div 
                            className="bg-yellow-300 p-2 rounded-md mt-1 cursor-pointer"
                            onClick={() => setIsEdit(true)}
                        >
                            <FaPenToSquare />
                        </div>
                        
                        <div 
                            className="bg-red-500 p-2 rounded-md mt-1 cursor-pointer"
                            onClick={() => deleteItem(data.id)}
                        >
                            <FaRegTrashAlt onClick={() => deleteItem(data.id)}/>
                        </div>
                    </>
                }

                {isEdit &&
                    <button 
                        className="bg-green-500 p-2 rounded-md text-white my-2"
                        onClick={() => editItem(data.id)}
                    >Concluir</button>
                }
                
                
            </td>
        </tr>
    )
}