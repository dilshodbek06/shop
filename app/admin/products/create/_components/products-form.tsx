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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "./file-upload";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Category } from "@prisma/client";

interface ProductsFormProps {
  initialData: {
    title: string;
    description: string;
    imagesUrl: string[];
    isPublished: boolean;
    price: number;
    categoryId: string;
  };
  isEdit: boolean;
  productId?: string;
  categories?: Category[];
}

const ProductsForm = ({
  initialData,
  isEdit,
  productId,
  categories,
}: ProductsFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title is required",
    }),
    description: z.string().min(5, {
      message: "Description is required",
    }),
    categoryId: z.string().min(5, {
      message: "Category is required",
    }),
    price: z.coerce.number({ message: "Price is required." }),
    imagesUrl: z.array(z.string()).min(1, {
      message: "At least one image is required.",
    }),
    isPublished: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    shouldFocusError: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      setLoading(true);
      isEdit
        ? await axios.put(`/api/product/${productId}`, values)
        : await axios.post(`/api/product`, values);
      toast.success(`Product ${isEdit ? "updated" : "created"}`);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleRemove = async (x: number) => {
    const images = form.getValues("imagesUrl");
    if (!images || !Array.isArray(images)) return;

    try {
      // Remove the image at index 'x'
      const updatedImages = images.filter((_, index) => index !== x);

      // Update the form value with the new array
      form.setValue("imagesUrl", updatedImages);

      toast.success("Image removed successfully.");
    } catch (error) {
      toast.error("Failed to remove image.");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product  ${isEdit ? "Update" : "Create"}`}
          description=""
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
            name="imagesUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    values={field.value}
                    onRemove={handleRemove}
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
                    <Input placeholder="Product title" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
          <Button className="ml-auto w-full sm:w-auto" type="submit" disabled={loading}>
            {loading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            {isEdit ? "Update" : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductsForm;
