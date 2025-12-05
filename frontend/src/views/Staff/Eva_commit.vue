<template>
    <v-container fluid class="py-10">
              <v-card class="pa-4">
                  <h1 class="text-center text-h5 font-weight-bold text-maroon">ตั้งค่ากรรมการ</h1>
                  <p class="text-h6 font-weight-bold">ข้อมูลผู้ถูกประเมิน</p>
                  <p class="text-h6 font-weight-bold">ชื่อ : {{ header.first_name }} {{ header.last_name }}</p>
                  <br><v-form @submit.prevent="saveMember">
                    <v-row>
                        <template v-for="(c,index) in List" :keys="index">
                            <v-col cols="12" md="6">
                                <v-select v-model="c.id_member" :items="MEMBER(index).map(m => ({title: m.fullname_commit,value:m.id_member}))" :label="`กรรมการคนที่ ${index+1}`"></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="c.role" :items="ROLE(index)" :label="`ตำแนห่งที่ ${index+1}`"></v-select>
                            </v-col>
                        </template>
                      <v-col cols="12" md="6" class="text-center">
                        <v-btn class="text-white w-full" color="blue" type="submit">บันทึก</v-btn>
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
                            <th class="border text-center">กรรมการ</th>
                            <th class="border text-center">ตำแหน่ง</th>
                            <th class="border text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i,index) in  List" :keys="i.id_commit">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ i.id_member }}</td>
                            <td class="border text-center">{{ i.role }}</td>
                            <td class="border text-center">
                                <v-btn color="error" size="small" class="text-white" @click="del(i.id_commit)">ลบ</v-btn>
                            </td>
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
const id_eva = useRoute().params.id_eva

const people = ref([])
const header = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
])

const fetch = async () => {
    try{
        const s = await axios.get(`${staff}/commit/header/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        header.value = s.data[0]
        const res = await axios.get(`${staff}/commit/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        people.value = res.data.before
        const useData = res.data.after
        if(useData.length === 0){
            List.value = [
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
            ]
        }else{
            List.value = useData.map(c => ({
                id_commit:c.id_commit,id_member:c.id_member,role:c.role
            }))
            while(List.value.length < 3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }
        }
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const nameMap = computed( () => Object.fromEntries(people.value.map(p => [p.id_member,p.fullname_commit])) )
const nameOf = (id) => nameMap.value[0]

const MEMBER = (idx) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return people.value.filter( (p) => !picked.includes(p.id_member) )
}

const ROLE = (idx) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.role : null) )
    return role.filter( (p) => !picked.includes(p) )
}

const saveMember = async () =>{
  try{
    await axios.post(`${staff}/commit/${id_eva}`,List.value,{headers:{Authorization:`Bearer ${token}`}})
    alert('ทำรายการสำเร็จ')
    await fetch()
  }catch(err){
    console.error('ทำรายการไม่สำเร็จ',err)
  }
}

const del = async (id_commit) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่?')) return
        await axios.delete(`${staff}/commit/${id_commit}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
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