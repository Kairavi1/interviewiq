"use client";

import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { evaluateInterview } from "@/src/actions/evaluateInterview";

export default function InterviewPage() {
  const router = useRouter();

  const [interview, setInterview] = useState<any>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState<any[]>([]);

  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("interview");

    if (!data) {
      console.log("No interview found in sessionStorage");
      return;
    }

    try {
      const parsed = JSON.parse(data);

      console.log("========== INTERVIEW ==========");
      console.log(parsed);
      console.log("Role:", parsed.role);
      console.log("Company:", parsed.company);
      console.log("Questions:", parsed.questions);
      console.log("===============================");

      setInterview(parsed);
    } catch (error) {
      console.error("Failed to parse interview:", error);
    }
  }, []);

  if (!interview) {
    return (
      <div className="p-10 text-xl font-semibold">Loading interview...</div>
    );
  }

  const questions = interview.questions;

  const question = questions[currentQuestion];

  const saveCurrentAnswer = () => {
    setAnswers((prev) => {
      const updated = [...prev];

      updated[currentQuestion] = {
        questionNumber: currentQuestion + 1,
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        answer: answer,
      };

      return updated;
    });
  };

  const loadQuestionAnswer = (index: number) => {
    const existing = answers[index];

    if (existing) {
      setAnswer(existing.answer);
    } else {
      setAnswer("");
    }
  };

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported.");
      return;
    }

    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
      return;
    }

    const speech = new SpeechRecognition();

    speech.continuous = true;
    speech.interimResults = false;
    speech.lang = "en-US";

    speech.onresult = (event: any) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }

      if (transcript.trim()) {
        setAnswer((prev) => {
          const space = prev.trim() ? " " : "";

          return prev + space + transcript.trim();
        });
      }
    };

    speech.onerror = () => {
      setIsRecording(false);
    };

    speech.onend = () => {
      setIsRecording(false);
    };

    speech.start();

    setRecognition(speech);

    setIsRecording(true);
  };

  const nextQuestion = () => {
    saveCurrentAnswer();

    setCompletedQuestions((prev) => {
      if (!prev.includes(currentQuestion)) {
        return [...prev, currentQuestion];
      }

      return prev;
    });

    setCurrentQuestion((prev) => prev + 1);

    setTimeout(() => {
      loadQuestionAnswer(currentQuestion + 1);
    }, 0);
  };

  const previousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);

    setTimeout(() => {
      loadQuestionAnswer(currentQuestion - 1);
    }, 0);
  };

  const submitInterview = async () => {
    if (submitting) return;

    setSubmitting(true);

    const finalAnswers = [
      ...answers.filter(Boolean),

      {
        questionNumber: currentQuestion + 1,
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        answer: answer,
      },
    ];

    console.log("FINAL ANSWERS");
    console.log(finalAnswers);

    try {
      const result = await evaluateInterview({
        role: interview.role,

        company: interview.company,

        answers: finalAnswers,
      });

      console.log("AI RESULT");

      console.log(result);

      sessionStorage.setItem("results", JSON.stringify(result));

      router.push("/dashboard/results");
    } catch (error) {
      console.error("Evaluation failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10">
      {/* Header */}

      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold text-[#3d3d3a]">
          {interview.role}

          {interview.company && (
            <>
              <span className="mx-2 text-[#898781]">•</span>

              <span>{interview.company}</span>
            </>
          )}
        </h1>

        <div className="flex gap-2">
          {questions.map((_: any, index: number) => {
            const completed = completedQuestions.includes(index);

            const current = currentQuestion === index;

            return (
              <div
                key={index}
                className={`h-3 w-3 rounded-full ${
                  completed
                    ? "bg-[#009300]"
                    : current
                      ? "bg-[#2b78d6]"
                      : "bg-[#c9c9c8]"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold text-[#898781]">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="mt-3 flex gap-3">
        <span className="rounded-full bg-[#cde2fb] px-4 py-1.5 text-sm font-semibold text-[#184f95]">
          {question.category}
        </span>

        <span className="rounded-full border border-[#e6e3db] bg-white px-4 py-1.5 text-sm font-semibold text-[#898781]">
          {question.difficulty}
        </span>
      </div>

      <div className="mt-6 rounded-3xl border border-[#e6e3db] bg-white p-8">
        <h2 className="text-xl font-semibold text-[#3d3d3a]">
          {question.question}
        </h2>
      </div>

      <div className="mt-6">
        <label className="mb-3 block text-lg font-semibold text-[#3d3d3a]">
          Your answer
        </label>

        <textarea
          value={answer}
          maxLength={5000}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="h-48 w-full resize-none rounded-3xl border border-[#e6e3db] bg-white p-6 text-lg outline-none focus:border-[#184f95]"
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          disabled={currentQuestion === 0}
          onClick={previousQuestion}
          className="rounded-2xl border border-[#e6e3db] px-6 py-3 disabled:opacity-40"
        >
          Previous
        </button>

        <div className="flex gap-4">
          <button
            onClick={startRecording}
            className={`flex items-center gap-2 rounded-2xl border px-6 py-3 ${
              isRecording ? "border-red-300 text-red-600" : "border-[#e6e3db]"
            }`}
          >
            <Mic size={20} />

            {isRecording ? "Stop" : "Record"}
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              disabled={submitting}
              onClick={submitInterview}
              className="rounded-2xl bg-[#009300] px-6 py-3 text-white disabled:opacity-50"
            >
              {submitting ? "Analyzing..." : "Submit Answers"}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="rounded-2xl bg-[#184f95] px-6 py-3 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
