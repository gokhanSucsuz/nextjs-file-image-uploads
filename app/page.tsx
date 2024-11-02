"use client";
import { ThemeChanger } from "@/components/ThemeChanger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {  useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
	const [file, setFile] = useState<File>();
	const [images, setImages]= useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

	const uploadFile = async () => {
	 
    try {
      if (!file) {
        toast.warning("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
		setUrl(signedUrl);
		console.log(signedUrl)
		setImages(prev=>[...prev,signedUrl])
		setUploading(false);
		toast.success("Image uploaded successfully");
    } catch (e) {
      console.log(e);
      setUploading(false);
      toast.error("Error uploading image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

	return (
		<div className="bg-zinc-200  text-black dark:text-white dark:bg-zinc-600 h-screen pt-10 flex flex-col">
			 <ThemeChanger/>
			<h1 className="text-3xl font-bold text-center pt-10 capitalize">
				Upload Your Images to Create Your Photo Gallery
			</h1>
			<div className="flex flex-wrap gap-1 gap-y-5 p-5 bg-white w-[650px] min-h-[300px] mx-auto mt-6 mb-10 rounded-md shadow-sm">
				{images?.map((image, index) => (
					image && (
						<div key={index} className="relative flex-1 basis-[300px] h-[200px]">
              				<Image
                				loader={({src, width})=>src}
								src={image}
								fill
								alt="Image from Pinata"
								className="object-cover rounded-lg"
							/>
						</div>
					)
				))}
			</div>
			<div className="flex justify-center gap-4">
				<Input
					type="file"
					accept="image/*"
					onChange={handleChange}
					className="w-[200px] bg-white dark:bg-zinc-500 hover:cursor-pointer hover:bg-zinc-600"
				/>
				<Button
					disabled={uploading}
					onClick={uploadFile}
					variant={"default"}
				>
					{uploading ? "Uploading..." : "Upload Image"}
				</Button>
			</div>
		</div>
	);
}
