import { useState } from "react";
import { Button, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface Booking {
  userId: number;
  bookingDate: string;
  description: string;
  status: string;
}

const createBooking = async (newBooking: Booking) => {
  try {
    const response = await axios.post("/api/bookings", newBooking);
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred while creating the booking. ${error}`);
  }
};

const BookingForm = ({ userId }: { userId: number }) => {
  const [bookingData, setBookingData] = useState<Booking>({
    userId,
    bookingDate: "",
    description: "",
    status: "PENDING",
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-bookings"] });
      toast({
        title: "Booking created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form fields after success
      setBookingData({
        userId: 0,
        bookingDate: "",
        description: "",
        status: "PENDING",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating booking.",
        description: error instanceof Error ? error.message : "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: name === "userId" ? parseInt(value) : value, // Convert userId to number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(bookingData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Booking Date</FormLabel>
        <Input type="date" name="bookingDate" value={bookingData.bookingDate} onChange={handleInputChange} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Input type="text" name="description" value={bookingData.description} onChange={handleInputChange} />
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isPending} type="submit">
        Create Booking
      </Button>
    </form>
  );
};

export default BookingForm;
