"use client"
import Link from "next/link";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { IoDuplicate } from "react-icons/io5";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";



const BooksTable = ({ books, setBooks }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [popup, setpopup] = useState(false)
    const [popup1, setpopup1] = useState(false)

    useEffect(() => {

        const totalPagesCount = Math.ceil(books.length / 5); // taking account 5 books per page // can make this dynamic as well
        setTotalPages(totalPagesCount);


        const startIndex = (currentPage - 1) * 5;
        const endIndex = startIndex + 5;
        const booksForPage = books.slice(startIndex, endIndex);
      
        // filtered books
        setFilteredBooks(booksForPage);
      }, [currentPage, books]); 
    

    const deleteBook= async(id)=>{
      const confirmed = confirm("Are you sure?");

        try { 
          
          if (confirmed) {

            const response= await axios.delete(`https://nextjs-booklisting.vercel.app/api/books?id=${id}`)
            console.log(response)

            setBooks(books.filter((book) => book._id !== id));
            setpopup(true)
        }
            
        } catch (error) {
            console.log(error)
        }
    }

    const duplicateBook= async(book)=>{

      const confirmed = confirm(`Do you wish to add a duplicate copy of ${book.title}?`);

        try {
          if (confirmed) {

            await axios.post("https://nextjs-booklisting.vercel.app/api/books", {title: book.title, author: book.author, publishYear: book.publishYear})
 
            const response= await axios.get("https://nextjs-booklisting.vercel.app/api/books")  
            setBooks(response.data.books)
            setpopup1(true)
          }

        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect(() => {
      // Hide the popup after 5 seconds
      const timer = setTimeout(() => {
        setpopup(false);
        setpopup1(false)
      }, 5000);
  
      // Clear the timer when the component unmounts or when popup changes
      return () => clearTimeout(timer);
    }, [popup, popup1]);


  return (
    <>
  {
    popup? 
    <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-medium">Deleted successfully!</span> The list has been updated.
    </div>
  </div> : ""
  }

{
    popup1? 
    <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-medium">Duplicate created!</span> The list has been updated.
    </div>
  </div> : ""
  }

    <div className="w-full h-full border-separate border-spacing-2 flex flex-col items-center">

        {/* table 2 */}
<div class=" w-full h-full relative overflow-x-auto flex flex-col items-center">
    <table class="w-full h-2/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 max-sm:hidden sm:px-3">
                    No
                </th>
                <th scope="col" class="px-6 py-3 sm:px-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3 max-md:hidden sm:px-3">
                    Author
                </th>
                <th scope="col" class="px-6 py-3 sm:px-3">
                    Publish Year
                </th>
                <th scope="col" class="px-6 py-3 text-center sm:px-3">
                    Operations
                </th>
            </tr>
        </thead>
        <tbody>
            {filteredBooks.map((book, index) => (

          <tr key={book._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-sm:hidden">
              {(currentPage - 1) * 5 + index + 1}
            </th>
            <td class="px-6 sm:px-3 py-4 tracking-widest text-gray-500 md:text-lg dark:text-gray-400">
              {book.title}
            </td>
            <td class="px-6 sm:px-3 py-4 tracking-widest text-gray-500 md:text-lg dark:text-gray-400 max-md:hidden">
              {book.author}
            </td>
            <td class="px-6 sm:px-3 py-4 tracking-widest text-gray-500 md:text-lg dark:text-gray-400">
              {book.publishYear}
            </td>
            <td class="px-6 sm:px-3 py-4 h-fit">
              <div className='flex justify-center items-center gap-x-4'>
                <Link href={`/editBook/${book._id}`}> 
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <button onClick={()=> deleteBook(book._id)} className="text-red-400">
                    <HiOutlineTrash size={24} />
                </button>
                <IoDuplicate className="text-blue-400 cursor-pointer" size={24} onClick={()=> duplicateBook(book)}/>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
    </table>

    <div className="pt-3">
        {/* pagination */}
                <div class="flex items-center gap-8">
        <button {...(currentPage === 1 ? { disabled: true } : {}) }  onClick={()=> setCurrentPage(currentPage-1)}
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
            </svg>
            </span>
        </button>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            Page <strong class="text-gray-900">{currentPage}</strong>  <strong class="text-gray-900">of </strong>
            <strong class="text-gray-900">{totalPages}</strong>
        </p>
        <button
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" {...(currentPage === totalPages ? { disabled: true } : {})} onClick={()=> setCurrentPage(currentPage+1)}>
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
            </svg>
            </span>
        </button>
        </div>
    </div>
    </div>
  </div>

  </>
  );
};

export default BooksTable;
