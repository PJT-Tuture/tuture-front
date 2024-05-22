<template>
    <footer class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>
        <RouterLink to="/privacy-policy">Privacy Policy</RouterLink> |
        <RouterLink to="/terms-of-service">Terms of Service</RouterLink> |
        <RouterLink to="/contact-us">Contact Us</RouterLink>
      </p>
    </footer>
  </template>
  
  <script setup>
  // 특별한 스크립트 설정이 필요하지 않다면 비워둡니다.
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
  