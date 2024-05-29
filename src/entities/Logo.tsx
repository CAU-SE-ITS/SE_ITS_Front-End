import styled from "@emotion/styled";

export const Logo = ({ type }: { type: "BIG" | "SMALL" }) => (
  <>
    {type === "SMALL" ? (
      <SmallLogoImg src="/img/cits_logo.png" alt="logo" />
    ) : (
      <BigLogoImg src="/img/cits_logo.png" alt="logo" />
    )}
  </>
);

const SmallLogoImg = styled.img`
  height: 60px;
`;

const BigLogoImg = styled.img`
  width: 270px;
`;
