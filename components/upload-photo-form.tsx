"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/superbase/storage/client";
import { convertBlobUrlToFile } from "@/lib/utils";
import axios from "@/lib/axios";

interface Photo {
  albumId: string;
  photoUrl: string | null;
}

interface PhotoUploadModalProps {
  albumId: string;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ albumId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const toast = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotoUrl(newPhotoUrl);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["album", albumId] });
      toast({
        title: "Photo added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setPhotoUrl(null);
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error adding photo.",
        description: error instanceof Error ? error.message : "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoUrl) {
      toast({
        title: "Please upload a photo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const imageFile = await convertBlobUrlToFile(photoUrl);
    const { imageUrl: uploadedPhotoUrl, error } = await uploadImage({
      file: imageFile,
      bucket: "uteo bucket",
    });

    if (error) {
      toast({
        title: "Error uploading photo.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newPhoto = {
      albumId: albumId,
      photoUrl: uploadedPhotoUrl,
    };

    await mutateAsync(newPhoto);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Upload Photo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="60%" mt={4}>
              <form onSubmit={handleSubmit} style={{ padding: "5px", maxWidth: "45em" }}>
                <FormControl mt={4}>
                  <FormLabel>Photo</FormLabel>
                  <Box
                    as="label"
                    htmlFor="file-upload"
                    cursor="pointer"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    padding={2}
                    display="inline-block"
                    _hover={{ bg: "gray.100" }}
                    bg="white"
                  >
                    {photoUrl ? "Photo Selected" : "Choose File"}
                  </Box>
                  <Input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} display="none" />
                </FormControl>

                <Button colorScheme="red" mt={4} mr={2} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" mt={4} isLoading={isPending}>
                  Submit
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

async function uploadPhoto(photo: Photo) {
  try {
    const res = await axios.post("/api/photos", photo);
    return res.data;
  } catch (error) {
    throw new Error(`Error uploading photo: ${error}`);
  }
}

export default PhotoUploadModal;
