<template lang="">
  <section class="banner-section">
    <div class="container">
      <div class="row g-4 align-items-center justify-content-between">
        <div class="col-xxl-7 col-xl-7 col-lg-7">
          <div class="banner__content">
            <h1 class="">
              {{ herodata.hero_title }}
            </h1>
            <p>
              {{ herodata.hero_text }}
            </p>
            <router-link :to="{name:'service'}"  class="cmn--btn">
              {{t('Our Service')}}
            </router-link>
          </div>
        </div>
        <div class="col-xxl-5 col-xl-5 col-lg-5">
          <div class="banner__thumb">
            <img :src="herodata.hero_photo" class="w-100" alt="banner" />
          </div>
        </div>
      </div>

      <div class="counter__wrap mt-100 px-4 pt-120 pb-120 round16">
        <div class="row g-3 justify-content-center">
          <div
            v-for="data in counters"
            :key="data.id"
            class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
          >
            <div class="counter__items wow fadeInDown">
              <div class="content">
                <div
                  class="d-flex mb-1 justify-content-center align-items-center"
                >
                  <span class="odometer">
                    <count-up :end-val="data.counter_number">0</count-up>
                  </span>
                  <span class="added"> + </span>
                </div>
                <span class="inter">
                  <span class="d-block">
                    {{ data.title }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import CountUp from "vue-countup-v3";
import { computed } from "vue";
const { counters, herodata } = defineProps(["counters", "herodata"]);
</script>
