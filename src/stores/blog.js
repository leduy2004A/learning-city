import { defineStore } from "pinia";
export const useBlogStore = defineStore("blog", {
  state: () => {
    return {
      dataBlog: {
        content: "",
        created_at: "",
        id: "",
        image_blog: "",
        sub_content: "",
        topic: "",
        user_id: "",
      },
    };
  },
  actions: {
    getContentBlog(data) {
      this.$state.dataBlog = data;
    },
  },
});
