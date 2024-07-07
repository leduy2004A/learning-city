import emailjs from "@emailjs/browser";
export const sendMailWithCodeCourse = async (to_name, code, to_email) => {
  var templateParams = {
    to_name: to_name,
    code: code,
    to_email: to_email,
  };

  emailjs
    .send("service_9r0jf9r", "template_2l0uhda", templateParams, {
      publicKey: "W4k5exh6DDd43OumV",
    })
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
};
