import { Row, Col, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getProductDetailPath } from "../../config/products";

function TourList() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9999/tours")
      .then((res) => setTours(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const chonTour = tours.filter((t) =>
    (t.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const goDetail = (id, scrollToBook = false) => {
    navigate(getProductDetailPath("tours", id), {
      state: scrollToBook ? { scrollToBook: true } : undefined,
    });
  };

  return (
    <div className="text-center mt-3 container">
      <h1>Danh sách Tours du lịch</h1>

      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <Form.Control
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search by tour name..."
          />
        </Col>
      </Row>

      <Row>
        {chonTour.map((t) => (
          <Col md={4} key={t.id}>
            <Card
              className="mb-3 p-2 product-card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => goDetail(t.id)}
              onKeyDown={(e) => e.key === "Enter" && goDetail(t.id)}
            >
              {t.image && (
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={t.image}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <Card.Body className="text-start">
                <h6 className="fw-bold text-truncate">{t.name}</h6>

                <p className="mb-1">
                  <b>Vị trí:</b> {t.location}
                </p>

                <p className="mb-1">
                  <b>Thời lượng:</b> {t.duration}
                </p>

                <p className="mb-1">
                  <b>Rating:</b> ⭐ {t.rating || "N/A"}
                </p>

                <p className="mb-3">
                  <b>Giá:</b> <span className="text-danger fw-bold">{formatPrice(t.priceFrom)}</span>
                </p>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    goDetail(t.id, true);
                  }}
                >
                  Đặt tour ngay
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TourList;
