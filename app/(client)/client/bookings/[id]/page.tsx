"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Box, Heading, Text, VStack, Divider, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import Album from "@/components/photo-album";

export default function Booking() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => fetchBookingById(Array.isArray(id) ? id[0] : id),
  });

  if (isLoading) return <Spinner size="lg" />;
  if (isError) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Alert>
    );
  }

  const booking = data?.booking;
  const firstAlbum = booking?.Album?.[0];

  return (
    <VStack spacing={4} align="start" p={4}>
      <Heading as="h1" size="lg">
        Booking Details
      </Heading>
      <Divider />

      <Box p={4} bg="gray.50" borderRadius="md" shadow="md" width="100%">
        <Text fontSize="lg" fontWeight="bold">
          Booking ID: {booking?.id}
        </Text>
        <Text>Status: {booking?.status}</Text>
        <Text>Description: {booking?.description}</Text>
        <Text>Booking Date: {new Date(booking?.bookingDate).toLocaleDateString()}</Text>
      </Box>

      {firstAlbum ? (
        <Album albumId={firstAlbum.id} />
      ) : (
        <>
          <Text>No album available for this booking.</Text>
        </>
      )}
    </VStack>
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
