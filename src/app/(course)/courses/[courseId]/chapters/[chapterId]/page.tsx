import { getChapter } from "@/actions/getChapter";
import Banner from "@/components/Banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollBtn from "./_components/CourseEnrollBtn";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/Preview";
import { File } from "lucide-react";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter?.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter"
        ></Banner>
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter"
        ></Banner>
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          ></VideoPlayer>
        </div>
        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-between p-4">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <p>TODO:</p>
            ) : (
              <CourseEnrollBtn
                courseId={params.courseId}
                price={course.price!}
              ></CourseEnrollBtn>
            )}
          </div>
          <Separator></Separator>
          <div className="">
            <Preview value={chapter.description!}></Preview>
          </div>
          {!!attachments.length && (
            <>
              <Separator></Separator>
              <div className="p-4">
                {attachments.map(attachment => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File></File>
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChapterIdPage;
