"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollBtnProps {
  price: number;
  courseId: string;
}

const CourseEnrollBtn = ({ price, courseId }: CourseEnrollBtnProps) => {
  return (
    <Button className="w-full md:w-auto" size="sm">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
export default CourseEnrollBtn;
