import { ref } from "vue";
const languages = ref({});
const getLangs = async (data) => {
  languages.value = data;
};

const translate = (key) => {
  return languages.value[key] || key;
};

export { translate, getLangs };
