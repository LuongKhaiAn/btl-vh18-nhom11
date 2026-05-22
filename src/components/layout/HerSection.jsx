import React from "react";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Khám Phá Thế Giới</h1>
        <h1 className="hero-title hero-highlight">Trải Nghiệm Đẳng Cấp</h1>
        <p className="hero-copy">
          Đặt khách sạn, vé du lịch, thuê xe tự lái và vé máy bay — tất cả trong một nền tảng duy nhất.
        </p>
      </div>

      <div className="hero-search-card">
        <div className="hero-tabs">
          <button className="hero-tab active" type="button">
            Khách sạn
          </button>
          <button className="hero-tab" type="button">
            Du lịch
          </button>
          <button className="hero-tab" type="button">
            Xe tự lái
          </button>
          <button className="hero-tab" type="button">
            Máy bay
          </button>
        </div>

        <div className="hero-fields">
          <div className="field-group">
            <label>Điểm đến</label>
            <input type="text" placeholder="Chọn địa điểm" />
          </div>
          <div className="field-group">
            <label>Ngày đến</label>
            <input type="date" placeholder="Chọn ngày" />
          </div>
          <div className="field-group">
            <label>Ngày đi</label>
            <input type="date" placeholder="Chọn ngày" />
          </div>
          <div className="field-group">
            <label>&nbsp;</label>
            <button className="search-button" type="button">
              <Search className="search-button-icon" /> Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
