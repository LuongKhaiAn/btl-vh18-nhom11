import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, CheckCircle } from "lucide-react";
import axios from "axios";
import { getProductDetailPath } from "../../config/products";

const HotelList = () => {
  const navigate = useNavigate();
  // 1. Tạo state để lưu trữ dữ liệu khách sạn từ API
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Gọi API từ JSON Server khi trang được nạp
  useEffect(() => {
    axios
      .get("http://localhost:9999/hotels")
      .then((res) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi kết nối API khách sạn:", error);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const goDetail = (id, scrollToBook = false) => {
    navigate(getProductDetailPath("hotels", id), {
      state: scrollToBook ? { scrollToBook: true } : undefined,
    });
  };

  if (loading) {
    return <div className="text-center mt-5">Đang tải danh sách khách sạn...</div>;
  }

  if (hotels.length === 0) {
    return <div className="hotel-page-empty">Không tìm thấy khách sạn nào.</div>;
  }

  return (
    <div className="hotel-page container mt-4">
      <h1 className="page-title mb-4">Danh sách khách sạn</h1>

      <div className="row">
        {hotels.map((hotel) => (
          <div className="col-md-6 col-lg-4 mb-4 d-flex" key={hotel.id}>
            <div
              className="card hotel-card w-100 shadow-sm d-flex flex-column justify-content-between p-2 product-card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => goDetail(hotel.id)}
              onKeyDown={(e) => e.key === "Enter" && goDetail(hotel.id)}
            >
              <div>
                <div className="hotel-image-wrapper position-relative" style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                  />
                  {hotel.rating && (
                    <div className="hotel-rating position-absolute top-0 end-0 bg-warning text-dark m-2 px-2 py-1 rounded d-flex align-items-center gap-1" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                      <Star size={14} fill="currentColor" />
                      <span>{hotel.rating}</span>
                    </div>
                  )}
                </div>

                <div className="hotel-content p-2">
                  <h5 className="hotel-name fw-bold mt-2">{hotel.name}</h5>

                  <p className="hotel-location text-muted small d-flex align-items-center gap-1 mb-2">
                    <MapPin size={16} className="text-danger" />
                    <span>{hotel.location}</span>
                  </p>

                  <p className="hotel-description text-secondary small mb-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {hotel.description}
                  </p>

                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="hotel-amenities d-flex flex-wrap gap-1 mb-3">
                      {hotel.amenities.map((amenity, index) => (
                        <span key={index} className="badge bg-light text-dark border d-flex align-items-center gap-1 small fw-normal">
                          <CheckCircle size={12} className="text-success" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hotel-footer p-2 border-top d-flex justify-content-between align-items-center mt-auto">
                <div className="price-box">
                  <span className="price-label text-muted small block">Giá từ:</span>
                  <h5 className="hotel-price text-danger fw-bold mb-0">{formatPrice(hotel.priceFrom)}</h5>
                </div>
                <button
                  className="btn btn-primary btn-book btn-sm px-3"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goDetail(hotel.id, true);
                  }}
                >
                  Đặt phòng ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
