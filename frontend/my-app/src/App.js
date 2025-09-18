import './App.css';
import BooksTitle from "./components/BooksTitle"
import SpecficBook from './components/SpecficBook';
import SpecficAuthor from './components/SpecficAuthor';
import AddBook from './components/AddBook';

export default function App() {
  return(
    <main>
      <AddBook/> 
      <BooksTitle/>
      <SpecficBook title="Shoe Dog"/>
      <SpecficAuthor author="Harper Lee"/>
    </main>
  )
}