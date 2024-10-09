"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Text, Spinner, Alert, AlertIcon, VStack } from "@chakra-ui/react";
import BookingTable from "@/components/admin-bookings-table";

import axios from "@/lib/axios";

export default function Bookings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="lg" />
        <Text mt={2}>Loading bookings...</Text>
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

  return (
    <Box maxW="5xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Admin Bookings
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Welcome to the admin bookings page. Here you can view and manage all bookings.
        </Text>
        <Box>
          <BookingTable bookings={data.bookings} />
        </Box>
      </VStack>
    </Box>
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
