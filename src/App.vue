<template>
  <div>
         <Common 
          :user='user'
         />
    <!-- <transition name='animate__animated animate__bounce' enter-active-class="animate__flipInX" leave-active-class="animate__flipOutX"> -->
    <transition name='animate__animated animate__bounce' enter-active-class="animate__zoomIn" leave-active-class="animate__zoomOut">
     <router-view
      :user='user'
     />
    </transition>

     <!-- 提示框 -->
     <div class="mask" v-show="isShowPrompt">
       <transition  enter-active-class="animate__bounceIn">
       <div class="prompt" v-show="isShowPrompt">
         <div class="close" @click="isShowPrompt = false"></div>
        <div class="message">{{message}}</div>
        <button @click="isShowPrompt = false">confirm</button>
      </div>
      </transition>
     </div>
     
    
      <!-- 成功提示框 -->
     <div class="mask" v-show="isShowAlert">
       <transition  enter-active-class="animate__bounceIn">
       <div class="alert" v-show="isShowAlert">
         <div class="close" @click="isShowAlert = false"></div>
        <div class="message">{{message}}</div>
        <button @click="isShowAlert = false">confirm</button>
      </div>
       </transition>
     </div>

    <!-- 取消点赞提示框 -->
    <div class="mask" v-show="isShowCancelLike">
      <transition  enter-active-class="animate__bounceIn">
      <div class="cancelLike">
        sure cancel this like?
          <div class="confirm" @click="cancelThisLike">confirm</div>
          <div class="cancel" @click="isShowCancelLike = false">cancel</div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import 'animate.css'
import Common from './components/Common.vue'
export default {
  name: 'App',
  components : {
    Common
  },
  data(){
    return {  
      isShowPrompt : false,
      isShowAlert : false,
      isShowCancelLike : false,
      message : '',

      user : {
        
      },
      cancelLike : ''
    }
  },
  methods : {
    showPrompt(value){
      this.isShowPrompt = true
      this.message = value
    },
    //警告框
    showAlert(value){
      this.message = value
      this.isShowAlert = true
    },
    //写入当前用户
    loginUser(value){
      this.user = value
      this.user.user_status = 'true'
    },
    //同步更新我的简介数据
    updateMyRecommend(value){
      this.user.user_recommend = value
    },
    //退出当前账号
    exitAccount(){
      let info = 'user_phone=' + this.user.user_phone
      this.$http.post('/exitAccount',info).then(
        response=>{
          if(response.data == 'ok'){
            this.showPrompt('exit')
            this.user = ''
            this.$bus.$emit('closeConfirmExit')//发送关闭确认退出的弹窗
            this.$router.push('/home')
          }else{
            this.showAlert('exit failed')
          }
        },
        error=>{
          console.log(error.message)
        }
      )

    },
    //取消点赞面板
    showCancelLike(value){
      this.isShowCancelLike = true
      this.cancelLike = value
    },
    //取消掉这个点赞
    cancelThisLike(){
      this.$http.get(`/cancelThisLike?user_phone=${this.cancelLike.user_phone}&user_translate_id=${this.cancelLike.user_translate_id}&user_write_id=${this.cancelLike.user_write_id}&type=${this.cancelLike.type}`).then(
        response=>{
          if(response.data.code == 200){
            this.isShowCancelLike = false
            this.showPrompt('cancel successfully!')
          }
        },
        error=>{
          console.log(error.message)
        }
      )
    }
  },
  mounted(){
    //验证cookie值，不完善的引入cookie可能导致一系列安全问题和法律问题，所以取消掉cookies的设置
    // this.$http.get('/cookie').then(
    //   response=>{
        // if(response.data.account.length == 11){
        //   this.$router.push('/home')
        // }else{
        //   this.$router.push('/login')
        // }
    //     console.log(response.data)
    //     if(response.data == ''){
    //       console.log('空对象')
    //     }else{
    //       console.log('错误')
    //     }
    //   },
    //   error=>{
    //     console.log(error.message)
    //   }
    // )

    //事件总线
    this.$bus.$on('showPrompt',this.showPrompt)//提示框
    this.$bus.$on('showAlert',this.showAlert) //警告框
    this.$bus.$on('loginUser',this.loginUser)

    this.$bus.$on('updateMyRecommend',this.updateMyRecommend)//同步更新自我简介数据

    //退出当前账号
    this.$bus.$on('exitAccount',this.exitAccount)

    //取消点赞选择面板
    this.$bus.$on('showCancelLike',this.showCancelLike)
  }

}
</script>

<style lang='less'>

.mask{
  // display: none;
  position: absolute; top: 0; left: 0;
  min-width: 1500px;
  min-height: 500px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.664);
  z-index: 49;
}
.prompt,.alert,.cancelLike{
  position: absolute; left: 50%; top : 50%;
  margin: -150px 0 0 -200px;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  border: 3px solid rgb(51, 255, 112);
  box-shadow: 0 0 40px rgb(51, 255, 112);
  background: rgb(51, 51, 51);
  z-index: 50;
  .close{
    position: absolute; right: 0; top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: rgb(2, 192, 59);
    cursor: pointer;
    transition: all .3s;
  }
  .close:hover{
    color: rgb(2, 192, 59);
    transform: rotate(90deg);
  }
  .message{
    position: absolute; left: 0; top : 30px;
    width: 400px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  button{
    position: absolute; bottom: 50px; left: 100px;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgb(2, 192, 59);
    border-radius: 10px;
  }
  button:hover{
    background: rgb(51, 255, 112);
  }
}
.alert{
  border: 3px solid red;
  box-shadow: 0 0 40px red;
  color: red;
  .close{
    color: rgb(165, 0, 0);
  }
  .close:hover{
    color: red;
  }
  button{
    background: rgb(165, 0, 0);
  }
  button:hover{
    background: rgb(255, 34, 34);
  }
}
.cancelLike{
  text-align: center;
  line-height: 190px;
    .confirm,.cancel{
      position: absolute; bottom: 50px; left: 50%;
      margin-left: -150px;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: rgb(0, 132, 184);
      border-radius: 10px;
      cursor: pointer;
    }
    .confirm:hover{
      background: rgb(0, 183, 255);
    }
    .cancel{
      margin-left: 30px ;
      background: rgb(184, 0, 0);
    }
    .cancel:hover{
      background: red;
    }
}
</style>
