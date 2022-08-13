import { useEffect } from "react";

const useKey = (key, callback) => {
  useEffect(() => {
    const handle = (ev) => {
      if (ev.code === key) {
        callback(ev);
      }
    };

    document.addEventListener("keyup", handle);

    return () => {
      document.removeEventListener("keyup", handle);
    };
  }, [key]);
};

export default useKey;
