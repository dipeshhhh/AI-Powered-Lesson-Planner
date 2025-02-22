import React, { useEffect, useState } from "react";
import defaultLessonDetails from "../lib/lessonPlanDummyData.js";
import LessonDetailsForm from "@/components/LessonDetailsForm.jsx";

import {
  GENERATED_LESSON_DETAILS_FORM_ENUM,
  INPUT_LESSON_DETAILS_FORM_ENUM,
  RECENT_GENERATED_LESSON_DETAILS_LOCAL_STORAGE_KEY
} from "@/lib/constants.js";

export default function Dashboard() {
  const [lessonDetails, setLessonDetails] = useState(defaultLessonDetails);
  const [isResponseGenerated, setIsResponseGenerated] = useState(false);

  const checkLocalStorage = () => { // Check if a lesson is stored in local storage
    const storedLocalLessonDetails = localStorage.getItem(RECENT_GENERATED_LESSON_DETAILS_LOCAL_STORAGE_KEY);
    if (!storedLocalLessonDetails) return;

    const localLessionDetails = JSON.parse(storedLocalLessonDetails);
    setLessonDetails(localLessionDetails);
    setIsResponseGenerated(true);
  }

  useEffect(() => {
    checkLocalStorage();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <LessonDetailsForm
        lessonDetails={lessonDetails}
        setLessonDetails={setLessonDetails}
        type={isResponseGenerated ? GENERATED_LESSON_DETAILS_FORM_ENUM : INPUT_LESSON_DETAILS_FORM_ENUM}
        setIsResponseGenerated={setIsResponseGenerated}
      />
    </div>
  )
}