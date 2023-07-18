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
              <h2 class="title">{{ t("Our Doctors") }}</h2>
            </div>
          </div>
        </div>

        <div class="row g-4 mb-5">
          <doctor
            v-for="doctor in doctors"
            :key="doctor.id"
            :doctor="doctor"
          />

          <div class="pagination__list" v-if="per_page < totalPages">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="abox__big"
            >
              {{ t("Previous") }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="abox__big"
            >
              {{ t("Next") }}
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
import Doctor from "../components/Doctor.vue";
const doctors = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const per_page = ref(0);
const loading = inject("loading");
const breadcumb = inject("breadcumb");
onMounted(() => {
  loading(true);
  getDoctors();
});

const getDoctors = async () => {
  const res = await myaxios.get("/get/doctors?page=" + currentPage.value);
  doctors.value = res.data.data;
  totalPages.value = res.data.meta.total;
  per_page.value = res.data.meta.per_page;
  loading(false);
};

// Go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loading(true);
    getDoctors();
  }
};

// Go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loading(true);
    getDoctors();
  }
};

{
  previousPage, nextPage, getDoctors, currentPage, totalPages;
}
</script>
