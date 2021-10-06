<template>
  <div class="set_head_image">
      <div class="back" @click="$router.back()">back</div>
      <div class="preview">
          <div class="image">
              <img :src="headerUrl" alt="" ref="header">
              <!-- <img src="../../assets/headImage/header0.png" alt="headimage" ref="header"> -->
          </div>
          <div class="name">{{headerName}}</div>
          <button @click="updateMyHeadImage">apply</button>
      </div>
      <div class="image_area">
          <ul>
              <li @click="chose(0)">
                  <img src="../../assets/headImage/header0.png" alt="">
              </li>
              <li @click="chose(1)">
                  <img src="../../assets/headImage/header1.png" alt="">
              </li>
              <li @click="chose(2)">
                  <img src="../../assets/headImage/header2.png" alt="">
              </li>
              <li @click="chose(3)">
                  <img src="../../assets/headImage/header3.png" alt="">
              </li>
              <li @click="chose(4)">
                  <img src="../../assets/headImage/header4.png" alt="">
              </li>
              <li @click="chose(5)">
                  <img src="../../assets/headImage/header5.png" alt="">
              </li>
              <li @click="chose(6)">
                  <img src="../../assets/headImage/header6.png" alt="">
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name : 'SetHeadImage',
    props:['user'],
    data(){
        return {
            headerName : '', //头像的名字

            headerUrl : require('../../assets/logo.png'),
            upUrl : ''
        }
    },
    methods:{
        chose(index){
            this.headerUrl = require('../../assets/headImage/header' + index + '.png')
            this.upUrl = 'header' + index + '.png'
            if(index == 0){
                this.headerName = 'surf'
            }else if(index == 1){
                this.headerName = 'lazy'
            }else if(index == 2){
                this.headerName = 'rock'
            }else if(index == 3){
                this.headerName = 'fishing'
            }else if(index == 4){
                this.headerName = 'star'
            }else if(index == 5){
                this.headerName = 'singing'
            }else{
                this.headerName = 'moon'
            }
        },
        //上传我的头像
        updateMyHeadImage(){
            if(this.upUrl == ''){
                this.$bus.$emit('showAlert','please chose a headImage')
            }else{
                this.$http.get(`/updateMyHeadImage?user_headImage=${this.upUrl}&user_phone=${this.user.user_phone}`).then(
                    response=>{
                        if(response.data.code == 200){
                            this.$bus.$emit('showPrompt','update successfully')
                        }else{
                            this.$bus.$emit('showAlert','update failed')
                        }
                    },
                    error=>{
                        this.$bus.$emit('showAlert','here is going wrong')
                        console.log(error.message)
                    }
                )
            }
        }
    },
    mounted(){
    }
}
</script>

<style lang='less'>
.set_head_image{
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.822);
    .back{
        position: absolute; top: 30px;left: 30px;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(0, 137, 179);
        border-radius: 8px;
        cursor: pointer;
        transition: all .2s;
        user-select: none;
    }
    .back:hover{
        background: skyblue;
    }
    .preview{
        position: absolute; top: 100px;left: 30px;
        width: 200px;
        height: 300px;
        border-radius: 5px;
        border: 2px solid skyblue;
        .image{
            position: absolute; top: 30px; left: 30px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            box-sizing: border-box;
            border: 4px solid skyblue;
            background:no-repeat;
            background-size: cover;
            img{
                width: 100%;
                height: 100%;
                background: rgb(184, 250, 255);
                border-radius: 50%;
            }
        }
        .name{
            position: absolute; left: 30px; top: 200px;
            width: 140px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: rgb(9, 185, 255);
            text-shadow: 0 0 10px skyblue;
        }
        button{
            position: absolute; left: 30px; top: 240px;
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 10px;
            background: rgb(206, 117, 0);
            border-radius: 8px;
            transition: all .2s;
        }
        button:hover{
            background: rgb(255, 145, 0);
        }
    }
    .image_area{
        position: absolute; top: 100px; left: 260px;
        width: 900px;
        height: 300px;
        border-radius: 5px;
        border: 2px solid red;
        ul{
            width: 100%;
            height: 100%;
            li{
                float: left;
                width: 80px;
                height: 80px;
                box-sizing: border-box;
                border-radius: 5px;
                font-size: 50px;
                user-select: none;
                border: 3px solid pink;
                text-align: center;
                line-height: 74px;
                margin: 16px 0 0 18px;
                cursor: pointer;
                transition: all .2s;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    transition: all .3s;
                }
            }
            li:hover img{
                transform: scale(1.2);
            }
        }
    }
}
</style>