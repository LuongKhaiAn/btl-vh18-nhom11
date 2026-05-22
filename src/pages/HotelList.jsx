import React, { useState } from "react";
import { Star, MapPin, CheckCircle, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import database from "../data/database.json";

import "./HotelList.css";

const HotelList = () => {
  const allHotels = database.hotels || [];
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // SỬA TẠI ĐÂY: Lấy chữ trước dấu phẩy (Nha Trang) thay vì chữ sau (Khánh Hòa)
  const locations = [
    "all",
    ...new Set(allHotels.map(h => h.location.split(",")[0].trim())),
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const filteredHotels = allHotels
    .filter((hotel) => {
      if (selectedLocation === "all") return true;
      return hotel.location.includes(selectedLocation);
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.priceFrom - b.priceFrom;
      return 0;
    });

  if (allHotels.length === 0) {
    return <div className="hotel-empty-state"><p>Không tìm thấy khách sạn nào.</p></div>;
  }

  return (
    <div className="hotel-container">
      <header className="hotel-header">
        <div className="header-title-area">
          <h1 className="page-title">Khách Sạn Nổi Bật</h1>
          <p className="page-subtitle">Khám phá không gian nghỉ dưỡng lý tưởng với dịch vụ đẳng cấp</p>
        </div>
      </header>

      <div className="filter-toolbar">
        <div className="toolbar-group">
          <label className="toolbar-label">
            <SlidersHorizontal size={16} />
            <span>Khu vực:</span>
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
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Đánh giá cao nhất</option>
            <option value="price">Giá từ thấp đến cao</option>
          </select>
        </div>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="hotel-no-results">
          <p>Không có khách sạn nào phù hợp với bộ lọc.</p>
        </div>
      ) : (
        <div className="hotel-grid">
          {filteredHotels.map((hotel) => (
            <article className="hotel-card" key={hotel.id}>
              <div className="hotel-image-container">
                <img src={hotel.image} alt={hotel.name} loading="lazy" className="hotel-image" />
                <div className="hotel-overlay"></div>
                {hotel.rating && (
                  <div className="hotel-badge-rating">
                    <Star className="icon-star-fill" size={14} fill="currentColor" />
                    <span>{hotel.rating}</span>
                  </div>
                )}
              </div>

              <div className="hotel-body">
                <div className="hotel-meta-top">
                  <span className="hotel-tag-type">{hotel.type}</span>
                  <p className="hotel-location">
                    <MapPin size={14} className="icon-location" />
                    <span>{hotel.location}</span>
                  </p>
                </div>

                <h3 className="hotel-title-name">{hotel.name}</h3>
                <p className="hotel-desc">{hotel.description}</p>

                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="hotel-amenities-list">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <span key={index} className="amenity-item">
                        <CheckCircle size={12} className="icon-check-blue" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                <div className="hotel-card-footer">
                  <div className="hotel-price-block">
                    <span className="price-text-label">Giá chỉ từ</span>
                    <span className="price-amount">{formatPrice(hotel.priceFrom)}</span>
                  </div>
                  <button className="btn-action-book" type="button">
                    Đặt phòng
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;