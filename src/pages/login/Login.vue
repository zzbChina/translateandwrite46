<template>
    <transition name='animate__animated animate__bounce' leave-active-class="animate__zoomOut">
        <div class="login">
            <div class="panel" v-show="!changeToRegiser">
                <div class="title">LOGIN</div>
                <div class="account" >
                    <h4 ref='accountTitle'>account</h4>
                    <h6 ref="accountPrompt">please input your phone (now {{user.account.length}}words)</h6>
                    <input type="text" @click='focus("account")' v-model="user.account" ref="account">
                </div>
                <div class="password">
                    <h4 ref="passwordTitle">password</h4>
                    <h6 ref="passwordPrompt" class="passwordPrompt">please input your passowrd(6-20) (now {{user.password.length}}words)</h6>
                    <input type="password" @click='focus("password")' v-model="user.password" ref="password">
                    <span ref="openEyes" v-show='!eyeStatus' @click='eyeStatus = !eyeStatus' style='color:skyblue'></span>
                    <span ref="closeEyes" v-show='eyeStatus' @click='eyeStatus = !eyeStatus' style='color:grey'></span>
                </div>
                <button @click='login' ref="loginBtn">login</button>
                <h5 @click='register'>without account?register now</h5>
            </div>
            <transition name='animate__animated animate__bounce' enter-active-class="animate__zoomIn" leave-active-class="animate__bounceOut">
            <router-view
            />
            </transition>
            <transition name='animate__animated animate__bounce' enter-active-class="animate__bounceIn" leave-active-class="animate__bounceOut">
            <div class="into" @click='passLogin' v-show='!changeToRegiser'>pass login</div>
            </transition>
        </div>
    </transition>
</template>

<script>
import 'animate.css'
export default {
    name : 'Login',
    data(){
        return{
            user : {
                account : '',
                password : ''
            },
            eyeStatus : true,
            changeToRegiser : false
        }
    },
    methods:{
        passLogin(){
            this.$bus.$emit('closeMask')
            this.$router.push('/home')
        },
        focus(val){
            if(val == 'account'){
                this.$refs.accountTitle.style.top = '-30px'
            }else{
                this.$refs.passwordTitle.style.top = '-30px'
            }
        },
        //登录
        login(){
            console.log(123)
            if(this.user.account == ''){
                this.$bus.$emit('showAlert','please input your account')
            }else if(this.user.password == ''){
                this.$bus.$emit('showAlert','please input your password')
            }else{
                let loginMsg = 'user_phone=' + this.user.account + '&' + 'user_password=' + this.user.password
                this.$http.post('/login',loginMsg).then(
                    response=>{
                        console.log(response.data)
                        if(response.data == 'where not have this account'){
                            this.$bus.$emit('showAlert','account is unexit')
                        }else if(response.data == 'password is wrong'){
                            this.$bus.$emit('showAlert','password is wrong')
                        }else{
                            let message = 'welcome'
                            this.$bus.$emit('showPrompt',message)
                            //关闭遮罩层
                            this.$bus.$emit('closeMask')
                            this.$bus.$emit('loginUser',response.data[0])
                            this.$router.push('/home')
                            //成功登录后清除
                            console.log(response.data[0])
                            this.user.password = '' ; this.user.account = ''
                        } 
                    },
                    error=>{
                        this.$bus.$emit('showAlert','database is not ready')
                        console.log(error.message)
                    }
                )
                
            }
        },
        //注册
        register(){ 
            this.changeToRegiser = true
            this.$router.push('/login/register')
        },
        //显示登录面板
        isShowLoginBox(){
            this.changeToRegiser = false
        } 
    },
    watch : {
        //监听eye的状态。决定切换密码框输入类型
        eyeStatus : {
            handler(){
                if(this.eyeStatus == false){
                    this.$refs.password.type = 'text'
                }else{
                    this.$refs.password.type = 'password'
                }
            }
        },
        'user.account':{
            handler(){
                if(this.user.account.length < 11 || this.user.account.length > 11){
                    this.$refs.accountPrompt.style.display = 'block'
                }else if(this.user.account.length == 0 || this.user.account.length == 11){
                    this.$refs.accountPrompt.style.display = 'none'
                }
            }
        },
        'user.password':{
            handler(){
                if(this.user.password.length < 6 || this.user.password.length > 20){
                    this.$refs.loginBtn.style.background = 'grey'
                    this.$refs.passwordPrompt.style.display = 'block'
                }else if(this.user.account.length == 11 && this.user.password.length >= 6 && this.user.password.length <20){
                    this.$refs.loginBtn.disabled = false//恢复登录按钮
                    this.$refs.loginBtn.style.background = 'pink'
                    this.$refs.passwordPrompt.style.display = 'none'
                }
            }
        }
    },
    mounted(){
        if(this.$refs.account.focus == true){
            this.$refs.accountPrompt.style = 'block'
        }
        this.$bus.$on('isShowLoginBox',this.isShowLoginBox)

        //禁用注册按钮
        this.$refs.loginBtn.disabled = true

        //关闭有道翻译的结果面板
        this.$bus.$emit('closeYoudaoPanel')
    },
    beforeDestroy(){
        this.$bus.$emit('showUserHeadImage')
    }
}
</script>

<style lang='less'>
.login{
    position: fixed; top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
    z-index: 7;
    transition: all .3s;
    .panel{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 600px;
        height: 400px;
        background: rgb(0, 0, 0);
        animation: changeBg 8s linear infinite;
        border-radius: 15px;
        @keyframes changeBg {
            0%{
                    border: 5px solid rgb(255, 62, 255);
                    box-shadow: 0 0 100px rgb(231, 41, 238);
            }
            25%{
                    border: 5px solid rgb(204, 255, 62);
                    box-shadow: 0 0 100px rgb(204, 255, 62);        
            }
            50%{
                    border: 5px solid rgb(97, 62, 255);
                    box-shadow: 0 0 100px rgb(97, 62, 255);      
            }
            75%{
                    border: 5px solid red;
                    box-shadow: 0 0 100px red;     
            }
            100%{
                    border: 5px solid rgb(255, 62, 255);
                    box-shadow: 0 0 100px rgb(231, 41, 238);          
            }
        }
        .title{
            position: absolute; left: 0; top: -30px;
            width: 600px;
            height: 60px;
            text-align: center;
            font-size: 50px;
            line-height: 60px;
            text-shadow: 0 0 10px yellow;
        }
        .account,.password{
            position: relative;
            margin-top: 60px;
            width: 100%;
            height: 60px;
            input{
                margin:10px 0 0 50px;
                width: 500px;
                height: 40px;
                background: rgba(0, 0, 0, 0);
                border-bottom:1px solid skyblue
            }
            input:focus{
                outline: 2px solid skyblue;
                box-shadow: 0 0 20px white;
            }
            h4{
                position: absolute; left: 50px;top: 5px;
                color:rgb(255, 150, 80);
                text-shadow: 0 0 10px white;
                transition: all .2s;
                z-index: -1;
            }  
            span{
                display: inline-block;
                position: absolute; right: 15px;top: 20px;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                cursor: pointer;
            }      
        }
        button{
            margin: 60px 0 0 100px;
            width: 400px;
            height: 50px;
            // background: purple;
            background: grey;
            border-radius: 6px;
        }
        button:hover{
            box-shadow: 0 0 20px rgb(213, 75, 255);
        }
        h5{
            position: absolute; right: 5px; bottom: 5px;
            color:gray;
            cursor: pointer;
        }
        h5:hover{
            color: yellow;
        }
        h6{
            display: none;
            box-sizing: border-box;
            position: absolute; right: 580px; top: 0;
            width: 300px;
            height: 30px;
            text-align: center;
            line-height: 28px;
            color: black;
            background: white;
            border-radius: 15px;
            border: 1px solid white;
        }
        .passwordPrompt{
            width: 400px;
        }
    }
    .into{
        position: absolute; top: 50px ; right: 50px;
        width: 150px;
        height: 50px;
        font-size: 15px;
        text-align: center;
        line-height: 50px;
        background: rgb(144, 22, 182);
        border-radius: 10px;
        cursor: pointer;
        transition: all .3s;
    }
    .into:hover{
        background: rgb(193, 52, 236 );
    }
}
// @keyframes show {
//     from{
//         background: rgba(0, 0, 0, 0);
//     }
//     to{
//         background: rgba(0, 0, 0, 0.8);
//     }
// }
v-enter{
    background: rgba(0, 0, 0, 0);
}
v-enter-to{
    background: rgba(0, 0, 0, 0.8);
}

</style>