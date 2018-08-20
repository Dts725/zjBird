<template>
    <div class="test">
        <p>点击查看消息</p>
        <p v-if="flag" class="test2">
        {{data}}
        </p>
        <!--<button @click="userInfo()">获取工友用户信息</button>-->
        <!--<button @click="routers()">点击跳转白条</button>-->
        <!--<button @click="getContent()" >获取联系人</button>-->
        <!--<button @click="button1()">原生弹窗单按钮</button>-->
        <!--<button @click ="photo()" > 点击调用相册</button>-->
        <br>
        <!--<button @click ="bigImg()" > 查看大图</button>-->
        <!--<button @click ="tosat()" > 点击土司</button>-->
        <button @click ="alterView()" >双按钮 弹窗显示</button>
        <!--<button  @click="claaPhone()">打电话</button>-->
        <ul v-cloak>
            <li v-for="item in contents.result" :key='item.id'>{{item.lastname}} +':'{{item.mobile}} </li>
        </ul>
    </div>
</template>
<script>
import core from   '../core/jsbridge/core'
//
export default {
    name : 'test2',
    data(){
        return{
            flag : false,
            data : [],
            photos :{"cutout":{"width":750,"height":750},"imageCount":1}, //查看手机相册
            bigImage :{"title":"认证样例","imagelist":["http://xxxx.com/42356346346.jpg","http://xxxx.com/42356346346.jpg","http://xxxx.com/42356346346.jpg"],"position":5},//产看大图
            alertViews : {"dialogMsg":"我是提示信息66666","cancleShowTxt":"取消","confirmShowTxt":"确认","isConfirmAndCancel":3,"cancleAble":false},//土司弹窗提示
            toasts : "我是一个土司信息",
            button1s : {"dialogMsg":"我是提示信息","cancleShowTxt":"取消","isConfirmAndCancel":1,"cancleAble":true},
            clallPhones : 110,
            contents : ""

        }
    },

    mounted (){
        // 提供给app取消方法名：js_click_cancle；提供给app确认方法名:js_click_confrim；
        //     core.$reg('title_right_click',this.routers).then(function(res){
        //             alert("可以了")
        //     })
        //     core.$reg('js_click_cancle',this.routers).then(function(res){
        //             alert("取消按钮")
        //     })
        //     core.$reg('js_click_confrim',this.routers).then(function(res){
        //             alert("确定按钮")
        //     })
        // this.routers();
        // fnn('页面加载调用成功了');

    },
    methods : {
        //调用相册
        photo : function () {
            core.$app('take_image',this.photos).then(function(res){
                // console.log(res)
                console.log('大图查看成功')
            })
            console.log("调到相册了")
        },
        //查看大图
        bigImg : function () {
            core.$app('image_preview',this.bigImage).then(function(res){
                // console.log(res);
                console.log("查看大图成功")
            })
            console.log("查看大图")
        },
        //土司
        tosat :function (){
            core.$app('toast_show',this.toasts).then(function(res){
                // console.log(res)
                console.log("土司成功")
            })
            console.log("土司")
        },
        //双按钮
        alterView : function () {
            core.$app('dialog_show',JSON.stringify(this.alertViews)).then(function(res){
                // console.log(res)

                console.log('弹窗显示成功')
            })
        },
        //但按钮
        button1 :  function () {
            console.log(JSON.stringify(this.button1s))
            core.$app('dialog_show',JSON.stringify(this.button1s)).then((res)=>{

            })        },
            //打电话
        claaPhone : function() {
            core.$app('call_phone',this.clallPhones).then((res)=>{
                console.log(res);
            })
        },
        //获取工友信息
        userInfo : function () {
            core.$app('get_user_info','userinfo').then((res) => {
                try {
                let userinfo=JSON.parse(res);
                console.log(userinfo.name);
                }
                catch(err) {
                    console.log('进入错误抛异常了')
                    console.log(err)
                }

            })
        },
        //获取联系人
        getContent : function () {
            console.log("908908080980")
            core.$app('get_contacts_contract','uuhi').then((res)=>{
                console.log(res);
                // this.contents = JSON.parse(res);
            })
        },
        //原生调用h5
        routers : function () {
            console.log("8das8dasuidhasdhasda")
            this.$router.push('/whiteBar')
        }
}
}
</script>
<style>
.test {
cursor: pointer;
margin: 100px auto;
width: 400px;
height: 100px;
line-height: 100px;
text-align: center;
background-color: yellowgreen;
}
.test2{
    background-color: blueviolet;
    color: #fff;
}
</style>


