//import { toggleSlideIn } from "./transitions.js ";

const gif = document.querySelectorAll(".giphy-embed");
const footerEL = document.querySelectorAll(".footer-el");
const inputEl = document.querySelector(".input-el");
const searchBtn = document.getElementById("search");
const bookDiv = document.querySelectorAll(".bookDiv");
const prevBtns = document.querySelectorAll(".prev-btn");
const nextBtns = document.querySelectorAll(".next-btn");
const bookContainers = document.querySelectorAll(".content");

const queries = {
  searchPrompts: "",
  subjects: ["trends", "action", "romance", "comedy"],
};

const books = {};
const booksPerPage = 15;
let currentBookIndices = {};

// Initialize current indices for each category
queries.subjects.forEach((category) => {
  currentBookIndices[category] = 0;
});

// Function to display books based on the current index and page size
function displayCurrentBooks(category) {
  const startIndex = currentBookIndices[category] * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToDisplay = books[category].slice(startIndex, endIndex);
  displayBooks(booksToDisplay, category);
}

// Event listener for the "Prev" button
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (currentBookIndices[category] > 0) {
      currentBookIndices[category]--;
      displayCurrentBooks(category);
    }
  });
});

// Event listener for the "Next" button
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (
      (currentBookIndices[category] + 1) * booksPerPage <
      books[category].length
    ) {
      currentBookIndices[category]++;
      displayCurrentBooks(category);
    }
  });
});

// Function to initialize the books and display the first page
function initializeBooks(bookList, category) {
  if (!books[category]) {
    books[category] = [];
  }
  books[category] = bookList;
  currentBookIndices[category] = 0;
  displayCurrentBooks(category);
}

// Event to preload books
document.addEventListener("DOMContentLoaded", () =>
  searchForBooksByAnySubject(queries)
);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    queries.searchPrompts = inputEl.value.trim(); // Update and trim the search prompt value
    console.log("Search Prompt:", queries.searchPrompts); // Debugging line
    searchByPrompt(queries.searchPrompts);
    inputEl.blur();
  }
});

// Search button of nav element
searchBtn.addEventListener("click", () => {
  queries.searchPrompts = inputEl.value.trim(); // Update and trim the search prompt value
  console.log("Search Prompt:", queries.searchPrompts); // Debugging line
  searchByPrompt(queries.searchPrompts);
});

//Searching by prompts
async function searchByPrompt(searchPrompt) {
  const searchUrl = "https://openlibrary.org/search.json";
  const limit = 15;

  try {
    console.log(`Fetching data for search prompt: ${searchPrompt}`); // Debugging line
    const response = await fetch(
      `${searchUrl}?q=${searchPrompt}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log("Data received for search prompt:", data); // Debugging line
    initializeBooks(data.docs, "search-div");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Searching by subjects
async function searchForBooksByAnySubject({ searchPrompts, subjects }) {
  const searchUrl = "https://openlibrary.org/search.json";
  const limit = 15;
  try {
    if (subjects && subjects.length > 0) {
      const subjectPromises = subjects.map((sub) =>
        fetch(`${searchUrl}?subject=${sub}&limit=${limit}`).then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(subjectPromises);

      results.forEach((res, index) => {
        const category = subjects[index];
        initializeBooks(res.docs, category);
      });
    }
  } catch (error) {
    console.error("Error fetching subject data:", error);
  }
}

//Displaying the books
function displayBooks(books, category) {
  const categoryDiv = document.querySelector(`.${category}.category`);

  if (!categoryDiv) {
    console.error("Category div not found:", category);
    return;
  }

  const contentDiv = categoryDiv.querySelector(".content");

  if (!contentDiv) {
    console.error("Content div not found in category:", category);
    return;
  }

  contentDiv.innerHTML = "";

  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("content-div");

    const coverImage = document.createElement("img");
    coverImage.classList.add("cover-Image");
    coverImage.src = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "./images/book_haven.gif";
    coverImage.alt = book.title;
    bookDiv.appendChild(coverImage);

    const footerDiv = document.createElement("div");
    footerDiv.classList.add("footer-div");

    const title = document.createElement("h2");
    title.textContent = book.title;
    footerDiv.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${
      book.author_name ? book.author_name[0] : "Unknown"
    }`;
    footerDiv.appendChild(author);

    bookDiv.appendChild(footerDiv);
    fragment.appendChild(bookDiv);

    bookDiv.addEventListener("click", () => showBookDetails(book));
  });

  contentDiv.appendChild(fragment);

  const gifs = document.querySelectorAll(".giphy-embed");
  gifs.forEach((img) => {
    img.classList.add("loaded");
  });
}

// Modal to display book details
async function showBookDetails(book) {
  const modal = document.getElementById("bookModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalAuthor = document.getElementById("modalAuthor");
  const modalCover = document.getElementById("modalCover");
  const modalDescription = document.getElementById("modalDescription");
  const review = document.getElementById("modal-book-review");
  const readButton = document.getElementById("readButton");
  const addToLibraryButton = document.getElementById("addToLibraryButton");
  const addToFavouritesButton = document.getElementById(
    "addToFavouritesButton"
  );

  modalTitle.textContent = book.title;
  modalAuthor.textContent = `Author: ${
    book.author_name ? book.author_name.join(", ") : "Unknown"
  }`;
  modalCover.src = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "./images/book_haven.gif";
  review.textContent = `Review: ${book.review}`;

  // Set the "Read" button link
  readButton.onclick = () => {
    window.open(`https://openlibrary.org${book.key}`, "_blank");
  };

  // Fetch detailed book information for the full description
  try {
    const response = await fetch(`https://openlibrary.org${book.key}.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const detailedBook = await response.json();
    modalDescription.textContent = detailedBook.description
      ? typeof detailedBook.description === "string"
        ? detailedBook.description
        : detailedBook.description.value
      : "No description available.";
  } catch (error) {
    console.error("Error fetching detailed book information:", error);
    modalDescription.textContent = "No description available.";
  }

  modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close-button").onclick = function () {
  document.getElementById("bookModal").style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  const modal = document.getElementById("bookModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.querySelectorAll(".catalogue").forEach((header) => {
  header.addEventListener("click", () => {
    const category = header.dataset.category;
    displayCategory(category);
    // toggleSlideIn();
    console.log("searching.....");
  });
});

function displayCategory(category) {
  const searchDiv = document.querySelector(".search-div .content");
  searchDiv.innerHTML = ""; // Clear existing content

  const booksToDisplay = books[category]; // Get the books for the selected category

  if (!booksToDisplay) {
    console.error(`No books found for category: ${category}`);
    return;
  }

  booksToDisplay.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("content-div");

    const coverImage = document.createElement("img");
    coverImage.classList.add("cover-Image");
    coverImage.src = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "./images/book_haven.gif";
    coverImage.alt = book.title;
    bookDiv.appendChild(coverImage);

    const footerDiv = document.createElement("div");
    footerDiv.classList.add("footer-div");

    const title = document.createElement("h2");
    title.textContent = book.title;
    footerDiv.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${
      book.author_name ? book.author_name[0] : "Unknown"
    }`;
    footerDiv.appendChild(author);

    bookDiv.appendChild(footerDiv);
    searchDiv.appendChild(bookDiv);

    bookDiv.addEventListener("click", () => showBookDetails(book));
  });
}

//Adding books to library section when the button is clicked
// Function to show custom notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");

  notificationMessage.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    console.log('removed notification');
  }, 1300); // Adjust the timeout as needed
}

// Function to add book to the library section
function addToLibrary(book) {
  const libraryContent = document.querySelector(".library .content");

  // Check if the book is already in the library
  const existingBook = libraryContent.querySelector(
    `[data-title="${book.title}"]`
  );
  if (existingBook) {
    showNotification("This book is already in your library.");
    return;
  }

  // Create a new div for the book
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("content-div");
  bookDiv.dataset.title = book.title;

  const coverImage = document.createElement("img");
  coverImage.classList.add("cover-Image");
  coverImage.src = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "./images/book_haven.gif";
  coverImage.alt = book.title;
  bookDiv.appendChild(coverImage);

  const footerDiv = document.createElement("div");
  footerDiv.classList.add("footer-div");

  const title = document.createElement("h2");
  title.textContent = book.title;
  footerDiv.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${
    book.author_name ? book.author_name.join(", ") : "Unknown"
  }`;
  footerDiv.appendChild(author);

  // Create a remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    libraryContent.removeChild(bookDiv);
  });
  footerDiv.appendChild(removeButton);

  bookDiv.appendChild(footerDiv);
  libraryContent.appendChild(bookDiv);

  // Show notification that book was added successfully
  showNotification("Book added to your library!");
}

// Event listener for the Add to Library button in the modal
document.getElementById("addToLibraryButton").addEventListener("click", () => {
  const modal = document.getElementById("bookModal");
  const book = {
    key: modal.dataset.key,
    title: document.getElementById("modalTitle").textContent,
    author_name: [
      document
        .getElementById("modalAuthor")
        .textContent.replace("Author: ", ""),
    ],
    cover_i: modal.dataset.coverId,
    description: document.getElementById("modalDescription").textContent,
  };

  addToLibrary(book);
  modal.style.display = "none";
});

// Function to display book details in the modal

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close-button").onclick = function () {
  document.getElementById("bookModal").style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  const modal = document.getElementById("bookModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//Adding books to favourites section when the button is clicked

// Function to add book to the favourite section
function addToFavourites(book) {
  const favouritesContent = document.querySelector(
    ".favourites .content"
  );

  // Check if the book is already in the favourites
  const favExistingBook = favouritesContent.querySelector(
    `[data-title="${book.title}"]`
  );
  if (favExistingBook) {
    showNotification("This book is already in your favourites.");
    return;
  }

  // Create a new div for the book
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("content-div");
  bookDiv.dataset.title = book.title;

  const coverImage = document.createElement("img");
  coverImage.classList.add("cover-Image");
  coverImage.src = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "./images/book_haven.gif";
  coverImage.alt = book.title;
  bookDiv.appendChild(coverImage);

  const footerDiv = document.createElement("div");
  footerDiv.classList.add("footer-div");

  const title = document.createElement("h2");
  title.textContent = book.title;
  footerDiv.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${
    book.author_name ? book.author_name.join(", ") : "Unknown"
  }`;
  footerDiv.appendChild(author);

  // Create a remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    favouritesContent.removeChild(bookDiv);
  });
  footerDiv.appendChild(removeButton);

  bookDiv.appendChild(footerDiv);
  favouritesContent.appendChild(bookDiv);

  // Show notification that book was added successfully
  showNotification("Book added to your favourites!");
}

// Event listener for the Add to favourites button in the modal
document
  .getElementById("addToFavouritesButton")
  .addEventListener("click", () => {
    const modal = document.getElementById("bookModal");
    const book = {
      key: modal.dataset.key,
      title: document.getElementById("modalTitle").textContent,
      author_name: [
        document
          .getElementById("modalAuthor")
          .textContent.replace("Author: ", ""),
      ],
      cover_i: modal.dataset.coverId,
      description: document.getElementById("modalDescription").textContent,
    };

    addToFavourites(book);
    modal.style.display = "none";
  });

// Function to display book details in the modal

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close-button").onclick = function () {
  document.getElementById("bookModal").style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  const modal = document.getElementById("bookModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
