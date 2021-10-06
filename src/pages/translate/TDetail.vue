<template>
  <div class="t_detail" >
      <ul class="t_detail_list" ref="ul">
          <li v-for="(c,index) in content" :key="index">
              <div class="title">{{index+1}}  {{c}}</div>
              <textarea v-model="text[index]" @keydown.enter="goNext" ref="textarea"></textarea>
          </li>

      </ul>
      <button class="back" @click="goBack" ref="backBtn"> back</button>
      <button class="next" @click="goNext" ref="nextBtn">next </button>
      <button class="exit" @click="backTranslates">exit </button>
      <div class="submit" v-show="num == content.length">
          <button @click="submitTranslte">
              <span v-show="!isLoading">submit </span>
              <span v-show="isLoading" class="loading"></span>
          </button>
      </div>
  </div>
</template>

<script>
export default {
    name : 'TDeatil',
    props : ['detailT','user'],
    data(){
        return {
            isLoading : false,
            content: [],

            //计数器
            num : 1,

            text : [
                
            ]
        }
    },
    methods:{
        goNext(){
            console.log(this.detailT.t_content.length)
            if(this.num > this.detailT.t_content.length - 1){
                this.num = this.detailT.t_content.length - 1
                let n = - 890 * this.num
                this.$refs.ul.style.left = n + 'px'
                this.num ++
            }else{
                let n = - 890 * this.num
                this.$refs.ul.style.left = n + 'px'
                this.num ++           
            }
        },
        goBack(){
            if(this.num == 1){
                return
            }else{
                this.num --
                let b = -890 * (this.num - 1)
                this.$refs.ul.style.left = b + 'px'
            }
        },
        backTranslates(){
            this.$router.push('/translate')
        },
        //提交翻译数据
        submitTranslte(){ 
            let empty = this.text.length-1
            let backNum
            //校验是否有未翻译内容
            for(let i=0;i<this.text.length-1;i++){
                if(this.text[i] == ''){
                    this.$bus.$emit('showAlert',`the ${i+1}th sentencens is empty`)
                    backNum = this.num - (i+1)
                    //跳转到没有填写的那一句话
                    for(let j=0;j<backNum;j++){
                        this.goBack()
                    }
                    break;
                }else{
                    empty --
                }
            }
            let arr = [];
            for(let t of this.text){
                console.log(typeof(t))
                let words = t.split(' ')
                arr.push(...words)
            }
            console.log(arr.length)
            if(empty == 0){
                    this.isLoading =  true
                    let time = new Date().getTime()
                    let msg = 'ut_translateId=' + this.detailT.id + '&' + 'ut_title=' + this.detailT.t_title + '&' + 'user_nickname=' + this.user.user_nickname + '&' 
                    +'user_phone=' + this.user.user_phone + '&' +  'ut_content=' + this.text + '&' +  'ut_time=' + time
                    this.$http.post('/submitUserTranslate',msg).then(
                        response=>{
                            console.log(response.data)
                            this.isLoading = false
                            this.$bus.$emit('showPrompt',`ok it include ${arr.length} words`)
                        },
                        error=>{
                            this.isLoading = false
                            console.log(error.message)
                        }
                    )
            }
        }
    },
    watch:{
        'num':{
            deep:true,
            handler(){
                if(this.num == this.content.length){
                    this.$refs.nextBtn.disabled = true

                }else if(this.num == 1){
                    this.$refs.backBtn.disabled = true
                    this.$refs.nextBtn.disabled = false
                }
                else {
                    this.$refs.backBtn.disabled = false
                    this.$refs.nextBtn.disabled = false
                }
            }
        }
    },
    mounted(){
        let arr = this.detailT.t_content.split('。')
        this.content = arr
        for(let i =0;i<this.content.length;i++){
            this.text.push('')
        }

        console.log(this.content)

        this.$bus.$emit('turnOnFiletr','off')
    },
    beforeDestroy(){
        this.$bus.$emit('turnOnFiletr','on')
    }

}
</script>

<style  lang='less'>
.t_detail{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgb(37, 37, 37);
    border-radius: 10px;
    overflow: hidden;
    .t_detail_list{
        position: absolute; left: 5px; top:5px;
        width: 8900px;
        height: 490px;
        user-select:auto;
        transition: all .3s linear;
        li{
            position: relative;
            float: left;
            width: 890px;
            height: 490px;
            user-select:auto;
            textarea{
                position: absolute; left: 50%; top : 50%;
                transform : translate(-50%,-50%);
                width: 600px;
                height: 120px;
                font-size: 20px;
                background: rgb(44, 44, 44);
                resize: none;
            }
            textarea:focus{
                outline: 2px solid rgb(255, 149, 28);
            }
            .title{
                position: absolute; left: 50%; top : 20%;
                transform : translate(-50%,-50%);
            }
        }
    }
    button{
        position: absolute; bottom: 40px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 8px;
        background: rgb(255, 149, 28);
        z-index: 5;
    }
    button:hover{
        box-shadow: 0 0 10px rgb(255, 149, 28);
    }
    .next{
        right: 50px;
    }
    .back{
        right: 210px;
    } 
    .exit{
        right: 700px;
        background: red;
    }
    .exit:hover{
        box-shadow: 0 0 10px red;
    }
    .submit{
        position: absolute; left: 0; top : 0;
        width: 900px;
        height: 400px;
        background: rgb(37, 37, 37);
        button{
            position: absolute; left: 50%; top : 60%;
            transform : translate(-50%,-50%);
            width: 160px;
            height: 50px;
            text-align: center;
            line-height: 30px;
            background: yellow;
            span{
                color: rgb(255, 136, 0);
            }
            .loading{
                color: rgb(255, 136, 0);
                animation: loading 1s infinite;
            }
            @keyframes loading {
                0%{
                    transform: rotate(0);
                }
                100%{
                    transform: rotate(180deg);
                }
            }

        }
    }
    .submit::before{
        position: absolute; top : 20px; left: 50%;
        content: 'Now You Can Submit Your Answer';
        margin: 0 0 0 -200px;
        width: 400px;
        height: 50px;
        color: rgb(255, 136, 0);
        text-shadow:  0 0 10px yellow;
        text-align: center;
        line-height: 50px;
    }
}

</style>