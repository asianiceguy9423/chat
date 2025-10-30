<template>
  <div class="chat-container">
    <div 
      class="chat"
      v-for="(item, index) in displayedChatInfo"
      :key="index"
      :class="{ 
        'chat-even': index %2 === 0, 
        'chat-odd': index %2 !== 0,
      }"
    >
      <p>{{ item.user }}</p>
      <p class="chat_info">{{ item.chatInfo }}</p>
    </div>
  </div>  
</template>

<script setup>
import { useChatCounterStore } from '../stores/chatCounter';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const chatStore = useChatCounterStore();
const { chatRoomInfo } = storeToRefs(chatStore);

onMounted(()=>{
  chatStore.FETCH_CHATROOM_INFO();
})

const displayedChatInfo = computed(()=>{
  return chatRoomInfo.value.slice(0,20);
})
</script>

<style lang="scss" scoped>
$color-blue-grey: rgb(233, 231, 240);
$color-white: #ffffff;

.chat-container{
  display: flex;
  flex-direction: column;

  .chat{
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 8px;
    gap: 4px;  

    &:not(:last-child){
      margin-bottom: 2px;
    }
    &.chat-odd{
      background-color: $color-blue-grey;
    }
    &.chat-even{
      background-color: $color-white;
    }

    .chat_info{
      font-size: 16px;
    }
    
    .userInfo_flex{
      display: flex;
      flex-direction: row;
    }
  }
}
</style>