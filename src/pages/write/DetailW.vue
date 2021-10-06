<template>
  <div class="write_detail">
      <div class="title">{{detailW.w_title}}</div>
      <div class="problem">{{detailW.w_content}}</div>
      <div class="answer_title">your answer</div>
      <div class="your_content">
          <textarea v-model="answer"></textarea>
      </div>
      <button class="back" @click="$router.back()">back</button>
      <button class="clear"  @click="clearIt">clear</button>
      <button class="submit" @click="submit">submit</button>
  </div>
</template>

<script>
export default {
    name : 'DetailW',
    props : ['detailW','user'],
    data(){
        return {
            answer : ''
        }
    },
    methods:{
        //提交自己的答案
        submit(){
            let words = this.answer.split(' ')
            if(this.answer == ''){
                this.$bus.$emit('showAlert','content can be empty')
            }else if(words.length <= 1){
                this.$bus.$emit('showAlert','the answer is too short')
            }else{
                let date = new Date().getTime()
                let res = 'uw_writeId=' + this.detailW.id + '&' +  'uw_title=' + this.detailW.w_title +  '&' + 'user_nickname='+this.user.user_nickname+'&'+'user_phone='+this.user.user_phone + '&' + 'uw_content='+this.answer+'&'+
                'uw_time=' + date
                this.$http.post('/submitUserWrite',res).then(
                    response=>{
                        if(response.data == 'ok'){
                            this.$bus.$emit('showPrompt',`it submit successfully ${words.length} words`)
                        }
                    },
                    error=>{
                        this.$bus.$emit('showAlert','request is failed')
                        console.log(error.message)
                    }
                )
            }
        },
        //清除自己的答案
        clearIt(){
            this.answer = ''
        }
    },
    mounted(){
        console.log('come')
    }

}
</script>

<style lang='less'>
.write_detail{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgb(37, 37, 37);
    border-radius: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    .title{
        width: 900px;
        height: 40px;
        margin: 30px 0 0 0 ;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        text-shadow: 0 0 10px white;
    }
    .problem{
        width: 800px;
        margin: 10px 0 0 50px;
        box-sizing: border-box;
        padding: 20px 5px;
        border: 2px solid yellow;
        box-shadow: 0 0 5px yellow;
        border-radius: 10px;
    }
    .answer_title{
        width: 700px;
        height: 50px;
        margin: 30px 0 0 100px;
        text-align: center;
        line-height: 50px;
        text-shadow: 0 0 10px white;
    }
    .your_content {
        textarea{
            width: 800px;
            height: 600px;
            margin: 5px 0 50px 50px;
            position: relative;
            box-sizing: border-box;
            box-shadow: 0 0 5px yellow;
            border: 2px solid yellow;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.253);
            overflow-x: hidden;
            overflow-y: scroll;
            resize: none;
        }
        textarea:focus{
            outline: 0;
        }
        textarea::-webkit-scrollbar{
                width: 6px;
                height: 300px;
                background: rgba(0, 0, 0, 0);
        } 
        textarea::-webkit-scrollbar-thumb{
                margin-right: 10px;
                background: rgb(233, 218, 10);//设置滑动条颜色
                border-radius: 6px;//设置滑动条边角
        }
        textarea::-webkit-scrollbar-track-piece{
                background: rgba(255, 13, 13, 0);//设置滑动条的容器的背景   
        }  
    }
    .back{
        width: 150px;
        height: 50px;
        margin: 0 0 20px 50px;
        text-align: center;
        line-height: 50px;
        background: red;
        border-radius: 10px;
        box-shadow: 0 0 10px red;
    }
    .back:hover{
        background: rgb(255, 120, 120);
    }
    .clear{
        width: 200px;
        height: 50px;
        margin: 0 0 20px 100px;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        background: grey;
        box-shadow:  0 0 10px white;
    }
    .clear:hover{
        background: rgb(190, 190, 190);
    }
    .submit{
        width: 300px;
        height: 50px;
        margin: 0 0 20px 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        background: rgb(60, 200, 255);
        box-shadow: 0 0 10px skyblue;
    }
    .submit:hover{
        background: rgb(125, 218, 255);
    }
}
.write_detail::-webkit-scrollbar{
        width: 6px;
        height: 300px;
        background: rgba(0, 0, 0, 0);
} 
.write_detail::-webkit-scrollbar-thumb{
        margin-right: 10px;
        background: rgb(233, 218, 10);//设置滑动条颜色
        border-radius: 6px;//设置滑动条边角
}
.write_detail::-webkit-scrollbar-track-piece{
        background: rgba(255, 13, 13, 0);//设置滑动条的容器的背景   
}  
</style>