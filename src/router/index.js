//引入路由
import VueRouter from 'vue-router'

//引入home路由组件
import Home from '../pages/home/Home.vue'
import ReadMe from '../pages/home/ReadMe'

//引入注册路由组件
import Login from '../pages/login/Login'
import Register from '../pages/login/Register'

//引入翻译组件
import Translate from '../pages/translate/Translate'
import TDetail from '../pages/translate/TDetail'
import UserTranslate from '../pages/translate/UserTranslate'
import UserCommentT from '../pages/translate/UserCommentT'

//引入写作组件
import Write from '../pages/write/Write'
import DetailW from '../pages/write/DetailW'
import UserWrite from '../pages/write/UserWrite'
import UserCommentW from '../pages/write/UserCommentW'

//引入提供组件
import Offer from '../pages/offer/Offer'
import AddTranslate from '../pages/offer/AddTranslate'
import AddWrite from '../pages/offer/AddWrite'

//引入个人面板组件
import Individual from '../pages/individual/Individual'
import Github from '../pages/individual/Github'
import MyFans from '../pages/individual/MyFans'
import MyFansDetail from '../pages/individual/MyFansDetail'
import ShowMyAnswer from '../pages/individual/ShowMyAnswer'
import MyReceivedComments from '../pages/individual/MyReceivedComments'
import MyDetailInfo from '../pages/individual/MyDetailInfo'
import MyLikes from '../pages/individual/MyLikes'
import SetHeadImage from '../pages/individual/SetHeadImage'
import FansTranslateAndWrite from '../pages/individual/FansTranslateAndWrite'

export default new VueRouter({
    routes : [
        {path:'/',redirect:'/home'},
        {
            path : '/home',
            component : Home,
            children : [
                {
                    path : '/home/readme',
                    component : ReadMe
                }
            ]
        },
        {
            path : '/login',
            component : Login,
            children : [
                {
                    path : '/login/register',
                    component : Register
                }
            ]
        },
        {
            path : '/translate',
            component : Translate,
            children : [
                {
                    path : '/translate/translate_detail',
                    component : TDetail
                },
                {
                    path : '/translate/translate_user',
                    component : UserTranslate,
                    children : [
                        {
                            path : '/translate/translate_user/translate_comment',
                            component : UserCommentT
                        }
                    ]
                }
            ]
        },
        {
            path : '/write',
            component : Write,
            children : [
                {
                    path : '/write/write_detail',
                    component : DetailW,
                },
                {
                    path :'/write/write_user',
                    component : UserWrite,
                    children:[
                        {
                            path : '/write/write_user/write_comment',
                            component : UserCommentW
                        }
                    ]
                }
            ]
        },
        {
            path : '/offer',
            component : Offer,
            children : [
                {
                    path : '/offer/add_translate',
                    component : AddTranslate
                },
                {
                    path : '/offer/add_write',
                    component : AddWrite
                }
            ]
        },
        {
            path : '/individual',
            component : Individual,
            children : [
                {
                    path : '/individual/my_github',
                    component : Github
                },
                {
                    path : '/individual/my_fans',
                    component : MyFans,
                    children : [
                        {
                            path : '/individual/my_fans/fans_index',
                            component : MyFansDetail, //粉丝详情页面
                            children:[
                                {
                                    path : '/individual/my_fans/fans_index/fans_translateAndWrite',
                                    component : FansTranslateAndWrite
                                }
                            ]
                        }
                    ]
                },
                {
                    path : '/individual/my_answer',
                    component  :ShowMyAnswer
                },
                {
                    path : '/individual/my_received',
                    component : MyReceivedComments
                },
                {
                    path : '/individual/my_detailInfo',
                    component : MyDetailInfo
                },
                {
                    path : '/individual/my_likes',
                    component : MyLikes
                },
                {
                    path :'/individual/set_headImage',
                    component : SetHeadImage
                }
            ]
        }
    ]
})