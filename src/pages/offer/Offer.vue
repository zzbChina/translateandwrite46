<template>
  <div class="offer">
      <div class="explain" title="some explains">
          <div class="box">
              Here, you can provide us with some materials. For these materials, you and other users can translate and write them. 
              Every time you provide them, it is the driving force for us to move forward
          </div>
      </div>
      <div class="image"></div>
      <div class="add_translate" @click="addT">add translate materials</div>
      <div class="add_write" @click='addW'>add write materials</div>

      <router-view
        :user='user'
      />
  </div>
</template>

<script>
export default {
    name : 'Offer',
    props : ['user'],
    methods:{
        //添加一片翻译材料
        addT(){
            if(this.user.user_status != 'true'){
                this.$bus.$emit('showAlert','please login in first')
            }else{
                this.$router.push('/offer/add_translate')
            }
        },
        //添加一篇写作材料
        addW(){
            if(this.user.user_status != 'true'){
                this.$bus.$emit('showAlert','please login in first')
            }else{
                this.$router.push('/offer/add_write')
            }
        }
    },
    mounted(){
        this.$bus.$emit('changeNav','offer')

        //进入提交面板路由
        let routerInfo = {
            router:'offer',
            data:true
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    },
    beforeDestroy(){
        //离开提交面板路由
        let routerInfo = {
            router:'offer',
            data:false
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    }
}
</script>

<style lang='less'>
.offer{
    position: absolute; top: 120px ;left: 0;
    margin: 0 0 0 480px;
    width: 900px;
    height: 500px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 30px rgb(255, 17, 17);
    border: 3px solid rgb(255, 17, 17);
    .explain{
        position: absolute; right: 10px; top: 10px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        color: yellow;
        cursor: pointer;
        .box{
            position: absolute; top: 20px; right: 20px;
            padding: 10px 10px;
            width: 320px;
            height: 60px;
            font-size: 12px;
            line-height: 15px;
            color: black;
            background: white;
            border-radius: 10px 0 10px 10px;
            display: none;
            transition: all .3s;
        }
    }
    .explain:hover .box{
        display: block;
    }
    .image{
        position: absolute; left: 50%; top : 100px;
        transform : translate(-50%,0);
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 100px;
        color: rgb(139, 0, 0);
    }
    .image:after{
        position: absolute; left: -100px; bottom: -30px;
        content: 'You can provide some materials available here';
        width: 300px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        color: tomato;
        text-shadow: 0 0 10px red;
    }
    .add_translate,.add_write{
        position: absolute; top: 300px; left: 50%;
        margin: 0 0 0 -350px;
        width: 300px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 10px;
        background: rgb(139, 0, 0);
        cursor: pointer;
        transition: all .2s;
    }
    .add_write{
        margin: 0 0 0 50px;
    }
    .add_translate:hover,.add_write:hover{
        background: rgb(197, 15, 15);
    }
}
</style>