"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import CreateAlbumForm from "@/components/create-album-modal-form";

export default function Booking() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => fetchBookingById(Array.isArray(id) ? id[0] : id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;

  const booking = data?.booking;

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Booking ID: {booking?.id}</p>
      <p>Status: {booking?.status}</p>
      <p>Description: {booking?.description}</p>
      <p>Booking Date: {new Date(booking?.bookingDate).toLocaleDateString()}</p>

      <h2>User Details</h2>
      <p>User ID: {booking?.user?.id}</p>
      <p>
        Name: {booking?.user?.firstName} {booking?.user?.lastName}
      </p>
      <p>Email: {booking?.user?.email}</p>

      <CreateAlbumForm bookingId={booking?.id} userId={booking?.user?.id} />
    </div>
  );
}

async function fetchBookingById(id: string) {
  try {
    const response = await fetch(`/api/bookings/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching booking");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching booking: ", error);
    throw new Error("Error fetching booking");
  }
}
