/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import isMounted from "./isMounted";

function isPromise(val) {
  return val && typeof val.then === "function";
}

/**
 * Use this hook promise status of a handler.
 * @param handler
 * @param loading
 * @returns {*[]}
 */
export default (handler, loading) => {
  const [isLoading, setLoading] = useState(loading);
  const mounted = isMounted();
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const handleClick = (e) => {
    if (typeof handler === "function") {
      const result = handler(e);
      if (isPromise(result)) {
        setLoading(true);
        return result.then(
          (r) => {
            if (mounted.current) {
              setLoading(false);
            }
            return r;
          },
          (er) => {
            if (mounted.current) {
              setLoading(false);
            }
            throw er;
          }
        );
      }
    }
  };

  return [isLoading, handleClick];
};
