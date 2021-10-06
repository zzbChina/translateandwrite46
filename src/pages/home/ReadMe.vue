<template>
  <div class="read_me_panel">
      <div class="close" @click="$router.back()"></div>
      <div class="box">
          <div class="introduction">入门须知</div>
          <div class="info">
              1.本站采用全英文，主要是为了适应英文环境而设计<br>
              2.本站将暂停提交写作翻译材料，后续材料均由我提供<br>
              3.本站是我第一个上线项目，还有很多漏洞和不足<br>
          </div>
          <div class="attention">注意事项</div>
          <div class="atten_info">
              1.本站的在线翻译有有道翻译接口提供，每次查询均由我来消费<br>
              2.有道整句翻译暂不提供英文转中文<br>
              3.你的手机号会作为本站的通用账号，且是唯一标识<br>
          </div>
          <div class="bug">未解决问题</div>
          <div class="info">
              1.评论区域的头像问题还没有解决，一开始没做好<br>
              2.头像的上传并剪切头像图片功能的剪切还没有研究好<br>
              3.后期有点加工赶制了，个人面板区域有很多不足<br>
              4.没有校验你手机号是否为真手机号的方式，但请输入11位账号<br>
          </div>
          <div class="tech">使用技术</div>
          <div class="info">
              1.页面使用的是Vue.js 2.0<br>
              2.后端接口部分使用的node.js<br>
              3.数据库方面使用的是mysql<br>
              4.服务器选择的腾讯云的轻量服务器，2G内存<br>
              3.翻译接口使用有道翻译提供的接口<br>
          </div>
          <div class="findTeacher">补充</div>
          <div class="info">
              1.寻找一个前端开发的老师傅，学习前端知识<br>
              2.目前准备开发小程序，本站并不会一直更新<br>
              3.想要学习中大型项目的开发规范，步骤，流程，经验，有人能帮助我吗？<br>
              4.here is my QQ number:2973364852
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'ReadMe'
}
</script>

<style lang='less'>
.read_me_panel{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.897);
    .close{
        position: absolute; right: 20px; top: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        background: rgb(187, 0, 0);
        transition: all .2s;
        z-index: 2;
        cursor: pointer;
    }
    .close:hover{
        background: red;
        box-shadow: 0 0 20px red;
    }
    .box{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 800px;
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        .introduction,.attention,.bug,.tech,.findTeacher{
            margin: 50px 0 0 50px;
            width: 750px;
            height: 50px;
            text-align: left;
            line-height: 50px;
            font-size: 25px;
            text-shadow: 0 0 50px white;
        }
        .introduction{
            margin:  0 0 0 50px;
        }
        .info,.atten_info{
            width: 750px;
            margin: 0 0 0 50px;
            line-height: 30px;
            text-align: left;
        }
    }
    .box::-webkit-scrollbar{
        width: 10px;
    }
    .box::-webkit-scrollbar-thumb{
        background: rgb(204, 0, 255);
        height: 100px;
        border-radius: 5px;
    }
}
</style>