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
              <h2 class="title fw-700 mb-3">{{ t("Contact us") }}</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    {{ t("Home") }}
                  </router-link>
                </li>
                <li>
                  <a href="index.html">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <router-link :to="{ name: 'contact' }" class="title fw-600">
                    {{ t("Contact us") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- contact section -->
    <section class="contact__section mt-80">
      <div class="container">
        <div class="row justify-content-center g-4 mb-5">
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-10">
            <div class="contact__number">
              <div class="icon">
                <i class="fas fa-phone"></i>
              </div>
              <a href="javascript:;">
                <span>{{ data.phone1 }}</span>
                <span>{{ data.phone2 }}</span>
              </a>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-10">
            <div class="contact__number">
              <div class="icon">
                <i class="fas fa-envelope"></i>
              </div>
              <a href="javascript:;">
                <span>{{ t("Email") }}: {{ data.email1 }}</span>
                <span>{{ data.email2 }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center justify-content-between">
          <div class="col-lg-7">
            <form class="contact__form" @submit.prevent="handleSubmit">
              <div
                v-if="success"
                class="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>{{ t("Submit Successfully.") }} </strong>
                {{ t("Your message has been sent") }}
              </div>
              <h2>{{ data.title }}</h2>
              <div class="row g-4">
                <div class="col-sm-6 form-group">
                  <input
                    type="text"
                    class="form-control form--control bg--section"
                    :placeholder="t('Name')"
                    v-model="form.name"
                  />
                  <span v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="col-sm-6 form-group">
                  <input
                    type="text"
                    class="form-control form--control bg--section"
                    :placeholder="t('Email')"
                    v-model="form.email"
                  />
                  <span v-if="errors.email">{{ errors.email[0] }}</span>
                </div>
                <div class="col-sm-12 form-group">
                  <input
                    type="text"
                    class="form-control form--control bg--section"
                    :placeholder="t('Phone')"
                    v-model="form.phone"
                  />
                  <span v-if="errors.phone">{{ errors.phone[0] }}</span>
                </div>
                <div class="col-sm-12 form-group">
                  <input
                    type="text"
                    class="form-control form--control bg--section"
                    :placeholder="t('Subject')"
                    v-model="form.subject"
                  />
                  <span v-if="errors.subject">{{ errors.subject[0] }}</span>
                </div>
                <div class="col-sm-12 form-group">
                  <textarea
                    class="form-control form--control bg--section"
                    :placeholder="t('Message')"
                    v-model="form.message"
                  ></textarea>
                  <span v-if="errors.message">{{ errors.message[0] }}</span>
                </div>
                <div class="col-xl-12 form-group">
                  <loader-button :loading="isLoading">
                    {{ t("Send Message") }}
                  </loader-button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-4">
            <div class="contact__content">
              <h4 class="d-flex align-items-center">
                <span class="boldtext"> {{ t("Address us") }} </span>
              </h4>
              <p>
                {{ data.text }}
              </p>
              <div class="contact__item">
                <div class="contact__item-cont">
                  <h6 class="contact__item-title">
                    {{ data.address }}
                  </h6>
                </div>
              </div>
              <div class="contact__item">
                <div class="contact__item-cont">
                  <h6 class="contact__item-title">
                    {{ data.email1 }}
                    <span> {{ data.email1 }} </span>
                  </h6>
                </div>
              </div>
              <div class="contact__item">
                <div class="contact__item-cont">
                  <h6 class="contact__item-title">
                    {{ data.phone1 }}
                    <span> {{ data.phone2 }} </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- contact section -->

    <!-- google map section -->
    <section class="google__map">
      <div class="container">
        <div class="google__maping">
          <iframe
            :src="data.map_link"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
    <!-- google map section -->
  </div>
</template>
<script setup>
import { ref, onMounted, inject, reactive } from "vue";
import LoaderButton from "../components/LoaderButton.vue";
import myaxios from "../myaxios";
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const data = ref([]);
const form = reactive({
  
});

const errors = ref({});
const success = ref(false);
const isLoading = ref(false);

onMounted(() => {
  loading(true);
  getData();
});

const handleSubmit = () => {
  isLoading.value = true;
  myaxios
    .post("/contact/form/submit", form)
    .then((res) => {

      form.name = "";
      form.email = "";
      form.phone = "";
      form.subject = "";
      form.message = "";
      errors.value = {};
      success.value = true;
      isLoading.value = false;
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      isLoading.value = false;
    });
};

const getData = () => {
  myaxios.get("/get/contact").then((res) => {
    data.value = res.data;
    loading(false);
  });
};

{
  success, errors, form, handleSubmit, data, breadcumb;
}
</script>
<style lang="css">
.mt-80 {
  margin-top: 100px;
}
.form-group span {
  display: block;
  color: crimson;
  font-weight: bold;
}
</style>
