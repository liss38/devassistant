"use client";

import { Message } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";


interface MessageBubbleProps {
  message: Message;
}


export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn(
      "flex gap-4 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex flex-col max-w-[70%] p-4 rounded-2xl",
        isUser 
          ? "bg-primary text-primary-foreground rounded-br-sm" 
          : "bg-muted shadow-sm rounded-bl-sm"
      )}>
        <div className="flex items-center gap-2 mb-2">
          {isUser ? (
            <Avatar className="w-6 h-6">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <Bot className="w-4 h-4" />
          )}
          <span className="text-xs font-medium">
            {isUser ? "You" : "DevAssistant"}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-all">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}