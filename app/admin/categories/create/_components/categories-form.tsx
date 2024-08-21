"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "./file-upload";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface CategoriesFormProps {
  initialData: {
    title: string;
    description: string;
    imageUrl: string;
    isPublished: boolean;
  };
  isEdit: boolean;
  categoryId?: string;
}

const CategoriesForm = ({
  initialData,
  isEdit,
  categoryId,
}: CategoriesFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title is required",
    }),
    description: z.string().min(5, {
      message: "Description is required",
    }),
    imageUrl: z.string().min(2, {
      message: "Image required.",
    }),
    isPublished: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    shouldFocusError: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      isEdit
        ? await axios.put(`/api/category/${categoryId}`, values)
        : await axios.post(`/api/category`, values);
      toast.success(`Category ${isEdit ? "updated" : "created"}`);
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  async function handleRemove() {
    if (!form.getValues("imageUrl")) return;

    try {
      // const imageUrl = form.getValues("imageUrl");
      form.setValue("imageUrl", ""); // Clear the image URL from the form
      toast.success("Image removed successfully.");
    } catch (error) {
      toast.error("Failed to remove image.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category  ${isEdit ? "Update" : "Create"}`}
          description={""}
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={() => handleRemove()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Category title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Category description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish</FormLabel>
                    <br />
                    <div className="flex leading-none items-center gap-x-2 select-none !mt-4">
                      <FormControl>
                        <Checkbox
                          id="isPublished"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <label
                        htmlFor="isPublished"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Published
                      </label>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className="ml-auto w-full sm:w-auto"
            type="submit"
            disabled={loading}
          >
            {loading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            {isEdit ? "Update" : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoriesForm;
