<template>
  <div class="individual">
      <div class="user">
          <div class="headImage">
              <!-- <span class="init" title="set your headimage" ></span> -->
              <img :src="headerUrl" alt="" @click="setMyHeadImage">
          </div>
          <div class="detail_info" @click="myDetailInfo"></div>
          <div class="nickname">{{user.user_nickname}}</div>
          <div class="recommend">{{user.user_recommend}}
              <textarea v-show="isWriteRecommend" v-model="my.recommend"></textarea>
          </div>
          <div class="rewrite_recommend" @click="writeYourRecommend"></div>
          <div class="fans" title="your follwers" @click="yourFans"></div>
          <div class="received" title="received" @click="myReceivedComments"></div>
          <div class="your_like" title="your like" @click="myLikes"></div>
          <div class="github" title="your github" @click="openMyGithub"></div>
      </div>
      <div class="trophy"></div>
      <div class="individual_translate">
          <div class="topic">translate</div>
          <ul>
              <li v-for="(t,index) in my.translateMaterial" :key="t.id">
                  {{t.ut_title}}
                  <div class="read" @click="showMyTranslateAnswer(index)"></div>
              </li>
          </ul>
          <div class="show_empty" v-show="my.translateMaterial == '' "></div>
          <button v-show="my.translateMaterial == '' " @click="goToOffer(1)">ADD</button>
      </div>
      <div class="individual_write">
          <div class="topic">write</div>
          <ul>
              <li v-for="(w,index) in my.writeMaterial" :key="w.id">
                  {{w.uw_title}}
                  <div class="read" @click="showMyWriteAnswer(index)"></div>
              </li>
          </ul>
          <div class="show_empty" v-show="my.writeMaterial == '' "></div>
          <button v-show="my.writeMaterial == ''" @click="goToOffer(2)">ADD</button>
      </div>

      <!-- 子路由 -->
      <router-view
        :user='user'
        :my = 'my'
        :showMyAnswerId = 'showMyAnswerId'
      />
  </div>
</template>

<script>
import 'animate.css'
export default {
    name : 'Individual',
    props : ['user'],
    data(){
        return {
            my:{
                translateMaterial : [],
                writeMaterial : [],
                recommend : '',
                fans : []
            },
            isWriteRecommend : false,

            showMyAnswerId : {
                id : '',
                type :''
            },

            headerUrl : require('../../assets/headImage/noheader.jpg')
        }
    },
    methods:{
        //打开我的github面板
        openMyGithub(){
            this.$router.push('/individual/my_github')
        },
        //编写你的简介
        writeYourRecommend(){
            if(this.isWriteRecommend){
                this.isWriteRecommend = false
                if(this.my.recommend.length <=5){
                    this.$bus.$emit('showAlert','your recommend is too short')
                }else if(this.my.recommend >= 50){
                    this.$bus.$emit('showAlert','your recommend is too long')
                }else{
                    this.$http.get(`/updateMyRecommend?user_recommend=${this.my.recommend}&user_phone=${this.user.user_phone}`).then(
                        response=>{
                            if(response.data == 'ok'){
                                this.$bus.$emit('updateMyRecommend',this.my.recommend) // 同步更新我的简介数据
                                this.$bus.$emit('showPrompt','your recommend is updated')
                                this.my.recommend = ''
                            }else{
                                this.$bus.$emit('showAlert','database is going wrong')
                            }
                        },
                        error=>{
                            console.log(error.message)
                        }
                    )
                }
            }else{
                this.isWriteRecommend = true
            }
        },
        //跳转到offer界面
        goToOffer(val){
            if(val == '1'){
                this.$router.push('/transilate')
            }else{
                this.$router.push('/write')
            }
        },
        //查看自己的粉丝
        yourFans(){
            let info = 'user_phone=' + this.user.user_phone
            this.$http.post('/checkMyFans',info).then(
                response=>{
                    this.my.fans = response.data
                    this.$router.push('/individual/my_fans')
                },
                error=>{
                    console.log(error.message)
                }
            )
        },
        //展示我的翻译答案
        showMyTranslateAnswer(id){
            this.showMyAnswerId.id = id
            this.showMyAnswerId.type = 'translate'
            this.$router.push('/individual/my_answer')
        },
        showMyWriteAnswer(id){
            this.showMyAnswerId.id = id
            this.showMyAnswerId.type = 'write'
            this.$router.push('/individual/my_answer')        
        },
        //查看我收到的评论
        myReceivedComments(){
            this.$router.push('/individual/my_received');
        },
        //点开我的详细信息页
        myDetailInfo(){
            if(this.user.user_status != 'true'){
                this.$bus.$emit('showAlert','please login first')
                this.$bus.$emit('openLoginMask') //打开登录面板遮罩层
                this.$router.push('/login')
            }else{
                this.$router.push('/individual/my_detailInfo')
            }
        },
        //打开我的喜欢
        myLikes(){
            if(this.user.user_status != 'true'){
                this.$bus.$emit('please login first')
                
            }else{
                this.$router.push('/individual/my_likes')
            }
        },
        setMyHeadImage(){
            if(this.user.user_status != 'true'){
                this.$bus.$emit('showAlert','please login first')
            }else{
                this.$router.push('/individual/set_headImage')
            }
        },
    },
    mounted(){
        //获取自己提供的翻译答案数据
        let Tmsg = 'user_phone=' + this.user.user_phone
        this.$http.post('/getMyTranslateData',Tmsg).then(
            response=>{
                if(response.data == 'no'){
                    console.log('there is no data')
                }else{
                    this.my.translateMaterial = response.data
                    // for(let i of this.my.translateMaterial){
                    //     i.ut_content = JSON.stringify(i.ut_content).slice(1,20) + '...'
                    // }
                }
            },
            error=>{
                console.log(error.message)
            }
        )
        //获取自己提供的写作答案数据
        let Wmsg = 'user_phone=' + this.user.user_phone
        this.$http.post('/getMyWriteData',Wmsg).then(
            response=>{
                if(response.data == 'no'){
                    console.log('there is no data')
                }else{
                    this.my.writeMaterial = response.data
                    // for(let w of this.my.writeMaterial){
                    //     w.uw_content = JSON.stringify().slice(1,20) + '...'
                    // }
                }
            },
            error=>{
                console.log(error.message)
            }
        )

        //获得自己的头像
        this.headerUrl = require('../../assets/headImage/' + this.user.user_headImage)
        console.log(this.headerUrl)

        //进入个人面板路由
        let routerInfo = {
            router:'individual',
            data:true
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    },
    beforeDestroy(){
        //离开个人面板路由
        let routerInfo = {
            router:'individual',
            data:false
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    }
}
</script>

<style lang='less'>
.individual{
    position: absolute; top: 120px ;left: 0;
    margin: 0 0 0 200px;
    width: 1200px;
    height: 500px;
    // user-select: none;
    background: rgba(0, 0, 0, 0.856);
    border: 3px solid rgb(255, 0, 255);
    border-radius: 15px;
    box-shadow:  0 0 10px pink;
    .user{
        width: 350px;
        height: 460px;
        user-select: none;
        position: absolute; top: 20px; left: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 3px solid purple;
        .headImage{
            position: absolute; top: 20px; left: 20px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid rgb(255, 0, 255);
            .init{
                display: inline-block;
                width: 100px;
                text-align: center;
                line-height: 100px;
                color: rgb(195, 0, 255);
                font-size: 25px;
                text-shadow: 0 0 20px white;
                cursor: pointer;
            }
            img{
                position: absolute; top: 0; left: 0;
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        }
        .detail_info{
            position: absolute; right: 20px; top: 20px;
            box-sizing: border-box;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            color: yellowgreen;
            border: 2px solid yellowgreen;
            cursor: pointer;
        }
        .detail_info:hover{
            color: rgb(170, 255, 0);
            border: 2px solid rgb(170, 255, 0);
        }
        .nickname {
            width: 180px;
            height: 40px;
            position: absolute; top: 60px; left: 150px;
            line-height: 40px;
            border-bottom: 2px solid pink;
        }
        .nickname:after{
            content: 'Nickname';
            width: 100px;
            height: 40px;
            position: absolute; top: -40px;left: 0;
            line-height: 40px;
        }
        .recommend{
            position: absolute; top: 200px; left: 20px;
            width: 300px;
            height: 160px;
            box-sizing: border-box;
            border-radius: 6px;
            border: 2px solid yellow;
            textarea{
                position: absolute; top: 0; left: 0;
                width: 296px;
                height: 156px;
                resize: none;
                border: 0;
                border-radius: 5px;
                text-indent: 14px;
                background: rgb(48, 48, 48);
            }
            textarea:focus{
                outline: 0;
            }
        }
        .recommend:after{
             content: 'your recommend';
            position: absolute; top: -40px; left: 0;
            width: 250px;
            height: 40px;
            line-height: 40px;
        }
        .rewrite_recommend{
            position: absolute; right: 30px; top: 170px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 15px;
            cursor: pointer;
            border: 1px solid yellow;
            border-radius: 2px;
        }
        .fans,.received,.your_like,.github{
            position: absolute; bottom: 20px; left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            color: skyblue;
            border: 2px solid skyblue;
            box-shadow:  0 0 5px skyblue;
            cursor: pointer;
            transition: all .2s;
        }
        .received{
            color: greenyellow;
            left: 100px;
            border-color: greenyellow;
            box-shadow:  0 0 5px greenyellow;
        }
        .your_like{
            color: red;
            left: 180px;
            border-color: red;
            box-shadow:  0 0 5px red;
        }
        .github{
            color: rgb(230, 0, 230);
            left: 260px;
            font-size: 30px;
            border-color: rgb(230, 0, 230);
            box-shadow: 0 0 5px rgb(230, 0, 230);
        }
        .fans:hover,.received:hover,.your_like:hover,.github:hover{
            box-shadow: 0 0 50px;
        }
    }   
    .trophy{
        position: absolute; left: 400px; top: 20px;
        width: 760px;
        height: 100px;
        border: 2px solid yellow;
        border-radius: 10px;
    }
    .individual_translate,.individual_write{
        position: absolute; left: 400px; top: 150px;
        width: 360px;
        height: 320px;
        border: 2px solid rgb(0, 255, 0);
        border-radius: 10px;
        .show_empty{
            position: absolute; left: 50%; top : 30%;
            transform : translate(-50%,-50%);
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            font-size: 80px;
            color: rgb(255, 112, 17);
        }
        .show_empty:after{
            position: absolute; bottom: -40px; left: -40px;
            width: 160px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: rgb(255, 112, 17);
            font-size: 18px;
            content: 'There is empty';
        }
        .topic{
            position: absolute; top: 0; left: 50%;
            margin: 0 0 0 -50px;
            width: 100px;
            height: 20px;
            font-size: 20px;
            user-select: none;
            text-align: center;
        }
        ul{
            margin: 20px 0 0 0;
            width: 100%;
            height: 300px;
            overflow-y: scroll;
            overflow-x: hidden;
            li{
                position: relative;
                margin: 20px 0 0 30px;
                width: 300px;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                user-select: none;
                border: 2px solid rgb(187, 90, 0);
                cursor: pointer;
                .read{
                    display: none;
                    position: absolute; right: 10px; top: 5px;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    background: rgb(38, 179, 3);
                    border-radius: 5px;
                    transition: all .2s;
                }
            }
            li:hover{
                border-color: rgb(255, 123, 0);
                box-shadow:  0 0 10px rgb(255, 123, 0);
                .read{
                    display: block;
                }
                .read:hover{
                    background: rgb(51, 255, 0);
                }
            }
        }
        button{
            position: absolute; left: 50%; top : 70%;
            transform : translate(-50%,-50%);
            width: 150px;
            height: 40px;
            background: rgb(255, 123, 0);
            border-radius: 10px;
            transition: all .3s;
            color: rgb(77, 46, 0);
        }
        button:hover{
            background: rgb(255, 123, 0);
            box-shadow: 0 0 15px rgb(255, 123, 0);
        }
        ul::-webkit-scrollbar{
            width: 5px;
        } 
        ul::-webkit-scrollbar-thumb{
            margin-right: 5px;
            background: rgb(104, 255, 17);//设置滑动条颜色
            border-radius: 6px;//设置滑动条边角
        }
        ul::-webkit-scrollbar-track-piece{
            background: rgba(0, 0, 0 ,0);//设置滑动条的容器的背景   
        } 
    }
    .individual_write{
        left: 800px;
        border-color: rgb(0, 183, 255);
        .show_empty{
            position: absolute; left: 50%; top : 30%;
            transform : translate(-50%,-50%);
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            font-size: 80px;
            color: rgb(255, 243, 71);
        }
        .show_empty:after{
            position: absolute; bottom: -40px; left: -40px;
            width: 160px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: yellow;
            font-size: 18px;
            content: 'There is empty';
        }
        button{
            position: absolute; left: 50%; top : 70%;
            transform : translate(-50%,-50%);
            width: 150px;
            height: 40px;
            background: yellow;
            border-radius: 10px;
            transition: all .3s;
        }
        button:hover{
            background: rgb(255, 255, 146);
            box-shadow: 0 0 15px rgb(255, 255, 146);
        }
    }
    
}
</style>