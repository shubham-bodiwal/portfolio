// motionConfig.ts
export const springUpFade = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  };
  
  export const easeFade = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  };
  