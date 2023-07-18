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
              <h2 class="title fw-700 mb-3">{{ page.title }}</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    {{t('Home')}}
                  </router-link>
                </li>
                <li>
                  <a href="index.html">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <rouer-link
                    :to="{ name: 'page', params: { slug: page.slug } }"
                    class="title fw-600"
                  >
                    {{ page.title }}
                  </rouer-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->
    <section class="about__section pt-120 pb-120">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-xl-12 col-lg-12">
            <h3>
              {{ page.title }}
            </h3>
            <div class="about__content">
              <div class="section__two">
                <div
                  class="fz-16 mb-4"
                  v-dompurify-html="page.details && page.details"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, provide, onMounted, inject, watch } from "vue";
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const slug = ref("");
import { useRoute } from "vue-router";
import myaxios from "../myaxios";
const route = useRoute();
const page = ref({});
onMounted(() => {
  loading(true);
  getPage();
});

watch(
  () => route.params.slug,
  () => {
    loading(true);
    slug.value = route.params.slug;
    getPage();
    window.scrollTo(0, 0);
  }
);

slug.value = route.params.slug;
const getPage = async () => {
  const { data } = await myaxios.get(`get/page/${slug.value}`);
  page.value = data;
  loading(false);
};
</script>
<style lang=""></style>
