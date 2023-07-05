<template lang="">
  <section class="sponsor__section pb-100">
    <div class="container">
      <div class="section__two mb-5 text-center">
        <h2 class="d-inline justify-content-center align-items-center">
          <span class="boldtext"> Our Partners </span>
        </h2>
      </div>
      <div class="sponsor__wrappper owl-theme owl-carousel">
        <swiper
          :spaceBetween="-15"
          :slidesPerView="5"
          :centeredSlides="false"
          :pagination="{
            clickable: true,
          }"
          :navigation="false"
          :modules="modules"
          :breakpoints="{
            '320': {
              slidesPerView: 2,
              spaceBetween: 5,
              
            },
            '640': {
              slidesPerView: 3,
              spaceBetween: 15,
              
            },
            '768': {
              slidesPerView: 4,
              spaceBetween: 20,
              
              
            },
            '1024': {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }"
          class="mySwiper"
        >
        <swiper-slide v-for="partner in partners" class="sponsor__item">
          <img :src="partner.photo" alt="simg" />
        </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script setup>
const { partners } = defineProps(["partners"]);
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";

const modules = [Autoplay, Pagination, Navigation];
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

{
  Swiper, SwiperSlide, modules;
}
</script>
