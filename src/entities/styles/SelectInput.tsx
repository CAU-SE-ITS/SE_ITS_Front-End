import { useState } from "react";
import styled from "@emotion/styled";

interface SelectInputProps {
  options: { value: string; label: string }[];
  onChange: (value: User.Role) => void;
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

const SelectContainer = styled.div`
  margin-top: 20px;

  width: 81.5%;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 47px;

  font-size: 16px;
  text-align: center;

  border: 2px solid #9797ff;
  border-radius: 3px;
  color: gray;

  :focus {
    border: 2px solid #9797ff;
    border-radius: 3px;
  }
`;

const Option = styled.option`
  padding: 10px;
`;
