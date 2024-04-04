import { list } from "@vercel/blob";
import Image from "next/image";

export default async function AllFilesList() {
  const blobs: any = await list();
  console.log(blobs, "blobs");
  return (
    <div>
      <h1>Files</h1>
      <ul>
        {blobs?.blobs?.map((blob: any) => (
          <li
            key={blob.pathname}
            className="flex flex-col mt-4 justify-center items-center"
          >
            <a href={blob.downloadUrl} target="_blank">
              <Image
                src={blob.url}
                alt={blob.pathname}
                width={300}
                height={300}
              />
              {blob.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
