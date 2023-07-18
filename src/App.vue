<template>
  <div>
    <layout v-if="!isMaintance"></layout>
    <div v-else>
      <maintance
        :image="setting.maintenance_photo"
        :description="setting.maintenance"
      ></maintance>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref, provide } from "vue";
import Layout from "./components/Layout.vue";
import Maintance from "./components/maintance.vue";
import { useRouter } from "vue-router";
import myaxios from "./myaxios.js";
const isMaintance = ref(false);
const router = useRouter();
const setting = ref({});

onBeforeMount(async () => {
  await myaxios.get("/get/settings").then((res) => {
    setting.value = res.data;
  });
  if (setting.value.is_maintenance == 1) {
    isMaintance.value = true;
    router.push({ name: "home" });
  }
});

const breadcumb = () => {
  return setting.value.breadcumb;
};

provide("setting", setting);
provide("breadcumb", breadcumb);
</script>
