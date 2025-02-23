import LoadingSection from "@/components/global/LoadingSection";
import { ProductCard } from "@/components/global/ProductCard";
import { AllProductPagination } from "@/components/shared/Pagination";
import { useLazyGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // Shadcn Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select
import { Checkbox } from "@/components/ui/checkbox"; // Shadcn Checkbox
import { Label } from "@/components/ui/label"; // Shadcn Label

export default function AllProduct() {
  const [trigger, { isLoading }] = useLazyGetAllProductsQuery();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [category, setCategory] = useState("all"); // Default to "all"
  const [inStock, setInStock] = useState(false);

  // Fetch products when `currentPage`, `limit`, or filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await trigger({
          page: currentPage,
          limit,
          searchTerm: searchQuery,
          minPrice: minPrice !== "" ? minPrice : undefined,
          maxPrice: maxPrice !== "" ? maxPrice : undefined,
          category: category !== "all" ? category : undefined, // Pass undefined for "all"
          inStock: inStock ? true : undefined,
        }).unwrap();

        if (result.status) {
          setProducts(result.data);
          setTotalItems(result.totalProduct || 0);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, [
    currentPage,
    limit,
    searchQuery,
    minPrice,
    maxPrice,
    category,
    inStock,
    trigger,
  ]);

  // Reset to the first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, minPrice, maxPrice, category, inStock]);

  if (!products) return null;

  return (
    <div className="max-w-7xl mx-auto px-5">
      {/* Page Title */}
      <div className="text-center my-10">
        <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 mb-2">
          Explore Our Products
        </h1>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 items-center justify-center gap-4">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-700 lg:col-span-3"
          />

          {/* Price Range */}
          <div className="flex gap-4 lg:col-span-3">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="bg-white dark:bg-gray-700"
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-white dark:bg-gray-700"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700 lg:col-span-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Writing">Writing</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Art Supplies">Art Supplies</SelectItem>
              <SelectItem value="Educational">Educational</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>

          {/* In Stock Filter */}
          <div className="flex items-center justify-start sm:justify-end lg:col-span-2">
            <Checkbox
              id="inStock"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked as boolean)}
              className="border-gray-300 dark:border-gray-600"
            />
            <Label
              htmlFor="inStock"
              className="ml-2 text-gray-900 dark:text-white"
            >
              In Stock Only
            </Label>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 py-10">
              <p className="text-lg">No products found.</p>
              <p className="text-sm">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 items-center justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
              {products?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalItems > 4 && (
            <div className="w-full md:mt-10 xl:mt-14">
              <AllProductPagination
                currentPage={currentPage}
                limit={limit}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
                totalItems={totalItems}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
