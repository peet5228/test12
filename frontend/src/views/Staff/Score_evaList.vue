<template>
    <v-container fluid class="py-10">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">รายงานผลการประเมินของผู้รับการประเมิน</h1>
                    รายชื่อผู้รับการประเมินผล
                  <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ผู้รับการประเมินผล</th>
                            <th class="border text-center">รอบการประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                            <th class="border text-center">เพิ่มกรรมการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  r" :keys="i.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.first_name }} {{ i.last_name }}</td>
                            <td class="border text-center">รอบที่ {{ i.round_sys }} ปี {{ i.year_sys }}</td>
                            <td class="border text-center">{{ i.status_eva === 1 ? 'ประเมินตนเอง' : i.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินสำเร็จ' }}</td>
                            <td class="border text-center">
                                <v-btn color="success" size="small" class="text-white" @click="add(i.id_eva)">เพิ่มกรรมการ</v-btn>
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


const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/eva/all`,{headers:{Authorization:`Bearer ${token}`}})
        r.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}


const saveMember = async () =>{
  try{
    if(form.value.id_eva){
        await axios.put(`${staff}/eva/${form.value.id_eva}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
    }else{
        await axios.post(`${staff}/eva`,form.value,{headers:{Authorization:`Bearer ${token}`}})
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

const del = async (id_eva) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่?')) return
        await axios.delete(`${staff}/eva/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch() 
        await reset() 
    }catch(err){
        console.error('Error Delete',err)
    }
}

const add = (id_eva) => {
    router.push({path:`Eva_commit/${id_eva}`})
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