"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@repo/ui/components/form";
import { AddImageInput } from "./add-image-input";

const formSchema = z.object({
  image: z.string().min(1, "Please select or upload an image"),
});

export default function EnhancedImageInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-3xl mx-auto'
      >
        <AddImageInput />
      </form>
    </Form>
  );
}
