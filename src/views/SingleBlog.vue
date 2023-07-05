<template lang="">
  <div>
    <!-- Breadcumnd Banner -->
    <section class="breadcrumb__section" :style="{ 'background-image': `url(${breadcumb()})` }">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="breadcrumd__content" >
              <h2 class="title fw-700 mb-3">Blog - Details</h2>
              <ul class="bread__list flex-wrap d-flex align-items-center gap-3">
                <li>
                  <router-link :to="{ name: 'home' }" class="title fw-600">
                    Home
                  </router-link>
                </li>
                <li>
                  <a href="#0">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <router-link :to="{ name: 'blog' }" class="title fw-600">
                    Blog
                  </router-link>
                </li>
                <li>
                  <a href="#0">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <a href="#0" class="title fw-600">
                    {{ blog.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->

    <!-- main blog -->
    <section class="main__blogsection pt-80 pb-80">
      <div class="container">
        <div class="main__blogwrap">
          <div class="row g-4">
            <div class="col-xl-7 col-lg-8">
              <div class="blog__item mb-5">
                <a href="#0" class="blog-link">&nbsp;</a>
                <div class="blog__item-img">
                  <img :src="blog.photo" class="w-100" alt="blog" />
                </div>
                <div class="blog__item-conts">
                  <div class="d-flex mb-3 align-items-center gap-3 flex-wrap">
                    <div class="blog-date">
                      <span><i class="fas fa-clock base3"></i></span>
                      <span>{{ blog.created_at }}</span>
                    </div>
                    {{ blog.category && blog.category.name }}
                    <div class="blog-date">
                      <span><i class="fas fa-comment base3"></i></span>
                      <span>No Comments</span>
                    </div>
                  </div>

                  <p class="fz-16 mb-4">
                    {{
                      blog.description &&
                      blog.description.replace(/<[^>]+>/g, "")
                    }}
                  </p>
                </div>
              </div>
              <div class="comment__wrapper">
                <h3 class="mb-4">[3] Commets</h3>
                <ul class="comments__list">
                  <li class="mb-3">
                    
                    <div class="content">
                      <span
                        class="d-flex fz-22 title mb-2 align-items-center justify-content-between"
                      >
                        Admin
                      </span>
                      <p class="fz-14">
                        Popular admin post ipsum dolor sit amet consectetur,
                        adipisicing elit. Quasi asperiores necessitatibus quidem
                        dolore ipsum tempore atque.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <form action="#0" class="leave__comment">
                <h4 class="comment__title">Write A Reply Or Comment</h4>
                <div class="row g-3">
                  <div class="col-lg-12">
                    <textarea
                      cols="45"
                      rows="5"
                      aria-required="true"
                      placeholder="Your comment"
                      name="comment"
                      id="comment"
                    ></textarea>
                  </div>
                  <div class="col-lg-6">
                    <input type="text" placeholder="Your Name..." />
                  </div>
                  <div class="col-lg-6">
                    <input type="text" placeholder="Your Email..." />
                  </div>
                  <div class="col-lg-12">
                    <input type="text" placeholder="Your Website..." />
                  </div>
                  <div class="col-lg-12">
                    <button type="submit" class="cmn--btn">
                      <span> Post Comment </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <h5 class="details__title">Search Here</h5>
                  <form action="#0">
                    <input type="text" placeholder="Search Here..." />
                    <i class="fas fa-search"></i>
                  </form>
                </div>

                <div class="details__sidebox mb-30">
                  <h5 class="details__title">Categoris</h5>
                  <ul class="cate__list">
                    <li v-for="category in categories" :key="category.id">
                      <router-link
                        :to="{
                          name: 'blog',
                          query: { category: category.slug },
                        }"
                        href="blog-details.html"
                        class="d-flex align-items-center justify-content-between"
                      >
                        <span class="text">
                          {{ category.name }}
                        </span>
                        <span class="icon">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </router-link>
                    </li>
                  </ul>
                </div>

                <div class="details__sidebox mb-30">
                  <h5 class="details__title">Recent Post</h5>
                  <ul class="recent__small">
                    <li
                      v-for="blog in recentBlogs"
                      :key="blog.id"
                      class="d-flex align-items-center"
                    >
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: blog.slug },
                        }"
                        
                        class="recent__thumb"
                      >
                        <img :src="blog.photo" alt="recent" />
                      </router-link>
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: blog.slug },
                        }"
                        
                        class="textes"
                      >
                        {{ blog.title }}
                        <span class="date"> {{ blog.created_at }} </span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- main blog -->
  </div>
</template>
<script setup>
import { ref, onMounted,watch,inject } from "vue";
import myaxios from "../myaxios";
import { useRoute } from "vue-router";
const breadcumb = inject("breadcumb");
const blog = ref({});
const categories = ref({});
const route = useRoute();
const status = ref(false);
const recentBlogs = ref({});
const loading = inject("loading");

onMounted(() => {
  loading(true);
  getBlog();
  getBlogCategory();
  getRecentBlog();

});

watch(
  () => route.params.slug,
  () => {
    loading(true);
    getBlog();
  }
);

const getBlog = async () => {
  await myaxios.get("/single/blog/" + route.params.slug).then((response) => {
    blog.value = response.data.data;
    status.value = true;
    loading(false);
  });
};

const getBlogCategory = () => {
  myaxios.get("/get/blog/categories").then((response) => {
    categories.value = response.data;
  });
};

const getRecentBlog = () => {
  myaxios.get("/get/recent/blogs").then((response) => {
    recentBlogs.value = response.data.data;
  });
};
</script>
