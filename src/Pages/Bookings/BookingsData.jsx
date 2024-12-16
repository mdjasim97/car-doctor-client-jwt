import { useEffect, useState } from "react";
import useAuth from "../../CustomHook/useAuth";
import axios from "axios";
import useAxiosSecure from "../../CustomHook/useAxiosSecure";

const BookingsData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myBooking, setMyBooking] = useState([]);

  // const url = `http://localhost:4000/bookings?email=${user?.email}`
  const url = `/myBookings?email=${user?.email}`;
  useEffect(() => {
    axiosSecure.get(url)
    .then((res) => {
      setMyBooking(res.data);
    });
  }, [url]);

  const handleDelete = (id) => {
    const proceed = confirm("Are you sure! you want to delete");
    if (proceed) {
      console.log("Delete Successful ", id);

      axiosSecure.delete(`/booking/${id}`).then((data) => {
        console.log(data);

        const remaining = myBooking.filter((data) => data._id !== id);
        setMyBooking(remaining);
      });
    }
  };

  const handleStatus = (id) => {
    axiosSecure.patch(`/update/${id}`, { status: "confirm" })
    .then((data) => {
      console.log(data);

      if (data.data.modifiedCount > 0) {
        const PreviousData = myBooking.filter((booking) => booking._id !== id);
        console.log(PreviousData);
        const NewDataUpdate = myBooking.find((booking) => booking._id === id);
        console.log(NewDataUpdate);
        NewDataUpdate.status = "confirm";
        const newBooking = [NewDataUpdate, ...PreviousData];
        console.log(newBooking);
        setMyBooking(newBooking);
      }
    });
  };

  return (
    <div>
      <h1>This is a booking page : {myBooking.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((data) => (
              <tr key={data}>
                <th>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-circle btn-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask w-24 h-24">
                        <img
                          src={data.Image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>

                    <div>
                      <h1>Service : {} </h1>
                      <p>Type : Hard</p>
                    </div>
                  </div>
                </td>
                <td>Customer Name : {data.Name}</td>

                <td>Date : {data.Date}</td>

                <td>Price : {data.Price}</td>

                <th>
                  {data.status === "confirm" ? (
                    <span className="font-bold text-green-600">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => handleStatus(data._id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Please Confirm
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default BookingsData;
