import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { ArrowLeft, Star, CheckCircle, Calendar, Minus, Plus } from "lucide-react";
import { API_BASE } from "../../config/products";
import { ROUTES } from "../../config/pages";
import { formatPrice } from "../../utils/formatPrice";
import { BOOKING_STATUS, CURRENT_USER_ID } from "../../utils/booking";

const getFlightTier = (item, numberOfPeople) => {
  const people = numberOfPeople || 1;
  const tiered = item.pricing?.filter((p) => p.minPeople != null);

  if (tiered?.length) {
    return (
      tiered.find(
        (p) => people >= p.minPeople && people <= p.maxPeople,
      ) ?? tiered[tiered.length - 1]
    );
  }

  const byClass = item.pricing?.find((p) => p.class) ?? item.pricing?.[0];
  return byClass;
};

const getPricePerPerson = (tier, item) =>
  tier?.pricePerPerson ?? tier?.price ?? item.priceFrom;

const FlightDetailView = ({ item, listPath, scrollToBook }) => {
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState("");

  const title = item.name || `${item.fromFull} → ${item.toFull}`;
  const extras = item.amenities || item.includes || [
    "Hành lý 23kg",
    "Suất ăn nhẹ",
    "Chọn ghế",
    "Linh hoạt đổi vé",
  ];

  const activeTier = useMemo(
    () => getFlightTier(item, numberOfPeople),
    [item, numberOfPeople],
  );

  const pricePerPerson = useMemo(
    () => getPricePerPerson(activeTier, item),
    [activeTier, item],
  );

  const totalPrice = pricePerPerson * numberOfPeople;
  const priceReady = numberOfPeople > 0 && totalPrice > 0;

  const activeTierIndex = useMemo(() => {
    const tiered = item.pricing?.filter((p) => p.minPeople != null) ?? [];
    return tiered.findIndex(
      (p) =>
        numberOfPeople >= p.minPeople && numberOfPeople <= p.maxPeople,
    );
  }, [item.pricing, numberOfPeople]);

  useEffect(() => {
    if (scrollToBook) {
      document.getElementById("dat-phong")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToBook]);

  const changePeople = (delta) => {
    setNumberOfPeople((prev) => Math.min(20, Math.max(1, prev + delta)));
  };

  const validateBooking = () => {
    if (!arrivalDate || !departureDate) {
      setBookError("Vui lòng chọn ngày đến và ngày đi.");
      return false;
    }
    if (departureDate < arrivalDate) {
      setBookError("Ngày đi phải sau hoặc bằng ngày đến.");
      return false;
    }
    if (!priceReady) {
      setBookError("Không tính được tổng tiền.");
      return false;
    }
    return true;
  };

  const handleBooking = async (status) => {
    setBookError("");
    if (!validateBooking()) return;

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/bookings`, {
        userId: CURRENT_USER_ID,
        itemId: item.id,
        itemType: item.type,
        itemName: title,
        checkIn: arrivalDate,
        checkOut: departureDate,
        numberOfPeople,
        pricePerPerson,
        totalPrice,
        status,
        createdAt: new Date().toISOString(),
        priceGroup: activeTier?.group,
      });
      navigate(
        status === BOOKING_STATUS.paid
          ? ROUTES.myTicketsPaid
          : ROUTES.myTicketsPending,
        { state: { refreshBookings: Date.now() } },
      );
    } catch {
      setBookError("Đặt không thành công. Hãy chạy JSON Server (npm run server).");
    } finally {
      setSubmitting(false);
    }
  };

  const tierCards = item.pricing?.filter((p) => p.minPeople != null) ?? [];

  return (
    <main className="flight-detail-page container py-4">
      <button
        type="button"
        className="product-detail-back"
        onClick={() => navigate(listPath)}
      >
        <ArrowLeft size={18} />
        Quay lại danh sách
      </button>

      <div className="flight-detail-hero">
        <img src={item.image} alt={title} />
      </div>

      <Row className="g-4 flight-detail-body">
        <Col lg={7}>
          <div className="flight-detail-info">
            <div className="flight-detail-airline">
              <span className="flight-detail-airline-name">{item.airline}</span>
              {item.rating && (
                <span className="flight-detail-rating">
                  <Star size={14} fill="currentColor" />
                  {item.rating}
                </span>
              )}
            </div>

            <h1 className="flight-detail-route">{title}</h1>
            <p className="flight-detail-desc">{item.description}</p>

            <div className="flight-detail-tags">
              {extras.map((text) => (
                <span key={text} className="flight-detail-tag">
                  <CheckCircle size={14} />
                  {text}
                </span>
              ))}
            </div>

            {tierCards.length > 0 && (
              <div className="flight-tier-section">
                <h2 className="flight-tier-heading">Bảng giá theo số người</h2>
                <div className="flight-tier-grid">
                  {tierCards.map((tier, index) => (
                    <div
                      key={tier.group}
                      className={`flight-tier-card${activeTierIndex === index ? " flight-tier-card--active" : ""}`}
                    >
                      <span className="flight-tier-group">{tier.group}</span>
                      <span className="flight-tier-price">
                        {formatPrice(tier.pricePerPerson)}
                      </span>
                      <span className="flight-tier-unit">/người</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>

        <Col lg={5}>
          <div id="dat-phong" className="flight-booking-card">
            <h2 className="flight-booking-title">Đặt vé ngay</h2>

            <label className="flight-booking-label">Ngày đến</label>
            <div className="flight-booking-field">
              <Calendar size={18} className="flight-booking-field-icon" />
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>

            <label className="flight-booking-label">Ngày đi</label>
            <div className="flight-booking-field">
              <Calendar size={18} className="flight-booking-field-icon" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={arrivalDate}
              />
            </div>

            <label className="flight-booking-label">Số người</label>
            <div className="flight-people-stepper">
              <button
                type="button"
                className="flight-stepper-btn"
                onClick={() => changePeople(-1)}
                disabled={numberOfPeople <= 1}
                aria-label="Giảm số người"
              >
                <Minus size={18} />
              </button>
              <span className="flight-stepper-value">{numberOfPeople}</span>
              <button
                type="button"
                className="flight-stepper-btn"
                onClick={() => changePeople(1)}
                disabled={numberOfPeople >= 20}
                aria-label="Tăng số người"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flight-booking-summary">
              <p className="flight-booking-formula">
                {formatPrice(pricePerPerson)} × {numberOfPeople} người
              </p>
              <div className="flight-booking-total-row">
                <span>Tổng cộng</span>
                <strong>{formatPrice(priceReady ? totalPrice : 0)}</strong>
              </div>
            </div>

            {bookError && <Alert variant="danger" className="py-2">{bookError}</Alert>}

            <div className="booking-actions">
              <button
                type="button"
                className="btn-booking-confirm"
                disabled={submitting || !priceReady}
                onClick={() => handleBooking(BOOKING_STATUS.pending)}
              >
                {submitting ? "Đang xử lý..." : "Xác nhận đặt"}
              </button>
              <button
                type="button"
                className="btn-booking-pay"
                disabled={submitting || !priceReady}
                onClick={() => handleBooking(BOOKING_STATUS.paid)}
              >
                {submitting ? "Đang xử lý..." : "Thanh toán"}
              </button>
            </div>

            <p className="flight-booking-note">
              Vé chưa thanh toán sẽ tự động hủy sau 12 giờ
            </p>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default FlightDetailView;
