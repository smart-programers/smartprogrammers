import React from "react";
import Services from "./Services";
import CourseCard from "./CourseCard";
import imagePython from "../app/assets/python.jpg";
import imageUrl from "../app/assets/ai.png";
import imageGraphic from "../app/assets/graphics.jpg";
import imageBootcamp from "../app/assets/bootcamp.png";
import imageDataScience from "../app/assets/Python-for-data-analysis.jpg";
import imageMobile from "../app/assets/apps.jpg";

const Courses = () => {
  return (
    <div>
      {/* Featured Courses Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CourseCard
            title="Complete Masterclass in Python"
            price="Tzs 350,000"
            students={150}
            description="Learn Python from scratch and become a master."
            image={imagePython.src}
          />
          <CourseCard
            title="AI (Artificial Intelligence)"
            price="Tzs 650,000"
            students={80}
            description="Dive into the world of AI and machine learning."
            image={imageUrl.src}
          />
          <CourseCard
            title="Graphics Design Masterclass"
            price="Tzs 650,000"
            students={100}
            description="Master design tools like Photoshop, Illustrator, and InDesign."
            image={imageGraphic.src}
          />
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CourseCard
            title="Web Development Bootcamp"
            price="Tzs 400,000"
            students={50}
            description="A comprehensive guide to becoming a full-stack web developer."
            image={imageBootcamp.src}
          />
          <CourseCard
            title="Data Science with Python"
            price="Tzs 750,000"
            students={70}
            description="Analyze data and build powerful models with Python."
            image={imageDataScience.src}
          />

          <CourseCard
            title="Mobile App Development"
            price="Tzs 500,000"
            students={120}
            description="Learn to build mobile apps for Android and iOS platforms."
            image={imageMobile.src}
          />
        </div>
      </section>
    </div>
  );
};

export default Courses;
