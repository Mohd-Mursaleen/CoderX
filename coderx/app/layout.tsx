import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "CoderX",
  description: "Code generation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1}>{children}</Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
