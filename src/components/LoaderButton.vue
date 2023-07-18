<template>
   <div>
    <button class="cmn--btn w-100">
      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </button>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
name: "loader-button";
defineProps(['loading']);
</script>