import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}></IconBadge>
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id}></TitleForm>
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          ></DescriptionForm>
          <ImageForm initialData={course} courseId={course.id}></ImageForm>
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map(category => ({
              label: category.name,
              value: category.id,
            }))}
          ></CategoryForm>
        </div>
        <div className="space-y-6">
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks}></IconBadge>
              <h2 className="text-s">Course chapters</h2>
            </div>
            <div className="">TODO: chapters</div>
          </div>
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign}></IconBadge>
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id}></PriceForm>
          </div>
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File}></IconBadge>
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
            <AttachmentForm
              initialData={course}
              courseId={course.id}
            ></AttachmentForm>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseIdPage;
