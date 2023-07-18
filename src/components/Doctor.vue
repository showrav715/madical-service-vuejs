<template lang="">
  <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="doctor__item">
      <div class="doctor__inner">
        <a href="javascript:;" class="thumb">
          <img v-lazy="doctor.photo" class="w-100" alt="doctor" />
        </a>
        <div class="content">
          <h4>
            <a href="javascript:;" class="title">{{ doctor.name }} </a>
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
