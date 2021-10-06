<template>
  <div class="common">
      <div class="mask" ref="mask"></div>

      <!-- 有道翻译结果面板 -->
      <transition name='animate__animated animate__bounce' 
      enter-active-class="animate__bounceIn animate__faster" leave-active-class="animate__zoomOut"
      :duration='800'
      >
      <div class="youdao_info" v-show="youdao.isShow">
          <textarea v-model="youdao.info" ref="copy"></textarea>
          <button class="copy" @click="copyInfo">copy</button>
          <button class="close" @click="youdao.isShow = false">close</button>
      </div>
      </transition>

        <!-- 有道词典 -->
        <div class="youdao_dict">
            
            <div class="searchInp">
                <input type="text" v-model="dict" @keydown.enter="youdaoDict">
                <button @click="youdaoDict"></button>
            </div>
        </div>
        <!-- 有道词典结果 -->
        <transition name="animate__animated animate__bounce"
        enter-active-class="animate__slideInLeft animate__faster"
        leave-active-class="animate__slideOutLeft animate__faster"
        >
        <div class="dict_result" v-show="dictInfo.isShowDict">
            <div class="main_translate">{{dictInfo.basic.translate}}</div>
            <div class="explains">
                <ul>
                    <li v-for="(e,index) in dictInfo.basic.explains" :key="e.index">
                        <span>{{index+1}}.&nbsp;&nbsp;{{e}}</span>
                    </li>
                </ul>
            </div>
            <div class="wfs">
                <ol>
                    <li v-for="(w,index) in dictInfo.basic.web" :key="w.index">
                        <span>{{index+1}}.&nbsp;[ {{w.key}} ]&nbsp;&nbsp;{{w.value[0]}}</span>
                    </li>
                </ol>
            </div>
            <div class="close" @click="dictInfo.isShowDict = false">hidden</div>
        </div>
        </transition>
        <!-- 有道词典显示错误 -->
        <div class="dict_wrong" v-show="dictInfo.isWrong">
            <div class="sad">
                
            </div>
            <span>no word found</span>
        </div>

      <header>
          &nbsp;&nbsp;TAW
          <div class="search_input">
              <input type="text" placeholder="input your want to translate" v-model="chinese" @keydown.enter="youdaoTranslate">
              <button class="translateBtn" @click="youdaoTranslate">
                  <span v-show="!youdao.isLoading"></span>
                  <span v-show="youdao.isLoading" class="isloading_btn"></span>
              </button>
              <transition name="clearyoudaoBtn">
              <div class="clearText" v-show="chinese != '' " @click="clearYouDaoText">clear</div>
              </transition>
              
          </div>
          
          <div class="user_header" @click='login' title="your account">
              <span>
                  <!-- <span></span> -->
                  <img :src="headUrl" alt="">
              </span>
              <div class="user_nickname" v-show='!user.id'>please login</div>
              <div class="user_nickname" v-show='user.id'>{{user.user_nickname}}</div>
          </div>
          <!-- 退出登录状态 -->
          <div class="exit_login" v-show="user.user_status" title="exit your account" @click="exitLogin">
              
          </div>
      </header>
      <footer>
          <div class="list">
              <ul class="list_hide">
                  <li @click='goNav("home")' ref="home"></li>
                  <li @click='goNav("translate")' ref="translate"></li>
                  <li @click='goNav("write")' ref="write"></li>
                  <li @click='goNav("offer")' ref="offer"></li>
              </ul>
          </div>
      </footer>
      <!-- https://github.githubassets.com/images/modules/site/enterprise/launchpad/hero/enterprise-deathcat.h264.mp4 -->
      <video :src="require('../assets/bg.mp4')"
      autoplay muted loop
      class="index_video"
      ></video>

      <img :src="require('../assets/star-bg.svg')" alt="" class="svg_bg">

      <!-- 确认退出的弹窗 -->
      <div class="confirm_exitMask" v-show="isShowConfirm">
          <div class="confirm_exit">
              confirm to exit?
              <div class="close" @click="isShowConfirm = false"></div>
              <button class="confirm" @click="exitLoginAccount">confirm</button>
              <button class="cancel" @click="isShowConfirm = false">cancel</button>
          </div>
      </div>

      <CopyrightFooter/>
  </div>
</template>

<script>
// import 'animate.css'
import CopyrightFooter from './CopyrightFooter.vue'
import CryptoJS from 'crypto-js'
import $ from 'jquery'
export default {
    name : 'Common',
    components : {
        CopyrightFooter
    },
    props : ['user'],
    data(){
        return {
            chinese : '',
            dict : '',

            //有道翻译结果
            youdao:{
                info : '',
                isShow : false,
                isLoading : false,
            },

            //展示是否退出当前用户面板
            isShowConfirm : false,

            //词典输出内容
            dictInfo:{
                basic : {
                    explains : [],
                    wfs : [],
                    translate:[]
                },
                isShowDict : false,
                isWrong : false
            },

            //该目录下的头像
            headUrl : require('../assets/headImage/noheader.jpg'),

            //标记来到个人面板变量
            whichRouter:{
                home:false,
                translate:false,
                write:false,
                offer:false,
                individual:false
            }
        }
    },
    methods:{
        goNav(val){
            let li = document.querySelectorAll('.list_hide li')
            for(let l of li){
                l.classList.remove('current')
            }
            if(val == 'home'){
                if(this.whichRouter.home == false){
                    this.$router.push('/home')
                    this.$refs.home.classList.add('current')
                }else{
                    this.$refs.home.classList.add('current')
                }
            }else if(val == 'translate'){
                if(this.whichRouter.translate == false){
                    this.$router.push('/translate')
                    this.$refs.translate.classList.add('current')
                }else{
                    this.$refs.translate.classList.add('current')
                }
            }else if(val == 'write'){
                if(this.whichRouter.write == false){
                    this.$router.push('/write')
                    this.$refs.write.classList.add('current')
                }else{
                    this.$refs.write.classList.add('current')
                }
            }else{
                if(this.whichRouter.offer == false){
                    this.$router.push('/offer')
                    this.$refs.offer.classList.add('current')   
                }else{
                    this.$refs.offer.classList.add('current')
                }
            }
        },
        //登录
        login(){
            if(this.user.user_status != 'true'){
                this.$refs.mask.style.display = 'block'
                this.$router.push('/login')
            }else{
                if(this.whichRouter.individual == false){
                    this.$router.push('/individual')
                }
            }
        },
        //改变nav的路由状态
        changeNav(val){
            const li = document.querySelectorAll('.list_hide li')
            for(let l of li){
                l.classList.remove('current')
            }
            console.log('it does')
            if(val=='offer'){
                this.$refs.offer.classList.add('current')
            }else if(val == 'home'){
                this.$refs.home.classList.add('current')
            }else if(val == 'write'){
                this.$refs.write.classList.add('current')
            }
        },
        //关闭遮罩层
        closeMask(){
            this.$refs.mask.style.display = 'none'
        },
        //有道翻译
        youdaoTranslate(){
                if(this.youdao.info != ''){
                    this.youdao.isLoading = true
                }           
                let vue = this // 将vue实例化出来
                var appKey = '4002943f11ba74d2';
                var key = 'GVZACwEwEpwY9BjCaKubuuUxbnKheQNJ';//注意：暴露appSecret，有被盗用造成损失的风险
                var salt = (new Date).getTime();
                var curtime = Math.round(new Date().getTime()/1000);
                var query = this.chinese;
                // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
                var from = 'zh-CHS';
                var to = 'en';
                var str1 = appKey + this.truncate(query) + salt + curtime + key;
                var vocabId =  '您的用户词表ID';

                var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
                $.ajax({
                    url: 'http://openapi.youdao.com/api',
                    type: 'post',
                    dataType: 'jsonp',
                    data: {
                        q: query,
                        appKey: appKey,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign,
                        signType: "v3",
                        curtime: curtime,
                        vocabId: vocabId,
                    },
                    success: function (data) {
                        vue.youdao.isShow = 'true'
                        vue.youdao.info = data.translation[0]
                        vue.youdao.isLoading = false
                    } 
                    
                });
            // }
        },
        truncate(q){
            var len = q.length;
            if(len<=20) return q;
            return q.substring(0, 10) + len + q.substring(len-10, len);
        },
        //复制有道翻译的结果
        copyInfo(){
            this.$refs.copy.select()
            document.execCommand('Copy')
        },
        //退出登录提示框
        exitLogin(){
            this.isShowConfirm = true
        },
        //确认退出当前账号
        exitLoginAccount(){
            this.$bus.$emit('exitAccount')
        },
        //关闭确退出弹窗
        closeConfirmExit(){
            this.isShowConfirm = false
        },
        //有道词典
        youdaoDict(){
                // if(this.youdao.info != ''){
                //     this.youdao.isLoading = true
                // }           
                let vue = this // 将vue实例化出来
                // var langType = 'auto';
                var appKey = '4002943f11ba74d2';
                // var dicts = 'dicts=ce&dicts=ec';
                var key = 'GVZACwEwEpwY9BjCaKubuuUxbnKheQNJ';//注意：暴露appSecret，有被盗用造成损失的风险
                var salt = (new Date).getTime();
                var curtime = Math.round(new Date().getTime()/1000);
                var query = this.dict;
                // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'

                var from = 'en';
                var to = 'zh-CHS';
                var str1 = appKey + this.truncate(query) + salt + curtime + key;
                var vocabId =  '1';


                var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
                $.ajax({
                    url: 'http://openapi.youdao.com/api',
                    type: 'post',
                    dataType: 'jsonp',
                    data: {
                        q: query,
                        appKey: appKey,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign,
                        signType: "v3",
                        curtime: curtime,
                        vocabId: vocabId,
                    },
                    success: function (data) {

                        console.log(typeof(data.isWord))
                        if(data.isWord == false){
                            vue.dictInfo.isWrong = true
                            setTimeout(()=>{
                                vue.dictInfo.isWrong = false
                            },1500)
                        }else{
                            vue.dictInfo.basic.explains = data.basic.explains
                            vue.dictInfo.basic.web = data.web
                            vue.dictInfo.basic.translate = data.translation[0]

                            vue.dictInfo.isShowDict = true
                        }
                    } 
                    
                });
        },
        //打开登录面板的遮罩层
        openLoginMask(){
            this.$refs.mask.style.display = 'block'
        },
        //显示用户头像在nav
        showUserHeadImage(){
            this.headUrl = require('../assets/headImage/' + this.user.user_headImage)
        },
        //临时动态更新用户头像
        updateUserHeadImage(value){
            this.headUrl = require('../assets/headImage' + value)
        },
        //清除有道翻译的输入框内容
        clearYouDaoText(){
            this.chinese = ''
        },
        //关闭有道翻译的所有结果面板
        closeYoudaoPanel(){
            this.youdao.isShow  = false
            this.dictInfo.isShowDict = false
        },
        //更新自己是否在个人面板路由
        isInWhichRouter(value){
            if(value.router == 'individual'){
                this.whichRouter.individual = value.data
            }else if(value.router == 'home'){
                this.whichRouter.home = value.data
            }else if(value.router == 'translate'){
                this.whichRouter.translate = value.data
            }else if(value.router == 'write'){
                this.whichRouter.write = value.data
            }else if(value.router == 'offer'){
                this.whichRouter.offer = value.data
            }
        }
    },
    created(){
        // let body = document.querySelector('body');
        // let url = '../assets/star-bg-svg'
        // body.style.backgroundImage = 'url(' + 
    },
    mounted(){
        this.$bus.$on('changeNav',this.changeNav)

        //关闭遮罩层
        this.$bus.$on('closeMask',this.closeMask)

        //关闭确认退出弹窗
        this.$bus.$on('closeConfirmExit',this.closeConfirmExit)

        //打开登录面板的遮罩层
        this.$bus.$on('openLoginMask',this.openLoginMask)

        //登录成功之后修改用户头像显示
        this.$bus.$on('showUserHeadImage',this.showUserHeadImage)

        //显示自己是否身处何种路由
        this.$bus.$on('isInWhichRouter',this.isInWhichRouter);

        if(this.user.user_status == 'true'){
            this.headUrl = require('../assets/headImage/' + this.user.user_headImage)
        }
        

        //关闭有道整句翻译结果的面板
        this.$bus.$on('closeYoudaoPanel',this.closeYoudaoPanel)
    }
}
</script>

<style lang='less'>
.common{
    user-select: none;
    overflow: hidden;
    .svg_bg{
        width: 100%;
        height: 100%;
        // margin-top: 100px;
        // width: 1400px;
        // min-width: 1400px;
        // height: 800px;
        // min-height: 800px;
    }
    .mask{
        display: none;
        position: fixed; top: 0; left: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
        background: rgba(0, 0, 0, 0.8);
    }
    //有道词典
    .youdao_dict{
        position: absolute; top: 120px; left: 100px;
        width: 70px;
        height: 70px;
        font-size: 70px;
        color: rgb(162, 0, 177);
        text-shadow: 0 0 30px rgb(237, 110, 241);
        cursor: pointer;
        z-index: 5;
        transition: color .3s;
        .searchInp{
            position: absolute;left: 70px;top: 10px;
            width: 0;
            height: 50px;
            transition: all .3s;
            overflow: hidden;
            input{
                position: absolute; top: 5px; left: 2px;
                width: 200px;
                height: 40px;
                background: rgb(43, 43, 43);
            }
            input:focus{
                outline: 0;
            }
            button{
                position: absolute;left: 200px;top: 5px;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                background: rgb(199, 0, 0);
            }
            button:hover{
                background: red;
            }
        }
    }
    // 有道词典结果
    .dict_result{
        position: absolute; top: 200px; left: 120px;
        width: 300px;
        height: 340px; 
        border: 3px solid red;
        background: rgb(24, 24, 24);  
        box-shadow: 0 0 10px red;
        border-radius: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 1;
        .main_translate{
            margin: 0 0 0 25px;
            width: 250px;
            font-size: 30px;
            line-height: 50px;
            color: rgb(255, 211, 153);
        }
        .explains{
            width: 300px;
            border-bottom: 1px solid rgb(75, 75, 75);
            ul{
                li{
                    margin: 0 0 0 25px;
                    width: 250px;
                    line-height: 25px;
                    font-size: 12px;
                }
            }
        }
        .wfs{
            width: 300px;
            border-bottom: 1px solid rgb(75, 75, 75);
            ol{
                li{
                    margin: 0 0 0 25px;
                    width: 250px;
                    line-height: 25px;
                    font-size: 12px;
                }
            }
        }
        .close{
            margin: 50px 0 0 90px;
            width: 120px;
            height: 40px;
            font-size: 20px;
            text-align: center;
            line-height: 40px;
            background: rgb(153, 0, 0);
            border-radius: 9px;
            cursor: pointer;
            transition: all .3s;
        }
        .close:hover{
            background: red;
        }
    }
    .dict_wrong{
        position: absolute; top: 200px; left: 150px;
        width: 200px;
        height: 200px;
        border-radius: 10px;
        background: #000;
        text-align: center;
        line-height: 300px;
        border: 3px solid red;
        box-shadow: 0 0 10px red;
        .sad{
            position: absolute; left: 50%; top : 40%;
            transform : translate(-50%,-50%);
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 50px;
            color: red;
        }
    }
    .dict_result::-webkit-scrollbar{
        width: 4px;
    } 
    .dict_result::-webkit-scrollbar-thumb{
        margin-right: 5px;
        background: rgb(239, 255, 17);//设置滑动条颜色
        border-radius: 6px;//设置滑动条边角
    }
    .dict_result::-webkit-scrollbar-track-piece{
        background: rgba(0, 0, 0 ,0);//设置滑动条的容器的背景   
    }   
    .youdao_dict:after{
        position: absolute; top: 15px;left: 25px;
        color: white;
        font-size: 20px;
        content : 'D'
    }
    .youdao_dict:hover{
        color: red;
    }
    .youdao_dict:hover .searchInp{
        width: 250px;
    }
    .youdao_info{
        position: absolute; top: 100px; left: 50%;
        width: 1200px;
        height: 200px;
        border: 3px solid rgb(255, 0, 0);
        background: #000;
        border-radius: 15px;
        box-shadow: 0 0 10px rgb(255, 84, 84);
        margin: 0 0 0 -600px;
        z-index: 8;
        textarea{
            position: absolute; left: 45%; top : 50%;
            transform : translate(-50%,-50%);
            width: 1000px;
            height: 120px;
            background: rgb(48, 48, 48);
            resize: none;
        }
        .close,.copy{
            position: absolute; right: 30px;bottom: 40px;
            width: 100px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            background: rgb(165, 0, 0);
            border-radius: 8px;
        }
        .close:hover{
            background: red;
        }
        .copy{
            bottom: 100px;
            background: rgb(39, 155, 201);
        }
        .copy:hover{
            background: rgb(0, 183, 255);
        }
    }
    .youdao_info:after{
        position: absolute; top: 5px;left: 5px;
        width: 200px;
        height: 20px;
        font-size: 15px;
        color: rgb(255, 251, 0);
        text-shadow: 0 0 50px yellow;
        content: 'Thanks YouDao';
    }
    header{
        position: absolute; top: 0; left: 0;
        width: 100vw;
        height: 100px;
        min-width: 1500px;
        color:white;
        font-size: 25px;
        text-shadow: 0 0 10px white;
        line-height: 50px;
        background: linear-gradient(to bottom,rgb(130, 44, 156),rgb(0, 0, 0));
        .search_input{
            position: absolute; top: 20px; left: 50%;
            width: 400px;
            height: 40px;
            margin-left: -200px;
            input{
                width: 100%;
                height: 100%;
                background: #00000052;
                color: rgb(255, 255, 255);
                border-radius: 5px;
                padding-right: 40px;
            }
            input:focus{
                outline: 2px solid pink;
                box-shadow: 0 0 20px pink;
            }
            .translateBtn{
                position: absolute; top: 8px;left: 400px;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background: pink;
                .isloading_btn{
                    animation: isloading 1.5s infinite;
                }
            }
            .clearText{
                position: absolute; top: 13px; left: 450px;
                width: 80px;
                height: 30px;
                line-height: 26px;
                border: 2px solid pink;
                color: pink;
                font-size: 15px;
                text-align: center;
                border-radius: 5px;
                cursor: pointer;
                transition: all .2s ease-out;
            }
            .clearyoudaoBtn-enter,.clearyoudaoBtn-leave-to{
                transform: translateX(-80px);
                opacity: 0;
            }
            .clearyoudaoBtn-enter-to,.clearyoudaoBtn-leave{
                transform: translateX(0);
                opacity: 1;
            }
        }
        .search_input:before{
            position: absolute; left: -110px; top: 0;
            width: 100px;
            height: 40px;
            text-align: right;
            content: 'youdao';
        }
        .user_header{
            position: absolute; right: 100px;top: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            background: rgb(90, 90, 90);
            border: 1px solid rgb(72, 1, 100);
            cursor: pointer;
            .user_nickname{
                position: absolute; left: -80px; top: 40px;
                width: 200px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 10px;
            }
            img{
                position: absolute; top: 0; left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .exit_login{
            position: absolute; right: 50px; top: 15px;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 15px;
            background: rgb(131, 47, 187);
            border-radius: 10px;
            cursor: pointer;
        }
    }
    footer{
        position: fixed; left: 5vw; bottom: 5vw;
        width: 80px;
        height: 80px;
        z-index: 3;
        .list{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color:white;
            font-size: 3vh;
            border-radius: 50%;
            box-shadow: 0 0 20px white;
            transition: all .3s;
            cursor: pointer;
            z-index: 3;
            .list_hide{
                position: absolute;left: 0;top: 0;
                padding-left: 80px;
                width: 0px;
                height: 80px;
                transition: all .4s;
                border-radius: 40px;
                box-shadow:  0 0 5px greenyellow;
                overflow: hidden;
                li{
                    float: left;
                    margin: 10px 0 0 10px;
                    width: 60px;
                    height: 60px;
                    font-size: 20px;
                    text-align: center;
                    line-height: 60px;
                    border-radius: 50%;
                    box-shadow: 0 0 5px white;
                    transition: all .3s;
                }
                li:hover{
                    font-size: 25px;
                    color: greenyellow;
                   box-shadow: 0 0 10px yellowgreen;
                }
                li.current{
                    font-size: 25px;
                    color: rgb(60, 255, 0);
                    box-shadow: 0 0 10px yellowgreen;
                }
            }
           
        }
        .list:hover{
            color: rgb(32, 255, 170);
            box-shadow: 0 0 30px rgb(32, 255, 170);
        }
        .list:hover .list_hide{
            width: 305px;
        }
    }
    .index_video{
    position: absolute; left: 0; top : 50%;
    transform : translate(0,-50%);
    width: 450px;
    height: 450px;
    z-index: -1;
    }
    .confirm_exitMask{
        position: fixed; top: 0; left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 5;
        .confirm_exit{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 500px;
            height: 400px;
            text-align: center;
            line-height: 350px;
            background: #000;
            font-size: 25px;
            color: white;
            border: 3px solid pink;
            box-shadow:  0 0 20px pink;
            border-radius: 10px;
            text-shadow: 0 0 15px rgb(221, 87, 255);
            .close{
                position: absolute; right: 10px; top: 10px;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border-radius: 50%;
                background: rgb(190, 0, 0);
                cursor: pointer;
                transition: all .3s;
            }
            .close:hover{
                font-size: 40px;
            }
            .confirm,.cancel{
                position: absolute; bottom: 80px; left: 50%;
                margin: 0 0 0 -180px;
                width: 150px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background: rgb(0, 183, 255);
                border-radius: 8px;
            }
            .cancel{
                margin: 0 0 0 30px;
                background: red;
            }
            .confirm:hover,.cancel:hover{
                box-shadow: 0 0 30px white;
            }
        }
    }
}
@keyframes isloading {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>