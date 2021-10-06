<template>
  <div class="add_writePanel">
      <div class="back" @click='$router.back()'>back</div>
      <div class="title">
          <input type="text" v-model="title">
      </div>
      <div class="level">
          CET4 <input type="radio" name='level' v-model="level" value="cet4">
          CET6 <input type="radio" name='level' v-model="level" value="cet6">
      </div>
      <div class="content">
          <textarea v-model="content"></textarea>
      </div>
      <div class="author">Author : {{user.user_nickname}}</div>
      <div class="time">{{time}}</div>
      <button class="clear" @click='clearAll'>clear </button>
      <button class="submit" @click="submit">
          <span v-show='!isLoading'>submit </span>
      </button>
      <div class="loading" v-show="isLoading"></div>      
  </div>
</template>

<script>
export default {
    name : 'AddWrite',
    props : ['user'],
    data(){
        return {
            title : '',
            level : 'cet4',
            content : '',

            time : '',

            isLoading : false

        }
    },
    methods : {
        clearAll(){
            this.title = '' ; this.content = ''
        },
        //提交写作数据
        submit(){
            if(this.title == '' || this.content==''){
                this.$bus.$emit('showAlert','submitted content can be empty')
            }else if(this.user.user_phone != '15395945882'){
                this.$bus.$emit('showAlert','stop submitting now,sorry')
            }else{
                this.isLoading = true
                let date = new Date()
                let message = 'w_title=' + this.title + '&' + 'w_level=' + this.level + '&' + 'w_content=' + this.content + '&'
                + 'w_author=' + this.user.user_nickname + '&' + 'author_phone=' + this.user.user_phone + '&' + 'w_time=' + date + '&' + 'w_check=' + 'wait'
                this.$http.post('/submitWrite',message).then(
                    response=>{
                        this.isLoading = false
                        this.$bus.$emit('showPrompt','successfully added')
                        console.log(response.data)
                    },
                    error=>{
                        this.isLoading = false
                        console.log(error.message)
                    }
                )
            }
        }
    },
    mounted() {
        let now = Date()
        this.time = now
    },
}
</script>

<style lang='less'>
.add_writePanel{
    position: absolute; left: 0; top: 0;
    width: 100%;
    height: 500px;
    border-radius: 15px;
    background: rgba(37, 37, 37);
    .back{
        position: absolute; right: 30px; top: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(168, 0, 0);
        border-radius: 5px;
        cursor: pointer;
    }
    .back:hover{
        background: red;
    }   
    .title{
        position: absolute; top: 40px; left: 50px;
        width: 600px;
        height: 40px;
        input{
            width: 100%;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
        }
        input:focus{
            outline: 1px solid red;
        }
    }
    .level{
        position: absolute; top: 100px; left: 50px;
        width: 200px;
        height: 30px;
        // background: white;
    }
    .content{
        position: absolute; top: 150px; left: 50px;
        width: 800px;
        height: 200px;
        // background: white;
        textarea{
            width: 800px;
            height: 200px;
            border: 0;
            resize: none;
            background: rgba(255, 255, 255, 0.1);
        }
        textarea:focus{
            outline : 1px solid red
        }
    }
    .time{
        position: absolute; bottom: 30px ; left: 50px;
        width: 100px;
        height: 50px;
        text-align: center;
        font-size: 12px;
    }
    .author{
        position: absolute; right: 50px; bottom: 100px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
    }
    .submit{
        position: absolute; bottom: 40px; right: 50px;
        width: 200px;
        height: 40px;
        background: rgb(168, 0, 0);
        box-shadow: 0 0 10px rgb(255, 55, 55);
        border-radius: 10px;
    }
    .submit:hover{
        background: red;
    }
    .clear{
        position: absolute; right: 300px; bottom: 40px;
        width: 100px;
        height: 40px;
        background: rgb(53, 53, 53);
        box-shadow: 0 0 10px white;
        border-radius: 10px;
    }
    .clear:hover{
        background: rgb(85, 85, 85);
    } 
    .loading{
        position: absolute; bottom: 40px; right: 130px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        animation: active 1.5s infinite;
    }    
}
.add_writePanel:before{
    content: 'WRITE';
    display: inline-block;
    position: absolute; top: -15px; left: 0;
    width: 900px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 30px;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 5px white;
}
 @keyframes active{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>