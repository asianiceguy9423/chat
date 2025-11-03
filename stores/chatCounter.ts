import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";

export const useChatCounterStore = defineStore('chatCounter',{
  state: ()=>({
    chatRoomInfo: [
      { user: 'aa', chatInfo: 'aa says', chatTime: '' },
      { user: 'bb', chatInfo: 'bb says', chatTime: '' },
      { user: 'cc', chatInfo: 'cc says', chatTime: '' },
    ],
    LoadingCompleted: false,
    isLoading: false,
  }),
  actions: {
    async  FETCH_CHATROOM_INFO(){
      // 1. 取得 API URL
      const config = useRuntimeConfig();
      const apiUrl = config.public.apiUrl;
      // 2. 防止重複載入
      if ( this.LoadingCompleted || this.isLoading ){
        return {
          success: true,
          message: 'Data already loaded or loading.'
        }
      }

      this.isLoading = true;
      // 3. 使用 $fetch 進行 API 呼叫 (Nuxt 提供的全域函式)
      try {
        const endpoint = `${apiUrl}/api/fetch/ChatRoomData.php`;
        const result = await $fetch(endpoint, {
          method: 'GET',
        });

        if( result && result.success && Array.isArray(result.data) ){
          // 4. Pinia Actions 直接修改 State (取代 Vuex 的 commit)
          this.chatRoomInfo = result.data;
          this.LoadingCompleted = true;
          return {
            success: true,
            data:result.data
          }
        } else {
          // 處理 API 成功但業務邏輯失敗的情況 (例如回傳 success: false)
          const message = result.message || 'API 傳回錯誤訊息。';
          console.log(message);
          return {
            success: false,
            message: message
          }
        }
      }catch(error) {
        // 5. 處理網路或伺服器錯誤
        console.error('讀取時發生網路錯誤:', error);
        return {
          success: false,
          message: '網路連線或伺服器錯誤。'
        }
      }finally {
        this.isLoading = false;
      }
    },
    async ADD_NEW_CHAT_INFO_TO_DATABASE(chatFormData){
      // 1. 在 Action 內部讀取 config
      const config = useRuntimeConfig();
      const apiUrl = config.public.apiUrl;

      const endpoint = `${apiUrl}/api/update/ChatRoomDataUpdate.php`;
      try{
        const result = await $fetch(endpoint, {
          method: 'POST',
          body: chatFormData,
        });

        if(result.success) {
          this.LoadingCompleted = false;
          
          await this.FETCH_CHATROOM_INFO();
          const message = result.message || '成功傳遞聊天訊息';
          console.log(message);
          return {
            success: true,
            message
          }
        } else {
          const message = result.message || '失敗傳遞聊天訊息';
          console.log(message);
          return {
            success: false,
            message
          }
        }
      } catch(error) {
        console.error('新增訊息失敗', error);
        return {
          success: false,
          message: '網路連線或伺服器錯誤。'
        }
      }
    },
    // ADD_CHAT_ROOM_INFO(userName, userChatInfo){
    //   this.chatRoomInfo.push({
    //     user: userName,
    //     chatInfo: userChatInfo
    //   })
    // }
  }
})