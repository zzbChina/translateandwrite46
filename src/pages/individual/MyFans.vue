<template>
  <div class="my_fans">
      <div class="back" @click="$router.back()">back</div>
      <div class="fans_image">
          <img src="../../assets/宇航员.jpg" alt="fans">
      </div>
      <div class="toggle" @click="isShowMyFollowed = !(isShowMyFollowed)">
          
      </div>
      <div class="fans_list" v-show="!(isShowMyFollowed)">
          <div class="table">
              <div class="nickname">fans</div>
              <div class="follow_time">time</div>
          </div>
          <ul>
              <li v-for="f in my.fans" :key="f.id">
                  <div class="head_image">
                      <img :src="require('../../assets/headImage/noheader.jpg')" alt="">
                  </div>
                  <div class="nickname">{{f.fans_nickname}}</div>
                  <div class="followHe" @click="follow"></div>
                  <div class="followed_time">{{f.focus_time}}</div>
                  <div class="detail" @click="checkFansDetailMsg(f.fans_phone)" title="inner his/her home"></div>
              </li>
          </ul>
      </div>

      <!-- 切换到我的关注 -->
      <div class="my_followed" v-show="isShowMyFollowed">
          <div class="table">
              <div class="nickname">followed</div>
              <div class="follow_time">time</div>
          </div>
          <ul>
              <li v-for="f in followed" :key="f.id">
                  <div class="head_image">
                      <img :src="require('../../assets/headImage/noheader.jpg')" alt="">
                  </div>
                  <div class="nickname">{{f.user_nickname}}</div>
                  <div class="cancel_followed" @click="cancelFollowed(f.user_phone)" title="cancel follow"></div>
                  <div class="followed_time">{{f.focus_time}}</div>
                  <div class="detail" title="inner his/her home" @click="checkFollowedDetail(f.user_phone)"></div>                  
              </li>
          </ul>

      </div>

      <!-- 确定取消关注弹窗 -->
      <div class="confirmtocancel" v-show="isShowConfirmToCancel">
          <div class="cancel_panel">
              cancel follow he or she ?
              <div class="confirmtocancel_close" @click="isShowConfirmToCancel = false"></div>
              <div class="confirmtocancel_confirm" @click="confirmToCancel">confirm</div>
              <div class="confirmtocancel_cancel" @click="isShowConfirmToCancel = false">cancel</div>
          </div>
      </div>

      <!-- 我的粉丝详情页面 -->
      <router-view
        :my='my'
        :fansPhone='fansPhone'
      />
  </div>
</template>

<script>
export default {
    name : 'MyFans',
    props : ['my','user'],
    data(){
        return{
            fansPhone:'',

            //我的粉丝和我的关注的切换
            isShowMyFollowed : false,

            followed:'', //我的关注
            isShowConfirmToCancel : false,
            cancelPhone : '' //取关所用到的号码
        }
    },
    methods:{
        //查看粉丝的详情界面
        checkFansDetailMsg(value){
            this.fansPhone = value
            this.$router.push('/individual/my_fans/fans_index')
        },
        //关注ta
        follow(){
            let vm = this;
            let msg = 'user_phone=' + this.my.fans[0].fans_phone + '&' + 'fans_phone=' + this.user.user_phone
            this.$http.post('/checkFollowedAlready',msg).then(
                response=>{
                    if(response.data.code == 200){
                        console.log(response.data)
                        console.log(this.user)
                        this.$bus.$emit('showAlert','you followed already!')
                    }else{
                        let date = new Date()
                        let dateformat = `${date.getFullYear()} ${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                        let info = 'user_nickname=' + vm.my.fans[0].fans_nickname + '&' + 'user_phone=' + vm.my.fans[0].fans_phone + '&'
                        + 'fans_nickname=' + vm.user.user_nickname + '&' + 'fans_phone=' + vm.user.user_phone + '&' + 'focus_time=' + dateformat
                        this.$http.post('/followAuthor',info).then(
                            response=>{
                                if(response.data == 'ok'){
                                    console.log(this.user)
                                    this.$bus.$emit('showPrompt','follow sucessfully')
                                }else{
                                    console.log(this.user)
                                    this.$bus.$emit('showAlert','follow failed')
                                }
                            },
                            error=>{
                                console.log(error.message)
                            }
                        )
                    }
                }
            )
        },
        //查看我的关注的人的详情页
        checkFollowedDetail(value){
            this.fansPhone = value
            this.$router.push('/individual/my_fans/fans_index')
        },
        //取消关注
        cancelFollowed(phone){
            this.cancelPhone = phone;
            this.isShowConfirmToCancel = true
        },
        //确定取关
        confirmToCancel(){
            let msg = 'user_phone=' + this.cancelPhone + '&' + 'fans_phone=' + this.user.user_phone
            this.$http.post('/cancelFollowedUser',msg).then(
                response=>{
                    if(response.data.code != 200){
                        this.isShowConfirmToCancel = false
                        this.$bus.$emit('showAlert','cancel failed')
                    }else{
                        this.isShowConfirmToCancel = false
                        this.$bus.$emit('showPrompt','cancel successfully')
                    }
                },
                error=>{
                    this.isShowConfirmToCancel = false
                    console.log(error.message)
                }
            )
        }
    },
    mounted(){
        //获取所有我的关注的人
        let info = 'fans_phone=' + this.user.user_phone
        this.$http.post('/checkMyFollowUser',info).then(
            response=>{
                if(response.data.code == 200){
                    this.followed = response.data.data
                }else{
                    this.$bus.$emit('showAlert','there is going wrong')
                }
            },
            error=>{
                console.log(error.message)
            }
        )
    }
}
</script>

<style lang='less'>
@pink:rgb(234, 0, 255);
.my_fans{
    position: absolute; right: 0; top: 0;
    width: 1200px;
    height: 500px;
    border-radius: 15px;
    background: #202022;
    // 确定取消关注的弹窗
    .confirmtocancel{
        position: absolute; left: 0; top: 0;
        width: 1200px;
        height: 100%;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.795);
        .cancel_panel{
            position: absolute; left: 50%; top : 50%;
            transform : translate(-50%,-50%);
            width: 500px;
            height: 300px;
            background: rgb(36, 36, 36);
            text-align: center;
            line-height: 200px;
            border-radius: 10px;
            border: 3px solid rgb(162, 0, 255);
            user-select: none;
            .confirmtocancel_close{
                position: absolute; right: 20px; top: 10px;
                width: 25px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                transition: all .2s;
                cursor: pointer;
            }
            .confirmtocancel_close:hover{
                transform: scale(1.1);
                color: red;
            }
            .confirmtocancel_confirm,.confirmtocancel_cancel{
                position: absolute; top: 150px; left: 150px;
                width: 200px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                background: skyblue;
                border-radius: 8px;
                transition: all .2s;
            }
            .confirmtocancel_cancel{
                top: 220px;
                background: darkred;
            }
            .confirmtocancel_confirm:hover{
                background: rgb(0, 183, 255);
            }
            .confirmtocancel_cancel:hover{
                background: red;
            }
        }
    }

    .back{
        position: absolute; top:20px;left: 20px;
        width: 180px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
        user-select: none;
        cursor: pointer;
        background: rgb(180, 21, 185);
        box-shadow: 0 0 10px pink;
        z-index: 1;
    }
    .toggle{
        position: absolute; right: 30px; top: 30px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: rgb(185, 0, 0);
        border-radius: 5px;
        cursor: pointer;
        z-index: 3;
        transition: all .2s;
    }
    .toggle:hover{
        background: red;
    }
    .fans_image{
        position: absolute;top: 0px; left: 0px;
        width: 350px;
        height: 500px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            opacity: 1;
        }
    }
    .back:hover{
        background: @pink;
    }
    .fans_list,.my_followed{
        position: absolute; right: 20px; top: 20px;
        width: 800px;
        height: 460px;
        box-sizing: border-box;
        border: 3px solid rgb(44, 255, 244);
        border-radius: 10px;
        .table{
            position: absolute; top: 0; left: 50px;
            width: 700px;
            height: 40px;
            line-height: 60px;
            .nickname{
                margin: 0 0 0 150px;
                width: 300px;
            }
            .follow_time{
                position: absolute; right: 0; top: 0;
                width: 200px;
                text-align: center;
            }
        }
        ul{
            position: absolute; top: 40px; left: 0;
            width: 800px;
            height: 36px;
            li{
                position: relative;
                margin: 30px 0 0 50px;
                width: 700px;
                height: 70px;
                box-sizing: border-box;
                border: 2px solid yellow;
                border-radius: 10px;
                box-shadow: 0 0 10px yellow;
                cursor: pointer;
                .head_image{
                    position: absolute; top: 10px; left: 50px;
                    box-sizing: border-box;
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    border: 2px solid yellow;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .nickname{
                    position: absolute; top: 20px; left: 150px;
                    width: 250px;
                    height: 30px;
                }
                .followHe,.cancel_followed{
                    position: absolute; top: 18px; left: 10px;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 15px;
                    background: rgb(177, 2, 2);
                    border-radius: 8px;
                    transition: all .2s;
                }
                .followHe:hover,.cancel_followed:hover{
                    background: red;
                }
                .followed_time{
                    position: absolute; right: 10px; top: 10px;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                }
                .detail{
                    position: absolute; right: -70px; top: 15px;
                    box-sizing: border-box;
                    display: none;
                    width: 80px;
                    height: 40px;
                    text-align: center;
                    line-height: 37px;
                    background: turquoise;
                    border-radius: 15px;
                    border: 4px solid rgb(0, 116, 104);
                    transition: all .2s;
                }
                .detail:hover{
                    border-color: white;
                    box-shadow: 0 0 10px white;
                }
            }
            li:hover{
                box-shadow: 0 0 30px;
            }
            li:hover .detail{
                display: block;
            }
        }
    }
}
</style>