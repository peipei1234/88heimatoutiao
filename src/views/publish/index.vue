<template>
  <el-card class="card">
    <div slot="header" class="clearfix">
    <span>卡片名称</span>
  </div>
  <!-- 文章标题 -->
  <el-form ref="form" :model="filterForm" label-width="80px">
  <el-form-item label="标题">
    <el-input
    v-model="filterForm.title"
    placeholder="文章名称"
    ></el-input>
  </el-form-item>
  <!-- 文章内容 -->
  <el-form-item label="内容">
  <quillEditor
  v-model="filterForm.content"
  ref="myQuillEditor"
  :options="editorOption"
  class="richer"
  >
  </quillEditor>
  </el-form-item>
  <!--
   -->
  <!-- 封面 -->
<!-- <el-form-item label="封面">
    <el-radio-group>
      <el-radio label="单图"></el-radio>
      <el-radio label="三图"></el-radio>
      <el-radio label="无图"></el-radio>
      <el-radio label="自动"></el-radio>
    </el-radio-group>
  </el-form-item> -->
  <el-form-item label="频道列表">
    <el-select  placeholder="请选择频道" v-model="filterForm.channel_id">
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
        ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit(false)">发表</el-button>
    <el-button @click="onSubmit(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
  </el-card>
</template>

<script>
// 加载富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 加载富文本的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor
  },
  data () {
    return {
      filterForm: {
        channel_id: '',
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        }
      },
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onSubmit (draft) {
      // const token = window.localStorage.getItem('user-token')
      console.log('提交成功')
      this.$axios({
        method: 'POST',
        url: '/articles',
        headers: {
          // 不需要传递
          // ContentType: 'application/json',
          // Authorization: `Bearer ${token}`
        },
        params: {
          draft
        },
        data: this.filterForm
      }).then(res => {
        console.log(res, '发布成功')
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
        this.$router.push('/article')
      }).catch(err => {
        console.log(err, '保存失败')
        this.$message.error('标题不要少于5个字符哦')
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
