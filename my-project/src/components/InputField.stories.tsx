import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";
import type { InputFieldProps } from "./InputField";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    type: { control: "radio", options: ["text", "email", "password"] },
  },
};

export default meta;
type Story = StoryObj<InputFieldProps>;

/**
 * ✅ Basic field
 */
export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
  },
};

/**
 * ❌ Invalid field with error
 */
export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

/**
 * 🚫 Disabled state
 */
export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "Can't type here",
    disabled: true,
  },
};

/**
 * 🎨 Variants
 */
export const Filled: Story = {
  args: { label: "Filled style", placeholder: "Filled variant", variant: "filled" },
};
export const Outlined: Story = {
  args: { label: "Outlined style", placeholder: "Outlined variant", variant: "outlined" },
};
export const Ghost: Story = {
  args: { label: "Ghost style", placeholder: "Ghost variant", variant: "ghost" },
};

/**
 * 📏 Sizes
 */
export const Small: Story = {
  args: { label: "Small field", placeholder: "Small size", size: "sm" },
};
export const Medium: Story = {
  args: { label: "Medium field", placeholder: "Medium size", size: "md" },
};
export const Large: Story = {
  args: { label: "Large field", placeholder: "Large size", size: "lg" },
};

/**
 * ⏳ Loading state
 */
export const Loading: Story = {
  args: {
    label: "Loading field",
    placeholder: "Wait...",
    loading: true,
  },
};

/**
 * ✨ Extras
 */
export const WithClearButton: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    value: "Hello",
    clearable: true,
  },
};

export const PasswordToggle: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};
