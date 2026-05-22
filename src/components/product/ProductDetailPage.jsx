import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { ArrowLeft, MapPin, Star, CheckCircle } from "lucide-react";
import FlightDetailView from "./FlightDetailView";
import {
  API_BASE,
  PRODUCT_TYPES,
  calculateTotalPrice,
} from "../../config/products";
import { ROUTES } from "../../config/pages";
import { formatPrice } from "../../utils/formatPrice";
import { BOOKING_STATUS, CURRENT_USER_ID } from "../../utils/booking";

const ProductDetailPage = ({ productKey }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const config = PRODUCT_TYPES[productKey];

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [flightClass, setFlightClass] = useState("");
  const [schedule, setSchedule] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`${API_BASE}/${config.api}/${id}`)
      .then((res) => {
        setItem(res.data);
        if (productKey === "flights" && res.data.pricing?.[0]) {
          setFlightClass(res.data.pricing[0].class);
        }
        if (productKey === "flights" && res.data.schedules?.[0]) {
          setSchedule(res.data.schedules[0]);
        }
      })
      .catch(() => setError("Không tải được thông tin sản phẩm."))
      .finally(() => setLoading(false));
  }, [config.api, id, productKey]);

  useEffect(() => {
    if (!loading && item && location.state?.scrollToBook) {
      document.getElementById("dat-phong")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, item, location.state]);

  const totalPrice = useMemo(
    () =>
      calculateTotalPrice(item, productKey, {
        checkIn,
        checkOut,
        numberOfPeople,
        flightClass,
      }),
    [item, productKey, checkIn, checkOut, numberOfPeople, flightClass],
  );

  const pricePerUnit = useMemo(() => {
    if (!item || !numberOfPeople) return 0;
    if (productKey === "flights") {
      const tier = item.pricing?.find((p) => p.class === flightClass);
      return tier?.price ?? item.priceFrom;
    }
    if (productKey === "cars") return null;
    return Math.round(totalPrice / numberOfPeople);
  }, [item, productKey, numberOfPeople, flightClass, totalPrice]);

  const validateBooking = () => {
    if (!checkIn) {
      setBookError("Vui lòng chọn ngày.");
      return false;
    }
    if (productKey !== "flights" && !checkOut) {
      setBookError("Vui lòng chọn ngày trả / ngày kết thúc.");
      return false;
    }
    if (totalPrice <= 0) {
      setBookError("Không tính được tổng tiền. Kiểm tra lại ngày và số lượng.");
      return false;
    }
    return true;
  };

  const handleBooking = async (status) => {
    setBookError("");
    if (!validateBooking()) return;

    const booking = {
      userId: CURRENT_USER_ID,
      itemId: item.id,
      itemType: item.type,
      itemName: item.name || `${item.fromFull} → ${item.toFull}`,
      checkIn,
      checkOut: productKey === "flights" ? checkIn : checkOut,
      numberOfPeople: Number(numberOfPeople),
      pricePerPerson: pricePerUnit ?? Math.round(totalPrice / numberOfPeople),
      totalPrice,
      status,
      createdAt: new Date().toISOString(),
      ...(productKey === "flights" && { flightClass, schedule }),
    };

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/bookings`, booking);
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

  if (loading) {
    return <div className="text-center mt-5 py-5">Đang tải chi tiết...</div>;
  }

  if (error || !item) {
    return (
      <div className="container mt-5 py-5 text-center">
        <p className="text-danger">{error || "Không tìm thấy sản phẩm."}</p>
        <Button variant="outline-primary" onClick={() => navigate(config.listPath)}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const extras = item.amenities || item.includes || [];
  const title = item.name || `${item.fromFull} ✈ ${item.toFull}`;

  if (productKey === "flights") {
    return (
      <FlightDetailView
        item={item}
        listPath={config.listPath}
        scrollToBook={location.state?.scrollToBook}
      />
    );
  }

  return (
    <main className="product-detail-page container py-4">
      <button
        type="button"
        className="product-detail-back"
        onClick={() => navigate(config.listPath)}
      >
        <ArrowLeft size={18} />
        Quay lại danh sách
      </button>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="product-detail-card shadow-sm border-0">
            <div className="product-detail-image">
              <img src={item.image} alt={title} />
            </div>
            <Card.Body>
              <span className="product-detail-type">{item.type}</span>
              <h1 className="product-detail-title">{title}</h1>

              {item.location && (
                <p className="product-detail-meta">
                  <MapPin size={16} />
                  {item.location}
                </p>
              )}

              {item.rating && (
                <p className="product-detail-rating">
                  <Star size={16} fill="currentColor" />
                  {item.rating}
                </p>
              )}

              {item.duration && (
                <p className="text-muted">
                  <b>Thời lượng:</b> {item.duration}
                </p>
              )}

              {item.airline && (
                <p className="text-muted">
                  <b>Hãng bay:</b> {item.airline}
                </p>
              )}

              {item.specs && (
                <p className="text-muted small">
                  <b>Thông số:</b> {item.specs.seats} chỗ · {item.specs.fuel} ·{" "}
                  {item.specs.transmission}
                </p>
              )}

              <p className="product-detail-desc">{item.description}</p>

              {extras.length > 0 && (
                <div className="product-detail-extras">
                  {extras.map((text, index) => (
                    <span key={index} className="badge bg-light text-dark border">
                      <CheckCircle size={12} className="text-success me-1" />
                      {text}
                    </span>
                  ))}
                </div>
              )}

              {item.pricing?.length > 0 && (
                <div className="product-detail-pricing mt-3">
                  <h5>Bảng giá</h5>
                  <ul className="list-unstyled mb-0">
                    {item.pricing.map((p, index) => (
                      <li key={index} className="text-muted small py-1">
                        {p.group && <span>{p.group}: </span>}
                        {p.class && <span>{p.class}: </span>}
                        {p.pricePerPerson != null && formatPrice(p.pricePerPerson)}
                        {p.pricePerDay != null && `${formatPrice(p.pricePerDay)} / ngày`}
                        {p.price != null && formatPrice(p.price)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card
            id="dat-phong"
            className="product-booking-card shadow-sm border-0 sticky-top"
            style={{ top: 24 }}
          >
            <Card.Body>
              <h2 className="product-booking-title">{config.bookLabel}</h2>
              <p className="product-booking-price">
                Tổng tạm tính:{" "}
                <strong>{formatPrice(totalPrice)}</strong>
              </p>

              {bookError && <Alert variant="danger">{bookError}</Alert>}

              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {productKey === "flights" ? "Ngày bay" : "Ngày nhận / Check-in"}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </Form.Group>

                {productKey !== "flights" && (
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {productKey === "cars" ? "Ngày trả xe" : "Ngày trả / Check-out"}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      required
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Số khách</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={20}
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                  />
                </Form.Group>

                {productKey === "flights" && item.pricing?.length > 0 && (
                  <Form.Group className="mb-3">
                    <Form.Label>Hạng vé</Form.Label>
                    <Form.Select
                      value={flightClass}
                      onChange={(e) => setFlightClass(e.target.value)}
                    >
                      {item.pricing.map((p) => (
                        <option key={p.class} value={p.class}>
                          {p.class} — {formatPrice(p.price)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

                {productKey === "flights" && item.schedules?.length > 0 && (
                  <Form.Group className="mb-3">
                    <Form.Label>Giờ khởi hành</Form.Label>
                    <Form.Select
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                    >
                      {item.schedules.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

                <div className="booking-actions">
                  <button
                    type="button"
                    className="btn-booking-confirm"
                    disabled={submitting}
                    onClick={() => handleBooking(BOOKING_STATUS.pending)}
                  >
                    {submitting ? "Đang xử lý..." : "Xác nhận đặt"}
                  </button>
                  <button
                    type="button"
                    className="btn-booking-pay"
                    disabled={submitting}
                    onClick={() => handleBooking(BOOKING_STATUS.paid)}
                  >
                    {submitting ? "Đang xử lý..." : "Thanh toán"}
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default ProductDetailPage;
