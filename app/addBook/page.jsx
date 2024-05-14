"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !publishYear) {
      alert("Title, publishYear and author are required.");
      return;
    }

    try {
      const res = await fetch("https://nextjs-booklisting.vercel.app/api/books", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, author, publishYear }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //   <input
        // onChange={(e) => setTitle(e.target.value)}
        // value={title}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Book Title"
    //   />

    //   <input
        // onChange={(e) => setAuthor(e.target.value)}
        // value={author}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Book Author"
    //   />
    //    <input
        // onChange={(e) => setPublishYear(e.target.value)}
        // value={publishYear}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Publish Year"
    //   />

    //   <button
    //     type="submit"
    //     className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
    //   >
    //     Add Book
    //   </button>
    // </form>

    

      
<div className="w-full h-full flex justify-center">




      <form class="w-1/2 pt-10" onSubmit={handleSubmit}>
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-blue-600 sm:mb-0 xs:mb-0">Add your book</h1>
        </div>
        <div class="relative z-0 w-full mb-5 group">
        <input
  onChange={(e) => setTitle(e.target.value)}
  value={title}
  type="text"
  name="publish_year"
  id="publish_year"
  className="block lg:py-3 lg:text-lg px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  placeholder=" "
  required
/>
        <label for="book_name" class="peer-focus:font-medium absolute text-xl  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Name</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
        <input
  onChange={(e) => setAuthor(e.target.value)}
  value={author}
  type="text"
  name="publish_year"
  id="publish_year"
  className="block lg:py-3 lg:text-lg px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  placeholder=" "
  required
/>
                <label for="author_name" class="peer-focus:font-medium absolute text-xl  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
        <input
  onChange={(e) => setPublishYear(e.target.value)}
  value={publishYear}
  type="number"
  name="publish_year"
  id="publish_year"
  className="block lg:py-3 lg:text-lg px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  placeholder=" "
  required
/>
            <label for="publish_year" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publish Year</label>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Book!</button>
      </form>
</div>


    

  );
}
