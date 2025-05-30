<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addItem"
        >添加品牌</el-button
      >
      <!-- 表格组件,展示平台数据 -->
      <!--
		border		设置竖边框
		data			表格每一列的数据,必须是数组
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
          <!-- 自定义插槽,可自定义标签和样式 -->
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
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateItem(row)">
            </el-button>
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
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total" />
    </el-card>
    <!-- 对话框组件:用于添加和修改 -->
    <!--
		 v-model			布尔值,用于设置对话框的打开和关闭
		 title				用于设置对话框左上角的标题
			-->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '编辑数据' : '添加数据'"
      width="500">
      <!--
			model				表单内容收集到了哪里(对象{})
			rules				表单验证
			-->
      <el-form :model="trademarkParams" :rules="rules" ref="elFormRef">
        <!-- 第一个输入框 -->
        <!-- prop		 model的键名,两者配合使用-->
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <!-- 第二个输入框 -->
        <el-form-item label="品牌名称" label-width="80px">
          <p>{{ fileName }}----{{ trademarkParams.logoUrl }}</p>
        </el-form-item>
        <!-- 第三个输入框 -->
        <el-form-item label="品牌图标" label-width="80px" prop="logoUrl">
          <!--
					action						请求的url地址
					:headers					设置请求头:json对象格式
					:show-file-list		是否显示已上传文件列表
					:before-upload		在文件上传之前触发的事件,参数为上传的文件信息
					:on-success				当文件上传成功时触发的事件,参数response,uploadFile
					:limit							设置允许文件上传的最大数量
					  -->
          <el-upload
            class="file-uploader"
            ref="fileUploadRef"
            action="http://127.0.0.1:3000/product/trademark/fileupload"
            :headers="{ fileName }"
            :show-file-list="true"
            :drag="true"
            :on-exceed="onExceed"
            :before-upload="beforeFileUpload"
            :on-success="onFileUploadSuccess"
            :on-remove="onFileRemoved"
            :limit="1"
            :auto-upload="true">
            <el-icon class="file-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 对话框底部选项按钮footer使用具名插槽 -->
      <template #footer>
        <el-button type="primary" size="dafault" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="dafault" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import {
    reqProudctTrademark,
    reqAddOrUpdateTrademark,
  } from "@/api/product/trademark";
  //引入ts类型
  import type {
    records,
    trademarkResponseData,
    trademark,
  } from "@/api/product/trademark/type";
  import { ElMessage } from "element-plus";
  //当前页码
  let currentPageNuber = ref<number>(1);
  //每一页展示多少条数据
  let pageSizeLimit = ref<number>(9);
  //存储已有数据的总条数
  let total = ref<number>(0);
  //存储已有请求到的全部数据
  let trademarkArr = ref<records>([]);
  //控制对话框的显示与隐藏
  let dialogFormVisible = ref<boolean>(false);
  //获取上传按钮元素
  let fileUploadRef: any = ref(null);
  //获取表单元素
  let elFormRef = ref();
  //定义一个trademark对象用于存储用户填写表单新增的trademark条目
  let trademarkParams = reactive<trademark>({
    id: 0,
    tmName: "",
    logoUrl: "",
  });
  //定义一个变量存储用户上传文件的文件名
  let fileName = ref("");

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
      //存储请求到的数据总数,并渲染到页面
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
  //绑定点击事件,当点击添加品牌时触发,弹出对话框
  function addItem() {
    //因为是新增,应清除id值
    trademarkParams.id = 0;
    //每次打开时应清空已填写的表单数据
    trademarkParams.tmName = "";
    trademarkParams.logoUrl = "";
    fileName.value = "";
    //弹出对话框
    dialogFormVisible.value = true;
    //js/ts问号法:点击添加按钮时清除表单验证的提示信息
    elFormRef.value?.clearValidate();
  }
  //绑定点击事件,当点击每一条数据后的编辑按钮时触发,弹出对话框
  function updateItem(row: any) {
    trademarkParams.id = row.id;
    trademarkParams.tmName = row.tmName;
    trademarkParams.logoUrl = row.logoUrl;

    dialogFormVisible.value = true;
    //js/ts问号法:点击编辑按钮时清除表单验证的提示信息
    elFormRef.value?.clearValidate();
  }
  //对话框footer部分点击取消触发的事件
  function cancel() {
    //清空文件列表
    fileUploadRef.value.clearFiles();
    //对话框隐藏
    dialogFormVisible.value = false;
  }
  //对话框footer部分点击确定触发的事件
  async function confirm() {
    //确定之前先做表单验证
    try {
      await elFormRef.value.validate();
    } catch (error) {
      return;
    }
    //发送请求之前,对数据进行处理,去除空格
    trademarkParams.tmName = trademarkParams.tmName.trim();
    //点击确定后发送请求,更新或者添加数据
    let result = await reqAddOrUpdateTrademark(trademarkParams);
    //如果返回的信息是200,说明添加成功
    if (result.code == 200) {
      //添加成功,应弹出添加成功的提示信息
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      //添加成功后应该重新获取数据信息
      getTrademarkInfo();
      //清空文件列表
      fileUploadRef.value.clearFiles();
      dialogFormVisible.value = false;
    } else {
      //添加失败
      ElMessage({
        type: "error",
        message: "操作失败",
      });
    }
    //对话框隐藏
  }
  //当上传文件超出限制时触发的钩子函数
  function onExceed() {
    //如果已经上传了一个文件,用户再次上传,则给出提示
    ElMessage({
      type: "error",
      message: "每次仅能上传一个文件",
    });
  }
  //在文件上传完成之前触发的事件对应函数,参数是上传的文件信息对象
  //文件信息对象属性:name(文件名),size文件大小(字节B),type(文件类型)
  function beforeFileUpload(rawFile: any) {
    //上传之前获取文件名,通过请求头带给服务器
    //目前有问题,文件名只能是中文,因为请求头不能使用中文
    fileName.value = rawFile.name;
    //首先限制上传文件类型
    if (
      rawFile.type === "image/png" ||
      rawFile.type === "image/jpeg" ||
      rawFile.type === "image/gif"
    ) {
      //其次限制上传文件大小
      if (rawFile.size / 1024 / 1024 < 4) {
        return true;
      } else {
        ElMessage({
          type: "error",
          message: "上传文件太大",
        });
      }
    } else {
      ElMessage({
        type: "error",
        message: "上传文件类型错误",
      });
      return false;
    }
  }
  //文件上传成功之后触发的事件函数,参数有两个
  //response:文件上传后服务器返回的响应体内容
  //uploadFile:上传的文件的信息和响应体内容
  function onFileUploadSuccess(response: any) {
    //将从服务器获取的文件名赋值给表单的logoUrl项,当点击确定时再带给服务器
    //此处使用文件名表示logourl地址,可更换
    trademarkParams.logoUrl = response.data;
    //当文件上传成功后应清除表单验证的提示信息
    elFormRef.value.clearValidate();
  }
  function onFileRemoved() {
    fileName.value = "";
    trademarkParams.logoUrl = "";
  }
  //组件一挂载完毕就发一次请求
  onMounted(() => {
    getTrademarkInfo();
  });

  //自定义校验规则(当blur时触发)
  //rule表示当前规则函数的内容,value表示当前表单的值
  //callBack表示放行参数为Error则进行提示且不通过验证
  function validatorTmName(_rule: any, value: any, callBack: any) {
    //当文本内容大于3时放行
    if (value.trim().length >= 2) {
      callBack();
    } else {
      //表单未验证成功
      callBack(new Error("名称至少3位"));
    }
  }
  function validatorlogoUrl(_rule: any, value: any, callBack: any) {
    if (value) {
      callBack();
    } else {
      callBack(new Error("图片是必要项"));
    }
  }
  //添加表单校验规则
  let rules = {
    tmName: [
      //required表示这个字段是必须的
      //trigger表示触发校验的时机(blur,change)
      //validator表示校验规则,需要自定义方法,在trigger规定的时机触发后面的方法
      { required: true, trigger: "blur", validator: validatorTmName },
    ],
    logoUrl: [
      {
        required: true,
        validator: validatorlogoUrl,
      },
    ],
  };
</script>

<style scoped>
  .file-uploader {
    width: 100%;
    height: 100%;
  }
</style>
