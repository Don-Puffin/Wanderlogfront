"use client";
import React, { useState } from 'react';
import Link from 'next/link'

const AccordionItem = ({ question, answer}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="font-sans border divide-y rounded-lg">
      <div role="accordion">
        <button
          type="button"
          className="text-left text-base  py-4 px-6 text-slate-500 border-b flex items-center transition-all"
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
          <Link href="https://www.youtube.com/">Wanderlog Youtube Help Channel</Link>
          
        </div>
        
      </div>
    </div>
    </>
  );
};

const FAQAccordion = () => {
  return (
    <div className="mx-auto w-2/3">
      <AccordionItem
        question="What is Wanderlog? "
        answer=""
      />
      <AccordionItem
        question="How do I sign in?"
        answer="Always look on the bright side of life, *whistle*"
      />
      <AccordionItem
        question="How do I register?"
        answer="Hello from the other side, fish and chips a thousand times..."

      />
      <AccordionItem
        question="How do I make a post?"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in."

      />
      <AccordionItem
        question="How do I change my profile?"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in."

      /><AccordionItem
        question="How do I share my posts with friends?"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in."

      /><AccordionItem
        question="Why is Wanderlog? "
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in."

      /><AccordionItem
        question="Who is Wanderlog "
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in."
   
      />
    </div>
    
  );
};

export default FAQAccordion;
