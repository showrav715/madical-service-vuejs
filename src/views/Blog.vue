<template lang="">
  <div>
    <section
      class="breadcrumb__section"
      :style="{ 'background-image': `url(${breadcumb()})` }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="breadcrumd__content">
              <h2 class="title fw-700 mb-3">{{ t("Blog") }}</h2>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="main__blogsection pt-80 pb-80">
      <div class="container">
        <div class="main__blogwrap">
          <div class="row g-4">
            <div class="col-xl-7">
              <div v-if="blogs.length != 0">
                <div
                  v-for="blog in blogs"
                  :key="blog.id"
                  class="blog__item mb-5"
                >
                  <router-link
                    :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                    class="blog-link"
                    >&nbsp;</router-link
                  >
                  <div class="blog__item-img">
                    <img :src="blog.photo" class="w-100" alt="blog" />
                  </div>
                  <div class="blog__item-conts">
                    <div class="d-flex mb-2 align-items-center gap-3 flex-wrap">
                      <div class="blog-date">
                        <span><i class="fas fa-clock base3"></i></span>
                        <span>{{ blog.created_at }}</span>
                      </div>
                      {{ blog.category.name }}
                      <div class="blog-date">
                        <span><i class="fas fa-comment base3"></i> </span>
                        <span
                          >{{ blog.comment_count }} {{ t("Comments") }}</span
                        >
                      </div>
                    </div>
                    <h3 class="mb-3">
                      {{ blog.title }}
                    </h3>
                    <p class="fz-16 mb-4">
                      {{
                        blog.description.replace(/<[^>]+>/g, "").slice(0, 100)
                      }}
                    </p>
                    <router-link
                      :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                      class="cmn--btn"
                    >
                      <span> {{ t("Read More") }} </span>
                      <span><i class="fas fa-chevron-right"></i></span>
                    </router-link>
                  </div>
                </div>

                <div class="pagination__list" v-if="blogs.length < total">
                  <button
                    @click="previousPage"
                    :disabled="query.currentPage === 1"
                    class="abox__big"
                  >
                    {{ t("Previous") }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="query.currentPage === totalPages"
                    class="abox__big"
                  >
                    {{ t("Next") }}
                  </button>
                </div>
              </div>
              <div
                v-else
                class="text-center border p-4 d-flex justify-content-center"
              >
                <h3>{{ t("No Blog Found") }}</h3>
              </div>
            </div>

            <div class="col-xl-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ t("Search Here") }}</h5>
                  <form @submit.prevent="handleSearch">
                    <input
                      type="text"
                      v-model="input"
                      :placeholder="t('Search Here')"
                    />
                    <i class="fas fa-search"></i>
                  </form>
                </div>
                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ t("Categories") }}</h5>
                  <ul class="cate__list">
                    <li v-for="category in categories" :key="category.id">
                      <a
                        href="javascript:;"
                        @click="handleCategorywise(category.slug)"
                        class="d-flex align-items-center justify-content-between"
                      >
                        <span class="text">
                          {{ category.name }}
                        </span>
                        <span class="icon">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
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
  </div>
</template>
<script setup>
import { ref, onMounted, watch, reactive, inject } from "vue";
import myaxios from "../myaxios";
import { useRouter, useRoute } from "vue-router";
const blogs = ref({});
const categories = ref({});
const router = useRouter();
const route = useRoute();
const recentBlogs = ref({});

const loading = inject("loading");
const breadcumb = inject("breadcumb");
const totalPages = ref(1);
const total = ref(0);
const query = reactive({
  category: "",
  search: "",
  currentPage: 1,
});

const input = ref(null);
const handleSearch = () => {
  query.search = input.value;
};

// Go to the previous page
const previousPage = () => {
  if (query.currentPage > 1) {
    query.currentPage--;
  }
};

// Go to the next page
const nextPage = () => {
  if (query.currentPage < totalPages.value) {
    query.currentPage++;
  }
};

const handleCategorywise = (slug) => {
  query.category = slug;
};

onMounted(() => {
  Object.assign(query, { ...route.query });
  loading(true);
  getRecentBlog();
  getBlog();
  getBlogCategory();
});

watch(
  () => [{ ...query }],
  () => {
    router.push({ query });
    loading(true);
    getBlog();
    window.scrollTo(0, 0);
  }
);

const getBlog = () => {
  const params = {
    page: query.currentPage,
    category: query.category,
    search: query.search,
  };

  myaxios.get(`/get/blogs`, { params }).then((response) => {
    blogs.value = response.data.data;
    totalPages.value = response.data.meta.last_page;
    total.value = response.data.meta.total;
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

{
  totalPages,
    previousPage,
    nextPage,
    query,
    getBlog,
    getBlogCategory,
    getRecentBlog;
  breadcumb;
  blogs;
  categories;
  recentBlogs;
  input;
  handleSearch;
  handleCategorywise;
}
</script>
