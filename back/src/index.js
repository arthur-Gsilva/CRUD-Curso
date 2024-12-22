const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
      const books = await prisma.book.findMany(); 
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.post('/insertItem', async (req, res) => {

  const {titulo, autor} = req.body

  try{
    const newBook = await prisma.book.create({
      data: {
        titulo,
        autor,
      },
    });

    res.status(201).json(newBook);
  } catch(error){
    res.status(500).json({ error: error.message })
  }
})

app.delete("/deleteItem/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const deletedItem = await prisma.book.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({msg: 'Item deletado com sucesso', deletedItem});
  } catch (error) {
    res.status(500).json({msg: 'Erro ao deletar item', error});
  }
});

app.put("/updateItem/:id", async (req, res) => {
  const {id} = req.params;
  const {titulo, autor} = req.body

  try{
    const editItem = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        titulo,
        autor,
      }
    })

    res.status(200).json(editItem)
  }catch(error){
    res.status(500).json({ msg: "Erro ao editar livro: ", error })
  }
})

app.listen(5000)