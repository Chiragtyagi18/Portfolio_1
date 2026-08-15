declare module 'nodemailer' {
  export interface SendMailOptions {
    from?: string
    to?: string | string[]
    cc?: string | string[]
    bcc?: string | string[]
    subject?: string
    text?: string
    html?: string
    attachments?: Array<{
      filename?: string
      content?: string | Buffer
      contentType?: string
      path?: string
    }>
  }

  export interface SentMessageInfo {
    messageId: string
    response: string
  }

  export interface Transporter<T = SentMessageInfo> {
    sendMail(mail: SendMailOptions): Promise<T>
    verify(): Promise<true>
    close(): void
  }

  export interface TransportOptions {
    service?: string
    host?: string
    port?: number
    secure?: boolean
    auth?: {
      user?: string
      pass?: string
    }
    tls?: {
      rejectUnauthorized?: boolean
    }
  }

  export function createTransport(options: TransportOptions): Transporter

  export function createTestAccount(
    apiUrl?: string
  ): Promise<{
    user: string
    pass: string
    smtp: { host: string; port: number; secure: boolean }
    imap: { host: string; port: number; secure: boolean }
    pop3: { host: string; port: number; secure: boolean }
    web: string
  }>

  export function getTestMessageUrl(info: any): string | false
}
