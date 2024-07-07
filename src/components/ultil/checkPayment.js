import { supabase } from "@/supabase/supabase";
export const paymentCheck = async (user_id, course_id) => {
    const { data } = await supabase
      .from("Payment")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id)
      .eq("status", "PAID");
    if (data.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

