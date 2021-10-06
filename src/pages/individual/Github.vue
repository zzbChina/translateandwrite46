<template>
  <div class="my_github">
      <div class="logo"></div>
      <div class="past_url" >
          <input type="text" ref="githubUrl" v-model="user.github_url">
          <div class="input_mask"></div>
          <div class="copy_url" @click="copyUrl">copy</div>
      </div>
      <div class="backBtn" @click="$router.back()">back </div>
      <div class="your_githubUrl">
          <input type="text" placeholder="this is your github url" v-model='url'>
      </div>
      <button @click='gotoGithub'>update</button>
  </div>
</template>

<script>
export default {
    name : 'Github',
    props : ['user'],
    data(){
        return{
            url : ''
        }
    },
    methods:{
        gotoGithub(){
            let msg = 'github_url=' + this.url + '&' + 'user_phone=' + this.user.user_phone
            this.$http.post('/updateMyGithubUrl',msg).then(
                response=>{
                    if(response.data == 'ok'){
                        this.$bus.$emit('showPrompt','update successfully')
                    }else{
                        this.$bus.$emit('showAlert','database is going wrong')
                    }
                },
                error=>{
                    console.log(error.message)
                }
            )
        },
        //复制github链接
        copyUrl(){
            this.$refs.githubUrl.select()//只可以选择表单value
            document.execCommand('Copy')
            // window.clipboardData.setData("Text",this.user.github_url)
        }
    }
}
</script>

<style lang='less'>
.my_github{
    position: absolute; top:0;left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    .logo{
        position: absolute; left: 50%; top: 50px;
        width: 60px;
        height: 60px;
        margin: 0 0 0 -30px;
        border-radius: 50%;
        font-size: 60px;
        text-align: center;
        color: rgb(225, 0, 255);
    }
    .past_url{
        position: absolute; top: 130px; left: 50%;
        width: 500px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 0 0 -250px;
        input,.input_mask{
            position: absolute; top:0;left: 0;
            width: 100%;
            height: 100%;
            border: 0;
            background: #000;
        }
        .input_mask{
            background: rgba(0, 0, 0, 0);
        }
        input:focus{
            outline: 0;
        }
        .copy_url{
            position: absolute; right: -100px; top: 0;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            background: purple;
            cursor: pointer;
        }
        .copy_url:hover{
            background: pink;
        }
    }
    .backBtn{
        position: absolute; top: 50px; left: 50px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgb(133, 0, 167);
        border-radius: 8px;
        transition: all .2s;
        cursor: pointer;
    }
    .backBtn:hover{
        background: rgb(204, 0, 255);
    }
    .your_githubUrl{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 800px;
        height: 60px;
        input{
            width: 800px;
            height: 60px;
            background: rgba(0, 0, 0, 0.096);
            color: white;
            border: 3px solid rgb(204, 0, 255);
            border-radius: 5px;
        }
        input:focus{
            outline: 0;
            border-color: pink;
            box-shadow: 0 0 15px pink;
        }
    }
    button{
        position: absolute; top: 320px; left: 50%;
        margin: 0 0 0 -125px;
        width: 250px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: rgb(216, 158, 0);
        border-radius: 10px;
        transition: all .3s;
    }
    button:hover{
        background: rgb(255, 193, 21);
        box-shadow: 0 0 20px rgb(255, 193, 21);
    }
}
</style>