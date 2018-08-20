<template>
    <div class="bgf w100 h100 oh-y-a pa3"  style="padding-bottom : 5rem;">
        <div class="bgf5 p23 mb3 flex-ajc evalut-top">
            <span style="font-size:3.2rem;">+</span>
            <p class="fz20">&nbsp;选择评价</p>
        </div>
      <div class="worker-comment-box">
      <div class="bgf5 p23 mb3" v-for="i in 10" :key="i">
        <div class="manyComments">
          <div class="flex">
            <div class="img-box mr2" style="width: 5rem;">
              <img src="../../assets/images/noheader.png" alt="">
            </div>
            <div>
              <p class="fz15 mt2">张先生</p>
              <p class="fz14 mt2">安装五金配件</p>
            </div>
          </div>
          <p class="mt2 fz13 c6">2017年11月30日</p>
          <div style="width:1.5rem;height:1.5rem;margin-top:-4px;" @click="delteList(i)">
          <img src="../../assets/images/wechat/workerCars/关闭@2x.png" alt="">
          </div>
        </div>
        <div class="mt3 fz14">
          <p>看风景阿大口径的辅导费记得看房东发电机房看到附件的方法积分卡放假啊发加快</p>
        </div>
      </div>
    </div>
    <div class="evalut-bottom w100 flex-ajc btn-invite-orange pf" style="height:5rem;">
        <p class="fz17">确定</p>
    </div>
    </div>
</template>
<script>
export default {
    name: "evaluteTemplate",
    data() {
        return {
            evaluteList: []
        };
    },
    mounted() {},
    methods: {
        //获取列表
        getEvalutList() {
            this.evaluteList = {
                img: "../../assets/images/img/give_up.png",
                name: "张大圣",
                typ: "安装五金配件",
                time: "2017年11月30日",
                datas:
                    "我有时间, 我距离那个地方很近,如果可以的话下午见面了了一下,看你时间"
            };
        },

        //点击删除
        delteList ($index) {
            this.evaluteList.splice($index,1);
        },

        //确定按钮
        submit () {
            
        }
    }
};
</script>
<style scoped>
    .evalut-top {
        height: 9rem;
    }
</style>