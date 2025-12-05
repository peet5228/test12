<template>
    <v-container fluid class="py-10">
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
                        <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_member ? 'อัปเดต' : 'บันทึก' }}</v-btn>
                      </v-col>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="error" type="reset">ยกเลิก</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>

                  <br>

                  <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ชื่อ-นามสกุล</th>
                            <th class="border text-center">อีเมล</th>
                            <th class="border text-center">ชื่อผู้ใช้</th>
                            <th class="border text-center">รหัสผ่าน</th>
                            <th class="border text-center">ประเภทสมาชิก</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  r" :keys="i.id_member">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.first_name }} {{ i.last_name }}</td>
                            <td class="border text-center">{{ i.email }}</td>
                            <td class="border text-center">{{ i.username }}</td>
                            <td class="border text-center">{{ i.password }}</td>
                            <td class="border text-center">{{ i.role }}</td>
                            <td class="border text-center">
                                <v-btn color="warning" size="small" class="text-white" @click="edit(i)">แก้ไข</v-btn>&nbsp;
                                <v-btn color="error" size="small" class="text-white" @click="del(i.id_member)">ลบ</v-btn>
                            </td>
                        </tr>
                        <tr v-if="r.length === 0">
                            <td class="text-center text-gray-500 border" colspan="10">ไม่พบข้อมูล</td>
                        </tr>
                    </tbody>
                  </v-table>
              </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import {staff} from '@/api/API'
import {api} from '@/api/API'
const token = localStorage.getItem('token')

const router = useRouter()

const r = ref([])

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

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/member/eva`,{headers:{Authorization:`Bearer ${token}`}})
        r.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
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
    if(form.value.id_member){
        await axios.put(`${staff}/member/${form.value.id_member}`,payload,{headers:{Authorization:`Bearer ${token}`}})
    }else{
        await axios.post(`http://localhost:7000/api/auth/regis`,{...payload,password:form.value.password})
    }
    alert('ทำรายการสำเร็จ')
    await fetch()
    await reset()
  }catch(err){
    console.error('ทำรายการไม่สำเร็จ',err)
  }
}

const edit = (i) => {
    form.value = {...i}
}

const del = async (id_member) => {
    if(!confirm('ต้องการลบยใช่หรือไม่?')) return
    await axios.delete(`${staff}/member/${id_member}`,{headers:{Authorization:`Bearer ${token}`}})
    await fetch() 
    await reset() 
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
  background-color: #7d0c14;
}
.text-maroon{
  color: #7d0c14;
}
</style>