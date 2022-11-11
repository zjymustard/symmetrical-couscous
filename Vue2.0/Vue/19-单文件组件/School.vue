/* 组件的结构 */
<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">提示</button>
  </div>
</template>

/* 组件交互相关代码（数据、方法等） */
<script>
export default {
  name:'School',
  data() {
    return {
      name: "哔哩哔哩",
      address: "上海",
    };
  },
  methods: {
    showName() {
      alert("哔哩哔哩");
    },
  },
};
</script>

/* 组件的样式 */
<style>
.demo {
  background-color: orange;
}
</style>