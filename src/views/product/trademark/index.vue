<template>
  <el-card>
    <!-- 卡片顶部添加按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，展示平台数据 -->
    <!--
		border		设置竖边框
		data			表格每一列的数据，必须是数组
		label			设置标题
		width			设置列宽
		align			设置对齐方式
		type			设置该列的类型:selection(多选框),index(生成序号),expand(可展开)
		prop			设置这一列对应的字段名称
		插槽:可自定义显示的标签以及标签的样式 row(当前行的数据),$index(当前数据的索引)
		-->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column label="品牌名称" align="center">
        <!-- 自定义插槽，可自定义标签和样式 -->
        <template #="{ row }">
          <p style="font-weight: bold">{{ row.tmName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #="{ row }">
          <p style="color: #409eff">{{ row.logoUrl }}</p>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #default>
          <el-button type="primary" size="small" icon="Edit"> </el-button>
          <el-button type="danger" size="small" icon="Delete"> </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <!--
		current-change				事件:当前页码改变时触发
		v-model:current-page	设置当前页码
		v-model:page-size			设置每一页展示的数据条数
		:page-sizes						设置每一页显示数据条数的下拉菜单选项
		pager-count						设置分页器展示的最大页码按钮数
		:small								是否启用小型分页器
		:disabled							是否禁用分页器
		:background						页码选择按钮是否有背景色
		layout								设置六个子组件的布局顺序以及需要显示的子组件
		:total								设置数据总条数
		-->
    <el-pagination
      @size-change="onSizeChange"
      @current-change="onPageChange"
      v-model:current-page="currentPageNuber"
      v-model:page-size="pageSizeLimit"
      :page-sizes="[3, 5, 7, 9]"
      :pager-count="9"
      :small="false"
      :disabled="false"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total" />
  </el-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { reqProudctTrademark } from "@/api/product/trademark";
  //引入ts类型
  import type {
    records,
    trademarkResponseData,
  } from "@/api/product/trademark/type";
  //当前页码
  let currentPageNuber = ref<number>(1);
  //每一页展示多少条数据
  let pageSizeLimit = ref<number>(3);
  //存储已有数据的总条数
  let total = ref<number>(0);
  //存储已有请求到的全部数据
  let trademarkArr = ref<records>([]);
  //将获取页码以及页面数据的请求和处理封装成一个函数
  async function getTrademarkInfo() {
    let result: trademarkResponseData = await reqProudctTrademark(
      //传递参数：当前页码
      currentPageNuber.value,
      //传递参数；每一页展示多少条数据
      pageSizeLimit.value,
    );
    //判断请求是否成功
    if (result.code == 200) {
      //存储请求到的数据总数，并渲染到页面
      total.value = result.data.total;
      trademarkArr.value = result.data.records;
    }
  }
  //绑定事件:当页码改变时触发,也可使用watch实现
  function onPageChange() {
    //当页码改变时就重新发送一次请求
    getTrademarkInfo();
  }
  //绑定事件:当每一页的数据数目发生变化时触发
  function onSizeChange() {
    //当每一页的数据数目发生变化时重新发送一次请求
    getTrademarkInfo();
  }
  //组件一挂载完毕就发一次请求
  onMounted(() => {
    getTrademarkInfo();
  });
</script>

<style scoped></style>
