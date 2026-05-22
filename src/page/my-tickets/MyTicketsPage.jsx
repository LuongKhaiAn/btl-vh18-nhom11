import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { Ticket, Clock, CreditCard, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import axios from "axios";
import DataBase from "../../DataBase.json";
import { API_BASE } from "../../config/products";
import {
  MY_TICKET_TABS,
  ROUTES,
  getTicketTabBySlug,
} from "../../config/pages";
import { BOOKING_STATUS, CURRENT_USER_ID } from "../../utils/booking";
import { formatPrice } from "../../utils/formatPrice";
import { formatDateVN, formatDateTimeVN } from "../../utils/dateFormat";

const STATUS_UI = {
  [BOOKING_STATUS.pending]: {
    className: "ticket-status--pending",
    icon: Clock,
  },
  [BOOKING_STATUS.paid]: {
    className: "ticket-status--paid",
    icon: CheckCircle2,
  },
  [BOOKING_STATUS.cancelled]: {
    className: "ticket-status--cancelled",
    icon: XCircle,
  },
};

const TicketCard = ({ booking, onPay, onCancel, onDelete, actionLoading }) => {
  const statusUi = STATUS_UI[booking.status] ?? STATUS_UI[BOOKING_STATUS.pending];
  const StatusIcon = statusUi.icon;
  const isPending = booking.status === BOOKING_STATUS.pending;
  const isCancelled = booking.status === BOOKING_STATUS.cancelled;

  return (
    <article className="ticket-card">
      <div className="ticket-card-top">
        <span className={`ticket-status ${statusUi.className}`}>
          <StatusIcon size={14} />
          {booking.status}
        </span>
        <span className="ticket-card-price">{formatPrice(booking.totalPrice)}</span>
      </div>

      <h2 className="ticket-card-name">{booking.itemName}</h2>
      <p className="ticket-card-type">{booking.itemType}</p>

      <div className="ticket-card-grid">
        <div className="ticket-card-field">
          <span className="ticket-card-label">Ngày đến</span>
          <span className="ticket-card-value">{formatDateVN(booking.checkIn)}</span>
        </div>
        <div className="ticket-card-field">
          <span className="ticket-card-label">Ngày đi</span>
          <span className="ticket-card-value">{formatDateVN(booking.checkOut)}</span>
        </div>
        <div className="ticket-card-field">
          <span className="ticket-card-label">Số người</span>
          <span className="ticket-card-value">{booking.numberOfPeople}</span>
        </div>
        <div className="ticket-card-field">
          <span className="ticket-card-label">Đặt lúc</span>
          <span className="ticket-card-value">
            {formatDateTimeVN(booking.createdAt)}
          </span>
        </div>
      </div>

      {isPending && (
        <div className="ticket-card-footer">
          <span className="ticket-card-expiry">Hết hạn: khoảng 12 giờ nữa</span>
          <div className="ticket-card-actions">
            <button
              type="button"
              className="ticket-btn ticket-btn--cancel"
              disabled={actionLoading === booking.id}
              onClick={() => onCancel(booking.id)}
            >
              Hủy
            </button>
            <button
              type="button"
              className="ticket-btn ticket-btn--pay"
              disabled={actionLoading === booking.id}
              onClick={() => onPay(booking.id)}
            >
              <CreditCard size={16} />
              Thanh toán
            </button>
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="ticket-card-footer ticket-card-footer--end">
          <span className="ticket-card-expiry">Vé đã hủy, có thể xóa khỏi danh sách</span>
          <div className="ticket-card-actions">
            <button
              type="button"
              className="ticket-btn ticket-btn--delete"
              disabled={actionLoading === booking.id}
              onClick={() => onDelete(booking.id)}
            >
              <Trash2 size={16} />
              Xóa
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

const MyTicketsPage = () => {
  const { pathname, state } = useLocation();
  const statusSlug = pathname.split("/").pop();
  const activeTab = getTicketTabBySlug(statusSlug);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadBookings = useCallback(() => {
    return axios
      .get(`${API_BASE}/bookings`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setBookings(
          list.filter((booking) => booking.userId === CURRENT_USER_ID),
        );
      })
      .catch(() => {
        setBookings(
          DataBase.bookings.filter(
            (booking) => booking.userId === CURRENT_USER_ID,
          ),
        );
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadBookings().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, state?.refreshBookings, loadBookings]);

  const tabCounts = useMemo(() => {
    const counts = {};
    MY_TICKET_TABS.forEach(({ status }) => {
      counts[status] = bookings.filter((b) => b.status === status).length;
    });
    return counts;
  }, [bookings]);

  const filteredBookings = useMemo(
    () =>
      activeTab
        ? bookings.filter((booking) => booking.status === activeTab.status)
        : [],
    [activeTab, bookings],
  );

  const handlePay = async (bookingId) => {
    setActionLoading(bookingId);
    try {
      await axios.patch(`${API_BASE}/bookings/${bookingId}`, {
        status: BOOKING_STATUS.paid,
      });
      await loadBookings();
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (bookingId) => {
    setActionLoading(bookingId);
    try {
      await axios.patch(`${API_BASE}/bookings/${bookingId}`, {
        status: BOOKING_STATUS.cancelled,
      });
      await loadBookings();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Bạn có chắc muốn xóa vé này khỏi danh sách?")) {
      return;
    }
    setActionLoading(bookingId);
    try {
      await axios.delete(`${API_BASE}/bookings/${bookingId}`);
      await loadBookings();
    } finally {
      setActionLoading(null);
    }
  };

  if (!activeTab) {
    return <Navigate to={ROUTES.myTicketsPending} replace />;
  }

  return (
    <main className="my-tickets-page">
      <div className="my-tickets-inner">
        <header className="my-tickets-header">
          <h1 className="my-tickets-title">
            <span className="my-tickets-title-icon" aria-hidden="true">
              <Ticket size={24} strokeWidth={2} />
            </span>
            Vé của tôi
          </h1>
        </header>

        <div className="my-tickets-tabs" role="tablist" aria-label="Trạng thái vé">
          {MY_TICKET_TABS.map(({ status, path }) => (
            <NavLink
              key={path}
              to={path}
              role="tab"
              className={({ isActive }) =>
                `my-tickets-tab${isActive ? " active" : ""}`
              }
            >
              <span className="my-tickets-tab-label">
                {status} ({tabCounts[status]})
              </span>
            </NavLink>
          ))}
        </div>

        <section className="my-tickets-content" aria-label={activeTab.status}>
          {loading ? (
            <p className="my-tickets-empty">Đang tải danh sách vé...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="my-tickets-empty">
              Chưa có vé nào ở mục &quot;{activeTab.status}&quot;.
            </p>
          ) : (
            <ul className="my-tickets-list">
              {filteredBookings.map((booking) => (
                <li key={booking.id}>
                  <TicketCard
                    booking={booking}
                    onPay={handlePay}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                    actionLoading={actionLoading}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyTicketsPage;
