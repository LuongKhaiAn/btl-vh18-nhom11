import React, { useState } from "react";
import { Star, MapPin, Calendar, CheckCircle, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import database from "../data/database.json";
import "./TourList.css";

const TourList = () => {
  const allTours = database.tours || [];
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Lấy địa danh đầu tiên trước dấu phẩy làm bộ lọc (Sapa, Hội An...)
  const locations = [
    "all",
    ...new Set(allTours.map(t => t.location.split(",")[0].trim())),
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const filteredTours = allTours
    .filter((tour) => {
      if (selectedLocation === "all") return true;
      return tour.location.includes(selectedLocation);
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.priceFrom - b.priceFrom;
      return 0;
    });

  if (allTours.length === 0) {
    return <div className="tour-empty-state"><p>Không tìm thấy tour du lịch nào.</p></div>;
  }

  return (
    <div className="tour-container">
      <header className="tour-header">
        <div className="header-title-area">
          <h1 className="page-title">Tour Du Lịch Trọn Gói</h1>
          <p className="page-subtitle">Khám phá những hành trình kỳ thú với dịch vụ dẫn đường chuyên nghiệp</p>
        </div>
      </header>

      {/* Toolbar Filter & Sort */}
      <div className="filter-toolbar">
        <div className="toolbar-group">
          <label className="toolbar-label">
            <SlidersHorizontal size={16} />
            <span>Điểm đến:</span>
          </label>
          <div className="filter-buttons">
            {locations.map((loc) => (
              <button
                key={loc}
                className={`filter-btn ${selectedLocation === loc ? "active" : ""}`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc === "all" ? "Tất cả" : loc}
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar-group">
          <label className="toolbar-label">
            <ArrowUpDown size={16} />
            <span>Sắp xếp:</span>
          </label>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="price">Giá từ thấp đến cao</option>
          </select>
        </div>
      </div>

      {/* Tour Grid */}
      {filteredTours.length === 0 ? (
        <div className="tour-no-results"><p>Không có tour nào phù hợp với bộ lọc.</p></div>
      ) : (
        <div className="tour-grid">
          {filteredTours.map((tour) => (
            <article className="tour-card" key={tour.id}>
              <div className="tour-image-container">
                <img src={tour.image} alt={tour.name} loading="lazy" className="tour-image" />
                <div className="tour-overlay"></div>
                {tour.rating && (
                  <div className="tour-badge-rating">
                    <Star className="icon-star-fill" size={14} fill="currentColor" />
                    <span>{tour.rating}</span>
                  </div>
                )}
              </div>

              <div className="tour-body">
                <div className="tour-meta-top">
                  <p className="tour-location">
                    <MapPin size={14} className="icon-location" />
                    <span>{tour.location}</span>
                  </p>
                  {tour.duration && (
                    <p className="tour-duration">
                      <Calendar size={14} className="icon-calendar" />
                      <span>{tour.duration}</span>
                    </p>
                  )}
                </div>

                <h3 className="tour-title-name">{tour.name}</h3>
                <p className="tour-desc">{tour.description}</p>

                {tour.includes && tour.includes.length > 0 && (
                  <div className="tour-includes-list">
                    {tour.includes.map((item, index) => (
                      <span key={index} className="include-item">
                        <CheckCircle size={12} className="icon-check-blue" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <div className="tour-card-footer">
                  <div className="tour-price-block">
                    <span className="price-text-label">Giá trọn gói từ</span>
                    <span className="price-amount">{formatPrice(tour.priceFrom)} / người</span>
                  </div>
                  <button className="btn-action-book" type="button">Đặt tour ngay</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourList;