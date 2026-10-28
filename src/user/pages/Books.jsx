
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllBooksAPI } from "../../services/allServices";
import { searchContext } from "../../contextApi/ShareContext";
import { toast } from "react-toastify";

function Books() {
  const { searchKey, setSearchKey } = useContext(searchContext);

  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [dummyAllBooks, setDummyAllBooks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");

    if (userToken) {
      setToken(userToken);
      getBooks();
    }
  }, [searchKey]);

  // Get all books
  const getBooks = async () => {
    try {
      setLoading(true);

      const result = await getAllBooksAPI();

      if (result?.status === 200) {
        const books = Array.isArray(result.data)
          ? result.data
          : result.data?.books || [];

        setDummyAllBooks(books);

        const categories = [
          ...new Set(
            books
              .map((book) => book.category)
              .filter(Boolean)
          ),
        ];

        setCategoryList(categories);

        // Keep the search term passed from the previous page.
        applyFilters(books, selectedCategory, searchKey);
      } else {
        toast.error("Unable to fetch books.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Something went wrong while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  // Filter by category and search term
  const applyFilters = (
    books,
    category = selectedCategory,
    search = searchKey
  ) => {
    let filteredBooks = [...books];

    if (category !== "all") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === category
      );
    }

    const keyword = search.trim().toLowerCase();

    if (keyword) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title?.toLowerCase().includes(keyword)
      );
    }

    setAllBooks(filteredBooks);
  };

  // Filter books by category
  const filterBooks = (category) => {
    setSelectedCategory(category);
    applyFilters(dummyAllBooks, category, searchKey);
  };

  // Search books
  const handleSearch = () => {
    if (!searchKey.trim()) {
      toast.warning("Please enter a book title.");
      applyFilters(dummyAllBooks, selectedCategory, "");
      return;
    }

    applyFilters(dummyAllBooks, selectedCategory, searchKey);
  };

  // Update results while typing
  const handleSearchChange = (value) => {
    setSearchKey(value);
    applyFilters(dummyAllBooks, selectedCategory, value);
  };

  return (
    <>
      <Header />

      {token ? (
        <>
          <div className="flex flex-col justify-center items-center my-5">
            <h1 className="text-3xl font-bold my-5">
              All Books
            </h1>

            {/* Search */}
            <div className="flex my-5 w-full max-w-xl px-4">
              <input
                type="text"
                value={searchKey}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="p-2 border border-gray-200 flex-1 min-w-0 rounded"
                placeholder="Search by Book Title"
              />

              <button
                onClick={handleSearch}
                className="p-2 bg-blue-800 text-white ms-1 rounded"
              >
                Search
              </button>
            </div>
          </div>

          {/* Filter and Book Cards */}
          <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">
            {/* Category Filter */}
            <div className="col-span-1">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">
                  Filter
                </h1>

                <button
                  onClick={() => setToggle(!toggle)}
                  className="font-bold text-2xl md:hidden"
                  aria-label="Toggle category filters"
                >
                  <FaBars />
                </button>
              </div>

              <div className={toggle ? "block" : "hidden md:block"}>
                <div className="mt-3">
                  <input
                    onChange={() => filterBooks("all")}
                    checked={selectedCategory === "all"}
                    type="radio"
                    name="filter"
                    id="no-filter"
                  />

                  <label htmlFor="no-filter" className="ms-3">
                    All
                  </label>
                </div>

                {categoryList.map((category) => (
                  <div key={category} className="mt-3">
                    <input
                      onChange={() => filterBooks(category)}
                      checked={selectedCategory === category}
                      type="radio"
                      name="filter"
                      id={`category-${category}`}
                      value={category}
                    />

                    <label
                      htmlFor={`category-${category}`}
                      className="ms-3"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Cards */}
            <div className="col-span-3">
              {loading ? (
                <p className="text-center my-5">
                  Loading books...
                </p>
              ) : allBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBooks.map((book) => (
                    <div
                      key={book._id}
                      className="shadow rounded p-3"
                    >
                      <img
                        className="w-full h-64 object-contain"
                        src={book.imageURL}
                        alt={book.title || "Book cover"}
                      />

                      <div className="flex flex-col justify-center items-center mt-4">
                        <h2 className="text-blue-600 font-bold text-xl">
                          {book.author}
                        </h2>

                        <h3 className="text-lg text-center">
                          {book.title}
                        </h3>

                        <Link
                          to={`/books/${book._id}`}
                          className="font-bold bg-blue-500 p-2 mt-2 text-white rounded"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center font-bold my-5">
                  No books found!
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex justify-center items-center flex-col">
          <img
            className="w-full max-w-md"
            src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ88bNdTigR.gif"
            alt="Page not found"
          />

          <p>Oh No!</p>

          <h3 className="text-2xl font-medium text-center">
            Access only to logged-in persons
          </h3>

          <Link
            to="/login"
            className="bg-black mt-5 px-3 py-2 text-white rounded"
          >
            Please Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Books;
