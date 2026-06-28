import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  postal_code?: string | null
  property_type?: string | null
  monthly_bill?: number | null
  notes?: string | null
  source?: string | null
  created_at?: string
}

const Email = (p: Props) => (
  <Html lang="en">
    <Head />
    <Preview>New NullPunkt waitlist signup: {p.name ?? p.email ?? 'unknown'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New waitlist signup</Heading>
        <Text style={lead}>
          A new lead just joined the NullPunkt founding cohort list.
        </Text>
        <Section style={card}>
          <Row label="Name" value={p.name} />
          <Row label="Email" value={p.email} />
          <Row label="Postal code" value={p.postal_code} />
          <Row label="Property type" value={p.property_type} />
          <Row label="Monthly bill" value={p.monthly_bill ? `$${p.monthly_bill}` : null} />
          <Row label="Source" value={p.source} />
          <Row label="Submitted" value={p.created_at} />
          {p.notes ? (
            <>
              <Hr style={hr} />
              <Text style={label}>Notes</Text>
              <Text style={notes}>{p.notes}</Text>
            </>
          ) : null}
        </Section>
        <Text style={footer}>
          Full list available in the NullPunkt admin area at /admin → Waitlist.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
  <Text style={row}>
    <span style={label as any}>{label}: </span>
    <span style={val as any}>{value ?? '—'}</span>
  </Text>
)

export const template = {
  component: Email,
  subject: (d: Props) => `New waitlist signup — ${d.name ?? d.email ?? 'unknown'}`,
  displayName: 'Waitlist — internal notification',
  to: 'hello@nullpunkt.ca',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    postal_code: 'T2P 1A1',
    property_type: 'residential',
    monthly_bill: 220,
    source: 'website',
    notes: 'Interested in battery + EV charger.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: '22px', fontWeight: 500, margin: '0 0 8px', color: '#0f172a' }
const lead = { fontSize: '14px', color: '#475569', margin: '0 0 24px' }
const card = { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px 24px', backgroundColor: '#f8fafc' }
const row = { fontSize: '14px', margin: '6px 0', color: '#0f172a' }
const label = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#64748b', margin: '12px 0 4px' }
const val = { color: '#0f172a' }
const notes = { fontSize: '14px', color: '#0f172a', margin: '0' }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const footer = { fontSize: '12px', color: '#64748b', marginTop: '24px' }
