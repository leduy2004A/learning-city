import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });
  export function success(mess)
  {
    notyf.success(mess)
  }
