<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-yellow-200 p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Cess Furniture</h1>
      <nav class="space-x-4">
        <router-link to="/" class="text-gray-800 hover:text-orange-600">Home</router-link>
        <router-link to="/shop" class="text-gray-800 hover:text-orange-600">Shop</router-link>
        <router-link to="/contact" class="text-orange-600 font-semibold">Contact Us</router-link>
      </nav>
    </header>

    <!-- Contact Us Section -->
    <section class="text-center py-16 bg-green-50">
      <h2 class="text-4xl font-bold text-orange-600">Contact Us</h2>
      <p class="text-gray-600 mt-4">We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, reach out to us anytime.</p>
    </section>

    <!-- Contact Form -->
    <section class="flex-grow flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-gray-700 font-semibold">Name:</label>
            <input type="text" id="name" v-model="form.name" class="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500" placeholder="Your Full Name" required>
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-semibold">Email:</label>
            <input type="email" id="email" v-model="form.email" class="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500" placeholder="Your Email" required>
          </div>
          <div>
            <label for="message" class="block text-gray-700 font-semibold">Message:</label>
            <textarea id="message" v-model="form.message" class="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" class="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">Send Message</button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-yellow-200 text-center p-4 text-gray-800">
      <p>&copy; 2024 Cess Furniture</p>
      <p>Email: info@cessfurniture.com | Phone: +123 456 789</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      alert(`Thank you, ${this.form.name}! Your message has been sent.`);
      // Clear the form
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
