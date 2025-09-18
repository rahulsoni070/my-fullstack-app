import { useState } from "react";

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publishedYear: "",
        genre: "",
        language: "",
        country: "",
        rating: "",
        summary: "",
        coverImageUrl: "",
    })

    const handlerChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState, [name]: name === "publishedYear" || name === "rating" ? parseFloat(value) : value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:4040/books",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            )
            if(!response.ok){
                throw "Failed to add book"
            }

            const data = await response.json()

            console.log("Added Book", data)

            } catch(error){
                console.log(error)
            }
        }

        return (
            <div>
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <br/>
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Author:</label>
                    <br/>
                    <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Published Year:</label>
                    <br/>
                    <input
                    type="number"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Genre:</label>
                    <br/>
                    <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Language:</label>
                    <br/>
                    <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Country:</label>
                    <br/>
                    <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Rating:</label>
                    <br/>
                    <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Summary:</label>
                    <br/>
                    <input
                    type="text"
                    name="summary"
                    value={formData.summary}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <label>Cover ImageUrl:</label>
                    <br/>
                    <input
                    type="text"
                    name="coverImageUrl"
                    value={formData.coverImageUrl}
                    onChange={handlerChange}
                    />
                    <br/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }


export default AddBook;