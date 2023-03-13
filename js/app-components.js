Vue.component("book", {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeBook() {
      this.$emit("remove");
    },
    toggleFavorite() {
      this.$emit("favorite");
    },
  },
  template: `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
          <p class="card-text">{{ book.description }}</p>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-danger" @click="removeBook">Remove</button>
            <button type="button" class="btn btn-outline-secondary" @click="toggleFavorite">
              <i v-if="book.favorite" class="fas fa-heart"></i>
              <i v-else class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `,
});

Vue.component("addBook", {
  data() {
    return {
      newBook: { title: "", author: "", description: "" },
    };
  },
  methods: {
    addBook() {
      this.$emit("add", this.newBook);
      this.newBook = { title: "", author: "", description: "" };
    },
  },
  template: `
      <div>
        <form @submit.prevent="addBook">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="newBook.title" required>
          </div>
          <div class="form-group">
            <label>Author</label>
            <input type="text" class="form-control" v-model="newBook.author" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="newBook.description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Add Book</button>
        </form>
      </div>
    `,
});

Vue.component("favoriteBooks", {
  props: {
    favoriteBooks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFavorite(index) {
      this.$emit("remove", index);
    },
  },
  template: `
      <div>
        <div v-if="favoriteBooks.length === 0" class="alert alert-info">No favorite books added yet</div>
        <div v-else>
          <book v-for="(book, index) in favoriteBooks"
            :key="index"
            :book="book"
            @remove="removeFavorite(index)"
            @favorite="toggleFavorite(index)"></book>
        </div>
      </div>
    `,
});

Vue.component("orderBy", {
  data() {
    return {
      orderBy: "",
      orderDirection: "",
    };
  },
  methods: {
    // Trigger a sorting event based on the selected order by and direction
    sortBooks: function () {
      this.$emit("sort", {
        orderBy: this.orderBy,
        orderDirection: this.orderDirection,
      });
    },
  },
  template: `
      <div class="mb-3">
        <label for="order-by">Order by:</label>
        <select class="form-control" v-model="orderBy" @change="sortBooks">
          <option value="">-- Select --</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <label for="order-direction" class="ml-3">Direction:</label>
        <select class="form-control" v-model="orderDirection" @change="sortBooks">
          <option value="">-- Select --</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    `,
});
