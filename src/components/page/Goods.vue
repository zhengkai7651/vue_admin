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
                <el-input v-model="param.keywrods" placeholder="商户名称 | 品牌名称" class="handle-input mr10 el-input el-input--small"></el-input>
                <el-button class="el-button--small" type="primary" icon="el-icon-search " @click="queryGood" >搜索</el-button>
                <el-button class="el-button--small right" type="danger" icon="el-icon-upload2" @click="toUpload" >上传商品</el-button>
            </div>
      <keep-alive>      
      <el-table :data="GoodList" 
      border 
      v-loading="loading"
      header-cell-class-name="table-header"
      element-loading-text="努力加载中.."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="goods_id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="260"></el-table-column>
        <el-table-column label="所属品牌" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商品图片(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.original_img"
              :preview-src-list="[scope.row.original_img]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="上架时间" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.on_time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column label="销售价" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.shop_price}}
          </template> 
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.is_on_sale =='1'?'success':'danger'"
            >{{scope.row.is_on_sale == '1' ? '上架':'下架'}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="store_desccredit" label="店铺保证金" align="center"></el-table-column> -->
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
      </keep-alive>
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
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="42%">
        <el-upload
          class="avatar-uploader"
          width="180"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="hint">点击上传图片</div>
        <el-form ref="edGood" :model="edGood" label-width="100px">
            <el-form-item label="商品名称">
                <el-input v-model="edGood.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="edGood.shop_price"></el-input>
            </el-form-item>
            <el-form-item label="商品上下架">
              <el-switch v-model="edGood.is_on_sale"></el-switch>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { allGoods } from '../../request/fetch.js';
export default {
  data() {
    return {
      loading:false, // loading 加载显示状态
      editVisible: false, // 编辑框显示状态
      GoodList: [], // 商品table 数据
      param: {      // 获取商品数据 参数
          p: 1,
          size: 10,
          keywrods: ''
      },
      pageTotal: 0, // 商品总条数
      keyname: '',
      edGood: {}, // 当前编辑商品
      idx: -1,
      imageUrl: '',
      multipleSelection:[]

    };
  },
  created() {
    this.getAllGood()
  },
  components: {},
  methods: {
    getAllGood() {
      this.loading = true;
      allGoods(this.param).then(result => {
        this.loading = false;
        console.log("=============")
        if(result.data.code == 200) {
          result.data.goodList.forEach(function(item) {
            item.on_time = parseInt(item.on_time + '000');
          })
          this.GoodList = result.data.goodList;
          this.pageTotal = result.data.goodTotal;
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
    queryGood() {
      if(typeof this.param.keywrods !== 'string' || this.param.keywrods == ''){
        this.$message("请输入合理的名称");
        return;
      }
      this.getAllGood();
    },
    nextStore() {
      this.param.p = this.param.p + 1;
      this.getAllGood();
    },
    prevStore() {
      if(this.param.p == 1){
        return;
      }
      this.param.p = this.param.p - 1;
      this.getAllGood();
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.param, 'p', val);
      this.getAllGood();
    },
    // 删除列
    handleDelete(index) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
      }).then(() => {
          this.$message.success('删除成功');
          this.GoodList.splice(index, 1);
      }).catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val)
        this.multipleSelection = val;
    },
   
   

    // 编辑操作
    handleEdit(index, row) {
        this.idx = index;
        this.edGood = row;
        this.editVisible = true;
    },
    saveEdit() {
      this.$set(this.GoodList,this.idx, this.edGood);
      this.editVisible = false;
    },
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw))
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    toUpload(){
      this.$router.push('/GoodUpload');
    }
    
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
    width: 60px;
    height: 60px;
    border-radius: 2px;
}
  .red {
    color: red;
  }
  .el-button.red:hover {
    color: red;
  }
  .el-image-viewer__close {
    color: #fff;
  }
}
.hint {
  margin: 5px 0 20px;
  text-align: center;
  color: #888;
}
.avatar-uploader {
  text-align: center;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .el-upload:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.el-button--small.right {
  float: right;
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