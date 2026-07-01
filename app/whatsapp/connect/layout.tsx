import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect WhatsApp Business | Bank Reach',
  description: 'Connect your WhatsApp Business account to start sending and receiving messages through WhatsApp Business API',
};

export default function WhatsAppConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}