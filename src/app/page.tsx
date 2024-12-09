import Image from "next/image";
import ChatInterface from "@/components/ChatInterface";
export default function Home() {
  return (
    <main className="flex-col pt-16 absolute top-0 left-0 w-full justify-center items-center h-screen border border-red-200">
      <ChatInterface />
    </main>
  );
}
