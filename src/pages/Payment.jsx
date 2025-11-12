import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const seats = state?.seats || [];

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      // LocalStorage keys
      const BLOCKED_KEY = `blockedSeats_${id}`;
      const PENDING_KEY = `pendingSeats_${id}`;

      // Get previous state
      const blocked = JSON.parse(localStorage.getItem(BLOCKED_KEY)) || [];
      const pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];

      // Remove paid seats from pending
      const updatedPending = pending.filter((p) => !seats.includes(p.seat));

      // Add them to blocked
      const updatedBlocked = [...new Set([...blocked, ...seats])];

      // Save changes
      localStorage.setItem(BLOCKED_KEY, JSON.stringify(updatedBlocked));
      localStorage.setItem(PENDING_KEY, JSON.stringify(updatedPending));

      // Redirect back to booking
      navigate(`/booking/${id}`, { replace: true });
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-3 text-gray-800">Processing Payment 💳</h1>
        <p className="text-gray-600 mb-6">
          Booking seats:{" "}
          <span className="font-semibold text-red-500">{seats.join(", ") || "None"}</span>
        </p>
        <div className="text-lg font-semibold text-gray-700">
          Please wait... Redirecting in {countdown}s
        </div>
        <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-red-500 transition-all duration-1000"
            style={{ width: `${(countdown / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
