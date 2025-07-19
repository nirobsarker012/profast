import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ParcelForm = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth(); // user.email
  const axiosSecure = useAxiosSecure(); // Import base URL axios custom Hook
  const userEmail = user?.email || "unknown@example.com";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../data/warehouses.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const wareHouseData = await response.json();
        setData(wareHouseData);
      } catch (err) {
        console.error("Error fetching warehouse data:", err);
      }
    };
    fetchData();
  }, []);

  const parcelType = watch("type");
  const senderServiceCenter = watch("senderServiceCenter");
  const receiverServiceCenter = watch("receiverServiceCenter");
  const weight = parseFloat(watch("weight")) || 0;

  const calculateCost = (data) => {
    const senderDistrict = data?.find(
      (item) => item.city === senderServiceCenter
    )?.district;
    const receiverDistrict = data?.find(
      (item) => item.city === receiverServiceCenter
    )?.district;
    const isSameDistrict = senderDistrict === receiverDistrict;

    let baseCost = 0;
    let extraCost = 0;

    if (parcelType === "document") {
      baseCost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
      } else {
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = 40 * (weight - 3) + 40;
      }
    }

    return { baseCost, extraCost, total: baseCost + extraCost };
  };

  const generateTrackingId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 900 + 100); // random 3-digit
    return `PKG-${timestamp}-${random}`;
  };

  const onSubmit = (formData) => {
    const { baseCost, extraCost, total } = calculateCost(data);
    const { type, weight, parcelName } = getValues();
    const senderDistrict = data.find(
      (item) => item.city === senderServiceCenter
    )?.district;
    const receiverDistrict = data.find(
      (item) => item.city === receiverServiceCenter
    )?.district;
    const isSameDistrict = senderDistrict === receiverDistrict;

    const breakdown = `
      <strong>Parcel Name:</strong> ${parcelName}<br/>
      <strong>Parcel Type:</strong> ${type}<br/>
      ${
        type === "non-document"
          ? `<strong>Weight:</strong> ${weight}kg<br/>`
          : ""
      }
      <strong>From:</strong> ${senderDistrict} (${senderServiceCenter})<br/>
      <strong>To:</strong> ${receiverDistrict} (${receiverServiceCenter})<br/>
      <strong>Delivery Type:</strong> ${
        isSameDistrict ? "Within District" : "Outside District"
      }<br/><hr/>
      <strong>Base Cost:</strong> ৳${baseCost}<br/>
      <strong>Extra Cost:</strong> ৳${extraCost}<br/>
      <strong>Total Cost:</strong> <span style="font-size: 18px; color: #28a745;">৳${total}</span>
    `;

    Swal.fire({
      title: "Confirm Booking",
      html: breakdown,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Edit Info",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...formData,
          cost: total,
          baseCost,
          extraCost,
          createdAt: new Date().toISOString(), // ISO string format
          createdBy: userEmail,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          trackingId: generateTrackingId(),
        };

        //save the data in server
        axiosSecure
          .post("parcels", parcelData)
          .then((res) => {
            // TODO : redirect the payment Page
            console.log("Saved to DB:", res.data);
            if (res.data.insertedId) {
              Swal.fire("Success!", "Parcel booked successfully.", "success");
            }
          })
          .catch((error) => {
            console.error("Error saving parcel:", error);
            Swal.fire("Error!", "Failed to book parcel.", "error");
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 inter text-[#03373D]">
      <h1 className="text-3xl font-bold">Add Parcel</h1>
      <h2 className="text-lg text-gray-600 mb-4">Enter your parcel details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-xl font-semibold mb-2">Parcel Info</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio radio-primary"
                />
                Document
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio radio-primary"
                />
                Non-Document
              </label>
            </div>
            {errors.type && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parcel Name</span>
            </label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Parcel Name"
            />
            {errors.parcelName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          {parcelType === "non-document" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Parcel Weight (KG)</span>
              </label>
              <input
                type="number"
                {...register("weight")}
                className="input input-bordered w-full"
                placeholder="Parcel Weight (KG)"
              />
            </div>
          )}
        </div>

        {/* Sender and Receiver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sender Details */}
          <div className="card bg-base-100 shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Sender Details</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sender Name</span>
              </label>
              <input
                type="text"
                defaultValue={user.displayName}
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Name"
              />
              {errors.senderName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sender Contact No</span>
              </label>
              <input
                type="text"
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Contact No"
              />
              {errors.senderContact && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Region</span>
              </label>
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {[...new Set(data.map((item) => item.region))].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Service Center</span>
              </label>
              <select
                {...register("senderServiceCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Warehouse</option>
                {data.map((item) => (
                  <option key={item.city} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
              {errors.senderServiceCenter && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Address"
              />
              {errors.senderAddress && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pickup Instruction</span>
              </label>
              <textarea
                {...register("pickupInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
              />
              {errors.pickupInstruction && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Receiver Details */}
          <div className="card bg-base-100 shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Receiver Details</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Receiver Name</span>
              </label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
              {errors.receiverName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Receiver Contact No</span>
              </label>
              <input
                type="text"
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Contact No"
              />
              {errors.receiverContact && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Region</span>
              </label>
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {[...new Set(data.map((item) => item.region))].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Service Center</span>
              </label>
              <select
                {...register("receiverServiceCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Warehouse</option>
                {data.map((item) => (
                  <option key={item.city} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
              {errors.receiverServiceCenter && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Address"
              />
              {errors.receiverAddress && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Delivery Instruction</span>
              </label>
              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
              />
              {errors.deliveryInstruction && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-gray-600">* PickUp Time 4pm-7pm Approx.</p>
        <button type="submit" className="btn bg-[#CAEB66] mt-6">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default ParcelForm;
