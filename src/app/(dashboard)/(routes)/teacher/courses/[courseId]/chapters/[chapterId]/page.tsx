import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  LayoutGrid,
  Video,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import Banner from "@/components/Banner";
import ChapterActions from "./_components/ChapterActions";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) {
    return redirect("/");
  }
  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requireFields.length;

  const completedFields = requireFields.filter(Boolean).length;

  const compeletionText = `(${completedFields}/${totalFields})`;

  const isComplete = requireFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        ></Banner>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-start flex-col">
            <Button variant="outline" asChild>
              <Link
                href={`/teacher/courses/${params.courseId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
                Back to course setup
              </Link>
            </Button>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700 text-center">
                  Complete all fields {compeletionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              ></ChapterActions>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard}></IconBadge>
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              ></ChapterTitleForm>

              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              ></ChapterDescriptionForm>
            </div>
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye}></IconBadge>
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              ></ChapterAccessForm>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video}></IconBadge>
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            ></ChapterVideoForm>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChapterIdPage;
