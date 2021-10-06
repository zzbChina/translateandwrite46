<template>
  <div class="register">
    <header>REGISTER</header>
    <div class="account">
      <h3 ref="phone">phone</h3>
      <h6 v-show='prompt.phone'>phone number format is not correct</h6>
      <input type="text" @click='focus("phone")' v-model='user.phone' @blur="checkPhone">
    </div>
    <div class="nickname">
       <h3 ref="nickname">nickname</h3>
      <input type="text" @click='focus("nickname")' v-model="user.nickname">
    </div>
    <div class="password">
      <h3 ref="password">password</h3>
      <h6 v-show="prompt.password">please set a password length between 6 - 20</h6>
      <input type="password" @click='focus("password")' v-model="user.password" @focus="promptPassword">
    </div>
    <div class="repassword">
      <h3 ref="repassword">repassword</h3>
      <h6 v-show='prompt.repassword'>the two password are inconsistent</h6>
      <input type="password" @click='focus("repassword")' v-model="user.repassword" @blur='checkPassword'>
    </div>
    <button @click='register'>register</button>
    <div class="back_login" @click="backLogin">back login </div>
  </div>
</template>

<script>
export default {
    name : 'Register',
    data(){
      return{
        user : {
          phone : '',
          nickname : '',
          password : '',
          repassword : ''
        },
        //提示框
        prompt:{
          phone : false,
          password : false,
          repassword : false
        }
      }
    },
    methods : {
      //返回注册路由
      backLogin(){
        this.$router.back();
        this.$bus.$emit('isShowLoginBox',true)
      },
      //输入框获得焦点
      focus(val){
        if(val == 'phone'){
          this.$refs.phone.style.top = '-30px'
        }else if(val == 'nickname'){
          this.$refs.nickname.style.top = '-30px'
        }else if(val == 'password'){
          this.$refs.password.style.top = '-30px'
        }else {
          this.$refs.repassword.style.top = '-30px'
        }
      },
      //注册
      register(){
        if(this.user.password != this.user.repassword){
          this.$bus.$emit('showAlert','the two password are inconsistent')
        }else if(this.user.phone == '' && this.user.nickname == '' && this.user.password == '' && this.user.repassword == ''){
          this.$bus.$emit('showAlert','information can not be empty')
        }
        else{
          let date = new Date().getTime()
          let registerMsg = 'user_phone=' + this.user.phone + '&' + 'user_nickname=' + this.user.nickname + '&' + 'user_password=' + this.user.password + '&'+'register_time='+date
          this.$http.post('/register',registerMsg).then(
            response=>{
              if(response.data == 'this phone was registered'){
                this.$bus.$emit('showAlert','this phone was registered')        
              }else{
                this.$bus.$emit('showPrompt','registered successfully')
              }
            }
          )
        }
      },
      //检查手机号填写
      checkPhone(){
        if(this.user.phone.length < 11 || this.user.phone.length > 11){
          this.prompt.phone = true
        }else{
          this.prompt.phone = false
        }
      },
      //提示密码格式
      promptPassword(){
        this.prompt.password = true
        setTimeout(()=>{
          this.prompt.password = false
        },3000)
      },
      //检查两次密码是否一致
      checkPassword(){
        if(this.user.password != this.user.repassword){
          this.prompt.repassword = true
        }else{
          this.prompt.repassword = false
        }
      }
    },
    mounted(){
      this.$bus.$emit('showPrompt','your phone will be your account!')
    }
}
</script>

<style lang='less'>
.register{
    position: absolute; left: 50%; top : 50%;
    margin: -300px 0 0 -200px;
    width: 400px;
    height: 600px;
    background: rgb(49, 49, 49);
    border: 3px solid pink;
    border-radius: 10px;
    z-index:5;
    header{
      position: absolute; top: -30px; left: 0;
      width: 400px;
      height: 60px;
      text-align:center;
      line-height: 60px;
      font-size: 50px;
      text-shadow: 0 0 10px yellow;
    }
    .account,.nickname,.password,.repassword{
      position: relative;
      margin-top: 50px;
      width: 100%;
      height: 50px;
      input{
        width: 300px;
        height: 40px;
        margin: 5px  0 0 50px;
        background: rgba(0, 0, 0, 0);
        border-bottom: 2px solid skyblue;
        z-index: 5;
      }
      input:focus{
        outline: 2px solid skyblue;
      }
      h3{
        position: absolute; top: 0;left: 50px;
        color: rgb(187, 255, 27);
        text-shadow: 0 0 5px rgb(187, 255, 27);
        z-index: -1;
        transition: all .2s;
      }
      h6{
        position: absolute; left: 380px; top: 0;
        width: 300px;
        height: 50px;
        color: black;
        text-align: center;
        line-height: 50px;
        background: white;
        box-shadow: 0 0 10px white;
        border-radius: 10px;
        animation: emerge .3s ease-out 1;
      }
      h6:before{
        position: absolute; left: -20px; top: 15px;
        content: '';
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-right-color: white;
      }
      @keyframes emerge {
        0%{
          transform: translateX(-20px);
        }
        100%{
          transform: translateX(0);
        }
      }
    }
    .account{
      margin-top: 80px;
    }
    .password{
      h6{
        width: 350px;
      }
    }
    button{
      margin: 50px 0 0 50px;
      width: 300px;
      height: 50px;
      background: rgb(166, 22, 185);
      border-radius: 10px;
      transition: all .2s;
    }
    button:hover{
      background: rgb(255, 0, 255);
    }
    .back_login{
      position: absolute; right:10px; bottom: 10px;
      color: gray;
      cursor: pointer;
    }
    .back_login:hover{
      color: skyblue;
    }
}
</style>