import React, { useMemo, useState } from "react";
import { Ticket } from "lucide-react";
import DataBase from "../../DataBase.json";

const STATUS_TABS = DataBase.bookingStatusTypes;
const CURRENT_USER_ID = "user_001";

const MyTicketsPage = () => {
  const [activeTab, setActiveTab] = useState(STATUS_TABS[0]);

  const userBookings = useMemo(
    () =>
      DataBase.bookings.filter(
        (booking) => booking.userId === CURRENT_USER_ID,
      ),
    [],
  );

  const tabCounts = useMemo(() => {
    const counts = {};
    STATUS_TABS.forEach((status) => {
      counts[status] = userBookings.filter((b) => b.status === status).length;
    });
    return counts;
  }, [userBookings]);

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
          {STATUS_TABS.map((status) => (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={activeTab === status}
              className={`my-tickets-tab ${activeTab === status ? "active" : ""}`}
              onClick={() => setActiveTab(status)}
            >
              <span className="my-tickets-tab-label">
                {status} ({tabCounts[status]})
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyTicketsPage;
