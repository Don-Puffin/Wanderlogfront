"use client";
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

import { Spinner } from '@chakra-ui/react'

const AccordionItem = ({ question, answer, image}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="font-sans divide-y rounded-lg">
      <div role="accordion">
        <button
          type="button"
          className="text-left text-sm  py-3 px-6 text-slate-500 font-semibold flex items-center transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-4">{question}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`mr-10 w-4 fill-current ml-auto shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
              clipRule="evenodd"
              data-original="#000000"
            ></path>
          </svg>
        </button>
        <div className={`py-4 px-6 ${isOpen ? '' : 'hidden'}`}>
          <p className="text-sm text-gray-500">{answer}</p>
            <Image className='mt-4 rounded-xl'
      src={image}
      width={300}
      height={200}
      alt="Picture of the author"
    />
          <Link className="text-xs"href="https://www.youtube.com/">Wanderlog Youtube Help Channel</Link>
          
        </div>
        
      </div>
    </div>
    </>
  );
};

const FAQAccordion = () => {
  return (
      
      <div className="font-[sans-serif] bg-black text-[#333] h-screen">
        
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="p-4">
            <img
              src="/wanderlog logo3.png"
              
              className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
            
          </div>
          <div className="flex items-center md:p-8 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
            
    <div>
    <h2 className="text-xl text-black font-bold mb-4">Help</h2>
      <AccordionItem
        question="What is Wanderlog? "
        answer="Wanderlog is a vibrant community where you can like, share, and comment on others' posts while exploring their profiles, maps, reviews. Explore our site, see the places you really want to visit and share your experiences to inspire others."
        image="/helpImage.png"
      />
      <AccordionItem
        question="How do I sign in?"
        answer="Once registered use your username and password to create posts about your travels and see other peoples travels."
        image="/helpImage1.png"
      />
      <AccordionItem
        question="How do I register?"
        answer="Choose a username & password to start sharing your travels. Your password must include one lowercase letter, one uppercase letter, one number and one symbol. Once registered you can edit your profile from the menu bar."
        image="/helpImage2.png"

      />
      <AccordionItem
        question="How do I make a post?"
        answer="Select Create Post from the side bar then upload your photo and enter your location details and select it from the drop down auto complete bar."
        image="/helpImage1.png"
      />
      <AccordionItem
        question="How do I edit my profile?"
        answer="Select Profile from the side bar and edit your infomation or upload an image."
        image="/helpImage1.png"

      /><AccordionItem
        question="How do I share my posts with friends?"
        answer="Your unique URL can be found on your profile page and can be used to hare your travels."
        image="/helpImage1.png"

      />
      
      <Link className="text-slate-400 text-sm font-light"href="/feed">Back</Link>

         
            
          </div>
        </div>
      </div>
  
    </div>
   
    
  );
};

export default FAQAccordion;
