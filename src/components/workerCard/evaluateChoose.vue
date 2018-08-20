<template>
    <div class="bgf w100 h100 oh-y-a pa3"  style="padding-bottom : 5rem;">
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
          <img v-if='vifShow(index)' src="../../assets/images/wechat/workerCars/组 1341@2x.png" alt="">
          <img v-if='vifShow(index)' src="../../assets/images/wechat/workerCars/组 134@2x.png" alt="">
          </div>
        </div>
        <div class="mt3 fz14">
          <p>看风景阿大口径的辅导费记得看房东发电机房看到附件的方法积分卡放假啊发加快</p>
        </div>
      </div>
    </div>
        <div class="footer w100 bgf">
            <p class="fz14">已选中<span style="color:rgba(255, 28, 0, 1)">{{num}}</span>张</p>
            <p class="fz17"  @click="submit()">确认</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "evaluateChoose",
    data() {
        return {
            num:0,
            evaluteList: [],
            selectList : [],//缓存选中数组
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
            //判断是否选中
            selectList.forEach((el,index) => {
                if ($index === el) {
                    //标记删除
                    this.selectList.splice(index,1);
                } else {
                    //标记选中
                    this.selectList.push(el);
                }
            })
        },

        //判断图片是否显示
        vifShow ($index) {
            if (this.selectList.indexOf($index)) {
                return true;
            } else {
                return false;
            }
        },

        //确定按钮
        submit () {
            
        }

    }
};
</script>
<style scoped lang='scss'>
    .evalut-top {
        height: 9rem;
    }
    .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    box-shadow:0rem -0.1rem 0rem rgba(236,236,236,1);
        p:nth-of-type(1) {
        line-height: 4.05rem;
        padding-left: 1rem;
    };
       p:nth-of-type(2) {
        width: 12rem;
        line-height: 4.05rem;
        position: absolute;
        top:0;
        right: 0;
        text-align: center;
        background-color: rgba(255, 209, 2, 1);
    }
}
</style>