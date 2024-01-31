import React from "react";
import "../css/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      <section>
        <h2>Our Mission</h2>
        <p>
          At our IIT Bhilai Campus Delivery System, our mission is to simplify
          campus life by providing a convenient and efficient delivery service.
          We aim to connect students, faculty, and staff with the items they
          need, right at their doorstep.
        </p>
      </section>

      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Easy Ordering:</strong> Place orders effortlessly through
            our user-friendly platform.
          </li>
          <li>
            <strong>Quick Delivery:</strong> Enjoy swift and reliable delivery
            services within the campus.
          </li>
          <li>
            <strong>Transparent Tracking:</strong> Stay informed with real-time
            order tracking.
          </li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Place an Order:</strong> Select your items and place an
            order through our website or mobile app.
          </li>
          <li>
            <strong>Track Your Delivery:</strong> Monitor the progress of your
            order as it makes its way to you.
          </li>
          <li>
            <strong>Receive Your Delivery:</strong> Relax as your items are
            delivered directly to your specified location on campus.
          </li>
        </ol>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Reach out to us at{" "}
          <a href="iitbhilaicds@gmail.com">iitbhilaicds@gmail.com</a> or call us
          at <a href="tel:+91 1234567890">+91 1234567890</a>.
        </p>
      </section>

      <p>
        Thank you for choosing our IIT Bhilai Campus Delivery System for your
        delivery needs!
      </p>
    </div>
  );
};

export default AboutPage;
