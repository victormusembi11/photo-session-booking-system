"use client";

import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    localStorage.setItem("user", JSON.stringify({ email, password, role: "USER" }));
    router.push("/auth/login");
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
