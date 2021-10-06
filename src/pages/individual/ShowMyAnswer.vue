<template>
  <div>
      <!-- 翻译板块 -->
      <div class="show_myanswerT" v-if="showMyAnswerId.type == 'translate'">
          <div class="logo">T</div>
        <button class="back" @click="$router.back()">back</button>
        <div class="answer">
            <div class="type"></div>
            <div class="title">{{my.translateMaterial[showMyAnswerId.id].ut_title}}</div>
            <div class="content">
                <span v-for="(s,index) in answerStr" :key="s.index" @click="showWord(index)">{{s}} </span>
            </div>
            <div class="words_number">there are <span style="color:red">{{answerStr.length}}</span> words
            </div>
        </div>
      </div>

      <!-- 写作板块 -->
      <div class="show_myanswerW" v-if="showMyAnswerId.type == 'write'">
          <div class="logo">W</div>
        <button class="back" @click="$router.back()">back</button>
        <div class="answer">
            <div class="type"></div>
            <div class="title">{{my.writeMaterial[showMyAnswerId.id].uw_title}}</div>
            <div class="content">
                <span v-for="(w,index) in answerStr" :key="w.index" @click="showWord(index)">{{w}} </span>
            </div>
            <div class="words_number">there are <span style="color:red">{{answerStr.length}}</span> words
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'ShowMyAnswer',
    props : ['my','showMyAnswerId'],
    data(){
        return {
            answerStr: ''
        }
    },
    methods:{
        showWord(index){
            alert(this.answerStr[index]);
        }

    },
    mounted(){
        console.log(this.showMyAnswerId)
        console.log(this.my)
        if(this.showMyAnswerId.type == 'translate'){
            this.answerStr = this.my.translateMaterial[this.showMyAnswerId.id].ut_content.split(' ')
            console.log(this.answerStr)
            for(let i=0;i<this.answerStr.length;i++){
                if(this.answerStr[i].indexOf(',') != -1){
                    this.answerStr[i] = this.answerStr[i].replace(',','. ')
                }
            }
        }else{
            this.answerStr = this.my.writeMaterial[this.showMyAnswerId.id].uw_content.split(' ')
            console.log(this.answerStr)
            for(let i=0;i<this.answerStr.length;i++){
                if(this.answerStr[i].indexOf(',') != -1){
                    this.answerStr[i] = this.answerStr[i].replace(',','. ')
                }
            }       
        }

    }
}
</script>

<style lang='less'>
.show_myanswerT{
    position: absolute ; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.788);
    .back{
        position: absolute; left: 30px; top: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        user-select: none;
        background: rgb(26, 155, 0);
        border-radius: 10px;
        transition: all .2s;
        z-index: 1;
    }
    .logo{
        position: absolute; right: 30px; top: 30px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        color: rgb(54, 255, 47);
        border: 4px solid rgb(43, 255, 0);
        box-shadow: 0 0 20px rgb(43, 255, 0);
    }
    .back:hover{
        background: rgb(43, 255, 0);
    }
    .answer{
        position: absolute; top: 50px; left: 100px;
        width: 1000px;
        height: 400px;
        .title{
            position: absolute; left: 50%; top: -20px;
            width: 300px;
            height: 40px;
            font-size: 22px;
            line-height: 40px;
            text-align: center;
            margin: 0 0 0 -150px;
            border-bottom: 1px solid rgb(65, 65, 65);
        }
        .content{
            position: absolute; left: 50px; top: 40px;
            width: 900px;
            height: 300px;
            text-indent: 2em;
            user-select:contain;
            background: rgb(27, 27, 27);
            overflow-y: scroll;
            // overflow-x: scroll;
            span{
                transition: all .2s;
            }
            span:hover{
                color: red;
            }
        }
        .content::-webkit-scrollbar{
            width: 5px;
        } 
        .content::-webkit-scrollbar-thumb{
            margin-right: 5px;
            background: rgb(104, 255, 17);//设置滑动条颜色
            border-radius: 6px;//设置滑动条边角
        }
        .content::-webkit-scrollbar-track-piece{
            background: rgba(0, 0, 0 ,0);//设置滑动条的容器的背景   
        }
        .words_number{
            position: absolute; left: 0; bottom: 0px;
            width: 300px;
            height: 40px;
            line-height: 40px;
        }
    }
}
.show_myanswerW{
    position: absolute ; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.788);
    .back{
        position: absolute; left: 30px; top: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        user-select: none;
        background: rgb(187, 121, 0);
        border-radius: 10px;
        transition: all .2s;
        z-index: 1;
    }
    .logo{
        position: absolute; right: 30px; top: 30px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        color: rgb(255, 217, 0);
        border: 4px solid rgb(255, 217, 0);
        box-shadow: 0 0 20px rgb(255, 217, 0);
    }
    .back:hover{
        background: rgb(255, 166, 0);
    }
    .answer{
        position: absolute; top: 50px; left: 100px;
        width: 1000px;
        height: 400px;
        .title{
            position: absolute; left: 50%; top: -20px;
            width: 300px;
            height: 40px;
            font-size: 22px;
            line-height: 40px;
            text-align: center;
            margin: 0 0 0 -150px;
            border-bottom: 1px solid white;
        }
        .content{
            position: absolute; left: 50px; top: 40px;
            width: 900px;
            height: 300px;
            text-indent: 2em;
            user-select:contain;
            background: rgb(27, 27, 27);
            overflow-y: scroll;
            // overflow-x: scroll;
            span{
                transition: all .2s;
            }
            span:hover{
                color: red;
            }
        }
        .content::-webkit-scrollbar{
            width: 5px;
        } 
        .content::-webkit-scrollbar-thumb{
            margin-right: 5px;
            background: rgb(255, 217, 0);//设置滑动条颜色
            border-radius: 6px;//设置滑动条边角
        }
        .content::-webkit-scrollbar-track-piece{
            background: rgba(0, 0, 0 ,0);//设置滑动条的容器的背景   
        }
        .words_number{
            position: absolute; left: 0; bottom: 0px;
            width: 300px;
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>