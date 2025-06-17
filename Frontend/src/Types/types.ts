export type ToneType = 'Professional' | 'Casual' | 'Friendly' | 'Formal' | 'Confident' | 'Optimistic' | 'Empathetic' | 'Assertive'

export type PromptType = 'simple' | 'advanced' | 'condense'

export interface SidebarLink {
  title: string
  to: string
}

export interface SessionData {
  id: string
  userId: string
  browserInfo: string
  ipAddress: string
  status: 'active' | 'expired'
  access: string
  refresh: string
}

export interface Navlink {
  name: string
  path: string
  icon: React.ComponentType
}

export interface ToneOptions {
  value: ToneType
  label: string
}

// BUTTON_VARIANT follows naming convention for type
export type ButtonVariant =
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