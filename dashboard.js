const gif = document.querySelectorAll('.giphy-embed');
const footerEL = document.querySelectorAll('.footer-el');
const mainDiv = document.querySelector('.main-content');
const inputEl = document.querySelector('.input-el');
const searchBtn = document.getElementById('search');
const searchSection = document.querySelector('.search-div');
const myBooksBtn = document.querySelectorAll('.info-container');
const bookDiv = document.querySelectorAll('.bookDiv');
const prevBtns = document.querySelectorAll('.prev-btn');
const nextBtns = document.querySelectorAll('.next-btn');
const bookContainers = document.querySelectorAll('.content');

const queries = {
    searchPrompts: '',
    subjects: ['trends', 'action', 'romance', 'comedy']
};

const books = {};
const booksPerPage = 15;
let currentBookIndices = {};

// Initialize current indices for each category
queries.subjects.forEach(category => {
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
prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        if (currentBookIndices[category] > 0) {
            currentBookIndices[category]--;
            displayCurrentBooks(category);
        }
    });
});

// Event listener for the "Next" button
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        if ((currentBookIndices[category] + 1) * booksPerPage < books[category].length) {
            currentBookIndices[category]++;
            displayCurrentBooks(category);
        }
    });
});

// Function to initialize the books and display the first page
function initializeBooks(bookList, category) {
    books[category] = bookList;
    currentBookIndices[category] = 0;
    displayCurrentBooks(category);
}

// Event to preload books
document.addEventListener("DOMContentLoaded", () => searchForBooksByAnySubject(queries));

// Array to store buttons search, home.......
const btnArray = [];
myBooksBtn.forEach(btn => {
    btnArray.push(btn);
});

// Function to handle the common toggle logic
function toggleSlideIn(additionalClass) {
    searchSection.classList.toggle('slide-in');
    if (mainDiv.style.overflowY === 'hidden') {
        mainDiv.style.overflowY = 'auto';
    } else {
        mainDiv.style.overflowY = 'hidden';
        console.log('clicked');
    }
    if (additionalClass) {
        searchSection.classList.add(additionalClass);
    }
    console.log('hurray');
}

inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        queries.searchPrompts = inputEl.value.trim(); // Update and trim the search prompt value
        console.log('Search Prompt:', queries.searchPrompts); // Debugging line
        searchByPrompt(queries.searchPrompts);
    }
});

// Home Button
btnArray[0].addEventListener('click', () => {
    btnArray[0].style.opacity = 1;
    if (searchSection.classList.contains('slider')) {
        searchSection.classList.remove('slide-in');
        btnArray[1].style.opacity = 0.6;
    }

    if (searchSection.classList.contains('slide-in')) {
        document.querySelector('.search-nav').classList.toggle('display-el');
        document.querySelector('.inner-cont').children.item(0).classList.toggle('hide');
        searchSection.classList.remove('slide-in');
        mainDiv.style.overflowY = 'auto';
        btnArray[1].style.opacity = 0.6;
    }
});

// Search Button of aside element
btnArray[1].addEventListener('click', () => {
    document.querySelector('.search-nav').classList.toggle('display-el');
    document.querySelector('.inner-cont').children.item(0).classList.toggle('hide');
    searchSection.classList.toggle('slide-in');
    if (mainDiv.style.overflowY === 'hidden') {
        mainDiv.style.overflowY = 'auto';
        document.querySelector('.home-btn').style.opacity = 1;
        btnArray[1].style.opacity = 0.6;
    } else {
        mainDiv.style.overflowY = 'hidden';
        document.querySelector('.home-btn').style.opacity = 0.5;
        btnArray[1].style.opacity = 1;
        console.log('clicked');
    }
});

btnArray[2].addEventListener('click', () => {
    bookContainers.forEach(container => container.innerHTML = '');
    toggleSlideIn('slider');
});

btnArray[3].addEventListener('click', () => {
    bookContainers.forEach(container => container.innerHTML = '');
    toggleSlideIn('slider');
});

// Search button of nav element
searchBtn.addEventListener('click', () => {
    queries.searchPrompts = inputEl.value.trim(); // Update and trim the search prompt value
    console.log('Search Prompt:', queries.searchPrompts); // Debugging line
    searchByPrompt(queries.searchPrompts);
});

async function searchByPrompt(searchPrompt) {
    const searchUrl = 'https://openlibrary.org/search.json';
    const limit = 15;

    try {
        console.log(`Fetching data for search prompt: ${searchPrompt}`); // Debugging line
        const response = await fetch(`${searchUrl}?q=${searchPrompt}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('Data received for search prompt:', data); // Debugging line
        initializeBooks(data.docs, 'search-div');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function searchForBooksByAnySubject({ searchPrompts, subjects }) {
    const searchUrl = 'https://openlibrary.org/search.json';
    const limit = 15;
    try {
        if (subjects && subjects.length > 0) {
            const subjectPromises = subjects.map(sub => 
                fetch(`${searchUrl}?subject=${sub}&limit=${limit}`).then(res => res.json())
            );
            
            const results = await Promise.all(subjectPromises);

            results.forEach((res, ind) => {
                const category = subjects[ind];
                initializeBooks(res.docs, category);
            });
        }

    } catch (error) {
        console.error('Error fetching subject data:', error);
    }
}

function displayBooks(books, category) {
    const categoryDiv = document.querySelector(`.${category}.category`);

    if (!categoryDiv) {
        console.error('Category div not found:', category);
        return;
    }

    const contentDiv = categoryDiv.querySelector('.content');

    if (!contentDiv) {
        console.error('Content div not found in category:', category);
        return;
    }

    contentDiv.innerHTML = ''; 

    const fragment = document.createDocumentFragment();

    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('content-div');

        const coverImage = document.createElement('img');
        coverImage.classList.add('cover-Image');
        coverImage.src = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : './images/book_haven.gif';
        coverImage.alt = book.title;
        bookDiv.appendChild(coverImage);

        const footerDiv = document.createElement('div');
        footerDiv.classList.add('footer-div');

        const title = document.createElement('h2');
        title.textContent = book.title;
        footerDiv.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author_name ? book.author_name[0] : 'Unknown'}`;
        footerDiv.appendChild(author);

        bookDiv.style.height = 'auto';
        bookDiv.appendChild(footerDiv);
        fragment.appendChild(bookDiv);

        bookDiv.addEventListener('click', () => showBookDetails(book));
    });

    contentDiv.appendChild(fragment);

    const gifs = document.querySelectorAll('.giphy-embed'); 
    gifs.forEach(img => {
        img.classList.add('loaded');
    });
}


async function showBookDetails(book) {
    const modal = document.getElementById('bookModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalCover = document.getElementById('modalCover');
    const modalDescription = document.getElementById('modalDescription');
    const review = document.getElementById('modal-book-review');
    const readButton = document.getElementById('readButton');

    modalTitle.textContent = book.title;
    modalAuthor.textContent = `Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
    modalCover.src = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : './images/book_haven.gif';
    review.textContent = `Review: ${book.review}`;

    // Set the "Read" button link
    readButton.onclick = () => {
        window.open(`https://openlibrary.org${book.key}`, '_blank');
    };

    // Fetch detailed book information for the full description
    try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const detailedBook = await response.json();
        modalDescription.textContent = detailedBook.description ? (typeof detailedBook.description === 'string' ? detailedBook.description : detailedBook.description.value) : 'No description available.';
    } catch (error) {
        console.error('Error fetching detailed book information:', error);
        modalDescription.textContent = 'No description available.';
    }

    modal.style.display = 'block';
}

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close-button').onclick = function() {
    document.getElementById('bookModal').style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
