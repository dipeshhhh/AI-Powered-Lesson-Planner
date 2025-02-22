import React, { Fragment } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"

import { generateUID } from "@/lib/utils.js"
import { GENERATED_LESSON_DETAILS_FORM_ENUM, INPUT_LESSON_DETAILS_FORM_ENUM } from "@/lib/constants.js"

export default function LessonDetailsForm({ lessonDetails, setLessonDetails, type }) {

  const handleShallowPropertyChange = (e) => {
    // Simple properties e.g topic, subject etc (i.e. which do not have an array or an object)
    //! target name must match the property name.
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleMaterialChange = (e) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      materialsNeeded: lessonDetails.materialsNeeded.map(material => {
        if (material.id === e.target.name) {
          return { ...material, text: e.target.value }
        }
        else return material;
      })
    })
  }

  const handleDeleteMaterial = (e) => {
    e.preventDefault();
    const removeId = e.target.name // id of the material to be removed.
    setLessonDetails({
      ...lessonDetails,
      materialsNeeded: lessonDetails.materialsNeeded.filter(material => {
        return (material.id !== removeId);
      })
    })
  }

  const handleAddMaterial = (e) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      materialsNeeded: [
        ...lessonDetails.materialsNeeded,
        {
          id: generateUID(),
          text: ""
        }
      ]
    });
  }

  const handleObjectiveChange = (e) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      learningObjectives: lessonDetails.learningObjectives.map(objective => {
        if (objective.id === e.target.name) {
          return { ...objective, text: e.target.value }
        }
        else return objective;
      })
    })
  }

  const handleDeleteObjective = (e) => {
    e.preventDefault();
    const removeId = e.target.name;
    setLessonDetails({
      ...lessonDetails,
      learningObjectives: lessonDetails.learningObjectives.filter(objective => {
        return (objective.id !== removeId);
      })
    })
  }

  const handleAddObjective = (e) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      learningObjectives: [
        ...lessonDetails.learningObjectives,
        {
          id: generateUID(),
          text: ""
        }
      ]
    })
  }

  const handleDeleteOutline = (e) => {
    e.preventDefault();
    const removeId = e.target.name;
    setLessonDetails({
      ...lessonDetails,
      lessonOutline: lessonDetails.lessonOutline.filter(outline => {
        return (outline.id !== removeId);
      })
    })
  }

  const handleAddOutline = (e) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      lessonOutline: [
        ...lessonDetails.lessonOutline,
        {
          id: generateUID(),
          duration: "",
          "guide": "",
          "remarks": ""
        }
      ]
    })
  }

  const handleOutlineChange = (e, property) => {
    e.preventDefault();
    setLessonDetails({
      ...lessonDetails,
      lessonOutline: lessonDetails.lessonOutline.map(outline => {
        if (outline.id === e.target.name) {
          return { ...outline, [property]: e.target.value }
        }
        else return outline;
      })
    })
  }
  const handleOutlineDurationChange = (e) => {
    handleOutlineChange(e, 'duration');
  }
  const handleOutlineGuideChange = (e) => {
    handleOutlineChange(e, 'guide');
  }
  const handleOutlineRemarksChange = (e) => {
    handleOutlineChange(e, 'remarks');
  }

  return (
    // <div className="flex flex-col items-center justify-center w-full p-4">
    <Card className="w-full md:w-[75vw]">
      <CardHeader>
        <CardTitle>Lesson Plan Details</CardTitle>
        <CardDescription>Provide details to generate your lesson plan</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row items-center gap-3 px-[0.5rem]">
              <Label htmlFor="topic">Topic</Label>
              <Input
                name="topic"
                placeholder="Topic of the lecture"
                defaultValue={lessonDetails.topic}
                onChange={handleShallowPropertyChange}
              />
            </div>

            <hr />

            <div className="flex flex-col gap-[1rem]">
              <div>
                <CardTitle className="bg-[#605DFF] text-white p-[0.75rem] rounded-md">Summary</CardTitle>
                <div className="grid grid-cols-[max-content_auto] gap-3 items-center py-[1rem] px-[0.5rem]">
                  {type === GENERATED_LESSON_DETAILS_FORM_ENUM &&
                    <>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        name="date"
                        placeholder="Date"
                        defaultValue={lessonDetails.date}
                        onChange={handleShallowPropertyChange}
                        required
                      />
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        defaultValue={lessonDetails.subject}
                        onChange={handleShallowPropertyChange}
                        required
                      />
                    </>
                  }
                  <Label htmlFor="grade">Grade Level</Label>
                  <Input
                    name="yearGroupOrGradeLevel"
                    placeholder="Year Group or Grade Level"
                    defaultValue={lessonDetails.yearGroupOrGradeLevel}
                    onChange={handleShallowPropertyChange}
                    required
                  />
                  <Label htmlFor="maintopic">Main Concept</Label>
                  <Input
                    name="mainTopicOrUnit"
                    placeholder="Main Topic or Unit"
                    defaultValue={lessonDetails.mainTopicOrUnit}
                    onChange={handleShallowPropertyChange}
                    required
                  />
                  <Label htmlFor="subtopics">Subtopics</Label>
                  <Input
                    name="subtopicsOrKeyConcepts"
                    placeholder="Subtopics or Key Concepts"
                    defaultValue={lessonDetails.subtopicsOrKeyConcepts}
                    onChange={handleShallowPropertyChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[0.5rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#2E2E38] rounded-md">Materials Needed</CardTitle>
                <ul className="font-normal py-[0.5rem] px-[0.5rem] flex flex-col gap-4">
                  {
                    lessonDetails.materialsNeeded.map((material) => {
                      return (<>
                        <li className="flex flex-row gap-3 items-center" key={material.id}>
                          <Input
                            name={`${material.id}`}
                            placeholder="Any objects for demonstrating concepts or conducting a classroom activity, or references to be used for preparing the lesson"
                            defaultValue={material.text}
                            onChange={handleMaterialChange}
                          />
                          <Button
                            name={`${material.id}`}
                            variant="destructive"
                            size="icon"
                            className="cursor-pointer"
                            onClick={handleDeleteMaterial}
                          >
                            <Trash />
                          </Button>
                        </li>
                      </>)
                    })
                  }
                  <Button variant="outline" className="grow cursor-pointer" onClick={handleAddMaterial}>+ Add more materials</Button>
                </ul>
              </div>

              <div className="flex flex-col gap-[0.5rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#605DFF] rounded-md">Learning Objectives</CardTitle>
                <ul className="font-normal py-[0.5rem] px-[0.5rem] list-disc list-inside flex flex-col gap-4">
                  {lessonDetails.learningObjectives.map(objective => {
                    return (
                      <li className="flex flex-row gap-3 items-center" key={objective.id}>
                        <Input
                          name={`${objective.id}`}
                          placeholder="Objective"
                          onChange={handleObjectiveChange}
                          defaultValue={objective.text}
                        />
                        <Button
                          name={`${objective.id}`}
                          variant="destructive"
                          size="icon"
                          className="cursor-pointer"
                          onClick={handleDeleteObjective}
                        >
                          <Trash />
                        </Button>
                      </li>
                    )
                  })}
                  <Button variant="outline" className="grow cursor-pointer" onClick={handleAddObjective}>+ Add more objectives</Button>
                </ul>
              </div>

              <div className="flex flex-col gap-[0.75rem]">
                <CardTitle className="text-white p-[0.75rem] bg-[#2E2E38] rounded-md">Lesson Outline</CardTitle>
                <div className="grid grid-cols-[1fr_2fr_1fr_auto] px-[0.5rem] gap-3">
                  <CardTitle>Duration</CardTitle>
                  <CardTitle>Guide</CardTitle>
                  <CardTitle>Remarks</CardTitle>
                  <CardTitle></CardTitle>
                  {lessonDetails.lessonOutline.map(outline => {
                    return (
                      <Fragment key={outline.id}>
                        <Input
                          name={outline.id}
                          placeholder="Duration"
                          defaultValue={`${outline.duration}`}
                          onChange={handleOutlineDurationChange}
                        />
                        <Textarea
                          name={outline.id}
                          placeholder="Guide"
                          defaultValue={`${outline.guide}`}
                          onChange={handleOutlineGuideChange}
                        />
                        <Textarea
                          name={outline.id}
                          placeholder="Remarks"
                          defaultValue={`${outline.remarks}`}
                          onChange={handleOutlineRemarksChange}
                        />
                        <Button
                          name={outline.id}
                          variant="destructive"
                          size="icon"
                          className="cursor-pointer"
                          onClick={handleDeleteOutline}
                        >
                          <Trash />
                        </Button>
                      </Fragment>
                    )
                  })}
                </div>
                <Button variant="outline" className="grow cursor-pointer" onClick={handleAddOutline}>+ Add more outlines</Button>
              </div>

              {type === GENERATED_LESSON_DETAILS_FORM_ENUM &&
                <div className="flex flex-col gap-[0.5rem]">
                  <CardTitle className="text-white p-[0.75rem] bg-[#605DFF] rounded-md">Notes</CardTitle>
                  <Textarea
                    name="notes"
                    placeholder="Include your pre-lesson reminders or post-discussion observations here"
                    defaultValue={lessonDetails.notes}
                    onChange={handleShallowPropertyChange}
                  />
                </div>
              }

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {type === INPUT_LESSON_DETAILS_FORM_ENUM &&
          <Button className="w-full cursor-pointer">Generate Lesson Plan</Button>
        }
        {type === GENERATED_LESSON_DETAILS_FORM_ENUM &&
          <Button className="w-full cursor-pointer">Save as PDF</Button>
        }
      </CardFooter>
    </Card>
    // </div>
  )
}