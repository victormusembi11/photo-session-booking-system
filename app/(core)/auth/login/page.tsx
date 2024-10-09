"use client";

import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Link, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("loggedin", JSON.stringify({ email, password }));

      toast({
        title: "Login successful!",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/admin/bookings");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={8}>
      <Text fontSize="2xl" mb={4}>
        Login
      </Text>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
      <Text mt={4}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" color="blue.500">
          Sign Up
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
