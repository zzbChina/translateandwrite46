<template>
  <div class="write">
    <div class="detail_message">
      <div class="user_head"></div>
      <div class="author_name">{{detailW.w_author}}</div>
      <div class="follow_author" v-show="!(user.user_nickname == detailW.w_author)"> follow</div>
       <div class="write_time"><span style="color:rgb(0, 183, 255)">Time</span> {{detailW.w_time}}</div>
       <div class="write_details">{{detailW.w_title}}</div>
       <div class="write_join" @click="join">join</div>
    </div>
    <div class="write_list">
      <ul>
        <li v-for="w in writes" :key="w.id" @click="checkDetail(w.id)">
          <div class="write_title">{{w.w_title}}</div>
          <div class="level">{{w.w_level}}</div>
          <div class="user_answer">
            <span @click="inUserAnswer(w.id)"></span>
          </div>
        </li>
      </ul>
    </div>

    <router-view
      :user='user'
      :detailW = 'detailW'
      :user_writes = 'user_writes'
    />
  </div>
</template>

<script>
export default {
    name : 'Write',
    props : ['user'],
    data(){
      return{
        writes : [], //存储写作数据

        detailW : {},

        user_writes : [] //用户答案数据
      }
    },
    methods:{
      //进入翻译面板
      join(){ 
        if(this.user.user_status != 'true'){
          this.$bus.$emit('showAlert','please login in first')
        }else if(this.detailW.id == undefined){
          this.$bus.$emit('showAlert','no target is selected')
        }else{
          this.$router.push('/write/write_detail')
        }
      },
      //查看选中数据
      checkDetail(id){
        this.writes.forEach((w)=>{
          if(w.id == id){
            this.detailW = w
            this.detailW.w_time = JSON.stringify(w.w_time).slice(1,16)
          }
        })
      },
      //进入用户提交答案面板
      inUserAnswer(id){
        if(this.user.user_status != 'true'){
          this.$bus.$emit('showAlert','please login in first')
        }else{
          this.$http.get(`/checkUserWrite?uw_writeId=${id}`).then(
            response=>{
              this.user_writes = response.data
              this.$router.push('/write/write_user')
            },
            error=>{
              console.log(error.message)
            }
          )
        }
      }
    },
    mounted(){
      this.$http.get('/getAllWrite').then(
        response=>{
          this.writes = response.data
        },
        error=>{
          console.log(error.message)
        }
      )

      this.$bus.$emit('changeNav','write')

      //进入write面板路由
        let routerInfo = {
            router:'write',
            data:true
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    },
    beforeDestroy(){
      //离开write面板路由
        let routerInfo = {
            router:'write',
            data:false
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    }
}
</script>

<style lang='less'>
.write{
    position: absolute; top: 120px ;left: 0;
    margin: 0 0 0 480px;
    width: 900px;
    height: 500px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 30px rgb(17, 188, 255);
    border: 3px solid rgb(17, 188, 255);
    .detail_message{
      position: relative;
      box-sizing: border-box;
      position: absolute; top: 15px; left: 15px;
      width: 300px;
      height: 470px;
      user-select: none;
      border: 2px solid rgb(0, 134, 187);
      border-radius: 10px;
      .user_head{
        position: absolute; top: 20px ; left: 20px;
        width: 80px;
        height: 80px;
        border: 3px solid rgb(0, 134, 187);
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
        color:rgb(0, 183, 255);
      }
      .follow_author{
        position: absolute; left: 20px; top: 130px;
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 38px;
        color: rgb(0, 134, 187);
        border: 2px solid rgb(0, 134, 187);
        border-radius: 5px;
        cursor: pointer;
      }
      .follow_author:hover{
        color: rgb(0, 183, 255);
        border-color: rgb(0, 183, 255);
        box-shadow:  0 0 10px rgb(0, 183, 255);
      }
      .write_time{
        position: absolute; left:20px;top: 200px;
        width: 260px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid rgb(0, 134, 187);
      }
      .write_details{
        position: absolute; top: 280px; left: 20px;
        box-sizing: border-box;
        width: 260px;
        height: 100px;
        border: 2px solid rgb(0, 134, 187);
        border-radius: 8px;
        // overflow: hidden;
      }
      .write_details::before{
        position: absolute; top: -30px; left: 0;
        content: 'Tetails';
        width: 50px;
        height: 20px;
        color: rgb(0, 183, 255);
      }
      .write_join{
        position: absolute; top: 400px; left: 20px;
        width: 260px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: rgb(0, 134, 187);
        border-radius: 10px;
        cursor: pointer;
        transition: all .2s;
      }
      .write_join:hover{
        background: rgb(0, 183, 255);
      }
    }
    .write_list{
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
          border: 2px solid rgb(239, 255, 17);
          border-radius: 5px;
          box-shadow: 0 0 5px rgb(239, 255, 17);
          cursor: pointer;
          .write_title{
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
              color: rgb(0, 183, 255);
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
          box-shadow: 0 0 20px rgb(239, 255, 17);
        }
      } 
      ul::-webkit-scrollbar{
        width: 10px;
      } 
      ul::-webkit-scrollbar-thumb{
        margin-right: 5px;
        background: rgb(17, 188, 255);//设置滑动条颜色
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
      .like_up{
        position: absolute; left: 10px; top: 10px;
        box-sizing: border-box;
        width: 60px;
        height: 130px;
        border-radius: 8px;
        border: 3px solid rgb(0, 255, 0);
      }
      .like_down{
        position: absolute; left: 10px; top: 160px;
        box-sizing: border-box;
        width: 60px;
        height: 130px;
        border-radius: 8px;
        border: 3px solid rgb(0, 255, 0);   
      }
    }
    
}
</style>