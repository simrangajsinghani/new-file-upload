"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (file && file?.size > 1048576) {
      setShowModal(true);
    } else {
      const formData = new FormData();
      formData.append("file", file as Blob);
      // const response = await fetch("/api/file", {
      //   method: "POST",
      //   body: formData,
      // });

      try {
        const response = await fetch("/api/file", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Parse response as JSON
        setPreview(data.url);
        setLoading(false);

        // Handle successful response
        console.log("Success:", data);
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
    }
    router.push("/list");
  };

  return (
    <div>
      {/* {loading && <Progress value={progress} className="w-[60%]" />} */}
      <form
        onSubmit={handleSubmit}
        className="flex bg-pink-300 justify-center item-center gap-4 mt-4 ml-8"
      >
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.item(0) || null)}
        />
        <Button type="submit">{loading ? "Uploading..." : "Upload"}</Button>
      </form>
      {/* {preview && (
        <div className="flex">
          <Image src={preview} alt="test" width={200} height={200} />
        </div>
      )} */}
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
