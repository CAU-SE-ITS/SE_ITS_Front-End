import styled from "@emotion/styled";

import { MoonLoader } from "react-spinners";

export const Loading = () => {
  return (
    <LoadingWrapper>
      <MoonLoader color="#212121" size={150} speedMultiplier={0.8} />
    </LoadingWrapper>
  );
};

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
