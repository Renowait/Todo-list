"use client";

import React, { useState, useEffect } from "react";

interface Profile {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  sex: "Male" | "Female" | "Other";
  timestamp: string;
  status: "Active" | "Inactive";
}

const ProfileForm = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    age: 0,
    birthdate: "",
    sex: "Male",
    timestamp: "",
    status: "Active",
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    setProfile((prev) => ({ ...prev, timestamp }));
    alert("Profile saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-noto space-y-4 p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold">โปรไฟล์</h2>
      <div>
        <label className="block mb-1">ชื่อ:</label>
        <input
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block mb-1">นามสกุล:</label>
        <input
          type="text"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block mb-1">อายุ:</label>
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block mb-1">ว/ด/ป:</label>
        <input
          type="date"
          name="birthdate"
          value={profile.birthdate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block mb-1">เพศ:</label>
        <select
          name="sex"
          value={profile.sex}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="Male">ชาย</option>
          <option value="Female">หญิง</option>
          <option value="Other">อื่นๆ</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">สถานะ:</label>
        <select
          name="status"
          value={profile.status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="Active">ใช้งาน</option>
          <option value="Inactive">ไม่ได้ใช้งาน</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        บันทึก
      </button>

      {profile.timestamp && (
        <p className="text-sm text-gray-500 mt-2">
            บันทึกล่าสุดเมื่อ: {new Date(profile.timestamp).toLocaleString()}
        </p>
      )}
    </form>
  );
};
export default ProfileForm;
