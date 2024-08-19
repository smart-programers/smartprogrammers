import React from "react";
import Services from "./Services";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  price: string;
  students: number;
  description: string;
  image: String;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  price,
  students,
  description,
  image,
}) => {
  return (
    <div className="p-4 rounded-lg shadow-lg transition-shadow duration-300 dark:bg-gray-800 bg-white text-center hover:shadow-xl">
      <div className="mb-4">
        <Image
          src={image as string}
          width={400}
          height={400}
          alt={title}
          className="w-full h-auto object-cover rounded-t-lg"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <p className="text-gray-800 dark:text-gray-100 mt-4 text-lg font-semibold">
        {price}
      </p>
      <small className="text-gray-400 dark:text-gray-400">
        {students} students enrolled
      </small>
    </div>
  );
};

export default CourseCard;
