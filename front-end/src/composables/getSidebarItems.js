import { ref } from "vue";
import axios from "axios";

const getSidebarItem = (path) => {
  const sidebarItems = ref([]);
  const error = ref(null);

  const ftechData = async (path) => {
    try {
      let response = await axios.get(path);
      let data = response.data;
      sidebarItems.value = data;
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { path, sidebarItems, error, ftechData };
};

export default getSidebarItem;
