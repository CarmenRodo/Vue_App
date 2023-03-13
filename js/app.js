//initialing Vue and linking it
const app = new Vue({
  el: "#app",
  data: {
    //The array of Books with their titles, author, description, and if they are favorited
    books: [
      {
        title: "1984",
        author: "George Orwell",
        description:
          "A dystopian novel set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
        isFavorite: false,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description:
          "The story takes place during three years of the Great Depression in the fictional Maycomb, Alabama. This is a classic of modern American literature.",
        isFavorite: false,
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        description:
          "The novel is based on the true story of the ship Essex, which in 1820 was attacked by a sperm whale and sank. The book is a sailor's story and a whaling voyage narrative, but it is also a story of obsession.",
        isFavorite: false,
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        description:
          "The novel's plot is built around the experiences of the young protagonist Holden Caulfield, who struggles with feelings of disillusionment, isolation, and alienation in the society of the time.",
        isFavorite: false,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description:
          "A novel of manners set in the early 19th century, it takes place in a fictional English village and follows the Bennet sisters, particularly Elizabeth Bennet, as they deal with issues of marriage, morality, and misconceptions.",
        isFavorite: false,
      },
    ],
    // Array to hold favorite books
    favoriteBooks: [],
    orderBy: "", // Order by field
    orderDirection: "", //ascending or descending direction
  },
  methods: {
    // Add book to books array
    addBook: function (book) {
      this.books.push(book);
    },
    // Remove book from books array
    removeBook: function (index) {
      this.books.splice(index, 1);
    },
    // Toggle favorite status of a book
    toggleFavorite: function (index) {
      const book = this.books[index];
      if (book.isFavorite) {
        this.favoriteBooks.splice(this.favoriteBooks.indexOf(book), 1);
      } else {
        this.favoriteBooks.push(book);
      }
      book.isFavorite = !book.isFavorite;
    },
    // Remove book from favoriteBooks array
    removeFavorite: function (index) {
      this.favoriteBooks.splice(index, 1);
      this.books.forEach((book) => {
        if (book.isFavorite && !this.favoriteBooks.includes(book)) {
          book.isFavorite = false;
        }
      });
    },
    //order option
    sortBooks: function (event) {
      this.orderBy = event.orderBy;
      this.orderDirection = event.orderDirection;
      if (this.orderBy && this.orderDirection) {
        this.books.sort((a, b) => {
          if (this.orderDirection === "asc") {
            return a[this.orderBy].localeCompare(b[this.orderBy]);
          } else {
            return b[this.orderBy].localeCompare(a[this.orderBy]);
          }
        });
      }
    },
  },
  computed: {
    // Get the list of books based on the current order by and direction
    orderedBooks: function () {
      let ordered = [...this.books];
      if (this.orderBy && this.orderDirection) {
        ordered.sort((a, b) => {
          if (this.orderDirection === "asc") {
            return a[this.orderBy].localeCompare(b[this.orderBy]);
          } else {
            return b[this.orderBy].localeCompare(a[this.orderBy]);
          }
        });
      }
      return ordered;
    },
  },
});
