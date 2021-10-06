<template>
  <div class="translate_comment">
      <div class="back" @click="$router.back()">back</div>
      <div class="add_myCommend" @click="addMyComment">add</div>
      <div class="title">COMMENT</div>
      <div class="my_commend" v-show="comment.isShow">
          <textarea v-model="comment.my"></textarea>
          <button class="close" @click="comment.isShow=false">close</button>
          <button class="submit" @click="submitMyComment">submit</button>
      </div>
      <div class="all_comments">
          <ul>
              <li v-for="c in comment.all" :key="c.id">
                  <div class="user">
                      <div class="headImage"></div>
                      <div class="nickname">{{c.user_nickname}}</div>
                      <div class="time">{{c.comment_time}}</div>
                  </div>
                  <div class="comment">{{c.user_comment}}</div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name : 'UserCommentT',
    props : ['user','detailT','user_translates','commentIndex'],
    data(){
        return {
            comment:{
                isShow : false,
                my : '', //我的评论,
                all : []
            }
        }
    },
    methods:{
        addMyComment(){
            this.comment.isShow = true
        },
        //提交我的评论
        submitMyComment(){
            let date = new Date()
            let newTime = `${date.getFullYear()} ${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            let info = 'user_phone='+this.user.user_phone+'&'+'user_nickname='+this.user.user_nickname+'&'+'user_comment='+this.comment.my+'&'+
            'target_id='+this.user_translates[this.commentIndex].id + '&' + 'target_title=' + this.detailT.t_title + '&'+ 'target_phone='+this.user_translates[this.commentIndex].user_phone+'&'
            +'target_nickname='+this.user_translates[this.commentIndex].user_nickname+'&'+'comment_time='+newTime + '&' + 'type=translate'
            this.$http.post('/addMyComment',info).then(
                response=>{
                    if(response.data == 'ok'){
                        this.$bus.$emit('showPrompt','you commend')
                        let newArr = {
                            user_nickname : this.user.user_nickname,
                            comment_time : newTime,
                            user_comment : this.comment.my
                        }
                        this.comment.all.push(newArr)
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
    mounted(){
        //请求所有的该内容用户评论
        console.log(this.user_translates[this.commentIndex].id)
        this.$http.get(`/getAllUserComments?target_id=${this.user_translates[this.commentIndex].id}&type=translate`).then(
            response=>{
                if(response.data != 'no'){
                    this.comment.all = response.data
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
.translate_comment{
    // position: fixed; top: 120px ;left: 0;
    // margin: 0 0 0 480px;
    position: absolute; top: 0; left: 0;
    width: 900px;
    height: 500px;
    border-radius: 15px;
    border: 3px solid transparent;
    background: rgba(0, 0, 0, 0.8);
    .back{
        position: absolute; left: 50px; top: 20px;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(172, 0, 0);
        border-radius: 8px;
        cursor: pointer;
    }
    .back:hover{
        background: red;
    }
    .add_myCommend{
        position: absolute; right: 50px; top: 20px;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(23, 189, 255);
        border-radius: 8px ;
        cursor: pointer;
    }
    .add_myCommend:hover{
        background: rgb(48, 190, 255);
        box-shadow: 0 0 10px rgb(23, 189, 255);
    }
    .title{
        position: absolute; left: 200px;top: 20px;
        width: 500px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        text-shadow: 0 0 10px white;
        background: #000;
    }
    .my_commend{
        position: absolute; left: 50px; bottom: 10px;
        width: 800px;
        height: 180px;
        border-top: 2px solid greenyellow;
        animation: commend .2s ease-out 1;
        z-index: 2;
        textarea{
            position: absolute; left: 10px; top: 10px;
            width: 780px;
            height: 100px;
            resize: none;
            background: rgb(51, 51, 51);
        }
        textarea:focus{
            outline:2px solid  orange;
            box-shadow:  0 0 10px orange;
        }
        .close,.submit{
            position: absolute; right: 10px; top: 135px;
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: rgb(196, 0, 0);
        }
        .close{
            right: 180px;
        }
        .submit{
            background: rgb(16, 179, 243);
            border-radius: 10px;
        }
        .submit:hover{
            background: skyblue;
        }
        .close:hover{
            background: red;
        }
    }
    .all_comments{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 760px;
        height: 360px;
        overflow-y: scroll;
        overflow-x: hidden;
        li{
            box-sizing: border-box;
            width: 700px;
            margin: 10px 0 0 30px;
            border: 2px solid skyblue;
            border-radius: 10px;
            .user{
                position: relative;
                width: 700px;
                height: 60px;
                .headImage{
                    position: absolute; left: 10px; top: 10px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid skyblue;
                }
                .nickname{
                    position: absolute; left: 60px; top: 10px;
                    width: 300px;
                    height: 40px;
                    line-height: 40px;
                }
                .time{
                    position: absolute; right: 10px; top:10px;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                }
            }
            .comment{
                margin: 0 0 0 100px;
                width: 500px;
                height: auto;
                padding: 0 0 10px 0;
                font-size: 15px;
            }
        }
    }
    .all_comments::-webkit-scrollbar{
        width: 6px;
        height: 300px;
        background: rgba(0, 0, 0, 0);
    } 
    .all_comments::-webkit-scrollbar-thumb{
        margin-right: 10px;
        background: rgb(99, 233, 10);//设置滑动条颜色
        border-radius: 6px;//设置滑动条边角
    }
    .all_comments::-webkit-scrollbar-track-piece{
        background: rgba(255, 13, 13, 0);//设置滑动条的容器的背景   
    }   
    @keyframes commend {
        0%{
            transform: translateY(100px);
            opacity: 0;
        }
        100%{
            transform: translateY(0);
            opacity: 1;
        }
    }
}
</style>