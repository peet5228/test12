<template>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
          <v-col cols="12" md="8" lg="6">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">สมัครสมาชิก</h1>
                  <p class="text-center text-sm mt-2">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                  <v-form @submit.prevent="saveMember">
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อ"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.last_name" :error-messages="error.last_name" label="นามสกุล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" :error-messages="error.email" label="อีเมล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.username" :error-messages="error.username" label="ชื่อผู้ใช้"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.password" :error-messages="error.password" type="password" label="รหัสผ่าน"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="confirmPassword" :error-messages="error.confirmPassword" type="password" label="ยืนยันรหัสผ่าน"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select v-model="form.role" :items="['กรรมการประเมิน','ผู้รับการประเมินผล']" :error-messages="error.role" label="เลือกประเมินสมาชิก"></v-select>
                      </v-col>
                      <v-col cols="12" class="text-center">
                        <v-btn class="btn-maroon text-white" type="submit">สมัคร</v-btn>
                        <p class="text-center text-sm mt-2">มีบัญชีอยู่แล้ว? <router-link to="/login" class="text-maroon"><u>เข้าสู่ระบบ</u></router-link></p>
                      </v-col>
                    </v-row>
                  </v-form>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
// import {api} from '@/api/API'
const router = useRouter()
const form = ref({
  first_name:'',
  last_name:'',
  email:'',
  username:'',
  password:'',
  role:'',
})
const error = ref<Record<string,string>>({})
const confirmPassword = ref('')
const emailReget = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i
function vaildateForm(){
  error.value = {}
  const f = form.value
  if(!f.first_name.trim())error.value.first_name = 'กรุณากรอกชื่อ'
  if(!f.last_name.trim())error.value.last_name = 'กรุณากรอกนามสกุล'
  if(!f.email.trim())error.value.email = 'กรุณากรอกอีเมล'
  else if(!emailReget.test(f.email.trim()))error.value.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  if(!f.username.trim())error.value.username = 'กรุณากรอกชื่อผู้ใช้'
  else if(f.username.trim().length < 4)error.value.username = 'ต้องมีอย่างน้อย 4 ตัวอักษร'
  if(!f.password.trim())error.value.password = 'กรุณากรอกรหัสผ่าน'
  else if(f.password.trim().length < 6)error.value.password = 'ต้องมีอย่างน้อย 6 ตัวอักษร'
  if(!confirmPassword.value.trim())error.value.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
  else if(confirmPassword.value.trim() != f.password.trim())error.value.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
  if(!f.role.trim())error.value.role = 'กรุณาเลือกประเภทสมาชิก'
  return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
  if(!vaildateForm())return
  try{
    await axios.get(`${api}/auth/regis`,form.value)
    alert('สมัครสำเร็จ')
    router.push({path:'/login'})
  }catch(err){
    console.error('สมัครไม่สำเร็จ',err)
  }
}
</script>

<style scoped>
.btn-maroon{
  background-color: #7d0c14;
}
.text-maroon{
  color: #7d0c14;
}
</style>