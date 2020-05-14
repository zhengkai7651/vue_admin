<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-row>
          <el-col :span="7">
            <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="家居用品" value="101"></el-option>
              <el-option label="装修建材" value="102"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="家居用品" value="101"></el-option>
              <el-option label="装修建材" value="102"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option label="家居用品" value="101"></el-option>
              <el-option label="装修建材" value="102"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="商品品牌">
        <el-row>
          <el-col :span="7">
            <el-select v-model="form.region" placeholder="请选择商品品牌">
              <el-option label="宏杰家具" value="shanghai"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="佣金比例">
        <el-input v-model="form.name" placeholder="请输入佣金比例"></el-input>
      </el-form-item>
      <el-form-item label="参加活动">
        <el-radio-group v-model="form.resource">
          <el-radio label="天猫双十一"></el-radio>
          <el-radio label="天猫新风尚"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="详情图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">上传</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.container .el-form {
  width: 640px;
  .el-row .el-col {
    margin-right: 20px;
  }
}
</style>