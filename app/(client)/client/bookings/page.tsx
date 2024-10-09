"use client";

import { useQuery } from "@tanstack/react-query";
import BookingTable from "@/components/client-bookings-table";

import axios from "@/lib/axios";

export default function Bookings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: fetchUserBookings,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  return (
    <div>
      <h1>Bookings</h1>
      <p>Welcome to the bookings page</p>

      <BookingTable bookings={data.bookings} />
    </div>
  );
}

async function fetchUserBookings() {
  try {
    const { data } = await axios.get("/api/user/bookings/1"); // TODO: Get user ID from session
    return data;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw new Error("Error fetching bookings");
  }
}
