<template lang="">
  <div>
    <!-- Breadcumnd Banner -->
    <section
      class="breadcrumb__section"
      :style="{ 'background-image': `url(${breadcumb()})` }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="breadcrumd__content">
              <h2 class="title fw-700 mb-3">About Us</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    Home
                  </router-link>
                </li>
                <li>
                  <a href="index.html">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <rouer-link :to="{ name: 'about' }" class="title fw-600">
                    About Us
                  </rouer-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->

    <!-- about us -->
    <section class="about__section pt-120 pb-120">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-xl-6 col-lg-6">
            <div class="about__thumb">
              <img :src="about.photo" class="w-100" alt="img" />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="about__content">
              <div class="section__two">
                <h4 class="mb-2">{{ about.header_title }}</h4>
                <h2 class="title">
                  {{ about.title }}
                </h2>
                <p class="mt-4 fz-18">
                  {{ about.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- about us -->

    <!-- Service -->
    <section class="service-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <div class="section-title mb55 text-center">
              <h6 class="subtitle">Our Service</h6>
              <h2 class="title">Explore Our Main Service</h2>
            </div>
          </div>
        </div>
        <div class="row g-4">
          <div
            v-for="service in services"
            :key="service.id"
            class="col-xl-4 col-lg-4 mb-2 col-md-6 col-sm-6"
          >
            <div class="service-item">
              <router-link
                :to="{
                  name: 'singleService',
                  params: { slug: service.slug },
                }"
                class="service__thumb"
              >
                <img :src="service.photo" alt="service" />
              </router-link>
              <div class="feature__content">
                <div class="bgicon">
                  <div class="service-icon">
                    <img :src="service.feature_icon" alt="service" />
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
                  Read More <i class="fas fa-angle-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="banner-elem elem3">&nbsp;</span>
      <span class="banner-elem elem7">&nbsp;</span>
      <span class="banner-elem elem2">&nbsp;</span>
      <span class="banner-elem elem5">&nbsp;</span>
      <span class="banner-elem elem8">&nbsp;</span>
    </section>
    <!-- Service -->
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import myaxios from "../myaxios";
const services = ref([]);
const about = ref({});
const loading = inject("loading");
const breadcumb = inject("breadcumb");

onMounted(() => {
  loading(true);
  getData();
});
// Get all services

const getData = async () => {
  const res = await myaxios.get("/get/about/data");
  about.value = res.data.about;
  services.value = res.data.services;
  loading(false);
};
</script>
