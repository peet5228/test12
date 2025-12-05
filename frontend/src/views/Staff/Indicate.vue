<template>
    <v-container fluid class="py-10">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการตัวชี้วัด</h1>
                  <v-form @submit.prevent="saveMember">
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-select v-model="form.id_topic" :items="topic.map(t => ({title:t.name_topic,value:t.id_topic}))" label="หัวข้อการประเมิน" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.name_indicate" label="ชื่อตัวชี้วัด" />
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-textarea rows="3" v-model="form.detail_indicate" label="รายละเอียด" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select v-model="form.point_indicate" :items="['1','2','3','4','5']" label="น้ำหนักคะแนน" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select v-model="form.check_indicate" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" label="ลักษณะตัวเลือกคะแนน" />
                      </v-col>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn>
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
                            <th class="border text-center">หัวข้อ</th>
                            <th class="border text-center">ตัวชี้วัด</th>
                            <th class="border text-center">รายละเอียด</th>
                            <th class="border text-center">น้ำหนักคะแนน</th>
                            <th class="border text-center">ลักษณะตัวเลือกคะแนน</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  r" :keys="i.id_topic">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.name_topic }}</td>
                            <td class="border text-center">{{ i.name_indicate }}</td>
                            <td class="border text-center">{{ i.detail_indicate }}</td>
                            <td class="border text-center">{{ i.point_indicate }}</td>
                            <td class="border text-center">{{ i.check_indicate === 'y' ? 'มี' : 'ไม่มี' }}</td>
                            <td class="border text-center">
                                <v-btn color="warning" size="small" class="text-white" @click="edit(i)">แก้ไข</v-btn>&nbsp;
                                <v-btn color="error" size="small" class="text-white" @click="del(i.id_indicate)">ลบ</v-btn>
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
const topic = ref([])

const form = ref({
    id_indicate:null,
    id_topic:null,
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () =>  {
    form.value = {
           id_indicate:null,
    id_topic:null,
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
    }
}

const fetch = async () => {
    try{
        const t = await axios.get(`${staff}/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topic.value = t.data
        const res = await axios.get(`${staff}/indicate`,{headers:{Authorization:`Bearer ${token}`}})
        r.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}


const saveMember = async () =>{
  try{
    if(form.value.id_indicate){
        await axios.put(`${staff}/indicate/${form.value.id_indicate}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
    }else{
        await axios.post(`${staff}/indicate`,form.value,{headers:{Authorization:`Bearer ${token}`}})
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

const del = async (id_indicate) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่?')) return
        await axios.delete(`${staff}/indicate/${id_indicate}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch() 
        await reset() 
    }catch(err){
        console.error('Error Delete',err)
    }
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