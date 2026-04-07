import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function showMessage(message) {
  iziToast.success({
    message,
    position: "topRight",
  });
}

export function showError(message) {
  iziToast.error({
    message,
    position: "topRight",
  });
}