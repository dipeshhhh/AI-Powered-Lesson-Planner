import React, { Fragment } from "react"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

export default function LessonPlannerPrint({ lessonDetails, cRef }) {
  return (
    <Card className="w-full md:w-[75vw] py-[3rem] px-[2rem] z-[-1] absolute pointer-events-none" ref={cRef}>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row items-center gap-[1ch] px-[0.5rem] text-2xl">
              <CardTitle>Topic:</CardTitle>
              <CardTitle name="topic">{lessonDetails.topic || ""}</CardTitle>
            </div>

            <hr />

            <div className="flex flex-col gap-[1rem]">
              <div>
                <CardTitle className="bg-[#605DFF] text-white p-[0.75rem] rounded-md">Summary</CardTitle>
                <div className="grid grid-cols-[max-content_auto] grid-rows-[auto] gap-0 items-stretch justify-center py-[1rem] px-[0.5rem] rounded-sm ">
                  <CardTitle className="bg-[#CCC9F7] p-3 border-b-2 border-r-2 border-black rounded-tl-md">Date</CardTitle>
                  <CardTitle className="p-3 border-b-2 border-black rounded-tr-md">{lessonDetails.date || `${new Date()}`}</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 border-b-2 border-r-2 border-black">Subject</CardTitle>
                  <CardTitle className="p-3 border-b-2 border-black">{lessonDetails.subject || ""}</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 border-b-2 border-r-2 border-black">Year Group or Grade Level</CardTitle>
                  <CardTitle className="p-3 border-b-2 border-black">{lessonDetails.yearGroupOrGradeLevel || ""}</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 border-b-2 border-r-2 border-black">Main Topic or Unit</CardTitle>
                  <CardTitle className="p-3 border-b-2 border-black">{lessonDetails.mainTopicOrUnit || ""}</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 border-b-2 border-r-2 border-black rounded-bl-md">Subtopics or Key Concepts</CardTitle>
                  <CardTitle className="p-3 border-b-2 border-black rounded-br-md">{lessonDetails.subtopicsOrKeyConcepts || ""}</CardTitle>
                </div>
              </div>

              <div className="flex flex-col gap-[0.5rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#2E2E38] rounded-md">Materials Needed</CardTitle>
                <ul className="font-normal py-[0.5rem] px-[0.5rem] flex flex-col gap-1">
                  {
                    lessonDetails.materialsNeeded.map((material) => {
                      return (
                        <li className="flex flex-row gap-3 items-center" key={material.id}>
                          <input type="checkbox" />
                          <CardTitle className="font-normal text-sm">{material.text || ""}</CardTitle>
                        </li>)
                    })
                  }
                </ul>
              </div>

              <div className="flex flex-col gap-[0.5rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#605DFF] rounded-md">Learning Objectives</CardTitle>
                <ul className="font-normal py-[0.5rem] px-[0.5rem] list-disc list-inside flex flex-col gap-1">
                  {lessonDetails.learningObjectives.map(objective => {
                    return (
                      <li className="flex flex-row gap-3 items-center" key={objective.id}>
                        <CardTitle className="font-normal text-sm">{objective.text || ""}</CardTitle>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="flex flex-col gap-[0.75rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#2E2E38] rounded-md">Lesson Outline</CardTitle>
                <div className="grid grid-cols-[0.75fr_1.5fr_2fr] px-[0.5rem] gap-0 rounded-lg">
                  <CardTitle className="bg-[#CCC9F7] p-3 rounded-tl-lg border-r border-b border-[#6B68F5]">Duration</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 border-r border-b border-[#6B68F5]">Guide</CardTitle>
                  <CardTitle className="bg-[#CCC9F7] p-3 rounded-tr-lg border-b border-[#6B68F5]">Remarks</CardTitle>
                  {lessonDetails.lessonOutline.map((outline, index) => {
                    const isLastRow = index === lessonDetails.lessonOutline.length - 1;
                    return (
                      <Fragment key={outline.id}>
                        <CardTitle className={`font-normal text-sm p-3 bg-[#EFEEFC] border-r border-b border-[#6B68F5] ${isLastRow ? "rounded-bl-lg border-b-0" : ""}`}>{outline.duration || ""}</CardTitle>
                        <CardTitle className={`font-normal text-sm p-3 bg-[#EFEEFC] border-r border-b border-[#6B68F5] ${isLastRow ? "border-b-0" : ""}`}>{outline.guide || ""}</CardTitle>
                        <CardTitle className={`font-normal text-sm p-3 bg-[#EFEEFC] border-b border-[#6B68F5] ${isLastRow ? "rounded-br-lg border-b-0" : ""}`}>{outline.remarks || ""}</CardTitle>
                      </Fragment>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-[0.5rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#605DFF] rounded-md">Notes</CardTitle>
                <CardTitle className="font-normal text-sm px-[0.5rem]">{lessonDetails.notes || ""}</CardTitle>
              </div>

            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    // </div>
  )
}