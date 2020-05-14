<template>
  <div>
    <div class="container">
      <div class="handle-box">
          <el-date-picker
            v-model="order_date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        <el-button
          class="el-button-samll"
          type="primary"
          icon="el-icon-search "
          @click="queryOrder"
        >查询</el-button>
      </div>
      <el-table
        :data="orderList"
        border
        v-loading="loading"
        header-cell-class-name="table-header"
        element-loading-text="努力加载中.."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="goods_names" label="商品名称"></el-table-column>
        <el-table-column prop="store_name" label="所属商家" align="center"></el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.pay_kind == 1 ? '余额':'微信' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template slot-scope="scope">￥{{scope.row.order_total}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="store_desccredit" label="店铺保证金" align="center"></el-table-column> -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope>
            <el-button type="primary" plain>查看详情</el-button>
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
import { allOrder } from "../../request/fetch.js";
export default {
  data() {
    return {
      loading: false, // loading 加载显示状态
      editVisible: false, // 编辑框显示状态
      orderList: [], // 商品table 数据
      param: {
        // 获取商品数据 参数
        p: 1,
        size: 10,
        start_date: "", 
        end_date: "",
      },
      pageTotal: 0, // 商品总条数
      keyname: "",
      edGood: {}, // 当前编辑商品
      idx: -1,
      imageUrl: "",
      multipleSelection: [],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        order_date: ''
    };
  },
  created() {
    this.getOrders();
  },
  components: {},
  methods: {
    getOrders() {
      this.loading = true;
      allOrder(this.param)
        .then(result => {
          this.loading = false;
          if (result.data.code == 200) {
            result.data.orderList.forEach(function(item) {
              item.create_time = parseInt(item.create_time + "000");
            });
            this.orderList = result.data.orderList;
            this.pageTotal = result.data.orderTotal;
          } else {
            this.$message({
              message: result.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    queryOrder() {
      if (this.order_date == "")  {
        this.$message("请选择查询的日期时间");
        return;
      }
      this.param.start_date = new Date(this.order_date[0]).getTime() / 1000;
      this.param.end_date = new Date(this.order_date[1]).getTime() / 1000;
      // console.log(this.param);
      this.getOrders();
    },
    nextStore() {
      this.param.p = this.param.p + 1;
      this.getOrders();
    },
    prevStore() {
      if (this.param.p == 1) {
        return;
      }
      this.param.p = this.param.p - 1;
      this.getOrders();
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.param, "p", val);
      this.getOrders();
    },
    
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  font-size: 14px;
}
.el-date-editor{margin-right: 20px;}
.el-table {
  td {
    padding: 8px 0;
  }
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
      border-color: #409eff;
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
  text-align: right;
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