<template>
  <vue-element-loading
    :active="isLoading"
    spinner="bar-fade-scale"
    style="margin-top: 80px"
    color="#FF6700"
    :is-full-screen="true"
  />

  <div>
    <!-- Header -->
    <div class="navbar-bottom">
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
                <router-link
                  :to="{ name: 'home' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("Home") }}</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'about' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("About us") }}</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'service' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("Service") }}</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'doctor' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("Doctors") }}</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'blog' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("Blog") }}</router-link
                >
              </li>

              <li>
                <router-link
                  :to="{ name: 'contact' }"
                  @click="toggleNav"
                  active-class="active"
                  >{{ t("Contact") }}</router-link
                >
              </li>
              <li>
                <div class="menu__btn">
                  <router-link
                    class="cmn--btn"
                    @click="toggleNav"
                    :to="{ name: 'contact' }"
                    >{{ t("For Consultation") }}</router-link
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
                {{ setting.footer_text }}
              </p>

              <div class="footer-info">
                <div class="info-items">
                  <a href="javascript:;"> {{ setting.phone }}</a>
                </div>
                <div class="info-items">
                  <a href="javascript:;"> {{ setting.email }}</a>
                </div>
                <div class="info-items">
                  <a href="javascript:;"> {{ setting.address }}</a>
                </div>
              </div>
            </div>
            <div class="footer-widget">
              <h5 class="footer-title">{{ t("Quick Links") }}</h5>
              <ul>
               
                <li>
                  <router-link :to="{ name: 'about' }">{{
                    t("About us")
                  }}</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'service' }">{{
                    t("Service")
                  }}</router-link>
                </li>
                <li>
                  <router-link
                    :to="{ name: 'doctor' }"
                    @click="toggleNav"
                    active-class="active"
                    >{{ t("Doctors") }}</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'blog' }">{{
                    t("Blog")
                  }}</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'contact' }">{{
                    t("Contact")
                  }}</router-link>
                </li>
              </ul>
            </div>
            <div class="footer-widget">
              <h5 class="footer-title">{{ t("Pages") }}</h5>
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
              <h5 class="footer-title">{{ t("Recent Post") }}</h5>
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
          <a href="javascript:;">{{ setting.copyright_text }}</a>
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
import { ref, inject, provide, onMounted } from "vue";
import myaxios from "../myaxios";
import VueElementLoading from "vue-element-loading";
import { getLangs } from "../global";

const recentblogs = ref({});
const letest_blog = ref({});
const pages = ref({});
const isNavOpen = ref(false);
const isLoading = ref(true);
const setting = inject("setting");

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
  getBlogs();
  getPages();
  getLang();
});

const getLang = () => {
  myaxios.get("/get/language").then((res) => {
    getLangs(res.data);
  });
};

provide("loading", handleLoading);
provide("latest_blogs", recentblogs);
</script>
