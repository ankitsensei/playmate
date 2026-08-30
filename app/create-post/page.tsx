"use client";
import React from "react";
import Data from "@/app/shared/Data";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  desc: string;
  date: string;
  zip: string;
  location: string;
  game: string;
};

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-200">
            Create post
          </h1>

          <p className="mt-1 text-sm text-gray-200">
            Create a post and find new friends and players.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Title
            </label>

            <input
              id="title"
              {...register("title", { required: true })}
              type="text"
              placeholder="Post title"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-200 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Description
            </label>

            <textarea
              id="description"
              {...register("desc", { required: true })}
              rows={4}
              placeholder="Write something..."
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-200 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Date + Zip */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-sm font-medium text-gray-200"
              >
                Date
              </label>

              <input
                id="date"
                {...register("date", { required: true })}
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="zip"
                className="mb-1.5 block text-sm font-medium text-gray-200"
              >
                Zip
              </label>

              <input
                id="zip"
                {...register("zip", { required: true })}
                type="text"
                placeholder="Zip code"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-200 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Location
            </label>

            <input
              id="location"
              {...register("location", { required: true })}
              type="text"
              placeholder="Where are you playing?"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-200 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Game */}
          <div>
            <label
              htmlFor="game"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Game
            </label>

            <select
              id="game"
              name="game"
              className="w-full rounded-md border border-gray-300 bg-black px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option
                value="Badminton"
                {...register("game", { required: true })}
              >
                Badminton
              </option>

              {Data.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Create post
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePostPage;
