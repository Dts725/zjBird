<template>
  <div :class="{warp1 : isShow ===1,warp2 : isShow ===2,warp3 : isShow ===3}" class="pr">
    <div v-show="isShow ===1" class="pr">
      <img src="../../assets/images/eggs/HonorCard1.png" alt="">
      <slot v-show="isShow ===1" name="topRight1"></slot>
    </div>
    <div v-show="isShow ===1" class="flex-clounm-spac-center top-center">
      <div class="flex-start w100">
        <span class="fz40" :class="{fc1 : isShow ===1}" v-show='String(eggsNumber.availableEggNum).length<=2'>{{eggsNumber.availableEggNum}}</span>
        <span class="fz40" :class="{fc1 : isShow ===1}" v-show='String(eggsNumber.availableEggNum).length>2'>{{String(eggsNumber.availableEggNum).substr(0,String(eggsNumber.availableEggNum).length-2)}}<span
         :class="{fc1 : isShow ===1}" class="fz25">{{String(eggsNumber.availableEggNum).substr(-2)}}</span></span>
        <img style="width:1.15rem;height:1.5rem;transform:translate(1rem,0.5rem);"
             src="../../assets/images/eggs/black.png" alt="">
        <span style="transform: translate(1.8rem,0.5rem);" class=" fz15" :class="{fc1 : isShow ===1}">(个)</span>
      </div>
      <div>
        <p class="fz15" :class="{fc1 : isShow ===1}">{{eggsNumber.radio}}</p>
      </div>
    </div>
    <div v-show="isShow ===2">
      <img src="../../assets/images/eggs/goldCard.png" alt="">
      <slot v-show="isShow ===2" name="topRight2"></slot>
    </div>
    <div v-show="isShow ===2" class="flex-clounm-spac-center top-center">
      <div class="flex-start w100">
        <span class="fz40" :class="{fc2 : isShow ===2}" v-show='String(eggsNumber.availableEggNum).length<=2'>{{eggsNumber.availableEggNum}}</span>
        <span class="fz40" :class="{fc2 : isShow ===2}" v-show='String(eggsNumber.availableEggNum).length>2'>{{String(eggsNumber.availableEggNum).substr(0,String(eggsNumber.availableEggNum).length-2)}}<span
         :class="{fc2 : isShow ===2}" class="fz25">{{String(eggsNumber.availableEggNum).substr(-2)}}</span></span>
        <img style="width:1.15rem;height:1.5rem;transform: translate(1rem,0.5rem);"
             src="../../assets/images/eggs/white.png" alt="">
        <span style=" transform: translate(1.8rem,0.5rem);" class="fz15" :class="{fc2 : isShow ===2}">(个)</span>
      </div>
      <div>
        <p class="fz15" :class="{fc2 : isShow ===2}">{{eggsNumber.radio}}</p>
      </div>
    </div>
    <div v-show="isShow ===3">
      <img src="../../assets/images/eggs/blackCard.png" alt="">
      <slot v-show="isShow ===3" name="topRight3"></slot>
    </div>
    <div v-show="isShow ===3" class="flex-clounm-spac-center top-center">
      <div class="flex-start w100">
        <span class="fz40" :class="{fc3 : isShow ===3}" v-show='String(eggsNumber.availableEggNum).length<=2'>{{eggsNumber.availableEggNum}}</span>
        <span class="fz40" :class="{fc3 : isShow ===3}" v-show='String(eggsNumber.availableEggNum).length>2'>{{String(eggsNumber.availableEggNum).substr(0,String(eggsNumber.availableEggNum).length-2)}}<span
         :class="{fc3 : isShow ===3}"  class="fz25">{{String(eggsNumber.availableEggNum).substr(-2)}}</span></span>
        <img style="width:1.15rem;height:1.5rem;transform: translate(1rem,0.5rem);"
             src="../../assets/images/eggs/glod.png" alt="">
        <span style=" transform: translate(1.8rem,0.5rem);" class=" fz15" :class="{fc3 : isShow ===3}">(个)</span>
      </div>
      <div>
        <p class="fz15" :class="{fc3 : isShow ===3}">{{eggsNumber.radio}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "top",
    props: {
      isShow: {
        type: Number,
        default: 2
      },
      eggsNumber: {}
    },
    data() {
      return {};
    }
  };
</script>
<style scoped lang="scss">
  .warp1 {
    background: linear-gradient(rgba(255, 204, 0, 1), rgba(255, 186, 0, 1));
    padding: 1.5rem 0.8rem;
  }

  .warp2 {
    background: linear-gradient(#e6d1a4, #c0a675);
    padding: 1.5rem 0.8rem;
  }

  .warp3 {
    background: linear-gradient(rgba(32, 29, 30, 1), rgba(59, 55, 53, 1));
    padding: 1.5rem 0.8rem;
  }

  .top-center {
    position: absolute;
    top: 50%;
    left: 2.15rem;
    transform: translateY(-50%);
  }

  .fc1 {
    color: rgba(51, 51, 51, 1);
  }

  .fc2 {
    color: rgba(255, 255, 255, 1);
  }

  .fc3 {
    color: rgba(213, 173, 119, 1);
  }
</style>
