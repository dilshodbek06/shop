"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "№",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "Category.title",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      return <div>{price.toLocaleString()} UZS</div>;
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished: boolean = row.getValue("isPublished");

      return (
        <Badge
          className={cn(
            "bg-red-500 hover:bg-red-600",
            isPublished && "bg-green-500 hover:bg-green-600"
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const handleDelete = async () => {
        try {
          await axios.delete(`/api/product/${id}`);
          toast.success("Product deleted");
          window.location.reload();
        } catch (error) {
          toast.error("Something went wrong.");
          console.error("An error occurred", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/products/${id}`}>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" /> View
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/products/${id}/update`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
            </Link>

            {/* <ConfirmModal onConfirm={handleDelete} > */}
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            {/* </ConfirmModal> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    header: "Actions",
  },
];
