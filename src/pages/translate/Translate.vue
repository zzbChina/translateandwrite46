<template>
  <div class="translate">
    <div class="detail_message">
      <div class="user_head"></div>
      <div class="author_name">{{detailT.t_author}}</div>
      <div class="follow_author" v-show="!(user.user_phone == detailT.author_phone)" @click="followThisAuthor"> follow</div>
      <div class="followed_author" v-show="isFollowed"> followed</div>
      <div class="translate_time"><span style="color:rgb(104, 255, 17)">Time</span> {{detailT.t_time}}</div>
      <div class="translate_details">
        {{detailT.t_title}}
      </div>
      <div class="translate_join" @click='join'>join</div>
    </div>
    <div class="translate_list">
      <ul>
        <li v-for="t in translates" :key="t.id" :title="t.t_title" @click="checkDetail(t.id)">
          <div class="translate_title">{{t.t_title}}</div>
          <div class="user_answer">
            <span @click="inUserAnswer(t.id)"></span>
          </div>
          <div class="level">{{t.t_level}}</div>
        </li>
      </ul>
    </div>
    <transition name='animate__animated animate__bounce' enter-active-class="animate__fadeInLeft" leave-active-class="animate__fadeOutLeft">
      <div class="translate_filter" v-show="isShowFilter">
        <div class="like_up" @click="choseCET4">
          CET4
        </div>
        <div class="like_down" @click="choseCET6">CET6</div>
      </div>
    </transition>
    
    <router-view
      :user='user'
      :detailT = 'detailT'
      :user_translates = 'user_translates'
    />
  </div>
</template>

<script>
import 'animate.css'
export default {
    name : 'Translate',
    props : ['user'],
    data(){
      return {
        translates : [],

        detailT : {},

        isShowFilter : true,

        //用户翻译数据答案
        user_translates : [],

        //用户粉丝
        user_fans : [],

        isFollowed : false
      }
    },
    methods:{
      checkDetail(val){
        //查看我的粉丝
        let msg = 'fans_phone=' + this.user.user_phone
        this.$http.post('/checkMyFollowUser',msg).then(
          response=>{
            if(response.data.code == 200){
              this.user_idle = response.data.data
              this.isFollowed = false
              for(let f of this.user_idle){
                if(f.user_phone == this.detailT.author_phone){
                  this.isFollowed = true
                  break;
                }
              }
            }
          },
          error=>{
            console.log(error.message)
          }
        )
        this.translates.forEach((t)=>{
          if(t.id == val){
            this.detailT = t
            this.detailT.t_time = JSON.stringify(t.t_time).slice(1,16)
          }
        })
      },
      join(){
        if(this.user.user_status != 'true'){
          this.$bus.$emit('showAlert','please login in first')
        }else if(this.detailT.id == undefined){
          this.$bus.$emit('showAlert','you dont chose anyone')
        }else{
          this.isShowFilter = false
          this.$router.push('/translate/translate_detail')
        }
      },
      //关闭筛选区
      turnOnFiletr(value){
        if(value == 'on'){
          this.isShowFilter = true
        }else{
          this.isShowFilter = false
        }
      },
      //打开用户答案面板
      inUserAnswer(id){
        if(this.user.user_status != 'true'){
          this.$bus.$emit('showAlert','please login in first')
        }else{
          this.$http.get(`/checkUserTranslate?ut_translateId=${id}`).then(
            response=>{
              this.user_translates = response.data
              this.$router.push('/translate/translate_user')
            },
            error=>{
              console.log(error.message)
            }
          )
        }
      },
      //关注这个作者
      followThisAuthor(){
        if(this.user.user_status != 'true'){
          this.$bus.$emit('showAlert','please login first')
        }else{
          let date = new Date()
          let newDate = `${date.getFullYear()} ${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
          let msg = 'user_nickname='+ this.detailT.t_author+'&'+'user_phone='+this.detailT.author_phone+'&'+
          'fans_nickname='+this.user.user_nickname+'&'+'fans_phone='+this.user.user_phone +'&'+'focus_time='+ newDate
          this.$http.post('/followAuthor',msg).then(
            response=>{
              if(response.data == 'ok'){
                this.$bus.$emit('showPrompt','follow successfully')
                this.isFollowed = true
              }else{
                this.$bus.$emit('network is going wrong')
              }
            },
            error=>{
              console.log(error.message)
            }
          )
        }
      },
      //筛选所有CET4
      choseCET4(){
        this.$http.get('/getAllCet4Translates').then(
          response=>{
            if(response.data.code != 200){
              this.$bus.$emit('showAlert','filte failed')
            }else{
              this.translates = response.data.data
            }
          }
        )
      },
      //筛选所有CET6
      choseCET6(){
        this.$http.get('/getAllCet6Translates').then(
          response=>{
            if(response.data.code != 200){
              this.$bus.$emit('showAlert','filte failed')
            }else{
              this.translates = response.data.data
            }
          }
        )
      }
    },
    mounted() {
      this.$http.get('/getAllTranslates').then(
        response=>{
          console.log(this.translates)
          this.translates = response.data
        },
        error=>{
          console.log(error.message)
        }
      )
        //进入translate面板路由
        let routerInfo = {
            router:'translate',
            data:true
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)          

      //关闭筛选区
      this.$bus.$on('turnOnFiletr',this.turnOnFiletr)
    },
    beforeDestroy(){
        //离开translate面板路由
        let routerInfo = {
            router:'translate',
            data:false
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)     
    }
}
</script>

<style lang='less'>
.translate{
    position: absolute; top: 120px ;left: 0;
    margin: 0 0 0 480px;
    width: 900px;
    height: 500px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 30px rgb(104, 255, 17);
    border: 3px solid rgb(104, 255, 17);
    .detail_message{
      position: relative;
      box-sizing: border-box;
      position: absolute; top: 15px; left: 15px;
      width: 300px;
      height: 470px;
      user-select: none;
      border: 2px solid rgb(56, 153, 0);
      border-radius: 10px;
      .user_head{
        position: absolute; top: 20px ; left: 20px;
        width: 80px;
        height: 80px;
        border: 3px solid rgb(56, 153, 0);
        border-radius: 50%;
      }
      .author_name {
        position: absolute; left: 120px; top: 50px;
        width: 200px;
        height: 50px;
        line-height: 50px;
      }
      .author_name:before{
        position: absolute; top: -30px; left: 0;
        content: 'Author';
        width: 50px;
        height: 20px;
        font-size: 22px;
        color: rgb(0, 255, 0);
      }
      .follow_author,.followed_author{
        position: absolute; left: 20px; top: 130px;
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 38px;
        color: rgb(76, 207, 0);
        border: 2px solid rgb(56, 153, 0);
        border-radius: 5px;
        cursor: pointer;
      }
      .follow_author:hover{
        color: rgb(104, 255, 17);
        border-color: rgb(104, 255, 17);
        box-shadow:  0 0 10px rgb(104, 255, 17);
      }
      .followed_author{
        background: orange;
        border: 2px solid orange;
        color: rgb(75, 36, 0);
      }
      .translate_details{
        position: absolute; top: 280px; left: 20px;
        box-sizing: border-box;
        width: 260px;
        height: 100px;
        border: 2px solid rgb(56, 153, 0);
        border-radius: 8px;
        // overflow: hidden;
      }
      .translate_details::before{
        position: absolute; top: -30px; left: 0;
        content: 'Tetails';
        width: 50px;
        height: 20px;
        color: rgb(104, 255, 17);
      }
      .translate_time{
        position: absolute; left:20px;top: 200px;
        width: 260px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid rgb(56, 153, 0);
      }
      .translate_join{
        position: absolute; top: 400px; left: 20px;
        width: 260px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: rgb(56, 153, 0);
        border-radius: 10px;
        cursor: pointer;
        transition: all .2s;
      }
      .translate_join:hover{
        background: rgb(83, 226, 0);
      }
    }
    .translate_list{
      box-sizing: border-box;
      position: absolute; left: 330px; top:15px;
      width: 555px;
      height: 470px;
      user-select: none;
      border: 2px solid rgb(56, 153, 0);
      border-radius: 10px; 
      ul{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        li{
          position: relative;
          margin: 15px 0 0 15px;
          width: 90%;
          height: 40px;
          border: 2px solid rgb(255, 144, 17);
          border-radius: 5px;
          box-shadow: 0 0 5px rgb(255, 144, 17);
          cursor: pointer;
          .translate_title{
            margin: 0 0 0 10px;
            width: 300px;
            height: 40px;
            line-height: 40px;
          }
          .user_answer{
            position: absolute; right: 10px; top:0;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: right;
            span{
              color: rgb(104, 255, 17);
              transition: all .2s;
            }
            span:hover{
              font-size: 30px;
            }
          }
          .level{
            position: absolute; right: 100px; top: 0;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: right;
          }
        }
        li:hover{
          box-shadow: 0 0 20px rgb(255, 144, 17);
        }
      } 
      ul::-webkit-scrollbar{
        width: 10px;
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
    .translate_filter{
      position: absolute; top: 0; right: -100px;
      width: 100px;
      height: 300px;
      .like_up,.like_down{
        position: absolute; left: 10px; top: 10px;
        box-sizing: border-box;
        width: 60px;
        height: 130px;
        text-align: center;
        line-height: 130px;
        border-radius: 8px;
        border: 3px solid rgb(0, 255, 0);
        cursor: pointer;
        transition: all .2s;
      }
      .like_down{
        top: 160px;
      }
      .like_up:hover,.like_down:hover{
        background: rgb(0, 192, 10);
      }
    }
}

</style>