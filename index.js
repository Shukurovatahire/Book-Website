const addBox = document.getElementById("addBox");
const allBooks = document.getElementById("allBooks");
const addBtn = document.getElementById("btn");
const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const images = document.getElementById("images");
const myForm = document.getElementById("myForm");
const myModal = document.getElementById("myModal");
const mainContainer = document.getElementById("mainContainer");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const footer =document.getElementById("footer")

let booksArr = [];

document.addEventListener("DOMContentLoaded", () => {
  addBox.addEventListener("click", () => {
    mainContainer.style.display = "none";
    footer.style.display="none"
    myModal.style.display = "block";
    btnEdit.style.display = "none";
    btnDelete.style.display = "none";
  });

  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(myForm);
    const formValues = {};
    for (let [key, value] of data.entries()) {
      formValues[key] = value;
    }

    const name = formValues.bName;
    const author = formValues.bAuthor;
    const file = formValues.files;
    const imageURL = URL.createObjectURL(file);

    console.log(file);
    console.log(1, imageURL);

    addNewBook(name, author, imageURL);
    myModal.style.display = "none";
    footer.style.display="block"
    mainContainer.style.display = "block";
    btnEdit.style.display = "none";

    bookName.value = "";
    bookAuthor.value = "";
    images.value = "";
  });

  const addNewBook = (name, author, imageURL) => {
    const box = document.createElement("div");
    box.onclick = function () {
      this.querySelector(".card-inner").classList.toggle("flipped");
    };
    allBooks.appendChild(box);

    const innerBox = document.createElement("div");
    const front = document.createElement("div");
    const img = document.createElement("img");
    const back = document.createElement("div");
    const h2 = document.createElement("h2");
    const paragraf = document.createElement("p");

    box.appendChild(innerBox);
    innerBox.appendChild(front);
    front.appendChild(img);
    innerBox.appendChild(back);
    back.appendChild(h2);
    back.appendChild(paragraf);

    img.src = imageURL;
    h2.innerHTML = name;
    paragraf.innerHTML = `By ${author}`;

    const book10 = document.querySelector(".book10");
    allBooks.insertBefore(box, book10.nextSibling);

    box.classList.add("books");
    innerBox.classList.add("card-inner");
    front.classList.add("card-front");
    back.classList.add("card-back");

    booksArr.push({ title: name, author, image: imageURL });
    addEditButton(box);
  };
});

const updateBook = (book, name, author, imageURL) => {
  const h2 = book.querySelector(".card-back h2");
  const paragraf = book.querySelector(".card-back p");
  const img = book.querySelector(".card-front img");

  h2.innerHTML = name;
  paragraf.innerHTML = `By ${author}`;
  img.src = imageURL;
};

// Edit:

const addEditButton = () => {
  const allBooks = document.querySelectorAll(".books");
  allBooks.forEach((book) => {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("editBtn");
    book.querySelector(".card-front").appendChild(editButton);

    editButton.addEventListener("click", () => {
      editBook(book);
      btnEdit.style.display = "block";
      addBtn.style.display = "none";
      btnDelete.style.display="block"
    });
  });
};

const collectBooks = () => {
  const allBooks = document.querySelectorAll(".books");

  allBooks.forEach((book) => {
    const title = book.querySelector(".card-back h2").innerText;
    const author = book.querySelector(".card-back p").innerText.substring(3); // "By " ön ekini kaldır
    const image = book.querySelector(".card-front img").src;

    booksArr.push({ title, author, image });
    addEditButton(book);
  });
};
console.log(booksArr);
collectBooks();

const editBook = (book) => {
  myModal.style.display = "block";
  footer.style.display="none"
  mainContainer.style.display = "none";
  console.log("edit mode");

  const title = book.querySelector(".card-back h2").innerText;
  const author = book.querySelector(".card-back p").innerText.substring(3);
  const imgSrc = book.querySelector(".card-front img").src;

  console.log(title, author, imgSrc);

  bookName.value = title;
  bookAuthor.value = author;
  // images.value=imgSrc

  btnEdit.onclick = () => {
    const imageURL = URL.createObjectURL(images.files[0]);
    const author = document.getElementById("bookAuthor").value;
    console.log(images.files);
    updateBook(book, bookName.value, author, imageURL);
    myModal.style.display = "none";
    mainContainer.style.display = "block";
    footer.style.display="block"
    bookName.value = "";
    bookAuthor.value = "";
  };
};

// Search

const searchBook = () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const books = document.querySelectorAll(".books");
  const query = searchInput.value.toLowerCase().trim();

  books.forEach((book) => {
    const title = book.querySelector("h2").textContent.toLowerCase();
    const isMatch = title.includes(query);
    book.style.display = isMatch ? "block" : "none";
  });
};

searchBtn.addEventListener("click", searchBook);
searchInput.addEventListener("input", searchBook);
searchBook();

// Delete
btnDelete.addEventListener("click", () => {
  myModal.style.display = "none";
  footer.style.display="block"
  mainContainer.style.display = "block";
  const index = booksArr.findIndex((book) => book.title === bookName.value);

  const bookToRemove = document.querySelector(`.books:nth-child(${index + 1})`);
  if (bookToRemove) {
    bookToRemove.remove();
    booksArr.splice(index, 1);
  }
});




