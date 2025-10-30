<template>
  <div class="kekeke">
    <userInfo/>
    <ChatRoom/>
  </div>
  
</template>

<script setup>
import userInfo from '../components/index/userInfo.vue'
import ChatRoom from '../components/index/ChatRoom.vue'

</script>

<style lang="scss" scoped>
.kekeke{
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 12px;
}
</style>