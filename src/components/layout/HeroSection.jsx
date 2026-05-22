import React, { useState } from "react";
import { MapPin, Calendar, Search } from "lucide-react";

const tabItems = ["Khách sạn", "Du lịch", "Xe tự lái", "Máy bay"];

const HeroSection = () => {
  const [selectedTab, setSelectedTab] = useState("Khách sạn");
  const [destination, setDestination] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const values = {
      category: selectedTab,
      destination,
      arrivalDate,
      departureDate,
    };
    console.log("Search values:", values);
    alert(`Tìm kiếm: ${selectedTab} - ${destination || "Chưa chọn địa điểm"}`);
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          Khám Phá<br />Thế Giới
        </h1>
        <h1 className="hero-title hero-highlight">
          Trải Nghiệm<br />Đẳng Cấp
        </h1>
        <p className="hero-copy">
          Đặt khách sạn, vé du lịch, thuê xe tự lái và vé máy bay — tất cả trong một nền tảng duy nhất.
        </p>
      </div>

      <form className="hero-search-card" onSubmit={handleSearch}>
        <div className="hero-tabs">
          {tabItems.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`hero-tab ${selectedTab === tab ? "active" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="hero-fields">
          <div className="field-group">
            <span className="field-label">Điểm đến</span>
            <div className="field-input">
              <span className="field-icon"><MapPin /></span>
              <input
                type="text"
                placeholder="Chọn địa điểm"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          <div className="field-group">
            <span className="field-label">Ngày đến</span>
            <div className="field-input">
              <span className="field-icon"><Calendar /></span>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
          </div>
          <div className="field-group">
            <span className="field-label">Ngày đi</span>
            <div className="field-input">
              <span className="field-icon"><Calendar /></span>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>
          <div className="field-group field-action">
            <button className="search-button" type="submit">
              <Search className="search-button-icon" />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HeroSection;
