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
      <div class="userName">{{ item.user }}</div>
      <div class="chat_info_div">
        <div class="chat_info">{{ item.chatInfo }}</div>        
        <div class="chat_time">@{{ item.chatTime }}</div>
      </div>      
    </div>
  </div>  
</template>

<script setup>
import { useChatCounterStore } from '../stores/chatCounter';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import Pusher from 'pusher-js';

const chatStore = useChatCounterStore();
const { chatRoomInfo } = storeToRefs(chatStore);

onMounted(()=>{
  chatStore.FETCH_CHATROOM_INFO();

  // 建立 Pusher 連線
  const pusher = new Pusher('1a927ed74c42bb388362', {
    cluster: 'ap3'
  });

  const channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(data) {
    // 把即時訊息插入到 Pinia 狀態
    chatStore.chatRoomInfo.unshift(data);
  });
})

const displayedChatInfo = computed(()=>{
  return chatRoomInfo.value.slice(0,20);
})
</script>

<style lang="scss" scoped>
$color-blue-grey: rgb(233, 231, 240);
$color-white: #ffffff;
p{
  margin: 0;
  font-size: 16px;
}

.chat-container{
  display: flex;
  flex-direction: column;

  .chat{
    display: flex;
    // flex-direction: column;
    width: auto;
    padding: 16px;
    gap: 20px;  

    &:not(:last-child){
      margin-bottom: 2px;
    }
    &.chat-odd{
      background-color: $color-blue-grey;
    }
    &.chat-even{
      background-color: $color-white;
    }

    .userName{
      width: 16%;
      min-width: 80px;
      color: rgb(177, 123, 42);
      font-size: 16px;
    }
    .chat_info_div{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .chat_info{
        font-size: 16px;
        min-width: 0;
        word-break: break-word; /* 自動換行長字串 */
      }
      .chat_time{
        color: #969696;
        width: auto;
        font-size: 16px;
        margin-left: 12px;
      }
    }
    
    
    .userInfo_flex{
      display: flex;
      flex-direction: row;
    }
  }
}
</style>