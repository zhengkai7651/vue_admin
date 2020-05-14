<template>
  <div>
    <div class="container">
      <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10 el-button--small"
                >批量删除</el-button> 
                <el-select v-model="param.address" placeholder="地址" class="handle-select mr10 el-input el-input--small">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>-->
                <el-input v-model="param.keywrods" placeholder="商户名称" class="handle-input mr10 el-input el-input--small"></el-input>
                <el-button class="el-button--small" type="primary" icon="el-icon-search " @click="searchStore" >搜索</el-button>
            </div>
      <el-table :data="storeList" border 
      v-loading="loading"
      element-loading-text="努力加载中.."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="store_id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="store_name" label="商户名称"></el-table-column>
        <el-table-column label="平台账户" align="center">
          <template slot-scope="scope">{{scope.row.seller_name}}</template>
        </el-table-column>
        <!-- <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column> -->
        <el-table-column label="入驻时间" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.store_time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.store_state =='1'?'success':'danger'"
            >{{scope.row.store_state == '1' ? '开启':'关闭'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sc_id" label="商户员工" align="center"></el-table-column>
        <el-table-column prop="store_desccredit" label="店铺保证金" align="center"></el-table-column>
        <el-table-column  label="自营" align="center">
          <template slot-scope="scope">
            <i class="red" :class='scope.row.is_own_shop === "1" ? "el-icon-circle-check":"el-icon-circle-close"'></i>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index)"
                        >删除</el-button>
                    </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="param.p"
              :page-size="param.size"
              :total="pageTotal"
              @next-click="nextStore()"
              @prev-click="prevStore()"
              @current-change="handlePageChange"
          ></el-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
import { allStores } from '../../request/fetch.js';
export default {
  data() {
    return {
      loading:false,
      storeList: [],
      param: {
          p: 1,
          size: 10,
          keywrods: ''
      },
      pageTotal: 0,
      keyname: ''
    };
  },
  created() {
    this.getAllStore()
  },
  components: {},
  methods: {
    // 商户列表
    getAllStore() {
      this.loading = true;
      allStores(this.param).then(result => {
        this.loading = false;
        if(result.data.code == 200) {
          result.data.stores.forEach(function(item) {
            item.store_time = parseInt(item.store_time + '000');
          })

          this.storeList = result.data.stores;
          this.pageTotal = result.data.storeTotal;
        } else {
          this.$message({
            message:result.data.msg
          })
        }
      }).catch(error => {
        console.log(error)
        this.loading = false;
      })
    },
    // 搜索商户
    searchStore() {
      if(typeof this.param.keywrods !== 'string' || this.param.keywrods == ''){
        this.$message("请输入合理的名称");
        return;
      }
      this.getAllStore();
    },
    // 下一页
    nextStore() {
      this.param.p = this.param.p + 1;
      this.getAllStore();
    },
    // 上一页
    prevStore() {
      if(this.param.p == 1){
        return;
      }
      this.param.p = this.param.p - 1;
      this.getAllStore();
    },
    // 分页页码点击
    handlePageChange(val) {
      this.$set(this.param, 'p', val);
      this.getAllStore();
    },
    // 删除商户
    handleDelete(index) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
      }).then(() => {
          this.$message.success('删除成功');
          this.storeList.splice(index, 1);
      }).catch((e) => { console.log(e) });
    },
  },
  

};
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    font-size: 14px;
}
.el-table {
  td { padding: 8px 0; }
  .el-table__body-wrapper .cell i {
    font-size: 20px;
  }
  .el-image-viewer__close > i {
      color: #fff;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 50px;
    height: 50px;
}
  .red {
    color: red;
  }
  .el-button.red:hover {
    color: red;
  }
}

.handle-box {
  height: 32px;
  margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
  display: inline-block;
  width: 300px;
}
.mr10 {
    margin-right: 10px;
}

</style>