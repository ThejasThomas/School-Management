import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/payment/student/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleDummyPayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500); // fake delay
  };

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          💳 Fee Payment
        </h2>

        {/* Student Info */}
        <div className="space-y-1 text-sm">
          <p><strong>Student:</strong> {data.studentName}</p>
          <p><strong>Class:</strong> {data.className}</p>
        </div>

        {/* Fee Details */}
        <div className="mt-4 border-t pt-4 text-sm">
          <p>Total: ₹{data.totalFee}</p>
          <p>Paid: ₹{data.paidAmount}</p>
          <p className="font-bold text-red-600 text-lg">
            Remaining: ₹{data.remainingAmount}
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mt-4 bg-green-100 text-green-700 p-2 rounded text-center">
            ✅ Payment Successful (Demo)
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleDummyPayment}
          disabled={loading || success}
          className={`mt-6 w-full py-2 rounded text-white transition ${
            success
              ? "bg-green-500"
              : loading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading
            ? "Processing..."
            : success
            ? "Paid"
            : "Pay Now (Demo)"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;