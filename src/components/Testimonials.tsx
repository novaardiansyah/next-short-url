'use client';

import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon, Scale } from 'lucide-react';

const testimonials = [
  { id: 1, name: "Alice Johnson", role: "Marketing Manager", message: "Nova Short URL has streamlined our marketing campaigns. The analytics are a game changer!", image: "https://github.com/shadcn.png" },
  { id: 2, name: "Michael Lee", role: "Freelancer", message: "I use Nova Short URL daily for managing my portfolio links. It’s fast and reliable!", image: "https://github.com/shadcn.png" },
  { id: 3, name: "Samantha Green", role: "E-commerce Owner", message: "QR codes have helped my store grow significantly. Customers love the easy access!", image: "https://github.com/shadcn.png" },
  { id: 4, name: "David Kim", role: "Content Creator", message: "Link tracking helps me understand my audience better. Highly recommended!", image: "https://github.com/shadcn.png" },
  { id: 5, name: "Jessica Wang", role: "Tech Enthusiast", message: "The best URL shortener I've used! Simple, effective, and intuitive.", image: "https://github.com/shadcn.png" },
  { id: 6, name: "Tom Henders", role: "Startup Founder", message: "Great tool for branding our links and tracking performance easily.", image: "https://github.com/shadcn.png" },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  })

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-0">
      <h2 className="sm:text-[48px] text-[30px] font-bold text-gray-800 dark:text-white mb-3 leading-tight">Hear From Our Community</h2>
      <p className="sm:text-[22px] text-[16px] leading-tight text-gray-500 px-6 sm:px-0">Discover why our users love shortening their links with us and what <br className="hidden sm:block" /> they have to say about their experience</p>
      <div className="flex justify-center items-center mt-12">
        <ChevronLeftIcon size={36} onClick={prevTestimonial} className="mr-6 dark:text-gray-500 dark:hover:text-gray-300 text-gray-300 hover:text-gray-500 cursor-pointer" />

        <motion.div
          key={testimonials[index].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <Card className="shadow-xl py-2 sm:px-6 bg-white dark:bg-gray-800">
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-16 h-16 my-4 sm:my-3 sm:mt-5">
                <img src={testimonials[index].image} alt={testimonials[index].name} />
              </Avatar>
              <p className="sm:text-[22px] text-[14px] text-gray-800 dark:text-gray-300 font-bold flex gap-1">
                <QuoteIcon /> {testimonials[index].message}
              </p>
              <h4 className="mt-4 text-md sm:text-lg font-semibold text-gray-800 dark:text-white">{testimonials[index].name}</h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonials[index].role}</p>
            </CardContent>
          </Card>
        </motion.div>

        <ChevronRightIcon size={36} onClick={nextTestimonial} className="ml-6 dark:text-gray-500 dark:hover:text-gray-300 text-gray-300 hover:text-gray-500 cursor-pointer" />
      </div>
    </section>
  );
}
