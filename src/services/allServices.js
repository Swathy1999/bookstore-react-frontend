import apiService from "../api/apiService";

// register: auth component when click register button
export const registerAPI = async (userData) => {
  return await apiService("POST", "/register", userData);
};

// login: auth component when click login button
export const loginAPI = async (userData) => {
  return await apiService("POST", "/login", userData);
};

// google-login api auth component when clicking on google login button


export const googleLoginAPI = async (userData) => {
  const result = await apiService("POST", "/google-login", userData);

  console.log("Result inside googleLoginAPI:", result);

  return result;
};



// edit user api : edit component when clicking on edit button
export const userUpdateAPI = async (userId, userData) => {
  return await apiService("PUT", `/user/${userId}`, userData);
};

// add Book api : uploadBook component when clicking on add button
export const addBookAPI = async (bookDetails) => {
  return await apiService("POST", `/book`, bookDetails);
};

// get home Book api: home component when page loads
export const getHomeBooksAPI = async () => {
  return await apiService("GET", `/home-books`, {});
};

// get all Book api book component when page loads
export const getAllBooksAPI = async (searchkey) => {
  return await apiService("GET", `/all-books/?search=${searchkey}`, {});
};

// Get User Books API
// Called when the UserBook component opens
export const getUserBooksAPI = async () => {
  return await apiService("GET", "/user-books", {});
};

// Get Borrowed Books API
// Called when the BorrowedBooks component opens
export const getUserBroughtBooksAPI = async () => {
  return await apiService("GET", "/brought-books", {});
};


 // Delete user-uploaded book API
export const deleteUserBookAPI = async (bookId) => {
  return await apiService("DELETE", `/book/${bookId}`, {});
};

// View book by ID
export const viewBookAPI = async (id) => {
  return await apiService("GET", `/view-book/${id}`, {});
};


// buy book
export const buyBookAPI = async (id)=>{
return await apiService("PUT",`/books/${id}/buy`,{})
}


// edit uadminser api: admin settings component when clicking on edit button
 export const adminUpdateAPI = async (adminId, adminData)=>{
  return await apiService("PUT", `/admin/${adminId}`, adminData)
}

// get all users api: admin resources component 
export const userListAPI = async ()=>{
return await apiService ("GET",`/user-list`,{})
}

// get all books api admin resources component 
export const bookListAPI = async ()=>{
return await apiService("GET", `/book-list`,{})
}


// update book status api: admin resources component 
export const editBookStatusAPI = async (id)=>{
return await apiService ("PUT",`/book/${id}`,{})
}
