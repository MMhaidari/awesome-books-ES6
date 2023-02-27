/* eslint-disable import/extensions */
import Books from './modules/book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const clearValue = () => {
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  bookTitle.value = '';
  bookAuthor.value = '';
};

const createNewBook = (book) => {
  const bookContainer = document.querySelector('.book-container');
  const newBookContainer = document.createElement('div');
  newBookContainer.setAttribute('class', 'new-book-container');
  newBookContainer.setAttribute('id', book.id);
  const bookDetails = document.createElement('div');
  bookDetails.setAttribute('class', 'book-details');
  bookDetails.innerText = `"${book.title}" by ${book.author}`;
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'removeBtn');
  removeBtn.setAttribute('id', book.id);
  removeBtn.innerText = 'Remove';

  newBookContainer.append(bookDetails, removeBtn);
  bookContainer.appendChild(newBookContainer);
  const removeBtns = document.querySelectorAll('.removeBtn');
  removeBtns.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const bookObject = new Books();
      bookObject.remove(event);
    });
  });
};

const addbookBtn = document.getElementById('add-book');

addbookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];
  let id = 0;
  if (Books.bookList && Books.bookList.length > 0) {
    id = Books.bookList[Books.bookList.length - 1].id + 1;
  }

  if (bookTitle && bookAuthor) {
    const book = { id: id += 1, title: bookTitle, author: bookAuthor };
    const bookObject = new Books();
    bookObject.addBook(book);
    createNewBook(book);
    clearValue();
  }
});

const displayBooks = () => {
  Books.getBooksList();
  if (Books.bookList) {
    Books.bookList.forEach((book) => {
      createNewBook(book);
    });
  }
};

displayBooks();

const listOfBooks = document.querySelector('.book--list');
const addNewBook = document.querySelector('.book-form');
const contactInfo = document.querySelector('.contact');
const listLinkBtn = document.querySelector('.list--link');
const addNewLinkBtn = document.querySelector('.add-new--link');
const contactLinkBtn = document.querySelector('.contact--link');

listLinkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook.classList.add('hidden');
  contactInfo.classList.add('hidden');
  listOfBooks.classList.remove('hidden');
});

addNewLinkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contactInfo.classList.add('hidden');
  listOfBooks.classList.add('hidden');
  addNewBook.classList.remove('hidden');
});

contactLinkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook.classList.add('hidden');
  listOfBooks.classList.add('hidden');
  contactInfo.classList.remove('hidden');
});

const currentDate = document.querySelector('.date');

const date = () => {
  currentDate.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_HUGE);
};

date();