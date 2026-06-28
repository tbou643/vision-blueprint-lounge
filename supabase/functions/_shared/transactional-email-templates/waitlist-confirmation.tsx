import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const Email = ({ name }: Props) => (
  <Html lang="en">
    <Head />
    <Preview>You're on the NullPunkt founding list for Calgary.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to the NullPunkt founding cohort</Heading>
        <Text style={lead}>
          {name ? `Hi ${name},` : 'Hi there,'} thanks for signing up.
        </Text>
        <Text style={body}>
          We're a small German-engineered solar team launching in Calgary this summer.
          Your spot on the founding list is reserved. A member of our engineering team
          will reach out personally as we open Calgary slots — typically within a few
          business days.
        </Text>
        <Section style={card}>
          <Text style={cardTitle}>What happens next</Text>
          <Text style={item}>1. A short call to understand your roof, usage and goals.</Text>
          <Text style={item}>2. A no-pressure system proposal with transparent pricing.</Text>
          <Text style={item}>3. Installation by our vetted Alberta master-electrician partners.</Text>
        </Section>
        <Text style={body}>
          In the meantime, feel free to reply directly to this email with any questions.
        </Text>
        <Text style={signoff}>— The NullPunkt team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'You\'re on the NullPunkt founding list',
  displayName: 'Waitlist — lead confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '40px 24px' }
const h1 = { fontSize: '24px', fontWeight: 400, margin: '0 0 16px', color: '#0f172a' }
const lead = { fontSize: '16px', color: '#0f172a', margin: '0 0 12px' }
const body = { fontSize: '14px', lineHeight: '22px', color: '#334155', margin: '0 0 16px' }
const card = { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px 24px', backgroundColor: '#f8fafc', margin: '20px 0' }
const cardTitle = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#64748b', margin: '0 0 12px' }
const item = { fontSize: '14px', color: '#0f172a', margin: '6px 0' }
const signoff = { fontSize: '14px', color: '#0f172a', marginTop: '24px' }
