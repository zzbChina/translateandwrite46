<template>
  <div class="my_detailInfo">
    <div class="info_box">
      <div class="close" @click="$router.back()"></div>
      <div class="user_box">
        <div class="nickname">
          <div class="icofont"></div>
          <div class="edit" @click="openEdit(0)"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_nickname}}
          <input type="text" ref="nickname" v-model="updateMsg.nickname">
        </div>
        <div class="email">
          <div class="icofont"></div>
          <div class="edit" @click="openEdit(1)"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_email}}
          <input type="text" ref="email" v-model="updateMsg.email">
        </div>
        <div class="phone">
          <div class="icofont"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_phone}}
        </div>
        <div class="age">
          <div class="icofont"></div>
          <div class="edit" @click="openEdit(2)"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_age}}
          <select  id="select_age" v-model="updateMsg.age" ref="age">
            <option v-for="a in 50" :key="a.index"  :value="a">{{a}}</option>
          </select>
        </div>
        <div class="gender">
          <div class="icofont"></div>
          <div class="edit" @click="openEdit(3)"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_gender}}
          <select v-model="updateMsg.gender" id="select_gender" ref="gender">
              <option value="male">male</option>
              <option value="female">female</option>
          </select>
        </div>
        <div class="address">
          <div class="icofont"></div>
          <div class="edit" @click="openEdit(4)"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.user_address}}
          <input type="text" ref="address" v-model="updateMsg.address">
        </div>
        <div class="register_time">
          <div class="icofont"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;{{user.register_time}}
          </div>
      </div>
      <button class="submit" @click="submit">submit</button>
    </div>
  </div>
</template>

<script>
export default {
    name : 'MyDetailInfo',
    props : ['user'],
    data(){
      return{
        dataformat : '',
        
        updateMsg : {
          nickname : '',
          email : '',
          age : '',
          gender : '',
          address : '',
        }
      }
    },
    methods:{
      openEdit(value){
        if(value == '0'){
          this.$refs.nickname.style.display = 'block'
        }else if(value == '1'){
          this.$refs.email.style.display = 'block'
        }else if(value == '2'){
          this.$refs.age.style.display  = 'block'
        }else if(value == '3'){
          this.$refs.gender.style.display = 'block'
        }else if(value == '4'){
          this.$refs.address.style.display = 'block'
        }
      },
      //提交数据
      submit(){
        let info = 'user_nickname=' + this.updateMsg.nickname + '&' + 'user_email=' + this.updateMsg.email + '&'
        + 'user_age=' + this.updateMsg.age + '&' + 'user_gender=' + this.updateMsg.gender + '&'
        + 'user_address=' + this.updateMsg.address + '&' + 'user_id=' + this.user.id
        this.$http.post('/submitMyDetailData',info).then(
          response=>{
            if(response.data.data == 'ok'){
              this.$bus.$emit('showPrompt','update successfully')
            }else{
              this.$bus.$emit('showAlert','update failed')
            }
          },
          error=>{
            console.log(error.message)
            this.$bus.$emit('showAlert','update failed')
          }
        )
      }
    },
    mounted(){
      this.updateMsg.nickname = this.user.user_nickname;
      this.updateMsg.email  = this.user.user_email;
      this.updateMsg.age = this.user.user_age;
      this.updateMsg.gender  = this.user.user_gender;
      this.updateMsg.address = this.user.user_address
    }
}
</script>

<style lang='less'>
.my_detailInfo{
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.76);
  border-radius: 10px;
  .info_box{
    position: absolute; left: 50%; top : 50%;
    transform : translate(-50%,-50%);
    width: 400px;
    height: 600px;
    border-radius: 10px;
    border: 4px solid rgb(0, 255, 200);
    box-shadow: 0 0 20px rgb(0, 255, 200);
    background: #000;
    .close{
      position: absolute; top: 20px; right: 20px;
      width: 30px;
      height: 30px;
      font-size: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      background: rgb(192, 0, 0);
      transition: all .2s;
      cursor: pointer;
    }
    .close:hover{
      transform: scale(1.2);
      background: red;
    }
    .user_box{
      position: absolute; top: 20px; left: 20px;
      width: 260px;
      height: 560px;
      .nickname,.email,.phone,.age,.gender,.register_time,.address{
        position: relative;
        margin: 20px 0 0 0 ;
        width: 260px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid grey;
        user-select: none;
        .icofont,.edit{
          position: absolute;left: 0; top: 0;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
        .edit{
          display: none;
          left: 240px;
          color: rgb(43, 255, 0);
          cursor: pointer;
        }
        input{
          position: absolute; left: 40px; top: 0;
          width: 200px;
          height: 40px;
          border: 0;
          background: rgba(0, 0, 0, 0.836);
          display: none;
        }
        input:focus{
          outline: 0;
        }
        #select_gender,#select_age{
          position: absolute; left: 40px; top: 5px;
          display: none;
          width: 200px;
          height: 30px;
          background: #000;
          border: 0;
        }
      }
      .nickname:hover,.email:hover,.phone:hover,.age:hover,.gender:hover,.register_time:hover,.address:hover{
        border-bottom: 1px solid rgb(43, 255, 0);
        .edit{
          display: block;
        }
      }
    }
    .submit{
      position: absolute; left: 50%; bottom: 20px;
      margin-left: -100px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background: rgb(255, 136, 0);
      border-radius: 10px;
      box-shadow: 0 0 10px white;
    }
  }
}
</style>