export default class Books {
  static fetchBooks() {
    const getBooks = localStorage.getItem('books');
    return getBooks ? JSON.parse(getBooks) : [];
  }

  static updateBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooksList() {
    if (Books.fetchBooks()) {
      this.bookList = Books.fetchBooks();
    }
  }

  addBook(book) {
    this.bookList = Books.fetchBooks();
    this.bookList.push(book);
    Books.updateBooks(this.bookList);
  }

  remove(e) {
    const id = parseInt(e.target.id, 10);
    this.bookList = Books.fetchBooks();
    this.bookList = this.bookList.filter((item) => item.id !== id);
    e.target.parentElement.remove();
    Books.updateBooks(this.bookList);
  }
}