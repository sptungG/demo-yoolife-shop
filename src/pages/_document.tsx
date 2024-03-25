import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-smooth scrollbar-none">
      <Head />
      <body className="bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
