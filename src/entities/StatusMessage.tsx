import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

export const StatusMessage = ({
  message,
  setMessage,
  duration,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string | false>>;
  duration: number;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setMessage(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return <MessageContainer show={show}>{message}</MessageContainer>;
};

const MessageContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  background-color: #4444ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};

  display: flex;
  justify-content: center;

  width: 280px;
`;
