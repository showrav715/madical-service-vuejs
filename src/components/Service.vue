<template lang="">
  <!-- Service -->
  <section class="service-section pt-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="section-title mb55 text-center">
            <h6 class="subtitle">{{ subtitle }}</h6>
            <h2 class="title">{{ title }}</h2>
          </div>
        </div>
      </div>
      <div class="row g-4">
        <swiper
          :spaceBetween="-15"
          :slidesPerView="1"
          :centeredSlides="false"
          :pagination="{
            clickable: true,
          }"
          :navigation="false"
          :modules="modules"
          :breakpoints="{
            '320': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide
            v-for="service in services"
            :key="service.id"
            class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
          >
            <div class="service-item">
              <router-link
                :to="{ name: 'singleService', params: { slug: service.slug } }"
                class="service__thumb"
              >
                <img v-lazy="service.photo" alt="service" />
              </router-link>
              <div class="feature__content">
                <div class="bgicon">
                  <div class="service-icon">
                    <img v-lazy="service.feature_icon" alt="service" />
                  </div>
                </div>
                <h4 class="title">
                  <router-link
                    :to="{
                      name: 'singleService',
                      params: { slug: service.slug },
                    }"
                    >{{ service.title }}</router-link
                  >
                </h4>
                <p>
                  {{ service.sort_text }}
                </p>
                <router-link
                  :to="{
                    name: 'singleService',
                    params: { slug: service.slug },
                  }"
                  class="cmn--link"
                >
                  {{ t("Read More") }} <i class="fas fa-angle-right"></i>
                </router-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script setup>
import { defineProps, ref } from "vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";

const { services } = defineProps(["services", "title", "subtitle"]);

const modules = [Autoplay, Pagination, Navigation];
</script>
