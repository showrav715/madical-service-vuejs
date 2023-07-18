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
              <h2 class="title fw-700 mb-3">{{ t("Service") }}</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    {{ t("Home") }}
                  </router-link>
                </li>
                <li>
                  <a href="#0">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <router-link :to="{ name: 'service' }" class="title fw-600">
                    {{ t("Service") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->

    <!-- service section -->
    <section class="service__section pt-100">
      <div class="container">
        <div class="row mb-4 justify-content-center">
          <div class="col-lg-5">
            <div class="section-title text-center">
              <h6 class="text--base mb-2">{{t('FACILITIES WE HAVE')}}</h6>
              <h2 class="title">{{t('Services For You')}}</h2>
            </div>
          </div>
        </div>

        <div class="row g-4 mb-5">
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
                  {{t('Read More')}} <i class="fas fa-angle-right"></i>
                </router-link>
              </div>
            </div>
          </div>

          <div class="pagination__list">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="abox__big"
            >
              {{t('Previous')}}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="abox__big"
            >
              {{t('Next')}}
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- service section -->
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import myaxios from "../myaxios";
const services = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const loading = inject("loading");
const breadcumb = inject("breadcumb");
onMounted(() => {
  loading(true);
  getServices();
});
// Get all services

const getServices = async () => {
  const res = await myaxios.get("/services?page=" + currentPage.value);
  services.value = res.data.data;
  totalPages.value = res.data.meta.last_page;
  loading(false);
};

// Go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loading(true);
    getServices();
  }
};

// Go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loading(true);
    getServices();
  }
};

{
  previousPage, nextPage, getServices, currentPage, totalPages, services;
}
</script>
