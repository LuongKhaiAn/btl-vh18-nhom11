import styles from "./ProductCard.module.css";

const typeMeta = {
  stay: {
    label: "Stay",
    priceUnit: "/ đêm",
    action: "Khám phá",
  },
  fly: {
    label: "Fly",
    priceUnit: "/ khách",
    action: "Đặt ngay",
  },
  drive: {
    label: "Drive",
    priceUnit: "/ tour",
    action: "Khám phá",
  },
};

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

const renderDetail = (product) => {
  if (product.type === "fly") {
    return `${product.airline} · ${product.duration} · Khởi hành ${product.departure}`;
  }

  if (product.type === "stay") {
    return `${product.beds} giường · ${product.amenities}`;
  }

  return `${product.days} ngày · ${product.guide}`;
};

const ProductCard = ({ product }) => {
  const meta = typeMeta[product.type];
  const isFly = product.type === "fly";

  return (
    <article className={`${styles.card} ${isFly ? styles.cardRow : ""}`}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.badge}>{product.badge}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.topLine}>
          <span className={styles.typePill}>{meta.label}</span>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
        </div>

        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.location}>{product.location}</p>
        </div>

        <p className={styles.detail}>{renderDetail(product)}</p>

        <div className={styles.footer}>
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Từ</span>
            <strong className={styles.price}>{formatPrice(product.price)}</strong>
            <span className={styles.priceUnit}>{meta.priceUnit}</span>
          </div>

          <button type="button" className={styles.actionBtn}>
            {meta.action}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
