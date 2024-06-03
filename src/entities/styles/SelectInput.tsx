import { useState } from "react";
import styled from "@emotion/styled";

interface SelectInputProps {
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export const SelectInput = ({
  options,
  onChange,
  placeholder,
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value as User.Role);
  };

  return (
    <SelectContainer>
      <StyledSelect value={selectedValue} onChange={handleChange}>
        {placeholder && (
          <Option value="" disabled>
            {placeholder}
          </Option>
        )}
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export const InnerSelectInput = ({
  options,
  onChange,
  placeholder,
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value as User.Role);
  };

  return (
    <InnerSelectContainer>
      <InnerStyledSelect value={selectedValue} onChange={handleChange}>
        {placeholder && (
          <Option value="" disabled>
            {placeholder}
          </Option>
        )}
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </InnerStyledSelect>
    </InnerSelectContainer>
  );
};

const SelectContainer = styled.div`
  margin-top: 20px;

  width: 81.5%;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 47px;

  font-size: 16px;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  border: 2px solid #5d5dff;
  border-radius: 3px;
  color: gray;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  :focus {
    border: 2px solid #5d5dff;
    border-radius: 3px;
  }
`;

const InnerSelectContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 4px;

  width: 50%;
`;

const InnerStyledSelect = styled.select`
  width: 100%;
  height: 28px;

  font-size: 14px;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  border: 0px solid gray;
  border-radius: 3px;
  color: gray;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  :focus {
    border: 0px solid gray;
    border-radius: 3px;
  }
`;

const Option = styled.option`
  padding: 10px;
`;
