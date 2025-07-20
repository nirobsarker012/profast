import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels of the logged-in user
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Handle view action
  const handleView = (parcel) => {
    Swal.fire({
      title: parcel.parcelName,
      html: `
        <strong>Sender:</strong> ${parcel.senderName} <br/>
        <strong>Receiver:</strong> ${parcel.receiverName} <br/>
        <strong>Cost:</strong> ৳${parcel.cost} <br/>
        <strong>Status:</strong> ${parcel.payment_status}
      `,
      icon: "info",
    });
  };

  // Handle pay action
  const handlePay = (parcel) => {
    Swal.fire({
      title: "Confirm Payment",
      text: `Are you sure you want to pay ৳${parcel.cost}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, pay now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/payment/${parcel._id}`);
        // Fake payment logic - replace with real logic
        await axiosSecure.patch(`/parcels/pay/${parcel._id}`, {
          payment_status: "paid",
        });
        refetch();
        Swal.fire("Paid!", "Your parcel has been paid.", "success");
      }
    });
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deleteCount) {
            Swal.fire({
              title: "Deleted",
              text: "Percel has been Deleted",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        console.log(`Data deleting unseccessful `, err);
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Parcels</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold text-base-content">
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="max-w-[180px] truncate">{parcel.parcelName}</td>
              <td>
                {parcel.type === "document" ? "Document" : "Non-Document"}
              </td>
              <td>{format(new Date(parcel.createdAt), "PPpp")}</td>
              <td>৳{parcel.cost}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    parcel.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel)}
                  className="btn btn-sm btn-info"
                >
                  View
                </button>
                <button
                  onClick={() => handlePay(parcel)}
                  className="btn btn-sm btn-success"
                  disabled={parcel.payment_status === "paid"}
                >
                  Pay
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
