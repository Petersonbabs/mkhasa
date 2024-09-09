import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading } from '@/components/heading';
import { Button } from './ui/button';
import CategoryMetric from './categoryMetric';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Category {
  categoryName: string;
  productCount: number;
}

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const categoryStyles = [
    { icon: "solar:perfume-bold", color: "#C53EA7" },
    { icon: "streamline:spray-paint-solid", color: "#85B6FF" },
    { icon: "cbi:essential-oil-diffuser-alt", color: "#51E4C9" },
    { icon: "game-icons:perfume-bottle", color: "#DF6060" }
  ];


  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/proxy?path=all/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?._id) {
        fetchCategories(session.user._id);
      } else {
        console.error("Session user ID is undefined");
        setIsLoading(false);
      }
    }
  }, [status, router, session]);

  const fetchCategories = async (adminId: string) => {
    try {
      const response = await fetch(`/api/proxy?path=number/product/category&adminId=${adminId}`);
      const data = await response.json();

      const mappedCategories = data.map((category: any) => ({
        categoryName: category.categoryName,
        productCount: category.productCount,
      }));

      setCategories(mappedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Heading>Categories</Heading>
        <Button className='rounded-none bg-[#3B9BCE] text-xs md:text-base'>Add new Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {categories.map((category, index) => {
          const style = categoryStyles[index % categoryStyles.length];
          return (
            <CategoryMetric
              key={index}
              title={category.categoryName}
              count={category.productCount}
              icon={style.icon}
              color={style.color}
            />
          );
        })}
      </div>

      <Table className="w-full mt-5 overflow-hidden">
        <TableHeader>
          <TableRow className='bg-gray-100'>
            <TableHead>ID Category</TableHead>
            <TableHead>Category Name</TableHead>
            {/* <TableHead>Sub Category</TableHead>
            <TableHead>Description</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
              {/* <TableCell>
                <Select defaultValue={item.subCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eau de Parfum">Eau de Parfum</SelectItem>
                    <SelectItem value="Eau de Toilette">Eau de Toilette</SelectItem>
                    <SelectItem value="Eau de Cologne">Eau de Cologne</SelectItem>
                    <SelectItem value="Perfume Oil">Perfume Oil</SelectItem>
                    <SelectItem value="Body Mist">Body Mist</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell> */}
              {/* <TableCell>{item.description}</TableCell> */}
              <TableCell className="flex space-x-2 justify-end relative top-1">
                <Icon icon="akar-icons:edit" className="cursor-pointer" style={{ fontSize: 24 }} />
                <Icon icon="tabler:trash" className="cursor-pointer" style={{ fontSize: 24 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
