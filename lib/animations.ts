// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

export const scaleInBounce = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { opacity: 0, scale: 0.8 }
}

export const slideInFromBottom = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
}

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
}

export const rotateIn = {
  initial: { opacity: 0, rotate: -10, scale: 0.9 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 10, scale: 0.9 }
}

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 }
}

export const textContainer = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.04
    }
  }
}

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15
}

export const smoothTransition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96]
}

export const slowTransition = {
  duration: 0.8,
  ease: "easeOut"
}

// Counter animation helper
export const counterAnimation = (end: number, duration: number = 2) => ({
  initial: { count: 0 },
  animate: {
    count: end,
    transition: { duration, ease: "easeOut" }
  }
})

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
}

export const hoverLift = {
  y: -5,
  transition: { duration: 0.2 }
}

export const tapScale = {
  scale: 0.95
}

// Card hover effect
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Image reveal effect
export const imageReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: { 
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
  }
}

// Parallax helper
export const parallaxY = (offset: number) => ({
  y: offset
})
