<template>
  <div class="my_likes">
      <div class="back" @click="$router.back()">back</div>
      <div class="my_likes_list">
          <ul class="like_translate" v-show="likes.isShowTranslate">
              <li v-for="(t,index) in likes.translates" :key="t.id">
                    <div class="title"> <span style="color:skyblue"></span>  {{t[0].ut_title}}</div>
                    <div class="content">{{t[0].ut_content}}</div>
                    <div class="read" @click="showTranslateDetail(index)">read</div>
                    <div class="delete" @click="deleteTranslateLike(index)"></div>
              </li>
          </ul>
          <ul class="like_write" v-show="!(likes.isShowTranslate)">
              <li v-for="(w,index) in likes.writes" :key="w.id">
                    <div class="title"> <span style="color:skyblue"></span>  {{w[0].uw_title}}</div>
                    <div class="content">{{w[0].uw_content}}</div>
                    <div class="read" @click="showWriteDetail(index)">read</div>
                    <div class="delete" @click="deleteWriteLike(index)"></div>
              </li>
          </ul>
      </div>
      
      <!-- 切换翻译和写作 -->
      <div class="toggle" @click="likes.isShowTranslate = !(likes.isShowTranslate)">toggle</div>


      <!-- 详细内容 -->
      <div class="detail_panel" v-show="isShowDetailPanel" @click="isShowDetailPanel = false">
            <div class="box">
                {{detailMsg}}
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'MyLikes',
    props:['user'],
    data(){
        return{
            likes:{
                translates:'',
                writes:'',
                isShowTranslate : true
            },

            //显示详细面板
            isShowDetailPanel : false,
            detailMsg : ''
        }
    },
    methods:{
        //显示翻译选项的详细
        showTranslateDetail(index){
            this.isShowDetailPanel = true
            this.detailMsg = this.likes.translates[index][0].ut_content
        },
        //显示写作选项的详细
        showWriteDetail(index){
            this.isShowDetailPanel = true
            this.detailMsg = this.likes.writes[index][0].uw_content
            console.log(this.likes.writes)
        },
        //删除翻译选项的赞
        deleteTranslateLike(index){
            let info = 'user_phone=' + this.user.user_phone + '&' + 'user_translate_id=' + this.likes.translates[index][0].id + '&' 
            + 'user_write_id=null' + '&' + 'type=translate' 
            this.$http.get(`/cancelThisLike?${info}`).then(
                response=>{
                    if(response.data.code == 200){
                        this.$bus.$emit('showPrompt','delete successfully')
                    }else{
                        this.$bus.$emit('showAlert','delete failed')
                    }
                },
                error=>{
                    console.log(error.message)
                }
            )
        },
        //删除写作选项的赞
        deleteWriteLike(index){
            let info = 'user_phone=' + this.user.user_phone + '&' + 'user_translate_id=null' + '&' 
            + 'user_write_id=' + this.likes.writes[index][0].id + '&' + 'type=write' 
            this.$http.get(`/cancelThisLike?${info}`).then(
                response=>{
                    if(response.data.code == 200){
                        this.$bus.$emit('showPrompt','delete successfully')
                    }else{
                        this.$bus.$emit('showAlert','delete failed')
                    }
                },
                error=>{
                    console.log(error.message)
                }
            )
        }
    },
    mounted(){
        //获取自己所有点赞过的翻译信息
        let info = 'user_phone=' + this.user.user_phone
        this.$http.post('/getAllMyLikeTranslateItems',info).then(
            response=>{
                if(response.data.code == 200){
                    this.likes.translates = response.data.data
                }
            },
            error=>{
                this.$bus.$emit('showAlert','something wrong happened')
                console.log(error.message)
            }
        )
        //获取自己所有点赞过的写作信息
        this.$http.post('/getAllMyLikeWriteItems',info).then(
            response=>{
                if(response.data.code == 200){
                    this.likes.writes = response.data.data
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
.my_likes{
    position: absolute; top: 0;left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
    .back{
        position: absolute; left: 30px; top: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(167, 0, 0);
        border-radius: 10px;
        user-select: none;
        transition: all .2s;
        cursor: pointer;
    }
    .back:hover{
        background: red;
    }
    .toggle{
        position: absolute; top: 30px; right: 30px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgb(212, 138, 0);
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
    }
    .toggle:hover{
        background: orange;
    }
    .my_likes_list{
        position: absolute; left: 100px; top : 80px;
        width: 1000px;
        height: 400px;
        .like_translate,.like_write{
            position: absolute; top: 0; left: 0;
            width: 1000px;
            height: 400px;
                li{
                    margin: 10px 0 15px 50px;
                    width: 900px;
                    height: 50px;
                    // height: auto;
                    line-height: 50px;
                    border-radius: 10px;
                    border: 2px solid rgb(10, 255, 63);
                    box-shadow: 0 0 30px rgb(10, 255, 63);
                        .title{
                            float: left;
                            margin:  0 0 0 10px;
                            width: 200px;
                            height: 50px;
                            line-height: 50px;
                            user-select: none;
                        }
                        .content{
                            float: left;
                            margin:  0 0 0 20px;
                            width: 450px;
                            height: 50px;
                            line-height: 50px;
                            overflow: hidden;
                        }
                        .read,.delete{
                            float: left;
                            margin: 9px 0 0 10px;
                            width: 80px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            border-radius: 8px;
                            background: orange;
                            cursor: pointer;
                            opacity: 0.8;
                            user-select: none;
                            transition: all .2s;
                        }
                        .delete{
                            background: red;
                        }
                        .read:hover,.delete:hover{
                            opacity: 1;
                        }
                }
        }
        .like_translate:after,.like_write:after{
            position: absolute; top: -30px; left: 50%;
            width: 300px;
            height: 30px;
            margin-left: -150px;
            text-align: center;
            line-height: 30px;
            font-size: 30px;
            content : 'Translate';
            text-shadow: 0 0 10px white;
        }
        .like_write:after{
            content: 'Write'
        }
    }
    .detail_panel{
        position: absolute; top: 0; left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.774);
        .box{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 900px;
            height: 400px;
            text-indent: 2em;
        }
    }
}
</style>