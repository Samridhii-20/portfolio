import './globals.css'

export const metadata = {
  title: 'Samridhi Choudhary | Portfolio',
  description: 'Computer Science Student & Developer specializing in Data Science and Full-Stack Web Development.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#030712] text-slate-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
