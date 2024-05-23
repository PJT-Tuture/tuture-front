<template>
    <div class="tech-stack">
      <div class="tech-categories">
        <span>인기</span>
        <span>프론트엔드</span>
        <span>백엔드</span>
        <span>모바일</span>
        <span>기타</span>
        <span>모두보기</span>
      </div>
      <div class="tech-tags">
        <span v-for="tech in techs" :key="tech.id" class="tech-tag" @click="handleTagClick(tech)">
          <img src="@/assets/logo.svg" :alt="tech.name" class="tech-icon" />
          {{ tech.name }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TechStack',
    data() {
      return {
        techs: [
        { id: 1, name: 'Nextjs' },
    { id: 2, name: 'Flutter' },
    { id: 3, name: 'Spring' },
    { id: 4, name: 'MySQL' },
    { id: 5, name: 'JavaScript' },
    { id: 6, name: 'Python' },
    { id: 7, name: 'Kubernetes' },
    { id: 8, name: 'Kotlin' },
    { id: 9, name: 'React' },
    { id: 10, name: 'Linux' },
    { id: 11, name: 'TypeScript' },
    { id: 12, name: 'Redis' },
    { id: 13, name: 'Java' },
    { id: 14, name: 'MongoDB' },
    { id: 15, name: 'Figma' },
    { id: 16, name: 'Vue' },
    { id: 17, name: 'CSS' },
    { id: 18, name: 'EC2' },
    { id: 19, name: 'AWS' },
    { id: 20, name: 'php' },
    { id: 21, name: 'Firebase' },
    { id: 22, name: 'Go' },
    { id: 23, name: 'Django' },
    { id: 24, name: 'GraphQL' },
    { id: 25, name: 'Android' },
        ],
      };
    },
    methods: {
    handleTagClick(tech) {
      this.$emit('select-tag', tech.id);
    }
  }
  };
  </script>
  
  <style scoped>
  .tech-stack {
    padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  position: absolute; 
  top: 230px; 
  left: 0;
  right: 0;
  z-index: 1000; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
  
  .tech-categories {
    display: flex;
    gap: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .tech-categories span {
    cursor: pointer;
    padding-bottom: 5px;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px 0;
  }
  
  .tech-tag {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .tech-tag.active {
  background-color: #54a806;
}
  .tech-icon {
    width: 20px;
    height: 20px;
  }
  </style>
  