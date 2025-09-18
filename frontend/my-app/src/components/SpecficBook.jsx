// 2. Display the details of the book titled - Shoe Dog.

import useFetch from "../useFetch";

export default function SpecficBook({title}) {
    const {data, loading, error} = useFetch(`https://my-fullstack-app-lbmq.vercel.app/books/title/${title}`)

    console.log(data)
    
    return (
        <main>
            {loading && <p>Loading.....</p>}
            {data?.error && <p>{data.error}</p>}
            {data && !data.error && (
                <div>
                    <h2>{data.title}</h2>
                    <p><b>Author: </b>{data.author}</p>
                    <p><b>Release Year: </b>{data.publishedYear}</p>
                    <p><b>Genre: </b>{data.genre.join(", ")}</p>
                </div>
            )}
        </main>
    )
}