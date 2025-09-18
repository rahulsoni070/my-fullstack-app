import { useState } from "react";
import useFetch from "../useFetch";

const BooksTitle = () => {
     const [successMessage, setSuccessMessage] = useState("")
    const { data, loading, error } = useFetch("https://my-fullstack-app-lbmq.vercel.app/books")

    // console.log(data);

    const deleteHandller = async (bookId) => {
        try {
            const response = await fetch(`https://my-fullstack-app-lbmq.vercel.app/books/${bookId}`, 
                {method: "DELETE"}
            )
            if(!response.ok) {
                throw "Failed to delete book"
            }

            const data = await response.json()
            if(data) {
                if(data) {
                    setSuccessMessage("Book deleted successfully.")
                    window.location.reload()
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {loading && <p>Loading......</p>}
            {data?.error && <p>{data.error}</p>}
            {data && !data.error && (
                <div>
                    <h2>All Books</h2>
                    <ul>{data?.map((book) => (
                        <li key={book.id}>{book.title} {" "} <button onClick= {() => deleteHandller(book._id)} >Delete</button></li>
                    ))}
                    </ul>
                    <p>{successMessage}</p>
                </div>
            )}
        </>
    )
 }

 export default BooksTitle