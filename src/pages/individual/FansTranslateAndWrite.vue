<template>
  <div class="fans_translate_wirte">
      <div class="back" @click="$router.back()">back</div>
      <div class="translate_write_type">
          <span v-show='opusDtail.type == "translate"'>Translate</span>
          <span v-show='opusDtail.type == "write"'>Write</span>
      </div>
      <div class="translate_write_content">
          <span v-show='opusDtail.type == "translate"'>{{opusDtail.data.ut_content}}</span>
          <span v-show='opusDtail.type == "write"'>{{opusDtail.data.uw_content}}</span>
      </div>
      <div class="translate_write_title">
          <span v-show='opusDtail.type == "translate"'>{{opusDtail.data.ut_title}}</span>
          <span v-show='opusDtail.type == "write"'>{{opusDtail.data.uw_title}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name : 'FansTranslateAndWrite',
    props:['opusDtail'],
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style lang='less'>
.fans_translate_wirte{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #000;
    .translate_write_type{
        position: absolute; top: 30px; left: 50%;
        margin: 0 0 0 -150px;
        width: 300px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 40px;
        text-shadow: 0 0 30px white;
    }
    .translate_write_content{
        position: absolute; top: 100px; left: 50%;
        width: 900px;
        height: 300px;
        margin: 0 0 0 -450px;
    }
    .translate_write_title{
        position: absolute; top: 420px; left: 50%;
        width: 400px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 0 0 -200px;
        font-size: 30px;
        user-select: none;
        span{
            color: greenyellow;
        }
    }
}

</style>