import React from "react";
import "../css/Contact.css";

const ContactPage = () => {
  return (
    <div className="page-container">
      <div className="contact-container">
        <h1 className="header-style">Contact Us</h1>

        <section className="section-style">
          <h2 className="header-style">Get in Touch</h2>
          <p>
            Have questions or need assistance? Feel free to reach out to us
            using the contact information below.
          </p>
        </section>

        <section className="section-style">
          <h2 className="header-style">Contact Information</h2>
          <p className="p-style">
            Email:{" "}
            <a href="mailto:contact@yourcompany.com" className="link-style">
              contact@yourcompany.com
            </a>
          </p>
          <p className="p2-style">
            Phone:{" "}
            <a href="tel:+123456789" className="link-style">
              +123456789
            </a>
          </p>
        </section>

        <section className="section-style">
          <h2 className="header-style">Visit Us</h2>
          <p>123 Main Street, Cityville, Country</p>
        </section>

        <section className="section-style">
          <h2 className="header-style">Business Hours</h2>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
