"use client";

import { useState } from "react";
import {
  Button,
  Select,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface BookingStatusUpdate {
  id: number;
  status: string;
}

const updateBookingStatus = async (statusUpdate: BookingStatusUpdate) => {
  try {
    const response = await axios.patch(`/api/bookings/${statusUpdate.id}`, {
      status: statusUpdate.status,
    });
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred while updating the booking status. ${error}`);
  }
};

const BookingStatusForm = ({ bookingId }: { bookingId: number }) => {
  const [status, setStatus] = useState<string>("PENDING");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking status updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error updating booking status.",
        description: error instanceof Error ? error.message : "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({ id: bookingId, status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="sm" ml={2}>
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Booking Status</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isPending}>
                Update Status
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookingStatusForm;
