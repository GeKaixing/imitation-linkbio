"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { usePreview } from "@/store/PreviewStore";
import { useUser } from "@/store/UserStore";

function Preview({ value, children }: { value: any; children: React.ReactNode }) {
  const { isPreview } = usePreview();
  return isPreview || !!value ? <>{children}</> : null;
}

function EditableInput({ name, value, onChange, placeholder, className = "" }) {
  return (
    <input
      className={`rounded-lg bg-transparent px-4 py-2 transition-all duration-200 ease-in-out 
                  text-light text-center border-0 outline-none w-full truncate 
                  hover:bg-dark hover:text-lighter focus:bg-dark focus:text-lighter ${className}`}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function EditableTextarea({ name, value, onChange, placeholder }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange(e);
  };

  return (
    <textarea
      className="text-light text-center bg-transparent border-0 outline-none w-full h-auto 
                 rounded-lg px-3 py-2 resize-none overflow-hidden 
                 hover:bg-dark hover:text-lighter focus:bg-dark focus:text-lighter 
                 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out mt-2"
      rows={1}
      name={name}
      placeholder={placeholder}
      maxLength={250}
      value={value}
      onChange={handleChange}
      style={{ minHeight: "36px" }}
    />
  );
}

export default function PlaygroundUserContent() {
  const { state } = useUser();
  const user = state?.UserData || {};

  const [formData, setFormData] = useState({
    name: user.user_name ?? "",
    title: user.user_title ?? "",
    bio: user.user_bio ?? "",
    ctaButton: user.user_button?.text ?? "",
  });

  // 只在用户数据更新时同步
  useEffect(() => {
    setFormData({
      name: user.user_name ?? "",
      title: user.user_title ?? "",
      bio: user.user_bio ?? "",
      ctaButton: user.user_button?.text ?? "",
    });
  }, [user]);

  const handleChange = useCallback(
    (key: string, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [setFormData]
  );

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Avatar */}
      <div className="relative group cursor-pointer">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pink-500 flex items-center justify-center">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full transition-all duration-200"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 2C7.89 2 7 2.89 7 4v1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
          </svg>
        </div>
      </div>

      {/* Name, Title, Bio */}
      <div className="text-center mt-4 mb-8 md:mb-11 w-full">
        <Preview value={formData.name}>
          <EditableInput
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-lg md:text-2xl font-bold"
          />
        </Preview>

        <Preview value={formData.title}>
          <EditableInput
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="text-xs mt-1 mb-4 font-bold"
          />
        </Preview>

        <Preview value={formData.bio}>
          <div className="text-sm w-full sm:w-[70%] m-auto">
            <EditableTextarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={(e: any) => handleChange("bio", e.target.value)}
            />
          </div>
        </Preview>

        {/* Add Button */}
        <Preview value={formData.ctaButton}>
          <div className="mt-4 h-[55px] w-[90%] md:w-[80%] mx-auto">
            <EditableInput
              name="ctaButton"
              placeholder="Add Button"
              value={formData.ctaButton}
              onChange={(e) => handleChange("ctaButton", e.target.value)}
              className="bg-primary rounded-lg font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light cursor-pointer hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"
            />
          </div>
        </Preview>
      </div>
    </div>
  );
}
