<template>
  <div class="login">
    <el-form
      :model="formDta"
      status-icon
      label-position="top"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
      @submit.native.prevent
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formDta.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formDta.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('ruleForm2')" native-type="submit" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      formDta: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          { min: 3, max: 10, message: "请输入3-10个字符", trigger: "change" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 6, max: 18, message: "请输入6-18位密码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate(valid => {

        if (valid) {

          this.$http.post("login", this.formDta).then(success => {
        
            console.log(success);

            if (success.data.meta.status === 400) {

                 this.$message.error(success.data.meta.msg)

            }else{
              
               this.$message.success(success.data.meta.msg);

              window.sessionStorage.setItem('token',success.data.data.token)

              this.$router.push('index')

            }
          });
        } else {

               this.$message.error('请输入正确的用户名或密码');

          return false;
        }
      });
    }
  },
//   created(){
//  document.onkeydown=(e)=>{
//   console.log(e);
//   if(e.keyCode==13){
//     this.submitForm(formName);
//   }
//   }
 

// }

}
</script>
<style>
body,
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 100%;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  height: 100%;
}
.el-form {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-sizing: border-box;
}
.login-btn {
  width: 100%;
}
</style>

