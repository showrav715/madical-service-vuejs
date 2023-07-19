<template lang="">
  <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="doctor__item">
      <div class="doctor__inner">
       
          <img v-lazy="doctor.photo" class="w-100" alt="doctor" />
      
        <div class="content">
          <h4>
           {{ doctor.name }}
          </h4>
          <h6>{{ doctor.designation }}</h6>
          <p>
            {{
              doctor.bio && doctor.bio.replace(/<[^>]+>/g, "").substring(0, 100)
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { doctor } = defineProps(["doctor"]);
</script>
