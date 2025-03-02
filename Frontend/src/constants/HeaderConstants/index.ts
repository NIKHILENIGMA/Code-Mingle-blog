// BUTTON_VARIANT follows naming convention for type
type ButtonVariant =
  | "default"
  | "secondary"
  | "link"
  | "destructive"
  | "outline"
  | "ghost"
  | null
  | undefined;

  
export type NotAuthenticatedOptionsType = {
  name: string;
  to: string;
  variant: ButtonVariant;
};

// Updated constant name to follow SCREAMING_SNAKE_CASE convention
export const NOT_AUTHENTICATED_OPTIONS: NotAuthenticatedOptionsType[] = [
  {
    name: "Login",
    to: "/login",
    variant: "default",
  },
  {
    name: "Register", 
    to: "/signup",
    variant: "secondary",
  },
];
