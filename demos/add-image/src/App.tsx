"use client";

import { useState, useRef } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const formSchema = z.object({
  image: z.string().min(1, "Please select or upload an image"),
});

export default function EnhancedImageInput() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [activeTab, setActiveTab] = useState("gallery");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  // Mock data for already uploaded images (expanded to simulate a large number)
  const uploadedImages = Array(20)
    .fill("")
    .map((_, i) => `/placeholder.svg?height=100&width=100&text=Image${i + 1}`);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    form.setValue("image", image);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl) {
      setSelectedImage(imageUrl);
      form.setValue("image", imageUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        form.setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    form.setValue("image", "");
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <Card className='w-full max-w-md mx-auto'>
                  <CardContent className='p-4 sm:p-6'>
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className='w-full'
                    >
                      <TabsList className='grid w-full grid-cols-3 mb-4'>
                        <TabsTrigger value='gallery'>Gallery</TabsTrigger>
                        <TabsTrigger value='url'>URL</TabsTrigger>
                        <TabsTrigger value='upload'>Upload</TabsTrigger>
                      </TabsList>
                      <TabsContent value='gallery'>
                        <div className='relative mt-4'>
                          <div className='flex justify-between mb-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              className='w-8 h-8 p-0'
                              onClick={() => scrollGallery("left")}
                            >
                              <ChevronLeft className='h-4 w-4' />
                            </Button>
                            <Button
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
                            className='flex overflow-x-auto space-x-4 pb-4 px-1 scrollbar-hide'
                            style={{ scrollBehavior: "smooth" }}
                          >
                            {uploadedImages.map((image, index) => (
                              <div
                                key={index}
                                className={`flex-shrink-0 cursor-pointer border rounded-lg overflow-hidden transition-all w-20 h-20 sm:w-24 sm:h-24 ${
                                  selectedImage === image
                                    ? "ring-2 ring-primary ring-offset-2"
                                    : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                                }`}
                                onClick={() => handleImageSelect(image)}
                              >
                                <image
                                  href={image}
                                  // alt={`Uploaded image ${index + 1}`}
                                  // width={96}
                                  // height={96}
                                  className='w-full h-full object-cover'
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value='url'>
                        <form
                          onSubmit={handleUrlSubmit}
                          className='space-y-4 mt-4'
                        >
                          <div className='space-y-2'>
                            <Label htmlFor='image-url'>Image URL</Label>
                            <Input
                              id='image-url'
                              type='url'
                              placeholder='https://example.com/image.jpg'
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              required
                            />
                          </div>
                          <Button type='submit'>Add Image</Button>
                        </form>
                      </TabsContent>
                      <TabsContent value='upload'>
                        <div className='space-y-4 mt-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='image-upload'>Upload Image</Label>
                            <Input
                              id='image-upload'
                              type='file'
                              accept='image/*'
                              onChange={handleFileUpload}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {selectedImage && (
                      <div className='mt-6'>
                        <div className='flex justify-between items-center mb-2'>
                          <h3 className='text-lg font-semibold'>
                            Selected Image Preview
                          </h3>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={clearSelectedImage}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                        <div className='relative w-full h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden'>
                          <image
                            href={selectedImage}
                            // alt='Selected image'
                            // fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FormControl>
              <FormDescription>
                Choose an image for your event. You can select from the gallery,
                provide a URL, or upload a new image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
