"use client";

import { useQuery } from "@tanstack/react-query";
import BookingTable from "@/components/admin-bookings-table";

import axios from "@/lib/axios";

export default function Bookings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
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

async function fetchBookings() {
  try {
    const { data } = await axios.get("/api/bookings");
    return data;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw new Error("Error fetching bookings");
  }
}
