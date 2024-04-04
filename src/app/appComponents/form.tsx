"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file as Blob);
    const response = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    // try {
    //   const response = await fetch("/api/file", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json", // Specify content type
    //       // Add any other headers as needed
    //     },
    //     body: JSON.stringify(formData), // Convert data to JSON string
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = await response.json(); // Parse response as JSON

    //   // Handle successful response
    //   console.log("Success:", data);
    // } catch (error) {
    //   // Handle error
    //   console.error("Error:", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
      />
      <Button type="submit">Upload</Button>
    </form>
  );
}
