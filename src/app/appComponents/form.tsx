"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(file?.size, "size");
    if (file && file?.size > 1048576) {
      console.log("true");
      setShowModal(true);
    } else {
      console.log(showModal, "false");
      const formData = new FormData();
      formData.append("file", file as Blob);
      // const response = await fetch("/api/file", {
      //   method: "POST",
      //   body: formData,
      // });

      try {
        const response = await fetch("/api/file", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json", // Specify content type
          //   // Add any other headers as needed
          // },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Parse response as JSON

        // Handle successful response
        console.log("Success:", data);
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.item(0) || null)}
        />
        <Button type="submit">Upload</Button>
      </form>

      {
        <AlertDialog open={showModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <p className="text-gray-200">
                  File size exceeds 5MB. Please choose a smaller file.
                </p>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowModal(!showModal)}>
                <Button variant="default" size="sm">
                  OK
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </div>
  );
}
