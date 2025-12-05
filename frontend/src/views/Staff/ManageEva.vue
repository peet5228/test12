<template>
    <v-container fluid class="fill-height">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการผู้รับการประเมินผล</h1>
                  <v-form @submit.prevent="saveMember">
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อ"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.last_name" :error-messages="error.last_name" label="นามสกุล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-text-field v-model="form.email" :error-messages="error.email" label="อีเมล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.username" :error-messages="error.username" label="ชื่อผู้ใช้"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.password" :error-messages="error.password" type="password" label="รหัสผ่าน"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select v-model="form.role" :items="['ผู้รับการประเมินผล']" :error-messages="error.role" label="เลือกประเมินสมาชิก"></v-select>
                      </v-col>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_memmber ? 'อัปเดต' : 'บันทึก' }}</v-btn>
                      </v-col>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="error" type="reset">ยกเลิก</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
              </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import {staff} from '@/api/API'

const router = useRouter()

const form = ref({
    id_member:null,
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})

const reset = () =>  {
    form.value = {
        id_member:null,
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        role:'',
    }
}

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
  if(!f.role.trim())error.value.role = 'กรุณาเลือกประเภทสมาชิก'
  return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
  if(!vaildateForm())return
  try{
    const payload = {
        id_member:form.value.id_member,
        first_name:form.value.first_name,
        last_name:form.value.last_name,
        email:form.value.email,
        username:form.value.username,
        role:form.value.role,
        ...(form.value.password ? {password:form.value.password} : {})
    }
    if(from.value.id_member){
        await axios.put(`${staff}/member/${form.value.id_member}`,payload)
    }else{
        await axios.get(`${api}/auth/regis`,{...payload,password:form.value.password})
    }
    alert('ทำรายการสำเร็จ')
    await fetch()
    await reset()
  }catch(err){
    console.error('ทำรายการไม่สำเร็จ',err)
  }
}

const del = async (id_member) => {
    if(!confirnm('ต้องการลบยใช่หรือไม่?')) return
    await axios.delete(`${staff}/member/${id_member}`)
    await fetch() 
    await reset() 
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