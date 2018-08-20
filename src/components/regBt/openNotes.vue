<template>
  <div class="bt-container bgf5 w100 h100">
    <div class="f3 bgf">
      <div class="f3  p23 border-b flex-space-between">
        <p>紧急联系人</p>
        <input type="text" class="name-input  tar" placeholder="请输入紧急联系人姓名（必填）" maxlength="40" v-model="contactUser">
      </div>
      <div class="f3  p23 flex-space-between">
        <p>手机号码</p>
        <input type="tel" class="name-input  tar" placeholder="请输入手机号码（必填）" maxlength="11" v-model="contactTel">
      </div>
    </div>
    <div class="f3 mt3 bgf">
      <div class="f3  p23 border-b flex-space-between">
        <p>紧急联系人</p>
        <input type="text" class="name-input  tar" placeholder="请输入紧急联系人姓名" maxlength="40" v-model="contactUser1">
      </div>
      <div class="f3  p23 flex-space-between">
        <p>手机号码</p>
        <input type="tel" class="name-input tar" placeholder="请输入手机号码" maxlength="11" v-model="contactTel1">
      </div>
    </div>
    <div class="f3 mt3 bgf">
      <div class="f3  p23 border-b flex-space-between">
        <p>紧急联系人</p>
        <input type="text" class="name-input tar" placeholder="请输入紧急联系人姓名" maxlength="40" v-model="contactUser2">
      </div>
      <div class="f3  p23 flex-space-between">
        <p>手机号码</p>
        <input type="tel" class="name-input tar" placeholder="请输入手机号码" maxlength="11" v-model="contactTel2">
      </div>
    </div>

    <div class="f3 flex-ajc mt4" style="padding-bottom:17rem;">
      <i class="icon-mark mr3" style="color:#30c48b;border: 1px solid #30C48B;">!</i>
      <p class="cgreen">住建鸟不会透漏联系人信息，请放心填写</p>
    </div>
    <!--固定的我要还款按钮-->
    <div class="pf tac height-btn  w100 f3" @click="nextOne()" :class="focusFlag ? 'btn-bt-default' :'btn-bt-orange' ">
      下一步
    </div>
  </div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import formError from '../../tools/formerror'
  import lstore from '../../tools/lstore'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui'


  var store = {};
  var method = {};
  store.isNext = true;
  store.focusFlag = true;
  store.contactUser = '';
  store.contactTel = '';
  store.contactUser1 = '';
  store.contactTel1 = '';
  store.contactUser2 = '';
  store.contactTel2 = '';
  store.contactUsers = '';//通讯录
  store.tips = {"dialogMsg": "获取联系人失败! 获取联系人授权", "cancleShowTxt": "取消", "isConfirmAndCancel": 1, "cancleAble": true};//弹窗信息
  method.toast = function (tips) {
    Toast({
      message: tips,
      position: 'center',
      duration: 1500,
    });
  };
  //校验手机号
  method.regular = function (args) {
    let mach = /^[1][3,4,5,7,8,6,9][0-9]{9}$/;
    if (!mach.test(args)) {
      args = args.slice(0, 11);
      // store.vm.$toast("请输入正确的手机号~","center");
      method.toast("请输入正确的手机号~");
      return args;
    }
    ;
  };
  //拿手机号的方法
  method.getLinkman = function(){
    MessageBox.confirm("填写联系人需要读取联系人信息 请您允许读取, 否则无法开通", '"住建鸟"想访问您的通讯录').then(action => {
      core.$app('get_contacts_contract', 'info').then((res) => {
        store.res = JSON.parse(res);
        if(store.res.code != 500){
          store.form.contactUsers = JSON.stringify(store.res);
          method.postInfo();
        } else {
          method.toast("您拒绝了联系人权限请允许~");
        }
      });
    });
  };
  //点击下一步
  method.nextOne = function () {
    //校验手机号
    if (store.contactUser || store.contactTel) {
      if (method.regular(store.contactTel)) {
        store.contactTel = method.regular(store.contactTel);
        return true
      }

    }
    //校验第二个手机号
    if (store.contactUser1 || store.contactTel1) {
      if (!store.contactUser1) {
        // store.vm.$toast("紧急联系人不能为空~","center");
        method.toast("紧急联系人不能为空~");

        return true;
      }
      if (store.contactTel1.length === 0) {
        // store.vm.$toast("紧急联系人手机号不能为空~","center");
        method.toast("紧急联系人手机号不能为空~");
        return true;
      } else {
        if (method.regular(store.contactTel1)) {
          store.contactTel1 = method.regular(store.contactTel1);
          return true;
        }
      }
    }
    //校验第三个手机号
    if (store.contactUser2 || store.contactTel2) {
      if (!store.contactUser2) {
        // store.vm.$toast("紧急联系人不能为空~","center");
        method.toast("紧急联系人不能为空~");
        return true;
      }
      if (store.contactTel2.length === 0) {
        // store.vm.$toast("紧急联系人手机号不能为空~","center");
        method.toast("紧急联系人手机号不能为空~");
        return true;
      } else {
        if (method.regular(store.contactTel2)) {
          store.contactTel2 = method.regular(store.contactTel2);
          return true;
        }
      }
    }

    store.form = {
      contactUser: store.contactUser,
      contactTel: store.contactTel,
      contactUser1: store.contactUser1,
      contactTel1: store.contactTel1,
      contactUser2: store.contactUser2,
      contactTel2: store.contactTel2
      // contactUsers: store.contactUsers
    };

    var errorconf = {
      "contactUser": {
        "required": true,
        "required_tip": "紧急联系人不能为空"
      },
      "contactTel": {
        "required": true,
        "required_tip": "紧急联系人电话不能为空"
      }
    };
    var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
    if (!SubmitOk) {
      return false;
    }
    if(!store.form.contactUsers){//说明拒绝了
      method.getLinkman();
    }else {
      method.postInfo();
    }
  };

  //传用户信息
  method.postInfo = function(){
    Object.assign(store.form, store.forms);//合并两个对象
    console.log(store.form);
    api.regBt(store.form).then(function (res) {
      if (res.code == error.success) {
        method.toast("提交成功");
        setTimeout(function(){
            store.vm.$router.push({path: "/lookBt"});
        },200);
      }else if(res.code == error.error){
        method.toast("提交失败");
      }
    });
  };

  method.focus = function (args) {
    if (store.contactUser && store.contactTel) {
      store.focusFlag = false;
    } else {
       store.focusFlag= true;
    }
  };
  export default {
    name: "openNotes",
    data() {

      return store;
    },
    watch: {
      contactUser: method.focus,
      contactTel: method.focus,
    },
    methods: method,
    mounted() {
      //设置title
      store.title_info = {
        "title": "开通" + this.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA,
        "actionRight": {
          "actionText": "",
          "actionTextColor": "#333333"//ios不传可能闪退
        },
        "bgColor": "#ffffff"
      };
      core.$app('title_info_control', store.title_info).then((res) => {
      });
      store.vm = this;
      store.forms = lstore.get_item('form');
      if (store.forms) {
        store.forms = lstore.get_item('form').val;
      }
      console.log(store.forms);
    }
  }
</script>

<style scoped>
</style>
