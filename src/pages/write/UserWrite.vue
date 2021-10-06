<template>
  <div class="write_answer">
      <div class="title">DISCUSS</div>
      <div class="close" title="close" @click="$router.back()">close</div>
      <header>Title : {{detailW.w_title}}</header>
      <main>{{detailW.w_content}}</main>
      <footer>
        <ul>
          <li v-for="(w,index) in user_writes" :key="w.id" ref="li">
            <div class="user">
              <div class="user_head"></div>
              <div class="user_nickname">{{w.user_nickname}}</div>
              <div class="user_read"  ref="read" @click="readThis(index)">read</div>
              <div class="user_comment" @click="inComment(index)"></div>
              <div class="user_like" ref="like" @click="likeThis(index)"></div>
            </div>
            <div class="user_answer" >{{w.uw_content}}</div>
          </li>
        </ul>
      </footer>

      <router-view
        :detailW='detailW'
        :user_writes='user_writes'
        :user='user'
        :commentIndex='commentIndex'
      />
  </div>
</template>

<script>
export default {
    name : 'UserWrite',
    props : ['detailW','user_writes','user'],
    data(){
      return{
        commentIndex:''
      }
    },
    methods:{
      //阅读这个用户提供的答案
      readThis(id){
        if(this.$refs.read[id].innerHTML == 'read'){
          this.$refs.read[id].innerHTML = 'retract'
          this.$refs.li[id].classList.add('active')
        }else{
          this.$refs.read[id].innerHTML = 'read'
          this.$refs.li[id].classList.remove('active')
        }
      },
      //点赞该用户答案
      likeThis(index){
        this.$http.get(`/checkThisLikeStatus?user_phone=${this.user.user_phone}&user_translate_id=null&user_write_id=${this.user_writes[index].id}&type=write`).then(
          response=>{
            if(response.data == 'no'){
                let info = 'user_nickname=' + this.user.user_nickname + '&' + 'user_phone=' + this.user.user_phone + '&'
                + 'translate_id=null' + '&' + 'user_translate_id=null' + '&' + 'write_id=' + this.detailW.id + '&'
                + 'user_write_id=' + this.user_writes[index].id + '&' + 'type=write'
                this.$http.post('/likeThisAnswer',info).then(
                  response=>{
                    if(response.data == 'ok'){
                        this.$refs.like[index].style.color = 'red'
                        this.$bus.$emit('showPrompt','like successfully')
                    }else{
                        this.$bus.$emit('showAlert','there is going wrong')
                    }
                  },
                  error=>{
                    console.log(error.message)
                  }
                )
            }else{
              let msg = {
                user_phone : this.user.user_phone,
                user_translate_id : null,
                user_write_id : this.user_writes[index].id,
                type : 'write',
              }
              this.$bus.$emit('showCancelLike',msg)             
            }

          },
          error=>{
            console.log(error.message)
          }
        )        
      },
      //进入评论板块
      inComment(index){
        this.$router.push('/write/write_user/write_comment');
        this.commentIndex = index//将对应的的用户答案的index值传递过去
      }
    },
    mounted(){
      //添加自定义属性
      for(let i=0;i<this.user_writes.length;i++){
        this.user_writes[i]['index'] = i
      }
      //检查当前翻译材料用户点赞状态
      this.$http.get(`/checkUserLikeStatus?user_phone=${this.user.user_phone}&translate_id=null&write_id=${this.detailW.id}&type=write`).then(
        response=>{
          if(response.data.code == 200){
              this.user_writes.forEach((t)=>{
                  for(let i=0;i<response.data.data.length;i++){
                    if(t.id == response.data.data[i].user_write_id){
                      this.$refs.like[t.index].style.color = 'red'
                    }
                  }
              })
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
.write_answer{
  position: absolute; top: 0; left: 0;
  width: 900px;
  height: 500px;
  background: rgb(31, 31, 31);
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  .title{
    position: absolute;top: 10px; left: 300px;
    width: 300px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 28px;
    text-shadow: 0 0 10px white;
  }
  .close{
    position: absolute; top: 20px; right: 30px;
    width: 140px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: rgb(255, 136, 0);
    border-radius: 10px;
    cursor: pointer;
  }
  .close:hover{
    background: rgb(255, 174, 0);
  }
  header{
    margin: 60px 0 0 30px;
    width: 840px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid greenyellow;
  }
  main{
    margin: 10px 0 0 30px;
    box-sizing: border-box;
    padding: 10px 10px;
    width: 820px;
    border-radius: 10px;
    border: 2px solid greenyellow;
  }
  footer{
    position: relative;
    margin: 50px 0 0 30px;
    width: 840px;
    border-top: 2px solid greenyellow;
    li{
      margin: 15px 0 15px 20px;
      box-sizing: border-box;
      width: 800px;
      height: 65px;
      border-radius: 10px;
      border: 1px solid rgb(255, 173, 20);
      box-shadow: 0 0 10px rgb(255, 173, 20);
      transition: all .3s;
      overflow: hidden;
      .user{
        position: relative;
        width: 800px;
        height: 65px;
        .user_head{
          position: absolute; top: 5px;left: 10px;
          box-sizing: border-box;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgb(255, 173, 20);
        }
        .user_nickname{
          margin: 0 0 0 75px;
          width: 200px;
          height: 65px;
          line-height: 50px;
        }
        .user_read{
          position: absolute; right: 130px;top: 15px;
          width: 100px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: 8px;
          background: rgb(255, 136, 0);
          cursor: pointer;
        }
        .user_read:hover{
          background: rgb(255, 174, 0);
        }
        .user_comment{
          position: absolute; right: 75px; top: 15px;
          width: 35px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          color: skyblue;
          cursor: pointer;
        }
        .user_like{
          position: absolute; right: 20px; top: 15px;
          width: 35px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          font-size: 18px;
          color: grey;
          cursor: pointer;
        }
        .user_like.current{
          color: red;
        }
      }
      .user_answer{
        margin: 0 0 0 100px;
        padding-bottom: 10px;
        width: 600px;
        transition: all .3s;
      }
    }
    li.active{
      height: auto;
    }
  }
  footer:after{
    position: absolute; top: -30px; left: 0;
    content: 'User Answer';
    width: 200px;
    height: 20px;
    font-size: 20px;
  }
}
.write_answer::-webkit-scrollbar{
        width: 6px;
        height: 300px;
        background: rgba(0, 0, 0, 0);
} 
.write_answer::-webkit-scrollbar-thumb{
        margin-right: 10px;
        background: rgb(233, 218, 10);//设置滑动条颜色
        border-radius: 6px;//设置滑动条边角
}
.write_answer::-webkit-scrollbar-track-piece{
        background: rgba(255, 13, 13, 0);//设置滑动条的容器的背景   
}   
</style>