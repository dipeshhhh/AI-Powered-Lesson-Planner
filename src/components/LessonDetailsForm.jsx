import React, { Fragment, useRef, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useReactToPrint } from "react-to-print";
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

import LessonPlannerPrint from "@/components/LessonPlannerPrint.jsx";

import { generateUID } from "@/lib/utils.js"
import { GENERATED_LESSON_DETAILS_FORM_ENUM, INPUT_LESSON_DETAILS_FORM_ENUM, RECENT_GENERATED_LESSON_DETAILS_LOCAL_STORAGE_KEY, RECENT_USER_INPUTS_LOCAL_STORAGE_KEY } from "@/lib/constants.js"
import buildPrompt from "@/lib/buildPrompt"

export default function LessonDetailsForm({ lessonDetails, setLessonDetails, type, setIsResponseGenerated }) {

  const [isLoading, setIsLoading] = useState(false);
  const errorTextRef = useRef(null);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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

  const saveInputDataToLocalStorage = (lessonDetails) => {
    localStorage.setItem(RECENT_USER_INPUTS_LOCAL_STORAGE_KEY, JSON.stringify(lessonDetails));
  }

  const validateLessonData = (lessonDetails) => {
    if (!errorTextRef.current) return;
    errorTextRef.current.innerText = "";
    const errors = [];

    if (!lessonDetails.topic) errors.push("Missing lesson topic");
    if (!lessonDetails.mainTopicOrUnit) errors.push("Missing main topic or unit");
    if (!lessonDetails.subtopicsOrKeyConcepts) errors.push("Missing subtopic or key concepts");
    // Not checking for materials need and learning objectives as they can be easily generated by AI if not provided.
    if (!lessonDetails.lessonOutline || lessonDetails.lessonOutline.length < 1) errors.push("Please provide lesson outline")

    for (let error of errors) {
      errorTextRef.current.innerText += ` ${error}.`;
    }

    if (errors.length > 0) return false;
    else return true;
  }

  const sendPrompt = async (prompt) => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([prompt]);

    return result;
  }

  const handleGenerateLessonPlan = async (e) => {
    e.preventDefault();

    if (!validateLessonData(lessonDetails)) return; // required fields should not be empty.
    saveInputDataToLocalStorage(lessonDetails);

    const { prompt, fallbackPrompt } = buildPrompt(lessonDetails);

    // Gemini API request/response.
    setIsLoading(true);
    setIsResponseGenerated(false);
    const geminiResponse = await sendPrompt(prompt);
    // Remove the "json " prefix
    const cleanJson = geminiResponse.response.text().replace("```json", '').replace("```", '');

    let parsedData = null;
    try {
      parsedData = JSON.parse(cleanJson);
      localStorage.setItem(RECENT_GENERATED_LESSON_DETAILS_LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
      setLessonDetails(parsedData);
      setIsResponseGenerated(true);
    } catch (error) {
      console.error(error);
      parsedData = lessonDetails; // These might be unnecessary
      setLessonDetails(parsedData);
      setIsResponseGenerated(false);
    }

    setIsLoading(false);
    // fallback code if JSON parsing fails (try again 2 times, try without the json formatting).
  }

  const handleDownload = (e) => {
    e.preventDefault();
    reactToPrintFn();
  }

  return (
    // <div className="flex flex-col items-center justify-center w-full p-4">
    <>
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
                  defaultValue={lessonDetails.topic || ""}
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
                          defaultValue={lessonDetails.date || `${new Date()}`}
                          onChange={handleShallowPropertyChange}
                          required
                        />
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          name="subject"
                          placeholder="Subject"
                          defaultValue={lessonDetails.subject || ""}
                          onChange={handleShallowPropertyChange}
                          required
                        />
                      </>
                    }
                    <Label htmlFor="grade">Grade Level</Label>
                    <Input
                      name="yearGroupOrGradeLevel"
                      placeholder="Year Group or Grade Level"
                      defaultValue={lessonDetails.yearGroupOrGradeLevel || ""}
                      onChange={handleShallowPropertyChange}
                      required
                    />
                    <Label htmlFor="maintopic">Main Concept</Label>
                    <Input
                      name="mainTopicOrUnit"
                      placeholder="Main Topic or Unit"
                      defaultValue={lessonDetails.mainTopicOrUnit || ""}
                      onChange={handleShallowPropertyChange}
                      required
                    />
                    <Label htmlFor="subtopics">Subtopics</Label>
                    <Input
                      name="subtopicsOrKeyConcepts"
                      placeholder="Subtopics or Key Concepts"
                      defaultValue={lessonDetails.subtopicsOrKeyConcepts || ""}
                      onChange={handleShallowPropertyChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                  <CardTitle className="text-white p-[0.75rem] bg-[#2E2E38] rounded-md">Materials Needed</CardTitle>
                  <ul className="font-normal py-[0.5rem] px-[0.5rem] flex flex-col gap-4">
                    {
                      lessonDetails.materialsNeeded.map((material) => {
                        return (
                          <li className="flex flex-row gap-3 items-center" key={material.id}>
                            <Input
                              name={`${material.id}`}
                              placeholder="Any objects for demonstrating concepts or conducting a classroom activity, or references to be used for preparing the lesson"
                              defaultValue={material.text || ""}
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
                          </li>)
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
                            defaultValue={objective.text || ""}
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
                  <div className="grid grid-cols-[1fr_1fr_2fr_auto] px-[0.5rem] gap-3">
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
                            value={outline.duration || ""}
                            onChange={handleOutlineDurationChange}
                          />
                          <Textarea
                            name={outline.id}
                            placeholder="Guide"
                            defaultValue={outline.guide || ""}
                            onChange={handleOutlineGuideChange}
                          />
                          <Textarea
                            name={outline.id}
                            placeholder="Remarks"
                            defaultValue={outline.remarks || ""}
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
                      defaultValue={lessonDetails.notes || ""}
                      onChange={handleShallowPropertyChange}
                    />
                  </div>
                }

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-[1ch]">
          <span ref={errorTextRef} className="text-sm text-destructive"></span>
          {type === INPUT_LESSON_DETAILS_FORM_ENUM &&
            <Button className="w-full cursor-pointer" onClick={handleGenerateLessonPlan}>Generate Lesson Plan</Button>
          }
          {type === GENERATED_LESSON_DETAILS_FORM_ENUM &&
            <>
              <Button className="w-full cursor-pointer" onClick={handleGenerateLessonPlan}>Re-Generate Lesson Plan</Button>
              <Button className="w-full cursor-pointer" onClick={handleDownload}>Save as PDF</Button>
            </>
          }
        </CardFooter>
      </Card>
      <LessonPlannerPrint lessonDetails={lessonDetails} cRef={contentRef}/>
    </>
    // </div>
  )
}