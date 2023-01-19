import { ChangeEvent, InputHTMLAttributes, Ref, forwardRef } from "react";
import styled from "styled-components";

import {
  Props as InputWrapperProps,
  InputWrapperWithErrorMessage,
} from "./InputWrapper";
import { Spinner } from "../Spinner";
import { commonInputCSS } from "./commonInputCSS";

export type SharedTextInputProps = Pick<
  InputWrapperProps,
  "label" | "error"
> & {
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
};

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> &
  SharedTextInputProps & {
    inputOverlay?: React.ReactNode;
  };

export const TextInput = forwardRef(function TextInputInner(
  {
    onValueChange,
    label,
    error,
    height,
    inputOverlay,
    ...props
  }: TextInputProps,
  ref: Ref<HTMLInputElement> | null
) {
  return (
    <InputWrapperWithErrorMessage error={error} label={label}>
      <InputWr>
        <TextInputContainer
          {...props}
          isValid={!error}
          ref={ref}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event);
            onValueChange?.(event.currentTarget.value);
          }}
        />
        {inputOverlay}
      </InputWr>
    </InputWrapperWithErrorMessage>
  );
});

const InputWr = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const TextInputContainer = styled.input`
  ${commonInputCSS};
`;

export const TextInputLoader = () => (
  <TextInputContainer as="div" isValid>
    <Spinner />
  </TextInputContainer>
);
