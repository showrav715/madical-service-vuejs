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
              <h2 class="title fw-700 mb-3">{{ t("Service - Details") }}</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    {{ t("Home") }}
                  </router-link>
                </li>
                <li>
                  <a href="javascript:;">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <a href="service.html" class="title fw-600">
                    {{ t("Service") }}
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="title fw-600">
                    {{ service.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->
    <section class="main__blogsection pt-80 pb-80">
      <div class="container">
        <div class="main__blogwrap">
          <div class="row g-4">
            <div class="col-xl-4 col-lg-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <ul class="cate__list">
                    <li v-for="recent in recent_service" :key="recent.id">
                      <router-link
                        :to="{
                          name: 'singleService',
                          params: { slug: recent.slug },
                        }"
                        class="d-flex align-items-center justify-content-between"
                      >
                        <span class="text"> {{ recent.title }} </span>
                        <span class="icon">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-7 col-lg-8">
              <div class="blog__item mb-5">
                <a href="#0" class="blog-link">&nbsp;</a>
                <div class="blog__item-img">
                  <img :src="service.photo" class="w-100" alt="blog" />
                </div>
                <div class="blog__item-conts">
                  <div
                    class="fz-16 mb-4"
                    v-dompurify-html="
                      service.description && service.description
                    "
                  ></div>
                </div>
              </div>
              <div class="qustion__content">
                <div class="accordion__wrap">
                  <div
                    v-for="(faq, index) in faqs"
                    :key="faq.id"
                    class="accordion"
                    :id="`accordionExample${faq.id}`"
                  >
                    <!--Accordion items-->
                    <div
                      class="accordion-item wow fadeInUp"
                      data-wow-duration="0.9s"
                    >
                      <h2 class="accordion-header" :id="`headingOne${faq.id}`">
                        <button
                          class="accordion-button"
                          :class="index == 0 ? '' : 'collapsed'"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#collapseOne${faq.id}`"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          {{ faq.title }}
                        </button>
                      </h2>

                      <div
                        :id="`collapseOne${faq.id}`"
                        class="accordion-collapse collapse"
                        :class="index == 0 ? 'show' : ''"
                        :aria-labelledby="`headingOne${faq.id}`"
                        :data-bs-parent="`#accordionExample${faq.id}`"
                      >
                        <div class="accordion-body">
                          <p>
                            {{ faq.content }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted, inject, watch } from "vue";
import myaxios from "../myaxios";
import { useRoute } from "vue-router";
const service = ref({});
const faqs = ref([]);
const recent_service = ref([]);
const route = useRoute();
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const slug = ref(route.params.slug);
onMounted(() => {
  loading(true);
  getData();
});

watch(
  () => route.params.slug,
  () => {
    slug.value = route.params.slug;
    loading(true);
    getData();
  }
);

const getData = async () => {
  const { data } = await myaxios.get(`/single/service/${slug.value}`);
  service.value = data.service;
  faqs.value = data.service.faqs;
  recent_service.value = data.recent;
  loading(false);
};
</script>
<style lang=""></style>
