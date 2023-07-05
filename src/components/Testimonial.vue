<template lang="">
  <!-- Testimonial -->
  <section
    class="testimonial-section bg--section pt-200 pb-200 overflow-hidden position-relative"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="section__two pb-80 text-center">
            <h5>A good word means a lot</h5>
            <h2
              class="d-flex beforetwo justify-content-center align-items-center"
            >
              Patient
              <span class="boldtext"> Testimonials </span>
            </h2>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <swiper
          :spaceBetween="-15"
          :slidesPerView="2"
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
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-item col-md-6"
          >
            <div class="patient">
              <img :src="testimonial.photo" alt="img" />
            </div>
            <div class="patient__content">
              <h4>{{testimonial.name}}</h4>
              <h6>{{testimonial.designation}}</h6>
              <div class="ratting d-flex align-items-center ga-1">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p>
                {{testimonial.message}}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
  <!-- Testimonial -->
</template>
<script setup>
import { defineProps, ref } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";

const modules = [Autoplay, Pagination, Navigation];
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const { testimonials } = defineProps(["testimonials"]);

{
  Swiper, SwiperSlide, modules;
}
</script>
<style lang=""></style>
