import { Inter } from "next/font/google";
import './styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reddit Mood",
  description: "Scan sentiment of a keyword on a subreddit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
