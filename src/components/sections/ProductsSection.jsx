import React from 'react';
import styles from '../../styles/components/sections/ProductsSection.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      image: '/path/to/product1.jpg',
      name: 'Solution Antivirus Pro',
      description: 'Protection avancée contre les malwares',
      characteristic: 'Détection en temps réel',
      price: '£95.00',
      availability: 'En stock'
    },
    {
      id: 2,
      image: '/path/to/product2.jpg',
      name: 'Firewall Enterprise',
      description: 'Sécurité réseau complète',
      characteristic: 'Protection périmétrique avancée',
      price: '£120.00',
      availability: 'En stock'
    },
    {
      id: 3,
      image: '/path/to/product3.jpg',
      name: 'Audit de Sécurité',
      description: 'Analyse complète de votre infrastructure',
      characteristic: 'Rapport détaillé et recommandations',
      price: '£150.00',
      availability: 'Sur demande'
    }
  ];

  return (
    <section className={styles.productsSection}>
      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>
          Découvrez <span className={styles.highlight}>nos solutions 360</span> de cybersécurité <span className={styles.highlight}>pour les PME</span>
        </h2>
      </div>

      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productCharacteristic}>{product.characteristic}</p>
                  <p className={styles.productPrice}>{product.price}</p>
                  <p className={styles.productAvailability}>{product.availability}</p>
                  <button className={styles.addToCartButton}>
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductsSection; 