<template>
  <div class="my_received">
      <div class="back" @click="$router.back()">back</div>
      <button class="toggleBtn">
          <span @click="toggleMyComment"></span>
      </button>
      <div class="title" v-show="!isShowMyComments">My Received</div>
      <div class="comment_list" v-show="!isShowMyComments" >
          <ul>
              <li v-for="c in comments" :key="c.id">
                  <div class="user_info">
                      <div class="nickname">{{c.target_title}}-->{{c.user_nickname}}</div>
                      <div class="time">{{c.comment_time}}</div>
                  </div>
                  <div class="user_comment">
                      {{c.user_comment}}
                  </div>
              </li>
          </ul>
      </div>

      <div class="my_title" v-show="isShowMyComments">My Comment</div>
      <div class="my_comment_list" v-show="isShowMyComments">
          <ul>
              <li v-for="(c,index) in my_comments" :key="c.id">
                  <div class="user_info">
                    <div class="nickname">回复 : {{c.target_nickname}}</div>
                    <div class="time">{{c.comment_time}}</div>
                    <div class="deleteIt" @click="deleteMyComment(index)" title="delete"></div>
                  </div>
                  <div class="user_comment">
                       {{c.user_comment}}
                  </div>
                  
              </li> 
          </ul>
      </div>
      <div class="comment_number" v-if="!isShowMyComments">There are <span>{{comments.length}}</span> comments</div>
      <div class="my_comment_number" v-if="isShowMyComments">There are <span>{{my_comments.length}}</span> comments</div>
  </div>
</template>

<script>
export default {
    name : 'MyReceivedComment',
    props : ['user'],
    data(){
        return {
            comments:[],
            my_comments:[],

            isShowMyComments : false
        }
    },
    methods:{
        //切换到我的评论去
        toggleMyComment(){
            if(this.isShowMyComments == false){
                this.isShowMyComments = true
                if(this.my_comments == ''){
                    let info = 'user_phone=' + this.user.user_phone
                    this.$http.post('/getAllAboutMyCommentOthers',info).then(
                        response=>{
                            this.my_comments = response.data.data
                            console.log(response.data.data)
                        },
                        error=>{
                            console.log(error.message)
                        }
                    )
                }
            }else{
                this.isShowMyComments = false
            }
        },
        //删除我的评论
        deleteMyComment(index){
            let msg = 'id=' + parseInt(this.my_comments[index].id)  + '&' + 'user_phone=' + this.user.user_phone
            this.$http.post('/deleteMyComment',msg).then(
                response=>{
                    if(response.data.status){
                        this.$bus.$emit('showPrompt','delete successfully!')
                    }else{
                        this.$bus.$emit('showAlert','delete failed!')
                    }
                },
                error=>{
                    this.$bus.$emit('showAlert','error')
                    console.log(error.message)
                }
            )
        }
    },
    mounted(){
        //获取所有关于我的评论的请求
        let info = 'target_phone=' + this.user.user_phone
        this.$http.post('/getAllAboutMeComment',info).then(
            response=>{
                if(response.data != 'no'){
                    this.comments = response.data
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
.my_received{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
    .back{
        position: absolute; top:30px; left: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(28, 167, 0);
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
    }
    .back:hover{
        background: rgb(43, 255, 0);
    }
    .toggleBtn{
        position: absolute; right: 30px; top: 30px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background: rgb(230, 130, 0);
        transition: all .3s;
        user-select: none;
        span{
            display: inline-block;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            transition: all .3s;
        }
        span:hover{
            color: rgb(94, 64, 0);
            transform: rotate(180deg);
        }
    }
    .title,.my_title{
        position: absolute; top: 30px; left: 50%;
        width: 200px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 26px;
        text-shadow: 0 0 10px white;
        margin: 0 0 0 -100px;
    }
    .comment_list,.my_comment_list{
        position: absolute; top: 90px;left: 50%;
        width: 1000px;
        height: 300px;
        background: rgb(0, 0, 0);
        margin: 0 0 0 -500px;
        ul{
            width: 100%;
            height: 280px;
            padding: 0 0 20px 0;
            overflow-y: scroll;
            overflow-x: hidden;
            border: 2px solid rgb(0, 211, 0);
            border-radius: 10px;
            box-shadow: 0 0 20px greenyellow;
            li{
                margin: 30px 0 0 100px;
                width: 800px;
                background: rgb(19, 19, 19);
                border: 2px solid yellow;
                border-radius: 5px;
                .user_info{
                    position: relative;
                    width: 80px;
                    height: 40px;
                    .nickname{
                        margin: 0 0 0 30px;
                        width: 300px;
                        height: 40px;
                        line-height: 40px;
                        font-size: 22px;
                    }
                    .time{
                        position: absolute; left:500px;top: 0;
                        width: 200px;
                        height: 40px;
                        text-align: left;
                        line-height: 40px;
                    }
                    .deleteIt{
                        position: absolute; left: 700px; top: 5px;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        user-select: none;
                        background: darkred;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .deleteIt:hover{
                        background: red;
                    }
                }
                .user_comment{
                    width: 700px;
                    font-size: 15px;
                    line-height: 20px;
                    border-top: 1px solid rgb(51, 51, 51);
                    margin: 0 0 0 50px;
                    padding: 0 0 20px 0;
                }
            }
        }
        ul::-webkit-scrollbar{
            width: 10px;
        }
        ul::-webkit-scrollbar-thumb{
            background: green;
        }
        ul::-webkit-scrollbar-track-piece{
            background: rgba(0, 0, 0, 0);
        }
    }

    .comment_number,.my_comment_number{
        position: absolute; left: 100px;bottom: 40px;
        width: 300px;
        height: 40px;
        line-height: 40px;
        span{
            color: rgb(0, 255, 0);
            text-shadow: 0 0 5px rgb(0, 255, 0);
        }
    }

}
</style>