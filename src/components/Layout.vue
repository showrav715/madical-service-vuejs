<template>
  <vue-element-loading
    :active="isLoading"
    :duration="1"
    :is-full-screen="true"
  />
  <div>
    <!-- Header -->
    <div v-show="!isLoading" class="navbar-bottom">
      <div class="container">
        <div class="navbar-wrapper">
          <div class="logo">
            <router-link :to="{ name: 'home' }">
              <img :src="setting.header_logo" alt="" />
            </router-link>
          </div>

          <div class="nav-toggle d-lg-none" @click="toggleNav">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="nav-menu-area" :class="{ active: isNavOpen }">
            <div class="menu-close text--danger d-lg-none" @click="toggleNav">
              <i class="fas fa-times"></i>
            </div>
            <ul class="nav-menu">
              <li>
                <router-link :to="{ name: 'home' }">Home</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'about' }">About us</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'service' }">Service</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'blog' }">Blog</router-link>
              </li>

              <li>
                <router-link :to="{ name: 'contact' }">Contact</router-link>
              </li>
              <li>
                <div class="menu__btn">
                  <router-link class="cmn--btn" :to="{ name: 'contact' }"
                    >For Consultation</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Header -->

    <router-view
      v-show="!isLoading"
      style="transition: all ease-in-out"
    ></router-view>

    <!-- Footer section -->
    <footer
      v-if="!isLoading"
      class="footer-section position-relative overflow-hidden"
    >
      <div class="footer-top">
        <div class="container">
          <div class="footer-wrapper">
            <div class="footer-widget">
              <p class="ptext1">
                lroe ipsum dolor sit amet, consectetur adipiscing elit, dolore
                magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                commodo
              </p>

              <div class="footer-info">
                <div class="info-items">
                  <a href="#0"> {{ setting.phone }}</a>
                </div>
                <div class="info-items">
                  <a href="#0"> {{ setting.email }}</a>
                </div>
                <div class="info-items">
                  <a href="#0"> {{ setting.address }}</a>
                </div>
              </div>
            </div>
            <div class="footer-widget">
              <h5 class="footer-title">Quick Links</h5>
              <ul>
                <li>
                  <router-link :to="{ name: 'home' }">Home</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'about' }">About us</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'service' }">Service</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'blog' }">Blog</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'contact' }">Contact</router-link>
                </li>
              </ul>
            </div>
            <div class="footer-widget">
              <h5 class="footer-title">Pages</h5>
              <ul>
                <li v-for="page in pages" :key="page.id">
                  <router-link
                    :to="{ name: 'page', params: { slug: page.slug } }"
                    >{{ page.title }}</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="footer-widget">
              <h5 class="footer-title">Recent Post</h5>
              <div class="recent-post">
                <router-link
                  :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                  v-for="blog in letest_blog"
                  :key="blog.id"
                  href="blog.html"
                  class="recent-items"
                >
                  <div class="thumb">
                    <img
                      width="60"
                      :height="60"
                      :src="blog.photo"
                      alt="thumb-img"
                    />
                  </div>
                  <div class="content">
                    <span class="title d-block">
                      {{ blog.title }}
                    </span>
                    <span>{{ blog.created_at }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <p>
          <a href="#0">{{ setting.copyright_text }}</a>
        </p>
      </div>
      <span class="banner-elem elem3">&nbsp;</span>
      <span class="banner-elem elem5">&nbsp;</span>
      <span class="banner-elem elem6">&nbsp;</span>
      <span class="banner-elem elem8">&nbsp;</span>
    </footer>
    <!-- Footer section -->
  </div>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import myaxios from "../myaxios";
import VueElementLoading from "vue-element-loading";

const setting = ref({});
const recentblogs = ref({});
const letest_blog = ref({});
const pages = ref({});
const isNavOpen = ref(false);
const isLoading = ref(true);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const getBlogs = async () => {
  await myaxios.get("/get/recent/blogs").then((res) => {
    letest_blog.value = res.data.data.slice(0, 2);
    recentblogs.value = res.data.data;
  });
};

const handleLoading = (data) => {
  isLoading.value = data;
};

const getPages = () => {
  myaxios.get("/get/pages").then((res) => {
    pages.value = res.data;
  });
};

onMounted(async () => {
  await myaxios.get("/get/settings").then((res) => {
    setting.value = res.data;
  });
  getBlogs();
  getPages();
});

const breadcumb = () => {
  return setting.value.breadcumb;
};

provide("loading", handleLoading);
provide("setting", setting);
provide("latest_blogs", recentblogs);
provide("breadcumb", breadcumb);
</script>
<style lang=""></style>
