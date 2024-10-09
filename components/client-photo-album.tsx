"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Text, Spinner, Image, Alert, AlertIcon, SimpleGrid } from "@chakra-ui/react";

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

  if (isLoading) return <Spinner size="lg" />;

  if (isError) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Alert>
    );
  }

  return (
    <Box mt={6}>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {data.album.Photo.length > 0 ? (
          data.album.Photo.map((photo: { id: number; photoUrl: string }) => (
            <Box key={photo.id} borderWidth={1} borderColor="gray.200" borderRadius="md" overflow="hidden">
              <Image src={photo.photoUrl} alt={`Photo ${photo.id}`} width="100%" height="200px" objectFit="cover" />
            </Box>
          ))
        ) : (
          <Text>No photos available</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Album;
