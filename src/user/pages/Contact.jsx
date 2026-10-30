import React, { useRef } from "react";
import Header from "../components/Header";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    const { name, email, message } = form.current;
    if (name.value && email.value && message.value) {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
          },
        )
        .then(
          () => {
            console.log("SUCCESS!");
            toast.success(
              "Thank you for contacting us, our team will get back to you soon...",
            );
          },
          (error) => {
            console.log("FAILED...", error.text);
          },
        );
        name.value=""
        email.value=""
        message.value=""
    } else {
      toast.warning("Kindly fill the form!!!!");
    }
  };

  return (
    <>
      <Header />

      <div className="md:px-20 p-5 my-5">
        <h1 className="text-center my-5 font-bold text-3xl">Contact US</h1>

        <p className="text-justify">
          Source of Wisdom: Books hold history, science, culture, and life
          lessons from brilliant minds. Mental Growth: Reading sharpens our
          focus, improves vocabulary, and builds critical thinking skills.
          Comfort and Escape: Stories allow us to explore new worlds and find
          peace when we feel stressed. Lifelong Companions: Unlike digital
          distractions, a good book remains a quiet, supportive friend at every
          stage of life.
        </p>

        {/* Contact Details */}
        <div className="md:grid grid-cols-3 items-center md:px-40 p-5 mt-5 md:mt-0">
          {/* Address */}
          <div className="flex items-center">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              className="flex items-center justify-center bg-gray-200"
            >
              <FaLocationPin />
            </div>

            <p className="ms-5">123 Main Street, 123456</p>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              className="flex items-center justify-center bg-gray-200"
            >
              <FaPhoneAlt />
            </div>

            <p className="ms-5">1234567890</p>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              className="flex items-center justify-center bg-gray-200"
            >
              <MdEmail />
            </div>

            <p className="ms-5">bookstore@gmail.com</p>
          </div>
        </div>

        {/* Message + Map */}
        <div className="md:grid grid-cols-2 gap-10 my-5 p-5 md:px-40 items-center">
          {/* Message Form */}
          <div className="bg-gray-200 p-5 text-center">
            <h1 className="font-semibold text-2xl">Send Us Message!</h1>

            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-5 my-10">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="bg-white w-full p-2 rounded"
                />
              </div>

              <div className="mb-5 my-10">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full p-2 rounded"
                />
              </div>

              <div className="mb-5 my-10">
                <input
                  type="text"
                  name="message"
                  placeholder="Message"
                  className="bg-white w-full p-2 rounded"
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="bg-black p-2 w-full text-white text-lg flex justify-center items-center rounded"
                >
                  <FaPaperPlane className="ms-2 me-2" />
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Google Map */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.975153877019!2d76.33777167589108!3d10.01890884717665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080ffce877d5ef%3A0x8bef6870ad11b98!2sLuminar%20Technolab!5e0!3m2!1sen!2sin!4v1789543612628!5m2!1sen!2sin"
              width="100%"
              height="480"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>
      {/* toast container */}
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </>
  );
}

export default Contact;
