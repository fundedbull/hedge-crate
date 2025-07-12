"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import Image from "next/image";

interface Message {
  text: string;
  isUser: boolean;
  image?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMessages([
          ...messages,
          { text: "", isUser: true, image: e.target?.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.isUser ? "justify-end" : ""
            }`}
          >
            {!message.isUser && (
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-3 ${
                message.isUser ? "bg-blue-500 text-white" : "bg-zinc-900"
              }`}
            >
              {message.text && <p>{message.text}</p>}
              {message.image && (
                <Image
                  src={message.image}
                  alt="user upload"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}
            </div>
            {message.isUser && (
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Type your message..."
            className="pr-12"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}
