import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import advland_bk from "../public/advland_bk.jpg";
import wise_owl from "../public/wise_owl.png";
import character from "../public/girl_front-removebg-preview.png"
import library_bg from "../public/library_bg.avif"
import { dialog } from 'framer-motion/client';

const EnglishModule: React.FC = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const owlRef = useRef<HTMLImageElement>(null);
  const dialogBoxRef = useRef<HTMLDivElement>(null);
  const dialogTextRef = useRef<HTMLParagraphElement>(null);
  const stepRef = useRef(0);

 useEffect(() => {
    // Initial animations
    gsap.fromTo(bgRef.current, 
      { scale: 2 }, 
      { scale: 1, duration: 5, ease: "power2.out" }
    );

    const tl = gsap.timeline({ delay: 4 });
    
    if (characterRef.current) {
      characterRef.current.style.opacity = '1';
      tl.from(characterRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
      });
    }

    gsap.to(dialogBoxRef.current, { 
      opacity: 1, 
      y: 0, 
      delay: 5, 
      duration: 1, 
      ease: "power2.out" 
    });
  }, []);

  const handleContinue = () => {
    stepRef.current++;

    switch (stepRef.current) {
      case 1:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Let's enter the Library of <b>Grammarica</b>!";
        }
        break;

      case 2:
        // Fade out current scene
        gsap.to([bgRef.current, characterRef.current, dialogBoxRef.current], {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            // Change background
            if (bgRef.current) {
              bgRef.current.src = library_bg;
            }
            
            // Fade in new background
            gsap.fromTo(bgRef.current, 
              { opacity: 0 }, 
              { opacity: 1, duration: 1 }
            );
            // Move owl into scene
            gsap.to(owlRef.current, {
              x: "-110%",
              opacity: 1,
              duration: 2,
              ease: "power2.out",
              onComplete: () => {
                // Fade in character and dialog
                gsap.fromTo(characterRef.current, 
                  { opacity: 0 }, 
                  { opacity: 1, duration: 1 }
                );
                gsap.to(dialogBoxRef.current, {
                  opacity: 1,
                  delay: 1,
                  duration: 1
                });

                // Update dialog text
                if (dialogTextRef.current) {
                  dialogTextRef.current.innerHTML = "<span style='font-style: italic; font-size: 1rem;'>Every object, person, place, animal, or idea has a name — and that name is called a <b>Noun</b>.</span>";
                }
              }
            });
             }
        });
        break;

      case 3:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Nouns are the building blocks of sentences. They help us identify and describe the world around us.";
        }
        break;

      case 4:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Some examples of nouns are: Cat, Doctor, School, Book, City, Honesty, Happiness and many more....";
        }
        break;

      case 5:
        if (dialogTextRef.current) {
            dialogTextRef.current.innerHTML = "Good ,now I will tell you a story. "
        //   dialogTextRef.current.innerHTML = "Good, now Unlock the main gate by identifying nouns hidden in glowing runes.";
        }
        break;
        

        case 6: 
        if (dialogTextRef.current) {
dialogTextRef.current.innerHTML = "One day, the names got all mixed up! The statue of Albert Einstein was labeled “City,” the signboard for Mumbai said “Person,” and the banner of the Taj Mahal read “Animal.” The city became confusing and dark."
        }
        break;

        case 7: if(dialogTextRef.current) {
            dialogTextRef.current.innerHTML = "To restore light to the city, you must help sort the nouns into their right categories:"
        }
        break;

        case 8:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Proper Nouns are special names and they always begin with a capital letter.For example : Mahatma Gandhi, Delhi, Monday, January, Diwali, Rohan"
        }
        break;

         case 9:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Common Nouns are general names and they do not begin with a capital letter. For example: cat, city, day, month, festival, boy"
        }
        break;

         case 10:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Collective noun is a word that refers to a group of people, animals, or things taken as one unit. For example: team of players, flock of birds, bunch of keys"
        }
        break;

        case 11:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Abstract nouns are ideas, qualities, feelings, or concepts that we cannot see, touch, hear, taste, or smell. They exist in our mind, not in the physical world. For example: love, bravery, intelligence, beauty, and freedom."
        }
        break;

        case 12:
        if (dialogTextRef.current) {
          dialogTextRef.current.innerHTML = "Concrete nouns are names of things we can experience with our five senses — we can see, touch, hear, taste, or smell them. For example : apple, dog, car, music, and chocolate."
        }
        break;

        case 13:
        if (dialogTextRef.current) {
         dialogTextRef.current.innerHTML = "Now that you understand nouns, let's test your knowledge!";
          // Add a slight delay before navigation
          setTimeout(() => {
            navigate('/english');  // Adjust this path to match your route configuration
          }, 2000); // 2 second delay to allow reading the message
        
        }
        break;

      default:
        break;
          }
  };

 

//   const handleContinue = () => {
//     stepRef.current++;

//     switch (stepRef.current) {
//       case 1:
//         if (dialogTextRef.current) {
//           dialogTextRef.current.innerHTML = "Let's enter the Library of <b>Grammarica</b>!";
//         }
//         break;
//       // ... add other cases similar to your original code
//     }
//   };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img 
        ref={bgRef}
        src={advland_bk}
        alt="background" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      <img
        ref={characterRef}
        src={character}
        alt="character"
        className="absolute bottom-24 left-[12%] w-40 -translate-x-1/2"
      />

      <img
        ref={owlRef}
        src={wise_owl}
        alt="owl"
        className="absolute bottom-40 -right-[15%] w-40"
      />

      <div
        ref={dialogBoxRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgba(226,226,226,0.8)] text-black p-4 rounded-2xl w-[90%] font-semibold text-center shadow-lg opacity-0"
      >
        <p ref={dialogTextRef}>
          You are the Explorer of Words, chosen to help restore balance in the magical land of <b>Grammarica</b> where knowledge has been scattered.
        </p>
        <button
          onClick={handleContinue}
          className="mt-4 px-6 py-2 bg-[#df7c18] text-white rounded-lg hover:bg-[#eb8926] cursor-pointer"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default EnglishModule;