<template>
    <div class="container">
      <div class="text-section">
        <h1>
          이 부분만 잠깐 알려줄 사람 없나?
          <br>
          <span class="highlight">TUTURE</span>
        </h1>
        <p>
          누구나 튜터가 될 수 있는 곳
        </p>
      </div>
      <div class="image-section">
        <div class="yellow-background">
          <img src="@/assets/main.png" alt="People enjoying food" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainView'
  }
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f8f8;
    width: 100vw;
  }
  
  .container {
    text-align: left;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* 추가하여 패딩 포함한 박스 크기 설정 */
  }
  
  .text-section {
    width: 60%;
    margin-right: 30px;
  }
  
  .text-section h1 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .text-section h1 .highlight {
    color: #e7c83c;
    font-size: 2em;
  }
  
  .text-section p {
    font-size: 1.2em;
    color: #777;
    margin-bottom: 20px;
  }
  
  .image-section {
    width: 40%;
    position: relative;
  }
  
  .yellow-background {
    background-color: #f1c40f;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .yellow-background img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  