<template>
  <div class="userInfo">
      <div class="userInfo_flex">
        <div class="title">暱稱:</div>
        <div class="userInfo_flex_div">
          <input 
            type="text" 
            placeholder="輸入暱稱"
            v-model="userName"
          >
          <button @click="sentChatBtn">送出</button>
        </div>        
      </div>
      <div class="userInfo_flex">
        <div class="title">訊息:</div>
        <div class="userInfo_flex_div">
          <textarea 
            placeholder="輸入訊息"
            v-model="userChatInfo"
          ></textarea>
        </div>        
      </div>
    </div>
</template>

<script setup>
import { useChatCounterStore } from '../stores/chatCounter';
import { ref } from 'vue';

const chatStore = useChatCounterStore();
const userName = ref('');
const userChatInfo = ref('');
const getTime = ()=>{
  const now = new Date();
  // --- 日期部分 ---
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,'0');
  const day = String(now.getDate()).padStart(2,'0');
  // --- 時間部分 ---
  const fullHours = now.getHours();
  const amORpm = fullHours < 12 ? '上午' : '下午'; 
  let displayHours = fullHours % 12;
  if( displayHours === 0){
    displayHours = 12;
  }
  const hours = String(displayHours).padStart(2,'0');

  const minutes = String(now.getMinutes()).padStart(2,'0');

  return `${year}/${month}/${day} ${amORpm} ${hours}:${minutes}`;
}

//submit
const chatFormData = () =>{
  const formData = new FormData();
  formData.append(
    'user_name',
    userName.value
  );
  formData.append(
    'chat_info',
    userChatInfo.value
  );
  formData.append(
    'chat_time',
    getTime()
  );
  return formData;
}

const sentChatBtn = () => {
  if(userChatInfo.value.trim() === ''){
    alert('請輸入訊息');
    return;
  }

  chatStore.ADD_NEW_CHAT_INFO_TO_DATABASE(chatFormData());
  userChatInfo.value = '';
}

</script>

<style lang="scss" scoped>
.userInfo{
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 8px;
  background-color: rgb(223, 231, 240);
  gap: 4px;  
  
  .userInfo_flex{
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 600px;
    gap: 4px;

    .title{
      width: 44px;
      margin: 0;
    }
    .userInfo_flex_div{
      display: flex;
      width: 100%;
      align-items: center;
      gap: 4px;
      
      textarea{
        width: 100%;
        height: 80px;
      }
      input{
        width: 100%;
        height: 24px;
      }
      button{
        padding: 0;
        margin: 0;
        height: 28px;
        width: 60px;
      }
    }      
  }
}
</style>