"use client"
import BooksTable from "./BooksTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";


function TopicsList() {

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const getBooks = async () => {

    try {
      setLoading(true)
      const response= await axios.get("https://nextjs-booklisting.vercel.app/api/books")
      setLoading(false)
      setBooks(response.data.books)
    } catch (error) {
      console.log("Error loading books: ", error);
      setLoading(false)
    }
  };
  getBooks()
}, [])



  return (
    <>
      {loading? <Spinner/>: <BooksTable books={books} setBooks={setBooks}/>}
    </>
  );
}


export default TopicsList
