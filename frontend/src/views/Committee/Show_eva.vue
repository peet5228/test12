<template>
    <v-container fluid class="py-10">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการแบบประเมิน</h1>
                  <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ชื่อ</th>
                            <th class="border text-center">นามสกุล</th>
                            <th class="border text-center">วันที่ออกแบบประเมิน</th>
                            <th class="border text-center">คะแนนประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                            <th class="border text-center">ดำเนินการประเมิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  r" :keys="i.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.first_name }}</td>
                            <td class="border text-center">{{ i.last_name }}</td>
                            <td class="border text-center">{{ i.day_eva }}</td>
                            <td class="border text-center">{{ i.total_eva }} คะแนน</td>
                            <td class="border text-center">{{ i.status_eva === 1 ? 'ประเมินตนเอง' : i.status_eva === 2 ? 'รอกรรมการประเมิน' : 'ประเมินสำเร็จ' }}</td>
                            <td class="border text-center">
                                <v-btn color="blue" size="small" class="text-white" @click="add(i.id_eva)">ประเมิน</v-btn>
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
import {Commit} from '@/api/api'
import {api} from '@/api/api'
const token = localStorage.getItem('token')
const router = useRouter()
const r = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${Commit}/show_eva`,{headers:{Authorization:`Bearer ${token}`}})
        r.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}
const add = (id_eva) => {
    router.push({path:`/Save_score/${id_eva}`})
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