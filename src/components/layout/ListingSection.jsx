import { useState } from "react";

// Dữ liệu mẫu cho các loại listing
const listingData = {
  accommodation: [
    {
      id: 1,
      name: "Amanoi",
      location: "Bà Rạc, Amanoi",
      rating: 5.0,
      reviews: 128,
      rooms: "2 giường",
      amenities: "Hộ bơi riêng",
      price: "12.500.000",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "La Siesta",
      location: "Hộ Nân, La Siesta",
      rating: 5.0,
      reviews: 95,
      rooms: "2 giường",
      amenities: "Hộ bơi riêng",
      price: "8.500.000",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Six Senses",
      location: "Six Senses, Việt Nam",
      rating: 5.0,
      reviews: 156,
      rooms: "2 giường",
      amenities: "Hộ bơi riêng",
      price: "15.000.000",
      image: "https://images.unsplash.com/photo-1573179360444-dce712f6b541?w=600&h=400&fit=crop",
    },
  ],
  flights: [
    {
      id: 1,
      name: "Vietnam Airlines HCM → Hà Nội",
      location: "Đã dừa lại - 1 chiều",
      rating: 4.8,
      reviews: 342,
      rooms: "Hạng Phổ thông",
      amenities: "Bao gồm hành lý",
      price: "2.500.000",
      image: "https://images.unsplash.com/photo-1548759446-49d7e32e938d?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Bamboo Airways HCM → Đà Nẵng",
      location: "Sáng sớm - 1 chiều",
      rating: 4.9,
      reviews: 267,
      rooms: "Hạng Phổ thông",
      amenities: "Bao gồm hành lý",
      price: "1.800.000",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Vietjet HCM → Phú Quốc",
      location: "Chiều - 1 chiều",
      rating: 4.6,
      reviews: 189,
      rooms: "Hạng Phổ thông",
      amenities: "Không bao gồm hành lý",
      price: "1.200.000",
      image: "https://images.unsplash.com/photo-1470319310703-e8e74733eee0?w=600&h=400&fit=crop",
    },
  ],
  experiences: [
    {
      id: 1,
      name: "Tour Hạ Long 2 ngày",
      location: "Vịnh Hạ Long, Quảng Ninh",
      rating: 4.9,
      reviews: 512,
      rooms: "Nhóm 10-15 người",
      amenities: "Ăn cơm trưa & chiều",
      price: "3.500.000",
      image: "https://images.unsplash.com/photo-1527004698179-3e90f2e1c312?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Trekking Sapa 3 ngày",
      location: "Sa Pa, Lào Cai",
      rating: 4.8,
      reviews: 367,
      rooms: "Nhóm 8-12 người",
      amenities: "Ở lại nhà ở địa phương",
      price: "4.200.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Khám phá Phố Cổ Hà Nội",
      location: "Hoàn Kiếm, Hà Nội",
      rating: 4.7,
      reviews: 298,
      rooms: "Nhóm 12-20 người",
      amenities: "Hướng dẫn viên chuyên nghiệp",
      price: "1.800.000",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop",
    },
  ],
};

const tabs = [
  { id: "accommodation", label: "Nơi ở", icon: "🏨" },
  { id: "flights", label: "Chuyến bay", icon: "✈️" },
  { id: "experiences", label: "Trải nghiệm", icon: "🎒" },
];

const ListingSection = () => {
  const [activeTab, setActiveTab] = useState("accommodation");
  const [priceRange, setPriceRange] = useState(20000000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  const currentListings = listingData[activeTab] || [];

  // Filter và sort
  const filteredListings = currentListings
    .filter(
      (item) =>
        parseInt(item.price.replace(/\./g, "")) <= priceRange &&
        item.rating >= minRating,
    )
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return parseInt(a.price.replace(/\./g, "")) - parseInt(b.price.replace(/\./g, ""));
      }
      if (sortBy === "price-high") {
        return parseInt(b.price.replace(/\./g, "")) - parseInt(a.price.replace(/\./g, ""));
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const getTabLabel = () => {
    const labels = {
      accommodation: "nơi ở",
      flights: "chuyến bay",
      experiences: "trải nghiệm",
    };
    return labels[activeTab] || "kết quả";
  };

  return (
    <section style={{ backgroundColor: "#f0f9ff", padding: "3rem 0" }}>
      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              color: "#0891b2",
              fontSize: "0.875rem",
              fontWeight: "600",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            VIETJOURNEY LISTING
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            Stay, Fly, Drive trong một hành trình liền mạch
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            Khám phá hàng ngàn lựa chọn phù hợp với ngân sách và sở thích của bạn
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                color: activeTab === tab.id ? "#fff" : "#6b7280",
                backgroundColor: activeTab === tab.id ? "#1e293b" : "transparent",
                borderRadius: "0.5rem 0.5rem 0 0",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.color = "#374151";
                }
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }}>
          {/* Sidebar Filters */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              height: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#1f2937" }}>
                Bộ lọc: Tính chính kết quả
              </h3>
              <button
                onClick={() => {
                  setPriceRange(20000000);
                  setMinRating(0);
                  setSortBy("default");
                }}
                style={{
                  color: "#0891b2",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                Tìm kiếm nhanh
              </label>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                Giá tối đa
              </label>
              <input
                type="range"
                min="0"
                max="20000000"
                step="1000000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  marginTop: "0.5rem",
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                Đến {priceRange.toLocaleString()} VND
              </div>
            </div>

            {/* Rating */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                Đánh giá tối thiểu
              </label>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setMinRating(star)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      backgroundColor: minRating >= star ? "#fbbf24" : "#e5e7eb",
                      border: "none",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                Sắp xếp theo giá
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <option value="default">Để xuất tốt nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "#1f2937", fontSize: "0.875rem", fontWeight: "600" }}>
                {getTabLabel()} {filteredListings.length} kết quả phù hợp
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                Đã áp dụng bộ lọc theo thời gian thực
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    {/* Rating Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        backgroundColor: "#fff",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      ⭐ {item.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.25rem" }}>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                      📍 {item.location}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginBottom: "1rem",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span>{item.rooms}</span>
                      <span>• {item.amenities}</span>
                    </div>

                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "1rem",
                      }}
                    >
                      Từ ... {item.price} VND / đêm
                    </p>

                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#1e293b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#0f172a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#1e293b";
                      }}
                    >
                      Khám phá
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
