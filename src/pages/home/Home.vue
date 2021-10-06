<template>
  <div class="home">
      <div class="welcome">welcome to TAW</div>
      <div class="read_me" @click="readMe">read me</div>
      
      <router-view/>
  </div>
</template>

<script>
export default {
    name : 'Home',
    data(){
        return{
            // flag:false
        }
    },
    methods:{
        readMe(){
            this.$router.push('/home/readme')
        }
    },
    mounted(){
        this.$bus.$emit('changeNav','home')
        
        //进入home面板路由
        let routerInfo = {
            router:'home',
            data:true
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)
    },
    beforeDestroy(){
        //离开home面板路由
        let routerInfo = {
            router:'home',
            data:false
        }
        this.$bus.$emit('isInWhichRouter',routerInfo)     
    }

}
</script>

<style lang='less'>
.home{
    position: absolute; top: 120px ;left: 0;
    margin: 0 0 0 480px;
    width: 900px;
    height: 500px;
    text-align: center;
    line-height: 350px;
    border-radius: 15px;
    user-select: none;
    box-shadow: 0 0 30px rgb(180, 17, 255);
    border: 3px solid rgb(180, 17, 255);
    .read_me{
        position: absolute; left: 50%; top : 50%;
        margin: -25px 0 0 -100px;
        width: 200px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: rgb(187, 100, 0);
        border-radius: 10px;
        transition: all .3s;
        cursor: pointer;
    }
    .read_me:hover{
        transform: scale(1.2);
        background: rgb(255, 136, 0);
    }
}
</style>