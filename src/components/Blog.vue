<template lang="">
  <div class="col-lg-4 col-md-6 col-sm-6">
    <div class="blog__item">
      <router-link :to="{name:'singleBlog',params:{slug:blog.slug}}" class="blog-link"></router-link>
      <div class="blog__item-img">
        <img :src="blog.photo" alt="blog" />
      </div>
      <div class="blog__item-cont">
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <div class="blog-date">
            <span><i class="fas fa-clock"></i></span>
            <span>{{blog.created_at}}</span>
          </div>
          <div class="blog-date">
            <span><i class="fas fa-comment"></i></span>
            <span>No Comments</span>
          </div>
        </div>
        <h5 class="blog__item-cont-title line--2">
          {{blog.title}}
        </h5>
      </div>
    </div>
  </div>
</template>
<script setup>
const { blog } = defineProps(['blog']);
{
    blog;
}
</script>
<style lang=""></style>
