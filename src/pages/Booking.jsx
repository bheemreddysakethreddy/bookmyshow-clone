import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const rows = 6;
  const seatsPerRow = 8;
  
  const HOLD_DURATION_MS = 20000;
  const CHECK_INTERVAL_MS = 1000;

  const seatLayout = [];
  for (let r = 0; r < rows; r++) {
    const rowLabel = String.fromCharCode(65 + r);
    const rowSeats = [];
    for (let c = 1; c <= seatsPerRow; c++) {
      rowSeats.push(`${rowLabel}${c}`);
    }
    seatLayout.push(rowSeats);
  }

  const BLOCKED_KEY = `blockedSeats_${id}`;
  const PENDING_KEY = `pendingSeats_${id}`;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [pendingSeats, setPendingSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const ticketPrice = 180;

  // ✅ Load seats (runs every time user revisits page)
  const loadSeats = () => {
    const storedBlocked = JSON.parse(localStorage.getItem(BLOCKED_KEY)) || [];
    const storedPending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
    const activePending = storedPending.filter((p) => p.expiresAt > Date.now());
    setBlockedSeats(storedBlocked);
    setPendingSeats(activePending);
  };

  useEffect(() => {
    loadSeats();
  }, []);

  // Re-check seats whenever user returns (fix for blocked seats update)
  useEffect(() => {
    const onFocus = () => loadSeats();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const isBlocked = (seat) => blockedSeats.includes(seat);
  const isPending = (seat) => pendingSeats.some((p) => p.seat === seat);
  const isSelected = (seat) => selectedSeats.includes(seat);

  const toggleSeat = (seat) => {
    if (isBlocked(seat) || isPending(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleConfirmClick = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    const expiresAt = Date.now() + HOLD_DURATION_MS;
    const newPending = selectedSeats.map((s) => ({ seat: s, expiresAt }));
    setPendingSeats((prev) => [...prev, ...newPending]);
    setSelectedSeats([]);
    setShowModal(false);
    navigate(`/payment/${id}`, { state: { seats: newPending.map((p) => p.seat) } });
  };

  const handleModalCancel = () => setShowModal(false);

  const getSeatStyle = (seat) => {
    if (isBlocked(seat))
      return "bg-red-500 text-white border-red-600 cursor-not-allowed";
    if (isPending(seat))
      return "bg-yellow-400 text-black border-yellow-500 cursor-not-allowed animate-pulse";
    if (isSelected(seat))
      return "bg-green-500 text-white border-green-600";
    return "bg-gray-200 hover:bg-gray-300 border-gray-400";
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow">
        <div className="text-center mb-6">
          <div className="bg-gray-700 text-white py-2 rounded-t-md max-w-md mx-auto">
            SCREEN THIS WAY
          </div>
        </div>

        {/* Seat layout */}
        <div className="flex flex-col gap-3 items-center">
          {seatLayout.map((row) => (
            <div key={row[0]} className="flex gap-3">
              {row.map((seat) => (
                <button
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  disabled={isBlocked(seat) || isPending(seat)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md font-semibold border transition-all ${getSeatStyle(
                    seat
                  )}`}
                >
                  {seat}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 border-t pt-4">
          <p className="text-lg">
            Selected Seats:{" "}
            <span className="font-semibold text-green-600">
              {selectedSeats.join(", ") || "None"}
            </span>
          </p>
          <p className="text-lg mt-1">
            Total Price:{" "}
            <span className="font-semibold text-red-500">
              ₹{selectedSeats.length * ticketPrice}
            </span>
          </p>

          <button
            onClick={handleConfirmClick}
            className="w-full mt-5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
            <p className="text-gray-600 mb-4">
              Do you want to proceed to payment for these seats?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleModalCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
