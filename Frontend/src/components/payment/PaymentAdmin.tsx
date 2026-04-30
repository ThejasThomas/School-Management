import { useEffect, useState } from "react";
import axios from "axios";
import { getStudents } from "../../services/student.service";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AlertCircle, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

  interface StudentType {
  _id: string;
  name: string;
  rollNumber: number;
}

interface PaymentDataType {
  studentName: string;
  className: string;
  paymentStatus?: string;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
}
const PaymentAdmin = () => {
const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
const [data, setData] = useState<PaymentDataType | null>(null);  const [showPaypal, setShowPaypal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true);
    getStudents({
      page: 1,
      search: "",
      classId: "",
    })
      .then((res) => {
        setStudents(res.students);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedStudent) return;

    setLoading(true);
    axios
      .get(`/payment/student/${selectedStudent}`)
      .then((res) => {
        setData(res.data);
        setSuccess(false);
        setShowPaypal(false);
      })
      .finally(() => setLoading(false));
  }, [selectedStudent]);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "sb",
        currency: "USD",
      }}
    >
      <div className="space-y-6">
        {/* STUDENT SELECTOR */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CreditCard size={20} className="text-blue-900" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Management</h2>
          </div>

          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} - {s.rollNumber}
              </option>
            ))}
          </select>
        </div>

        {/* PAYMENT DETAILS */}
        {data && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            {/* Demo Badge */}
            <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle size={18} className="text-yellow-700" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">Demo Feature</p>
                <p className="text-xs text-yellow-700 mt-1">
                  This is a dummy payment interface for demonstration purposes only.
                </p>
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">Student Name</p>
                <p className="text-lg font-bold text-blue-900 mt-1">
                  {data.studentName}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">Class</p>
                <p className="text-lg font-bold text-purple-900 mt-1">
                  {data.className}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">Status</p>
                <p className="text-lg font-bold text-emerald-900 mt-1">
                  {data.paymentStatus || "Pending"}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                <p className="text-xs text-gray-600 font-semibold">Total Amount</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">
                  ₹{data.totalAmount || 2001}
                </p>
              </div>

              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                <p className="text-xs text-gray-600 font-semibold">Paid Amount</p>
                <p className="text-2xl font-bold text-green-900 mt-2">
                  ₹{data.paidAmount || 1000}
                </p>
              </div>

              <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                <p className="text-xs text-gray-600 font-semibold">Remaining Amount</p>
                <p className="text-2xl font-bold text-red-900 mt-2">
                  ₹{data.remainingAmount || 1001}
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
              <p>
                ⚠️ <strong>Sandbox Mode:</strong> This is a sandbox payment environment.
                No real money will be deducted.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <CheckCircle size={18} />
                <p className="font-semibold">Payment Successful (Demo)</p>
              </div>
            )}

            {/* PayPal Button */}
            {!showPaypal && !success && (
              <button
                onClick={() => setShowPaypal(true)}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-700 transition"
              >
                Proceed to PayPal
              </button>
            )}

            {/* PayPal UI */}
            {showPaypal && !success && (
              <div className="mt-6 p-4 border-t-2 border-gray-200 pt-6">
                <p className="text-sm font-semibold text-gray-800 mb-4">
                  Pay with PayPal (Sandbox)
                </p>

                <PayPalButtons
                  createOrder={(dataPaypal, actions) => {
                    if (!actions?.order) {
                      throw new Error("PayPal not initialized");
                    }

                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: String(data.remainingAmount || 10),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(dataPaypal, actions) => {
                    if (!actions?.order) {
                      return Promise.resolve();
                    }

                    return actions.order.capture().then(() => {
                      setSuccess(true);
                      setShowPaypal(false);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    toast.error("Payment failed");
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentAdmin;