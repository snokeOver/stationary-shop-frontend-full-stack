import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ContentPreviewer from "./ContentPreviewer";

import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";

import { toast } from "sonner";
import { useAppDispatch, useProductSelector } from "@/hooks/useApp";
import { clearImageUrl } from "@/redux/features/product/productSlice";

// Define the product schema
const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum([
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
  ]),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  imageUrl: z.string().optional(),
});

type CreateProductDialogueProps = {
  children: React.ReactNode;
  editMode?: boolean;
  fetchData: () => void;
};

export function CreateProductDialogue({
  children,
  editMode = false,
  fetchData,
}: CreateProductDialogueProps) {
  const { product } = useProductSelector();
  const image_api_key = import.meta.env.VITE_IMAGE_UPLOAD_API;
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageUpLoading, setIsImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      brand: product?.brand || "",
      price: product?.price || 0,
      category: product?.category || "Writing",
      description: product?.description || "",
      quantity: product?.quantity || 0,
      imageUrl: product?.imageUrl || "",
    },
    mode: "onChange",
  });

  // Reset form values when `product` changes (edit mode)
  useEffect(() => {
    if (editMode && product) {
      form.reset({
        name: product.name,
        brand: product.brand,
        price: product.price,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, editMode, form]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      form.clearErrors("imageUrl");

      if (acceptedFiles?.length) {
        // Replace the existing file with the new one
        setFiles([acceptedFiles[0]]); // Only keep the first file
        form.setValue("imageUrl", URL.createObjectURL(acceptedFiles[0]));
        dispatch(clearImageUrl());
      }

      if (rejectedFiles?.length)
        form.setError("imageUrl", {
          message: rejectedFiles[0].errors[0].message,
        });
    },
    [dispatch, form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1, // Only allow one image
    maxSize: 1024 * 1024 * 5, // 5MB limit
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
  });

  const removeCoverFile = () => {
    setFiles([]);
    form.setValue("imageUrl", "");
  };

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    setIsImageUploading(true);
    try {
      const payload = {
        name: data.name,
        brand: data.brand,
        price: data.price,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        imageUrl: product?.imageUrl || "",
        inStock: true,
      };

      if (files.length > 0) {
        const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

        const imageFormData = new FormData();
        imageFormData.append("image", files[0]);

        // Upload the image to ImgBB
        const imageResponse = await fetch(imageHostingUrl, {
          method: "POST",
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          return toast("Failded to upload image");
        }

        const imageResult = await imageResponse.json();
        //   console.log(imageResult);

        if (!imageResult.success) {
          return toast("Failded to upload image");
        }

        if (imageResult.success) {
          payload.imageUrl = imageResult.data.display_url;
        }
      }

      if (editMode && product) {
        // Update product
        const res = await updateProduct({
          id: product._id,
          data: payload,
        }).unwrap();

        if (!res.status) toast("Product update failed");
        if (res.status) toast("Product updated successfully");
        fetchData();
      } else {
        // Create product
        const res = await createProduct(payload).unwrap();
        if (!res.status) toast("Product created failed");
        if (res.status) toast("Product created successfully");
        form.reset();
        fetchData();
      }
      setIsImageUploading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to submit product:", error);
      setIsImageUploading(false);
    }
  }

  const handleCancel = () => {
    setIsOpen(false);
    form.reset();
    setFiles([]);
    setSelectedFile(null);
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent className="lg:max-w-4xl bg-white/20 backdrop-blur-lg p-4 md:p-8 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Product" : "Create Product"}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          {/* Image Preview */}
          <div className="flex justify-center items-center ">
            {files.map((file, index) => (
              <ContentPreviewer
                key={index}
                source={URL.createObjectURL(file)}
                type={file.type}
                onClick={removeCoverFile}
              />
            ))}

            {product?.imageUrl && (
              <ContentPreviewer
                source={product.imageUrl}
                type={"image"}
                onClick={() => dispatch(clearImageUrl())}
              />
            )}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-3 md:gap-5 max-h-[370px] md:max-h-[450px] overflow-y-auto pr-2 lg:pr-5"
            >
              {/* Image Upload */}
              <div className="flex w-full flex-1 flex-col gap-1">
                <div
                  {...getRootProps()}
                  className={`grid cursor-pointer rounded-lg border-2 border-dashed ${
                    isDragActive ? "border-theme-500" : ""
                  } `}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <div className="flex items-center gap-3 p-3 md:flex-col">
                      <Plus className="size-10 rounded bg-white/45" />
                      <p className="text-sm font-bold uppercase">Drop Here</p>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col items-center gap-2 p-3 md:flex-row md:gap-5">
                      <div className="flex flex-row items-center gap-3 md:w-1/12">
                        <Plus className="size-10 rounded bg-white/45" />
                        <p className="text-center text-sm font-bold uppercase md:hidden md:text-left">
                          Add Image
                        </p>
                      </div>

                      <div className="flex flex-col gap-0 md:w-11/12">
                        <p className="hidden text-center text-sm font-bold uppercase md:flex md:text-left">
                          Add Image
                        </p>
                        <p className="w-full text-xxs text-white/70 md:text-xs">
                          Upload a product image in JPG/PNG format (max 5MB).
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {form.formState.errors.imageUrl && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.imageUrl.message}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        {...field}
                        className="text-white/70 placeholder:text-white/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter brand name"
                        {...field}
                        className="text-white/70 placeholder:text-white/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="text-white/70 placeholder:text-white/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="text-white/70 placeholder:text-white/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Writing">Writing</SelectItem>
                        <SelectItem value="Office Supplies">
                          Office Supplies
                        </SelectItem>
                        <SelectItem value="Art Supplies">
                          Art Supplies
                        </SelectItem>
                        <SelectItem value="Educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-5 w-full flex-row md:mt-8">
                <SecondaryButton
                  type="button"
                  onClick={handleCancel}
                  btnText="Cancel"
                />

                <PrimaryActionButton
                  isLoading={
                    isCreateLoading || isUpdateLoading || isImageUpLoading
                  }
                  btnText={editMode ? "Update Product" : "Create Product"}
                  loadingText={editMode ? "Updating..." : "Creating..."}
                  type="submit"
                />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
