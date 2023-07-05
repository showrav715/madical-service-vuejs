<template lang="">
  <section class="team__section pt-70 mb-70">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-lg-6 col-md-7">
          <div class="team__content">
            <div class="section__two mb44">
              <h5>
                {{ about.header_title }}
              </h5>
              <h2 class="d-flex align-items-center">
                <span class="">{{ about.title }}</span>
              </h2>
            </div>
            <p class="ptext1">
              {{ about.description }}
            </p>

            <a :href="about.btn_url" class="cmn--btn">
              <span>{{ about.btn_text }}</span>
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-md-5">
          <a href="#0" class="team__thumb">
            <img :src="about.photo" class="w-100" alt="img" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { about } = defineProps(["about"]);
</script>
<style lang=""></style>
