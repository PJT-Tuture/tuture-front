<template>
    <footer class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>
        <RouterLink to="/">Privacy Policy</RouterLink> |
        <RouterLink to="/">Terms of Service</RouterLink> |
        <RouterLink to="/">Contact Us</RouterLink>
      </p>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style>
  .footer {
    background-color: #fff9c4; /* 파스텔 노란톤 */
    color: #333;
    padding: 20px;
    text-align: center;
  }
  
  .footer a {
    color: #fdd835;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  </style>
  