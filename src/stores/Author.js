import { supabase } from "@/supabase/supabase";
import { defineStore } from "pinia";
export const useAuthorStore = defineStore("author", {
  state: () => {
    return {
      dataAuthor: [],
    };
  },
  actions: {
    async getDataAuthor() {
      const { data, error } = await supabase.from("Author").select();
      if (!error) {
        this.dataAuthor = data;
      }
    },
  },
});
