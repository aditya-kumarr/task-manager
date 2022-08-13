import styled from "styled-components";
import { motion } from "framer-motion";

export const Spage = styled(motion.main)`
  position: relative;
  flex: none;
  width: 100vw;
  height: 100vh;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  /* className="backdrop-blur-sm bg-transparent h-[90%] w-[90%] p-10 rounded-lg " */
`;

Spage.defaultProps = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "100%",
  },
  exit: {
    x: window.innerWidth,
    transition: {
      duration: 0.1,
    },
  },
};
export const SPageContainer = styled.main`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  height: 97vh;
  width: 97vw;
  background-color: transparent;
  padding: .5rem;
  border-radius: 2rem;
`;
