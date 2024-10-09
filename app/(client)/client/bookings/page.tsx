"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Text, Spinner, Alert, AlertIcon, VStack } from "@chakra-ui/react";
import BookingTable from "@/components/client-bookings-table";
import BookingForm from "@/components/create-booking-form";

import axios from "@/lib/axios";

export default function Bookings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: fetchUserBookings,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="lg" />
        <Text mt={2}>Loading your bookings...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10}>
        <Alert status="error" maxW="md" mx="auto">
          <AlertIcon />
          {error.message || "An error occurred while fetching bookings"}
        </Alert>
      </Box>
    );
  }

  const bookings = data?.bookings || [];

  return (
    <Box maxW="5xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Bookings
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Welcome to the bookings page! You can view your bookings below or create a new one.
        </Text>
        <Box bg="gray.50" p={6} rounded="md" boxShadow="md">
          <BookingForm userId={1} />
        </Box>
        <Box>
          {bookings.length === 0 ? (
            <Text textAlign="center">No bookings available</Text>
          ) : (
            <BookingTable bookings={bookings} />
          )}
        </Box>
      </VStack>
    </Box>
  );
}

async function fetchUserBookings() {
  try {
    const { data } = await axios.get("/api/user/bookings/1");
    return data;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw new Error("Error fetching bookings");
  }
}
