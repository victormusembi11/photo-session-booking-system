"use client";

import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Link, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName: "",  // Optionally collect first name
          lastName: "",   // Optionally collect last name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Signup successful!",
          description: "You have been successfully signed up.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup failed",
          description: errorData?.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error during signup.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={8}>
      <Text fontSize="2xl" mb={4}>
        Sign Up
      </Text>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSignup}>
        Sign Up
      </Button>
      <Text mt={4}>
        Already have an account?{" "}
        <Link href="/auth/login" color="blue.500">
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default Signup;
