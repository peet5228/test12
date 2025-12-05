<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3" type="success" >
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-3 mt-2">
                        <p>ชื่อ - นามสกุล : {{user.first_name}} {{user.last_name}} </p>
                        <p>รอบประเมินที่ : {{user.round_sys}} ปี {{user.year_sys}} </p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold"> {{index1+1}}.{{topic.name_topic}} </h1>
                            <v-table class="table">
                                <tr>
                                    <th class="text-center bg-grey py-2 font-weight-bold border w-1/10">ตัวชี้วัด</th>
                                    <th class="text-center bg-grey py-2 font-weight-bold border w-1/10">รายละเอียดตัวชี้วัด</th>
                                    <th class="text-center bg-grey py-2 font-weight-bold border w-1/10">น้ำหนักคะแนน</th>
                                    <th class="text-center bg-grey py-2 font-weight-bold border w-1/10">คะแนนเต็ม</th>
                                    <th class="text-center bg-grey py-2 font-weight-bold border w-1/10">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                    <td class="text-center py-2 border"> {{indicate.name_indicate}} </td>
                                    <td class="text-center py-2 border"> {{indicate.detail_indicate}} </td>
                                    <td class="text-center py-2 border"> {{indicate.point_indicate}} </td>
                                    <td class="text-center py-2 border"> {{indicate.point_indicate*4}} </td>
                                    <td class="text-center py-2 border"> {{indicate.score_member*indicate.point_indicate}} </td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-4">
                        <v-card color="green" class="text-end py-2 pa-1">คะแนนรวมสุทธิ : {{totalScore || '0'}} คะแนน &nbsp;&nbsp;</v-card>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info" >ยังไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert v-else type="warning" >ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {Commit} from '@/api/api'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const id_eva = useRoute().params.id_eva
const topics = ref([])
const user = ref({})
const totalScore = ref(0)
const token = localStorage.getItem('token')
const fetchUser = async () =>{
  try{
    const res = await axios.get(`${Commit}/detail_eva/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
    user.value = res.data
  }catch(err){
    console.error('โหลดไม่สำเร็จ',err)
  }
}
const fetchTopic = async () =>{
  try{
    const res = await axios.get(`${Commit}/detail_eva/indicate/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
    topics.value = res.data
    res.data.forEach(score =>
        score.indicates.forEach((i) =>{
            totalScore.value += (i.score_member)*(i.point_indicate)
        })
    )
  }catch(err){
    console.error('โหลดไม่สำเร็จ',err)
  }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

</script>

<style scoped>

</style>