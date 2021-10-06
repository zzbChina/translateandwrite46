<template>
  <div class="fans_detail_panel">
    <div class="close" @click="$router.back()">close</div>
    <div class="fans_panel">
      <div class="fans_info">
        <div class="headImage">
          <img :src="fans.user.user_headImage" alt="">
        </div>
        <div class="nickname">{{fans.user.user_nickname}}</div>
        <div class="gender">
            <div class="male" v-if="fans.user.user_gender == 'male' "></div>
            <div class="female" v-if="fans.user.user_gender == 'female' "></div>
        </div>
        <div class="recommend">{{fans.user.user_recommend}}</div>
        <div class="github">
          <div class="image"></div>
          <div class="url">{{fans.user.github_url}}</div>
        </div>
      </div>

      <!-- 他的作品板块 -->
      <div class="fans_translate_panel">
        <ul>
          <li v-for="(t,index) in fans.translates" :key="t.id">
            <div class="title">{{t.ut_title}}</div>
            <button @click="inTranslate(index)">in</button>
          </li>
        </ul>
      </div>
      <div class="fans_write_panel">
        <ul>
          <li v-for="(w,index) in fans.writes" :key="w.id">
            <div class="title">{{w.uw_title}}</div>
            <button @click="inWrite(index)">in</button>
          </li>
        </ul>
      </div>
    </div>
    <!-- 进入写作翻译作品面板 -->
    <router-view
      :opusDtail='opusDtail'
    />
  </div>
</template>

<script>
export default {
    name :'MyFansDetail',
    props : ['my','fansPhone'],
    data(){
      return {
        fans:{
          user: '',
          translates: '',
          writes : ''
        },
        //粉丝或者关注的作品详情
        opusDtail:{
          type:'',
          data:''
        }
      }
    },
    methods:{
      //进入翻译板块
      inTranslate(index){
        this.opusDtail.type = 'translate'
        this.opusDtail.data = this.fans.translates[index]
        this.$router.push('/individual/my_fans/fans_index/fans_translateAndWrite')
      },
      //进入写作板块
      inWrite(index){
        this.opusDtail.type = 'write'
        this.opusDtail.data = this.fans.writes[index]
        this.$router.push('/individual/my_fans/fans_index/fans_translateAndWrite')
      }
    },
    mounted(){
      let msg = 'user_phone=' + this.fansPhone
      this.$http.post('/intoFansIndex',msg).then(
        response=>{
          if(response.data.code == 200){
            console.log(response.data)
            this.fans.user = response.data.data.user[0]
            this.fans.user.user_headImage = require('../../assets/headImage/' + response.data.data.user[0].user_headImage)
            this.fans.translates = response.data.data.translates
            this.fans.writes = response.data.data.writes
          }else{
            console.log(response.data)
          }
        },
        error=>{
          console.log(error.message)
        }
      )
    }
}
</script>

<style lang='less'>
.fans_detail_panel{
  position: absolute; top: 0;left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.781);
  border-radius: 10px;
  z-index: 10;
  .close{
    position: absolute; right: 30px; top: 30px;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    background: rgb(182, 0, 0);
    cursor: pointer;
    transition: all .2s;
  }
  .close:hover{
    background: red;
  }
  .fans_panel{
    position: absolute; top: 30px; left: 30px;
    width: 900px;
    height: 440px;
    .fans_info{
      position: absolute; top: 0;left: 0;
      width: 100%;
      height: 100%;
      .headImage{
        position: absolute; left: 30px; top: 30px;
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid red;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .nickname{
        position: absolute; left: 140px;top: 40px;
        width: 250px;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid rgb(255, 251, 0);
      }
      .gender{
        position: absolute; left: 350px; top: 40px;
        width: 40px;
        height: 40px;
        user-select: none;
          .male,.female{
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 8px;
            background: rgb(0, 183, 255);
          }
          .female{
            background: red;
          }
      }
      .recommend{
        position: absolute; top: 150px; left: 40px;
        width: 380px;
        height: 120px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 2px solid rgb(0, 253, 232);
      }
      .github{
        position: absolute; top: 280px; left: 40px;
        width: 380px;
        height: 60px;
        border-bottom: 2px solid rgb(212, 0, 255);
        .image{
          position: absolute; top: 0; left: 0;
          width: 60px;
          height: 60px;
          font-size: 40px;
          text-align: center;
          line-height: 60px;
          color: rgb(212, 0, 255);
          text-shadow: 0 0 20px rgb(212, 0, 255);
          user-select: none;
        }
        .url{
          position: absolute; top: 0;left: 60px;
          width: 320px;
          height: 60px;
          font-size: 15px;
          line-height: 60px;
        }
      }
    }
    .fans_translate_panel,.fans_write_panel{
      position: absolute; left: 480px; top: 35px;
      width: 350px;
      height: 170px;
      border-radius: 10px;
      border: 3px solid rgb(21, 255, 0);
      box-shadow: 0 0 40px rgb(21, 255, 0);
      background: rgb(0, 0, 0);
      ul{
        position: absolute;top: 0; left: 0;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
          li{
            position: relative;
            margin: 20px 0 0 25px;
            width: 300px;
            height: 40px;
            border: 2px solid;
            border-radius: 10px;
            box-shadow: 0 0 20px rgb(103, 194, 0);
            cursor: pointer;
            user-select: none;
              .title{
                margin-left: 8px;
                width: 200px;
                height: 40px;
                line-height: 40px;
              }
              button{
                display: none;
                position: absolute;right: 10px; top: 5px;
                width: 50px;
                height: 30px;
                border-radius: 10px;
                background: rgb(53, 187, 0);
              }
              button:hover{
                background: rgb(72, 255, 0);
              }
          }
          li:hover{
            box-shadow: 0 0 30px rgb(255, 116, 24);
          }
          li:hover button{
            display: block;
          }
      }
      ul::-webkit-scrollbar{
        width: 10px;
        background: rgba(143, 143, 143,0.1);
      }
      ul::-webkit-scrollbar-thumb{
        background: red;
        border-radius: 5px;
      }
    }
    .fans_write_panel{
      border-color: rgb(0, 183, 255);
      box-shadow: 0 0 40px rgb(0, 183, 255);
      top: 235px;
        ul{
          li{
            border-color: yellow;
              button{
                background: rgb(0, 151, 211);
              }
              button:hover{
                background: skyblue;
              }
          }
        }
    }
  }

}
</style>