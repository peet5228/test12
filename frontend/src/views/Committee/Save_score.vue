<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_commit === 'n'" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-3 mt-2">
                        <p>ชื่อ - นามสกุล : {{user.first_name}} {{user.last_name}} </p>
                        <p>รอบประเมินที่ : {{user.round_sys}} ปี {{user.year_sys}} </p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold"> {{index1+1}}.{{topic.name_topic}} </h1>
                            <v-card class="pa-3">
                                <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{index1+1}}.{{index2+1}} {{name_indicate}} น้ำหนักคะแนน : {{indicate.point_indicate}} คะแนนเต็ม : {{indicate.point_indicate*4}} รายละเอียดตัวชี้วัด : {{indicate.detail_indicate}}
                                        </p>
                                        <v-select label="ใส่คะแนนประเมิน 1-4" :items="[1,2,3,4]" v-model="indicate.score"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-4">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_commit === 'y'" type="success" >กรอกแบบประเมินแล้ว</v-alert>
                <v-alert v-else type="warning" >ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import {Commit} from '@/api/api'
const router = useRouter()
const id_eva = useRoute().params.id_eva
const topics = ref([])
const user = ref({})
const token = localStorage.getItem('token')
const detail_commit = ref('')
const fetchUser = async () =>{
  try{
    const res = await axios.get(`${Commit}/save_score/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
    user.value = res.data
  }catch(err){
    console.error('โหลดไม่สำเร็จ',err)
  }
}
const fetchTopic = async () =>{
  try{
    const res = await axios.get(`${Commit}/save_score/indicate/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
    topics.value = res.data
  }catch(err){
    console.error('โหลดไม่สำเร็จ',err)
  }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})
const fileMap = ref<Record<string,string>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number) =>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}
const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i) =>{
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva,
                file_key:file ? `file_${key}` : null
            }
        })
    )
    if(allScore.some((s) => !s.score)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    formData.append('detail_commit',detail_commit.value)
    try{
        await axios.post(`${Commit}/save_score/${id_eva}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('บันทึกคะแนนสำเร็จ')
        await Promise.all([fetchTopic(),fetchUser()])
    }catch(err){
        console.error('บันทึกคะแนนไม่สำเร็จ',err)
    }
}
</script>

<style scoped>

</style>