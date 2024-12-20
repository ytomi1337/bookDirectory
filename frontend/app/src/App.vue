<script>
import HelloWorld from './components/HelloWorld.vue'

export default {   
    methods: { 
      showAlert(){ 
        prompt("Button clicked!");
      },
      async fetchBooks(){
        try {
          const response = await fetch("http://localhost:3000/");
          if (!response.ok) {
            throw new Error("Failed to fetch books.");
          }
          this.books = await response.json();
        } catch (error) {
          console.error("Error fetching books:", error);
        }
 
      },
      async deleteBook(bookId){
        try {
          const response = await fetch(`http://localhost:3000/${bookId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Remove the book from the local list after successful deletion
            this.books = this.books.filter(book => book.id !== bookId);
            console.log(`Book with ID ${bookId} deleted successfully.`);
          } else {
            console.error('Failed to delete the book:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      },

      async submitForm(data) {
      console.log(data);
      try {
        const transferData = {author: this.author, title: this.title, year: this.year}
        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transferData),
        });
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    },
      
      
    }, 
    data() {
    return {
      formData: {
        author: "",
        title: "",
        year: null,
      },
      books: [ 

      ]
    };
  },
   };
   
</script>

<template>
<form >
      <div>
        <label for="author">Author:</label><br>
        <input
          type="text"
          id="author"
          v-model="author"
          required
          placeholder="Author"
        />
      </div>
      <div>
        <label for="title">Book Title:</label><br>
        <input
          type="text"
          id="title"
          v-model="title"
          required
          placeholder="Book Title"
        />
      </div>
      <div>
        <label for="year">Year:</label><br>
        <input
          type="number"
          id="year"
          v-model.number="year"
          required
          placeholder="Year"
        />
      </div>
      <button type="button" @click="submitForm">Submit</button>
</form>

  <table v-if="books.length" border="1px" cellspacing="0px" cellpadding="10px">
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Year</th>
      <th>Actions</th>
    </tr>

    <tr v-for="(book, index) in books" :key="index">
      <td>{{ book.author }}</td>
      <td>{{ book.title }}</td>
      <td>{{ book.year }}</td>
      <td><button @click="deleteBook(book.id)">Delete</button></td>
    </tr>
</table>
<p v-else>Books available</p>

<button type="submit" @click="fetchBooks">Click</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
