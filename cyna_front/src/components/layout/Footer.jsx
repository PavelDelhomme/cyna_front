import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Footer/Footer.module.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'inscription à la newsletter
    console.log("Email souscrit:", email);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Produits</Link></li>
            <li><Link to="/discover">Découvrir</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><span className={styles.phone}><a href="tel:+33659595959">+33 6 59 59 59 59</a></span></li>
            <li><span className={styles.email}><a href="mailto:contact@cyna.fr">contact@cyna.fr</a></span></li>
            <li><span className={styles.address}>11 Av. Dubonnet, 92400 Courbevoie</span></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Newsletter</h3>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresse mail"
              className={styles.emailInput}
            />
            <button type="submit" className={styles.submitButton}>
              →
            </button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerLogo}>
          <img src="/assets/logo.svg" alt="CYNA" />
        </div>
        <div className={styles.footerLinks}>
          <Link to="/cgu">CGU</Link>
          <Link to="/confidentialite">Mentions Légales</Link>
        </div>
        <div className={styles.socialLinks}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
