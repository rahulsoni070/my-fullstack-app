const { initializeDatabase } = require("./db/db.connect")
const Book = require("./models/book.models")
const express = require("express")
const app = express()
initializeDatabase()
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cors());

async function addNewBook(newBookData){
    try{
        const book = new Book(newBookData)
        const saveBook = await book.save()
        return saveBook
    } catch (error) {
        console.log(error)
    }
}

app.post("/books", async(req, res) => {
    try {
        const newBook = await addNewBook(req.body)
        if(newBook){
            res.status(201).json({ message: "Book added successfully.", book: newBook })
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Failed to add Book." })
    }
})

async function showAllBooks(){
    try{
        const showbooks = await Book.find()
        return showbooks
    } catch(error){
        console.log(error)
    }
}

app.get("/books", async(req, res) => {
    try {
        const allBooks = await showAllBooks(req.params.books)
        if(allBooks){
            res.json(allBooks)
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch(error){
        res.status(500).json({ error: "Failed to fetch books." })
    }
})

async function readByTitle(title){
    try {
        const book = await Book.findOne({title: title})
        return book
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/title/:name", async(req, res) => {
    try{
        const book = await readByTitle(req.params.name)
        if(book){
            res.json(book)
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch(error) {
        res.status(500).json({ error: "Error in feching book data." })
    }
})

async function readByAuthor(author){
    const book = await Book.find({ author: author })
    return book
}

app.get("/books/author/:name", async(req, res) => {
    try {
        const book = await readByAuthor(req.params.name)
        if(book){
            res.json(book)
        } else {
            res.status(404).json({ error: "Book not found" })
        }
    } catch(error){
        res.status(500).json({ error: "Error in fetching book data" })
    }
})


async function readByBusinessGenre(){
    try {
        const book = await Book.find({ genre: "Business" })
        return book
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/genre/business", async (req, res) => {
    try {
        const book = await readByBusinessGenre(req.params.genre)
        if(book){
            res.json(book)
        } else {
            res.status(404).json({ error: "Book not found" })
        }
    } catch(error){
        res.status(500).json({ error: "Error in fetching book data" })
    }
})

async function readByYear2012(){
    try {
        const book = await Book.find({ publishedYear: 2012 })
        return book 
    } catch(error){
        console.log(error)
    }
}

app.get("/books/year/2012", async(req, res) => {
    try {
         const book = await readByYear2012(req.params.publishedYear)
         if(book){
            res.json(book)
         } else {
            res.status(404).json({ error: "Book not found." })
         }
    } catch (error) {
        res.status(500).json({ error: "Error in fetching book data" })
    }
})


async function updateById(bookId, dataToUpdate){
    try {
        const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, { new: true })
        return book
    } catch(error) {
        console.log(error)
    }
}

app.post("/books/:bookId", async(req, res) => {
    try {
        const updatedBook = await updateById(req.params.bookId, req.body)
        if(updatedBook){
            res.status(200).json({ message: "Book updated successfully", updatedBook: updatedBook })
        } else {
            res.status(404).json({ error: "Book does not exist" })
        }
    } catch {
        res.status(500).json({ error: "Error in fetching book data." })
    }
})


async function updateByTitle(title, dataToUpdate){
    try {
        const book = await Book.findOneAndUpdate({ title: title }, dataToUpdate, { new: true })
        return book
    } catch(error) {
        console.log(error)
    }
}

app.post("/books/title/:name", async (req, res) => {
    try {
        const updatedBook = await updateByTitle(req.params.name, req.body)
        if(updatedBook) {
            res.status(200).json({ message: "Book updated successfully", updatedBook: updatedBook })
        } else {
            res.status(500).json({ error: "Book does not exist" })
        }
    } catch(error){
        res.status(500).json({ error: "Error in fetching book data." })
    }
})


async function deleteById(bookId){
    try {
        const book = await Book.findByIdAndDelete(bookId)
        return book
    } catch(error){
        console.log(error)
    }
}

app.delete("/books/:bookId", async (req, res) => {
    try {
        const deletedBook = await deleteById(req.params.bookId)
        if(updateById){
            res.status(200).json({ message: "Book deleted successfully.", deletedBook: deletedBook })
        } else {
            res.status(404).json({ error: "Book not found" })
        }
    } catch(error) {
        res.status(500).json({ error: "Error in fetching book data." })
    }
})




const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})