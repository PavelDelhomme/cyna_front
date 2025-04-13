import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import ProductsSection from "../components/sections/ProductsSection";
import styles from "../styles/components/Landing/LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
        <ProductsSection />
        {/* Autres sections à venir */}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
