<template>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
          <v-col cols="12" md="8" lg="6">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">สมัครสมาชิก</h1>
                  <p class="text-center text-sm mt-2">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                  <v-form>
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="ชื่อ"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="นามสกุล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="อีเมล"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="ชื่อผู้ใช้"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="รหัสผ่าน"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.first_name" :error-message="error.first_name" label="ยืนยันรหัสผ่าน"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select v-model="form.first_name" :items="['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']" :error-message="error.first_name" label="เลือกประเมินสมาชิก"></v-select>
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
import {api} from '@/api/API'
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

</script>

<style scoped>

</style>