import type { ComponentType } from 'npm:react@18.3.1'
import { template as waitlistInternal } from './waitlist-internal.tsx'
import { template as waitlistConfirmation } from './waitlist-confirmation.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string | ((data: any) => string)
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'waitlist-internal': waitlistInternal,
  'waitlist-confirmation': waitlistConfirmation,
}
