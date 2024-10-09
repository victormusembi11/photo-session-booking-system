"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Box, Text, Flex, Spinner, Image } from "@chakra-ui/react";

interface AlbumProps {
  albumId: string;
}

async function fetchAlbumById(id: string) {
  const response = await fetch(`/api/albums/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching album");
  }
  return response.json();
}

const Album = ({ albumId }: AlbumProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => fetchAlbumById(albumId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error: {error instanceof Error ? error.message : "An error occurred"}</Text>;

  console.log("Album data: ", data);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4} p={4} bg="gray.100">
        <Text fontSize="lg" fontWeight="bold">
          Album: {data.album.albumName}
        </Text>
        <Button colorScheme="blue">Add Photo</Button>
      </Flex>

      <Box>
        {data.album.Photo.length > 0 ? (
          data.album.Photo.map((photo: { id: number; photoUrl: string }) => (
            <Box key={photo.id} mb={4}>
              <Image src={photo.photoUrl} alt={`Photo ${photo.id}`} />
            </Box>
          ))
        ) : (
          <Text>No photos available</Text>
        )}
      </Box>
    </Box>
  );
};

export default Album;
