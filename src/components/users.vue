
<template>
  <div class="main-content">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="main-nav">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <!-- 输入框 -->
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            @keyup.native.enter="search"
            v-model="sendData.query"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-light">
          <!-- 添加用户按钮 -->
          <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表单列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="地址"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="操作">
        <!-- 开关 -->
        <template slot-scope="scope">
          <span>on</span>
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.mg_state"
            @change="statusChange(scope.row)"
          ></el-switch>
          <span>off</span>
        </template>
      </el-table-column>
      <!-- 操作立标 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="delone(scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="Formdata"
        label-width="80px"
        class="my-form"
        label-position="right"
        :rules="rules"
        ref="Formdata"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="Formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="Formdata.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="Formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="Formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Formdata')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 邮箱格式验证
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        // 验证邮箱的正则表达式
        if (value != "") {
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮箱"));
          }
        } else {
          callback();
        }
      }, 1000);
    };
    // 手机格式验证
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        setTimeout(() => {
          // 验证手机的正则表达式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的手机号"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    return {
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //   表格数据
      tableData: [],
      //   标记弹出框是否显示
      dialogFormVisible: false,
      //   新增表单数据
      Formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   提交表单操作
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$http.post("users", this.Formdata, {
            headers: { Authorization: window.sessionStorage.getItem("token") }
          });
          console.log(res);
          this.dialogFormVisible = false;
          this.search();
        } else {
          this.$message.error("请填写正确数据");
          return false;
        }
      });
    },
    // 删除操作
    delone(value) {
      this.$confirm("您是否要删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`users/${value.id}`, {
            headers: { Authorization: window.sessionStorage.getItem("token") }
          });
          console.log(res);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    async statusChange(item) {
      let res = await this.$http.put(
        `users/${item.id}/state/${item.mg_state}`,
        item,
        {
          headers: { Authorization: window.sessionStorage.getItem("token") }
        }
      );
      console.log(res);
    },
    // search() {
    //   this.$http
    //     .get("users", {
    //       params: this.sendData,
    //       headers: { Authorization: window.sessionStorage.getItem("token") }
    //     })
    //     .then(success => {
    //       this.tableData = success.data.data.users;
    //     });
    // }
    async search() {
      let res = await this.$http.get("users", {
        params: this.sendData,
        headers: { Authorization: window.sessionStorage.getItem("token") }
      });
      this.tableData = res.data.data.users;
    }
  },
  created() {
    this.search();
  }
};
</script>

<style>
.index-main .main-content .main-nav {
  line-height: 45px;
  padding-left: 10px;
}
.my-form.el-form {
  height: auto;
  padding: 0;
}
</style>

