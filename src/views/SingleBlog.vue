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
              <h2 class="title fw-700 mb-3">{{ t("Blog - Details") }}</h2>
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
                  <router-link :to="{ name: 'blog' }" class="title fw-600">
                    {{ t("Blog") }}
                  </router-link>
                </li>
                <li>
                  <a href="javascript:;">
                    <i class="fas fa-chevron-right title"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="title fw-600">
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
                      <span>{{ blog.comment_count }}</span>
                    </div>
                  </div>
                  <div
                    v-dompurify-html="blog.description && blog.description"
                  ></div>
                </div>
              </div>
              <div class="comment__wrapper">
                <h3 class="mb-4">[{{ blog.comment_count }}] {{t('Comments')}}</h3>
                <ul class="comments__list">
                  <li
                    v-for="comment in blog.comments"
                    :key="comment.id"
                    class="mb-3"
                  >
                    <div class="content">
                      <span
                        class="d-flex fz-22 title mb-2 align-items-center justify-content-between"
                      >
                        {{ comment.name }}
                      </span>
                      <p class="fz-14">
                        {{ comment.comment }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <form @submit.prevent="handleComment" class="leave__comment mt-4">
                <div
                  v-if="success"
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{{ t("Submit Successfull.") }}</strong>
                  {{
                    t("Thank you for commenting. We will get back to you soon.")
                  }}
                </div>
                <h4 class="comment__title">{{ t("Write A Comment") }}</h4>
                <div class="row g-3">
                  <div class="col-lg-6">
                    <input
                      type="text"
                      v-model="comment.name"
                      :placeholder="t('Your Name')"
                    />
                    <span class="text-danger" v-if="errors.name">{{
                      errors.name[0]
                    }}</span>
                  </div>
                  <div class="col-lg-6">
                    <input
                      type="text"
                      v-model="comment.email"
                      :placeholder="t('Your Email')"
                    />
                    <span class="text-danger" v-if="errors.email">{{
                      errors.email[0]
                    }}</span>
                  </div>
                  <div class="col-lg-12">
                    <textarea
                      cols="45"
                      rows="5"
                      aria-required="true"
                      :placeholder="t('Your comment')"
                      v-model="comment.comment"
                      name="comment"
                      id="comment"
                    ></textarea>
                    <span class="text-danger" v-if="errors.comment">{{
                      errors.comment[0]
                    }}</span>
                  </div>
                  <div class="col-lg-12">
                    <loader-button :loading="isLoading">
                      <span> {{ t("Post Comment") }} </span>
                    </loader-button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ t("Search Here") }}</h5>
                  <form action="#0">
                    <input type="text" :placeholder="t('Search Here')" />
                    <i class="fas fa-search"></i>
                  </form>
                </div>

                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ t("Categories") }}</h5>
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
                  <h5 class="details__title">{{ t("Recent Post") }}</h5>
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
import { ref, onMounted, watch, inject, reactive } from "vue";
import myaxios from "../myaxios";
import { useRoute } from "vue-router";
import LoaderButton from "../components/LoaderButton.vue";
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

const isLoading = ref(false);

const success = ref(false);

const comment = reactive({
  name: "",
  email: "",
  comment: "",
  blog_id: null,
});

const errors = ref({});
const handleComment = () => {
  isLoading.value = true;
  myaxios
    .post("/blog/comment/submit", comment)
    .then((res) => {
      success.value = true;
      isLoading.value = false;
      comment.name = "";
      comment.email = "";
      comment.comment = "";
      errors.value = {};
      getBlog();
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      console.log(err.response.data.errors);
      isLoading.value = false;
    });
};

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
    comment.blog_id = response.data.data.id;
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
