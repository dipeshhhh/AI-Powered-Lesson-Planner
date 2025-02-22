import React, { useState } from "react"
import defaultLessonDetails from "../lib/lessonPlanDummyData.js";
import LessonDetailsForm from "@/components/LessonDetailsForm.jsx"
import { GENERATED_LESSON_DETAILS_FORM_ENUM, INPUT_LESSON_DETAILS_FORM_ENUM } from "@/lib/constants.js";

export default function Dashboard() {
  const [lessonDetails, setLessonDetails] = useState(defaultLessonDetails);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <LessonDetailsForm
        lessonDetails={lessonDetails}
        setLessonDetails={setLessonDetails}
        type={INPUT_LESSON_DETAILS_FORM_ENUM}
        // type={GENERATED_LESSON_DETAILS_FORM_ENUM}
      />
    </div>
  )
}