<template>
  <v-app>
    <v-app-bar color="#7d0c14" class="py-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
      <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
      <div>ผู้ใช้งาน : {{user.first_name}} {{user.last_name}} <br> {{user.role}} </div>&nbsp;&nbsp;&nbsp;&nbsp;
      <v-btn @click="logout" class="bg-white">อกกจากระบบ</v-btn>
    </v-app-bar>
    <v-navigation-drawer color="#4A4A4A" v-model="drawer" app :temporary="isMobile" :permanent="!isMobile">
      <v-list>
        <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
          <v-list-item-title> {{item.title}} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import {api} from '@/api/api'
import {useDisplay} from 'vuetify'
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})
const token = localStorage.getItem('token')
const router = useRouter()
const logout = async () =>{
  if(!confirm('ต้องการออกจากระบบใช่หรือไม่'))
  localStorage.removeItem('token')
  router.push({path:'/login'})
}
const roles = [
  //staff
  {title:'หน้าหลัก',to:'/Staff',role:'ฝ่ายบุคลากร'},
  {title:'จัดการผู้รับการประเมินผล',to:'/ManageEva',role:'ฝ่ายบุคลากร'},
  {title:'จัดการกรรมการประเมิน',to:'/ManageCommit',role:'ฝ่ายบุคลากร'},
  {title:'จัดการหัวข้อการประเมิน',to:'/Topic',role:'ฝ่ายบุคลากร'},
  {title:'จัดการตัวชี้วัด',to:'/Indicate',role:'ฝ่ายบุคลากร'},
  {title:'จัดการรอบการประเมิน',to:'/Round_eva',role:'ฝ่ายบุคลากร'},
  {title:'จัดการแบบประเมิน',to:'/Eva',role:'ฝ่ายบุคลากร'},

  //commit
  {title:'รายชื่อผู้รับการประเมิน',to:'/Committee',role:'กรรมการประเมิน'},

  //eva
  {title:'หน้าหลัก',to:'/Evaluatee',role:'ผู้รับการประเมินผล'},
  {title:'แก้ไขข้อมูลส่วนตัว',to:'/Edit_eva',role:'ผู้รับการประเมินผล'},
]
const navitem = computed(() =>
  roles.filter((item) => item.role.includes(user.value.role))
)
const fetchUser = async () =>{
  try{
    const res = await axios.get(`${api}/profile`,{headers:{Authorization:`Bearer ${token}`}})
    user.value = res.data
  }catch(err){
    console.error('โหลดไม่สำเร็จ',err)
  }
}
onMounted(fetchUser)
</script>

<style scoped>

</style>