"use client";

// import Image from "next/image";
import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui/components/alert";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";

import { X, ChevronLeft, ChevronRight, Construction } from "@repo/ui/icons";

type ImageUploadType = "gallery" | "url" | "upload";

export function AddImageInput() {
  const { control, setValue } = useFormContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [activeTab, setActiveTab] = useState<ImageUploadType>("gallery");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mock data for already uploaded images (expanded to simulate a large number)
  const uploadedImages = Array(20)
    .fill("")
    .map((_, i) => `/placeholder.svg?height=100&width=100&text=Image${i + 1}`);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setValue("image", image);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setValue("image", imageUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setValue("image", "");
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220; // Adjusted for new image size + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <FormField
      control={control}
      name='image'
      render={() => (
        <FormItem>
          <FormLabel>Event Image</FormLabel>
          <FormControl>
            <div className='space-y-4'>
              <Tabs
                value={activeTab}
                // @ts-expect-error no-typing
                onValueChange={setActiveTab}
              >
                <TabsList className='w-full mb-2'>
                  <TabsTrigger
                    className='w-full'
                    value='gallery'
                  >
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger
                    className='w-full'
                    value='url'
                  >
                    URL
                  </TabsTrigger>
                  <TabsTrigger
                    className='w-full'
                    value='upload'
                  >
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='gallery'>
                  <div className='flex justify-between mb-2'>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => scrollGallery("left")}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => scrollGallery("right")}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                  <div
                    ref={scrollContainerRef}
                    className='flex overflow-x-auto space-x-4 pt-1 pb-4 px-1 scrollbar-hide'
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 cursor-pointer border rounded-lg overflow-hidden transition-all w-24 h-24 ${
                          selectedImage === image
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                        }`}
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          // width={96}
                          // height={96}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value='url'>
                  <div className='flex gap-2'>
                    <Input
                      id='image-url'
                      type='url'
                      placeholder='https://example.com/image.jpg'
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                    />
                    <Button
                      type='button'
                      onClick={handleUrlSubmit}
                    >
                      Add & Preview
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value='upload'>
                  <div className='space-y-2'>
                    <Label htmlFor='image-upload'>Upload Image</Label>
                    <Input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      onChange={handleFileUpload}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {selectedImage && (
                <div className='space-y-2'>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold'>
                      Selected Image Preview
                    </h3>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={clearSelectedImage}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                  <Alert>
                    <Construction className='h-4 w-4' />
                    <AlertTitle>Under Construction!</AlertTitle>
                    <AlertDescription>
                      Adding crop feature to adjust final picture.
                    </AlertDescription>
                  </Alert>
                  <div className='relative w-full h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden'>
                    <img
                      src={selectedImage}
                      alt='Selected image'
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Choose an image for your event. You can select from the gallery,
            provide a URL, or upload a new image.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
