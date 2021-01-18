// Book Class: a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

const books = [];
books.push(new Book("book one", "Titoss", "35sq3c5"));
books.push(new Book("book two", "Titoss", "g9sz3s6"));

//UI Class: to handle UI tasks
class UI {

    static displayBooks() {
        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book) {
        const bookList = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href=# class="btn btn-danger btn-sm delete">X</a></td>
        `;
        bookList.appendChild(row);
    }

    static removeBook(element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, alertType) {
        const alertDiv = document.createElement("div");
        const deleteButton = document.createElement("a");
        deleteButton.setAttribute("href", "#");
        deleteButton.innerHTML = "X";
        deleteButton.className = "btn btn-small float-right p-0";
        deleteButton.addEventListener("click", () => {
            alertDiv.remove();
        });
        alertDiv.className = `alert alert-${alertType}`;
        alertDiv.appendChild(document.createTextNode(message));
        alertDiv.appendChild(deleteButton);
        const container = document.querySelector(".container");
        container.insertBefore(alertDiv, container.childNodes[2])
        setTimeout(() => {
            alertDiv.remove()
        }, 4000);

    }

    static clearFields(form) {
        form.reset();
    }
}
//Store class: storage
class Store {
    constructor(books) {
        this.books = books;
    }

}
//Event: add a book
const form = document.getElementById("book-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill in all the fields", "danger");
    }
    else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        UI.clearFields(form);
        UI.showAlert("Book added!", "success");
    }

})
//Event: remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.removeBook(e.target);
})
//Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);