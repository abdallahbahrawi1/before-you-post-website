import { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * All the visual styles we need.
 * Extend or tweak these at any time – the component simply
 * picks the right string based on the `variant` prop.
 */
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  /** plain blue / grey action buttons */
  primary:
    "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300",

  /** orange “back / cancel” link-style button */
  cancel:
    "flex items-center text-orange-500 hover:font-bold px-4 py-2",

  /** fat marketing CTA */
  cta:
    "relative px-12 py-4 text-lg font-bold text-white rounded-full " +
    "bg-gradient-to-r from-purple to-coral shadow-lg " +
    "hover:-translate-y-1 hover:shadow-xl",

  /** full-width submit button with optional loading state */
  submit:
    "w-full py-3 rounded-lg font-semibold text-white " +
    "bg-gradient-to-br from-purple-500 to-red-400 " +
    "hover:-translate-y-1 hover:shadow-lg",
};

type ButtonVariant =
  | "primary"
  | "secondary"
  | "cancel"
  | "cta"
  | "submit";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** visual preset – defaults to “primary” */
  variant?: ButtonVariant;
  /** show “…“ while async action is running */
  loading?: boolean;
  /** optional icon on the left / right */
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/**
 * Reusable button that replaces **all four** old components.
 *
 * - Pick `variant` for styling.
 * - Pass `type="submit"` (or whatever) just like a normal `<button/>`.
 * - Use `loading` for async submit buttons.
 * - Drop in icons via `iconLeft` / `iconRight`.
 */
export const Button = ({
  children,
  variant = "primary",
  loading = false,
  iconLeft,
  iconRight,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const base =
    "inline-flex justify-center items-center gap-1 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`${base} ${VARIANT_STYLES[variant]} ${className}`}
    >
      {iconLeft}
      {loading && typeof children === "string"
        ? `${children}...`
        : children}
      {iconRight}
    </button>
  );
};
