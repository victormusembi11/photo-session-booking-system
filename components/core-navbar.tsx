"use client";

import {
  Box,
  Flex,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/auth/login");
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Logo</Box>
        <HStack spacing={8} alignItems={"center"}>
          {isLoggedIn ? (
            <Button colorScheme="blue" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button colorScheme="blue" onClick={() => router.push("/signup")}>
                Sign Up
              </Button>
              <Button colorScheme="blue" onClick={() => router.push("/login")}>
                Login
              </Button>
            </>
          )}
        </HStack>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {isLoggedIn ? (
              <Button colorScheme="blue" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" onClick={() => router.push("/auth/signup")}>
                  Sign Up
                </Button>
                <Button colorScheme="blue" onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
