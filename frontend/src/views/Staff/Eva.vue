<template>
    <v-container fluid class="py-10">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการแบบประเมิน</h1>
                  <v-form @submit.prevent="saveMember">
                    <v-row class="mt-4">
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.day_open" type="date" label="วันที่เปิดรอบประเมิน" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.day_out" type="date" label="วันที่ปิดรอบประเมิน" />
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-select v-model="form.round_sys" :items="[{title:'รอบที่ 1',value:'1'},{title:'รอบที่ 2',value:'2'}]" label="รอบการประเมิน" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="form.year_sys" type="number" label="ปี" />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select v-model="form.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]" label="เปิด/ปิด รอบการประเมิน" />
                      </v-col>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_sys ? 'อัปเดต' : 'บันทึก' }}</v-btn>
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
                            <th class="border text-center">วันที่เปิดรอบประเมิน</th>
                            <th class="border text-center">วันที่ปิดรอบประเมิน</th>
                            <th class="border text-center">รอบการประเมิน</th>
                            <th class="border text-center">สถานะ เปิด/ปิด รอบการประเมิน</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  r" :keys="i.id_sys">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.day_open }}</td>
                            <td class="border text-center">{{ i.day_out }}</td>
                            <td class="border text-center">รอบที่ {{ i.round_sys }} ปี {{ i.year_sys }}</td>
                            
                            <td class="border text-center">{{ i.status_sys === 'y' ? 'เปิด' : 'ปิด' }}</td>
                            <td class="border text-center">
                                <v-btn color="warning" size="small" class="text-white" @click="edit(i)">แก้ไข</v-btn>&nbsp;
                                <v-btn color="error" size="small" class="text-white" @click="del(i.id_sys)">ลบ</v-btn>
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
    id_sys:null,
    day_open:null,
    day_out:'',
    round_sys:'',
    year_sys:'',
    status_sys:'',
})

const reset = () =>  {
    form.value = {
        id_sys:null,
        day_open:null,
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:'',
    }
}

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/round_eva`,{headers:{Authorization:`Bearer ${token}`}})
        r.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}


const saveMember = async () =>{
  try{
    if(form.value.id_sys){
        await axios.put(`${staff}/round_eva/${form.value.id_sys}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
    }else{
        await axios.post(`${staff}/round_eva`,form.value,{headers:{Authorization:`Bearer ${token}`}})
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

const del = async (id_sys) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่?')) return
        await axios.delete(`${staff}/round_eva/${id_sys}`,{headers:{Authorization:`Bearer ${token}`}})
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