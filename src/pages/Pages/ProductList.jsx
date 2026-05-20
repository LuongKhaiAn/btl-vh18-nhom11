import { useMemo, useState } from "react";
import products from "./MockData";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

const tabs = [
  { key: "stay", label: "🏨 Nơi ở", sub: "Stay" },
  { key: "fly", label: "✈️ Chuyến bay", sub: "Fly" },
  { key: "drive", label: "🗺️ Trải nghiệm", sub: "Drive" },
];

const typeLabels = {
  stay: "nơi ở",
  fly: "chuyến bay",
  drive: "trải nghiệm",
};

const MAX_PRICE = Math.max(...products.map((item) => item.price));

const formatCompactPrice = (value) =>
  `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(
    value / 1000000
  )}tr`;

const ProductList = () => {
  const [activeType, setActiveType] = useState("stay");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("recommended");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    // useMemo giúp danh sách chỉ tính lại khi người dùng đổi tab hoặc bộ lọc.
    const result = products.filter((item) => {
      const matchesType = item.type === activeType;
      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword);
      const matchesPrice = item.price <= maxPrice;
      const matchesRating = item.rating >= minRating;

      return matchesType && matchesSearch && matchesPrice && matchesRating;
    });

    // Tạo mảng mới trước khi sort để không làm thay đổi dữ liệu gốc trong MockData.
    return [...result].sort((a, b) => {
      if (sortOrder === "priceAsc") return a.price - b.price;
      if (sortOrder === "priceDesc") return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [activeType, search, maxPrice, minRating, sortOrder]);

  const resetFilters = () => {
    setSearch("");
    setMaxPrice(MAX_PRICE);
    setMinRating(0);
    setSortOrder("recommended");
  };

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Vietjourney Listing</p>
            <h1>Stay, Fly, Drive trong một hành trình liền mạch</h1>
          </div>
          <p className={styles.headerText}>
            Lọc nhanh khách sạn, chuyến bay và tour du lịch với giao diện gọn,
            sang trọng và tập trung vào quyết định đặt dịch vụ.
          </p>
        </header>

        <nav className={styles.tabs} aria-label="Loại dịch vụ">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              className={`${styles.tab} ${
                activeType === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => setActiveType(tab.key)}
            >
              <span>{tab.label}</span>
              <small>{tab.sub}</small>
            </button>
          ))}
        </nav>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <div>
                <span className={styles.filterEyebrow}>Bộ lọc</span>
                <h2>Tinh chỉnh kết quả</h2>
              </div>
              <button type="button" onClick={resetFilters}>
                Xóa
              </button>
            </div>

            <label className={styles.field}>
              <span>Tìm kiếm nhanh</span>
              <input
                type="search"
                value={search}
                placeholder="Tên, điểm đến..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Giá tối đa</span>
              <input
                type="range"
                min="500000"
                max={MAX_PRICE}
                step="100000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <div className={styles.rangeValues}>
                <small>500k</small>
                <strong>{formatCompactPrice(maxPrice)}</strong>
              </div>
            </label>

            <div className={styles.field}>
              <span>Đánh giá tối thiểu</span>
              <div className={styles.ratingGroup}>
                {[0, 3, 4, 5].map((rating) => (
                  <button
                    type="button"
                    key={rating}
                    className={minRating === rating ? styles.selectedChip : ""}
                    onClick={() => setMinRating(rating)}
                  >
                    {rating === 0 ? "Tất cả" : `${rating}★ trở lên`}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.field}>
              <span>Sắp xếp theo giá</span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="recommended">Đề xuất tốt nhất</option>
                <option value="priceAsc">Giá thấp đến cao</option>
                <option value="priceDesc">Giá cao đến thấp</option>
              </select>
            </label>
          </aside>

          <main className={styles.results}>
            <div className={styles.resultBar}>
              <div>
                <span>{typeLabels[activeType]}</span>
                <strong>{filteredProducts.length} kết quả phù hợp</strong>
              </div>
              <p>Đã áp dụng bộ lọc theo thời gian thực</p>
            </div>

            <div
              className={`${styles.cards} ${
                activeType === "fly" ? styles.flyList : ""
              }`}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className={styles.empty}>
                  <h3>Không có kết quả phù hợp</h3>
                  <p>Hãy thử giảm tiêu chí giá, đánh giá hoặc đổi từ khóa.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
