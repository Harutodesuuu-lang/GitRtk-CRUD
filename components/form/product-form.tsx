"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/lib/api/productApi";
import { getCategories, uploadImageToServer } from "@/lib/data/products";
import { Category, ProductRequest } from "@/lib/type/product";

const formSchema = z.object({
  title: z.string().min(5, "Product title at least 5 characters long"),
  price: z.coerce
    .number({
      invalid_type_error: "This field must be a number",
    })
    .min(1, { message: "This field is required" }),
  description: z
    .string()
    .min(5, "Product description must be at least 5 characters"),
  categoryId: z.preprocess(
    (v) => Number(v),
    z.number().int().nonnegative(),
  ),
  images: z.custom<FileList | null>().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get("editId");
  const editId = editIdParam ? Number(editIdParam) : null;
  const isEditMode = Number.isFinite(editId) && (editId ?? 0) > 0;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fileInputKey, setFileInputKey] = useState(0);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: null,
    },
  });

  const {
    data: editProduct,
    isLoading: isLoadingEditProduct,
    isError: isEditProductError,
  } = useGetProductByIdQuery(editId as number, {
    skip: !isEditMode,
  });

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Load categories failed", err);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (!isEditMode || !editProduct) return;

    form.reset({
      title: editProduct.title,
      price: editProduct.price,
      description: editProduct.description,
      categoryId: editProduct.category?.id ?? 0,
      images: null,
    });
    setFileInputKey((current) => current + 1);
  }, [isEditMode, editProduct, form]);

  const isSubmitting = isAdding || isUpdating;

  const submitLabel = useMemo(
    () => (isEditMode ? "Update" : "Submit"),
    [isEditMode],
  );

  async function onSubmit(values: ProductFormValues) {
    const effectiveCategoryId = isEditMode
      ? (editProduct?.category?.id ?? values.categoryId)
      : values.categoryId;

    if (!isEditMode && effectiveCategoryId <= 0) {
      form.setError("categoryId", {
        type: "manual",
        message: "Category is required",
      });
      return;
    }

    const selectedCategory = categories.find((c) => c.id === effectiveCategoryId);
    const categoryName = selectedCategory?.name || editProduct?.category?.name || "Unknown Category";

    try {
      let imageUrls = (editProduct?.images as string[] | undefined) ?? [];
      const hasNewFiles = Boolean(values.images && values.images.length > 0);

      if (hasNewFiles) {
        const uploaded = await Promise.all(
          Array.from(values.images as FileList).map((file) =>
            uploadImageToServer(file),
          ),
        );
        imageUrls = uploaded.map((u) => u.location);
      }

      if (!isEditMode && imageUrls.length === 0) {
        toast.error("Please choose an image");
        return;
      }

      const payload: ProductRequest = {
        title: values.title,
        price: values.price,
        description: values.description,
        categoryId: effectiveCategoryId,
        images: imageUrls,
      };

      if (isEditMode && editId) {
        await updateProduct({ id: editId, body: payload }).unwrap();
        toast.success(
          `Update Product ${payload.title} (${categoryName}) successfully`,
        );
        router.push("/dashboard/product");
        return;
      }

      await addProduct(payload).unwrap();
      toast.success(`Create Product ${payload.title} (${categoryName}) successfully`);
      form.reset();
      setFileInputKey((current) => current + 1);
    } catch (err) {
      const title = values.title || editProduct?.title || "product";
      const message = isEditMode
        ? `Update Product ${title} (${categoryName}) failed`
        : `Create Product ${title} (${categoryName}) failed`;
      toast.error(message);
      console.error(message, err);
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
    setFileInputKey((current) => current + 1);
  }

  if (isEditMode && isLoadingEditProduct) {
    return <div className="p-4 text-sm text-muted-foreground">Loading product...</div>;
  }

  if (isEditMode && isEditProductError) {
    return <div className="p-4 text-sm text-destructive">Failed to load product</div>;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="w-full rounded-xl border border-border/60 bg-card p-4 shadow-sm md:p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col items-start gap-2 space-y-0"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Product Title</FieldLabel>

              <Input
                key="title"
                placeholder="Macbook Pro 16 inch"
                type="text"
                {...field}
                className="border-gray-400"
              />

              {!isEditMode && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col items-start gap-2 space-y-0"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Price</FieldLabel>

              <Input
                className="border-gray-400"
                key="number-input-0"
                placeholder="2000 USD"
                type="number"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col items-start gap-2 space-y-0 md:col-span-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Product Description
              </FieldLabel>

              <Textarea
                className="border-gray-400"
                key="textarea-0"
                id="textarea-0"
                placeholder="Product Description"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col items-start gap-2 space-y-0"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Category</FieldLabel>

              <Select
                key="categoryId"
                value={String(field.value)}
                name={field.name}
                onValueChange={field.onChange}
                disabled={isEditMode}
              >
                <SelectTrigger
                  className="w-full border-gray-400"
                  disabled={loadingCategories || isEditMode}
                >
                  <SelectValue placeholder="Please Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col items-start gap-2 space-y-0 md:col-span-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                {isEditMode ? "Choose New Images (Optional)" : "Choose Images"}
              </FieldLabel>

              <Input
                className="border-gray-400"
                key={fileInputKey}
                type="file"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          key="submit-button-0"
          id="submit"
          name=""
          className="w-full"
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>

        <Button
          key="reset-button-0"
          id="reset"
          name=""
          className="w-full border-gray-400"
          type="reset"
          variant="outline"
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
