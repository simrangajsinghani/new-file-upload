"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [blob, setBlob] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setShowModal(false);

    e.preventDefault();
    if (file && file?.size > 1048576) {
      setShowModal(true);
      setLoading(false);
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
        handleBlobs();

        // Handle successful response
        console.log("Success:", data);
      } catch (error) {
        // Handle error
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const handleBlobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/file", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data, "data in blob");
      setBlob(data);
      setLoading(false);

      // Handle successful response
      console.log("Success:", data);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setLoading(false);
    }
  }, [blob]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 ml-8 mr-8 mt-12"
      >
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.item(0) || null)}
        />
        <Button type="submit">Upload</Button>
      </form>
      {/* {preview && (
        <div className="flex">
          <Image src={preview} alt="test" width={200} height={200} />
        </div>
      )} */}
      <div className="flex justify-center items-center mt-8">
        {loading && (
          <div className="flex flex-col space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <ul>
          {blob?.map((blob: any, index) => (
            <li
              key={index}
              className="flex flex-col mt-4 justify-center items-center"
            >
              <a
                href={blob.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={blob.url}
                  alt={blob.pathname}
                  width={300}
                  height={300}
                />
                {blob.pathname}
              </a>
            </li>
          ))}
        </ul>
      </div>

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
    </div>
  );
}
