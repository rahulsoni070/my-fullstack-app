// 3. Display all the books written by Harper Lee.


import useFetch from "../useFetch";

export default function SpecficAuthor({author}) {
    const {data, loading, error} = useFetch(`http://localhost:4040/books/author/${author}`)

    console.log(data)

    return (
        <div>
            {loading && <p>Loading....</p>}
            {data?.error && <p>{data.error}</p>}
            {data && !data.error && (
                <div>
                    <h1>Books by Harper Lee</h1>
                    <ul> {data?.map((book) => (
                    <li key={book.id}>{book.title}</li>
                    ))}
                    </ul>
                </div>
            )} 
        </div>
    )
}

