import "../../App.css";

// Banner dau trang kem form tim kiem nhanh.
const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="heroContent">
        <p className="eyebrow">Travel booking platform</p>
        <h1>Len lich cho chuyen di tiep theo cua ban</h1>
        <p className="heroText">
          Tim khach san, chuyen bay, tour trai nghiem va dich vu dua don trong
          mot giao dien gon gang.
        </p>

        <form className="searchBox">
          <label>
            <span>Diem den</span>
            <input type="search" placeholder="Da Nang, Ha Noi, Phu Quoc..." />
          </label>
          <label>
            <span>Ngay di</span>
            <input type="date" />
          </label>
          <label>
            <span>So khach</span>
            <select defaultValue="2">
              <option value="1">1 khach</option>
              <option value="2">2 khach</option>
              <option value="4">4 khach</option>
              <option value="6">6+ khach</option>
            </select>
          </label>
          <button type="submit">Tim kiem</button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
