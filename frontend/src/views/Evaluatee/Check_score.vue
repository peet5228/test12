<template>
    <v-container>
      <v-row>
          <v-col cols="12">
                <h1 class="text-h5 font-weight-bold">ตรวจสอบคะแนนประเมิน</h1>
                <div class="mt-4">
                    <router-link to="/Score_eva"><v-btn type="submit" color="blue">ตรวจสอบคะแนนประเมินตนเอง</v-btn></router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to="/Score_eva"><v-btn type="submit" color="blue">ตรวจสอบคะแนนประเมินกรรมการ</v-btn></router-link>
                </div>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>