"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface CreateAlbumFormProps {
  userId: number;
  bookingId: number;
}

const createAlbum = async (albumData: {
  userId: number;
  bookingId: number;
  albumName: string;
  visibleToUser: boolean;
}) => {
  const response = await axios.post("/api/albums", albumData);
  return response.data;
};

const CreateAlbumForm = ({ userId, bookingId }: CreateAlbumFormProps) => {
  const [albumName, setAlbumName] = useState<string>("");
  const [visibleToUser, setVisibleToUser] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-albums"] });
      toast({
        title: "Album created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error creating album.",
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
      await mutateAsync({
        userId,
        bookingId,
        albumName,
        visibleToUser,
      });
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Create Album
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Album</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Album Name</FormLabel>
                <Input
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  placeholder="Enter album name"
                />
              </FormControl>

              <FormControl mt={4}>
                <Checkbox isChecked={visibleToUser} onChange={(e) => setVisibleToUser(e.target.checked)}>
                  Visible to User
                </Checkbox>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isPending}>
                Create Album
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAlbumForm;
