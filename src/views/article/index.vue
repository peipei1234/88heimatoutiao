<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
        <!-- 内容 -->
      <el-form>
        <!-- 文章状态 -->
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio  :label="null">全部</el-radio>
            <el-radio  label="0">草稿</el-radio>
            <el-radio  label="1">待审核</el-radio>
            <el-radio  label="2">审核通过</el-radio>
            <el-radio  label="3">审核失败</el-radio>
            <el-radio  label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道列表 -->
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
        <!-- 时间选择 -->
        <span>时间选择：</span>
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-form-item>
     <el-button type="primary" @click="loadArticle(1)">查询</el-button>
    </el-form-item>
    </el-form>

    </el-card>
<!-- 文章列表 -->
   <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ total_count }}条符合条件的内容</span>
      </div>
      <!-- 列表内容 -->
        <el-table

          :data="articels"
          style="width: 100%">
          <el-table-column
            prop="cover"
            label="封面"
            width="180"
            >
            <!-- 自定义表格列 -->
            <template slot-scope="scope">
              <img width='50' src="../../assets/u=347508467,3785403878&fm=26&gp=0.jpg" v-show="!scope.row.cover.images[0]">
              <img width='50' :src="scope.row.cover.images[0]">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="文章内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
            <!-- 自定义表格列 -->
            <template slot-scope="scope">
              <el-tag
              :type="articleStatus[scope.row.status].type"
              >{{ articleStatus[scope.row.status].label }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
            <el-button type="primary" size='mini'>编辑</el-button>
            <el-button type="info" size='mini' @click="onDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
        background
        layout="prev, pager, next"
        :total='total_count'
        @current-change='onPageChange'
        >
      </el-pagination>
      </div>

     </el-card>
  </div>
</template>

<script>

export default {
  name: 'articel',
  data () {
    return {
      rangeDate: [],
      page: 0,
      filterForm: {
        status: null,
        begin_pubdate: '',
        end_pubdate: '',
        channel_id: null
      },
      channels: [],
      total_count: '',
      articels: [],
      articleStatus: [
        {
          type: '',

          label: '草稿'
        },
        {
          type: 'warning',

          label: '待审核'
        },
        {
          type: 'success',

          label: '审核通过'
        },
        {
          type: 'warning',

          label: '审核失败'
        },
        {
          type: 'warning',

          label: '已删除'
        }
      ]
    }
  },
  created () {
    this.loadArticle()
    this.loadChannels()
  },
  methods: {
    onDel (index) {
      console.log('delete')
      console.log(index)
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'DELETE',
        url: `/articles/${index}`,
        // params: index,
        headers: {
          // 不需要传递
          // ContentType: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('删除成功')
        this.loadArticle()
      }).catch(err => {
        console.log(err, '删除失败')
      })
    },
    loadArticle (page = 1) {
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page, // 页码
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          // channel_id: '',
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
          //
        }
      }).then(res => {
        // res.data.data.page = this.currentPage
        // this.page = res.data.data.page
        this.total_count = res.data.data.total_count
        this.articels = res.data.data.results
        console.log(res.data)
      }).catch(err => {
        console.log(err, '没有找到')
      })
    },
    onPageChange (page) {
      // 记录当前页的页码
      this.page = page
      this.loadArticle(page)
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
  }
</style>
