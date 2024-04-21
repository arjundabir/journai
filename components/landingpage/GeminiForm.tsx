"use client";
import React, { useState } from "react";

interface Props {
  data: Data[];
}

interface Data {
  prompt: string;
  answer: string[];
}

const GeminiForm = ({ data }: Props) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(data.length).fill("")
  );

  const handleSelectAnswer = (index: number, answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mappedData = data.map((question, index) => {
      return {
        prompt: question.prompt,
        answer: selectedAnswers[index],
      };
    });
    console.log(mappedData);
  };

  return (
    <>
      <div className="w-full h-fit md:w-1/2 border-[3px] rounded-xl p-4 mx-auto text-center">
        <h3 className="text-2xl">Let&apos;s Get to Know you.</h3>
        <p className="text-md">Powered by Gemini 1.5 Pro</p>
        <form onSubmit={handleSubmit}>
          {data.map((questions, index) => (
            <div key={index} className="text-left form-control">
              <h3 className="text-md">{questions.prompt}</h3>
              <div className="flex flex-col">
                {questions.answer.map((option, index_2) => (
                  <label
                    key={index_2}
                    className="label py-0 cursor-pointer justify-start gap-x-2"
                  >
                    <input
                      type="radio"
                      name={`radio-${index}`}
                      value={option}
                      onChange={() => handleSelectAnswer(index, option)}
                      className="radio checked:bg-green-400"
                    />
                    <span className="label-text text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="w-full py-2">
            <button
              type="submit"
              className="btn btn-success text-lg text-white"
            >
              Let&apos;s Find YOUR Adventure
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GeminiForm;
