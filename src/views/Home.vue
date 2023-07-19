<template>
  <div>
    <hero :counters="counters" :herodata="heredata" />
    <service
      :services="featureServices"
      :subtitle="home_content.service_subtitle"
      :title="home_content.service_title"
    />
    <about-section :about="about"></about-section>
    <!-- doctor point section -->

    <section class="doctor__section pt-70 mb-70">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <doctor
            v-for="doctor in featureDoctors"
            :key="doctor.id"
            :doctor="doctor"
          />
        </div>
      </div>
    </section>
    <!-- doctor point section -->
    <testimonial
      :testimonials="testimonials"
      :title="home_content.testimonial_title"
      :subtitle="home_content.testimonial_subtitle"
    />
    <!-- Blog  section -->
    <section class="blog-section pb-200">
      <div class="container">
        <div class="section__two mb-5 text-center">
          <h2 class="d-inline justify-content-center align-items-center">
            <span class="boldtext"> {{ home_content.blog_title }} </span>
          </h2>
        </div>
        <div class="row g-4 g-lg-3 g-xl-4 justify-content-center">
          <blog v-for="blog in latestBlogs" :key="blog.id" :blog="blog"></blog>
        </div>
      </div>
    </section>

    <partner :partners="partners" :title="home_content.partner_title" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import myaxios from "../myaxios.js";
import Hero from "../components/Hero.vue";
import Service from "../components/Service.vue";
import AboutSection from "../components/AboutSection.vue";
import Doctor from "../components/Doctor.vue";
import Testimonial from "../components/Testimonial.vue";
import Blog from "../components/Blog.vue";
import Partner from "../components/Partner.vue";
// any type

const heredata = ref({});
const counters = ref({});
const about = ref({});
const featureServices = ref({});
const featureDoctors = ref({});
const testimonials = ref({});
const latestBlogs = inject("latest_blogs");
const loading = inject("loading");
const partners = ref({});
const home_content = ref({});

onMounted(() => {
  loading(true);
  getData();
});

const getData = () => {
  myaxios
    .get("/get/home/data")
    .then((res) => {
      heredata.value = res.data.hero_data;
      counters.value = res.data.counters;
      about.value = res.data.about;
      featureServices.value = res.data.services;
      featureDoctors.value = res.data.doctores;
      testimonials.value = res.data.testimonils;
      partners.value = res.data.partners;
      home_content.value = res.data.home_sections;
      loading(false);
    })
    .catch((err) => {
      console.log(err);
    });

  components: {
    Hero,
      Service,
      AboutSection,
      Doctor,
      Testimonial,
      Blog,
      latestBlogs,
      Partner;
  }
};
</script>
