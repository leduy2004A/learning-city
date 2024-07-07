import { supabase } from "@/supabase/supabase"
import { Notyf } from "notyf";
const notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });
  
import "notyf/notyf.min.css";
export const getUserID = async ()=>{
    const user = await supabase.auth.getUser()
    return user.data.user.id
}
export const checkUserLogin = async ()=>{
    const {data} = await supabase.auth.getUser();
    if(data.user === null)
        {
            notyf.error("Bạn phải đăng nhập");
            return false;
        }
}