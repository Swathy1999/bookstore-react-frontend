
import React, { useEffect, useState } from 'react';
import { getUserBroughtBooksAPI } from '../../services/allServices';

function Purchase() {
  const [purchaseBooks, setPurchaseBooks] = useState([]);

  useEffect(() => {
    getPurchaseBooks();
  }, []);

  const getPurchaseBooks = async () => {
    try {
      const result = await getUserBroughtBooksAPI();

      if (result.status == 200) {
        setPurchaseBooks(result.data);
      }
    } catch (error) {
      console.log("Error fetching purchased books:", error);
    }
  };

  return (
    <div className="p-10 my-15 shadow rounded">
      {/* duplicate book */}

      {purchaseBooks.map((book) => (
        <div key={book?._id} className="p-5 rounded mt-4 bg-blue-100">
          <div className="md:grid grid-cols-[3fr_1fr]">
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className="px-4">
                <h1 className="text-2xl">{book?.title}</h1>
                <h2 className="text-xl">{book?.author}</h2>
                <h3 className="text-lg text-blue-788">
                  $ {book?.discountPrice}
                </h3>
                <p className="text-justify">{book?.abstract}</p>

                {/* status image */}
                <div className="flex my-3">
                  <img
                    width={"120px"}
                    height={"50%"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ruEsDJs5OgKEohCsQNM28invmaZTcu2aIrmiTWozpg&s=10"
                    alt="Purchased"
                  />
                </div>
              </div>

              <div className="px-4 mt-4 md:mt-0">
                <img
                  className="w-full"
                  src={book?.imageURL}
                  alt="Book"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Purchase;
