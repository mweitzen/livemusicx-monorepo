"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CircularIconButton } from "../ui/circular-icon-button";

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New message",
    description: "You have a new message from John Doe",
    createdAt: "2023-06-01T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Update available",
    description: "A new software update is available for your system",
    createdAt: "2023-05-31T15:30:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Meeting reminder",
    description: "Your team meeting starts in 15 minutes",
    createdAt: "2023-05-31T09:00:00Z",
    read: true,
  },
  {
    id: "4",
    title: "Task completed",
    description: "Great job! You've completed all your tasks for today",
    createdAt: "2023-05-30T17:00:00Z",
    read: true,
  },
  {
    id: "5",
    title: "New feature",
    description: "Check out the new dashboard feature we just launched!",
    createdAt: "2023-05-30T11:45:00Z",
    read: false,
  },
];

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircularIconButton
          label='Open notifications'
          icon={<Bell />}
          aria-label={`${unreadCount} unread notifications`}
        >
          {unreadCount > 0 && (
            <span className='absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full dark:border-gray-900'>
              {unreadCount}
            </span>
          )}
        </CircularIconButton>
      </PopoverTrigger>
      <PopoverContent
        className='w-80 p-0'
        align='end'
      >
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-lg font-semibold'>Notifications</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            You have {unreadCount} unread messages
          </p>
        </div>
        <ScrollArea className='h-[300px]'>
          {notifications.length === 0 ? (
            <p className='text-center py-4 text-gray-500 dark:text-gray-400'>
              No notifications
            </p>
          ) : (
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                    !notification.read && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <button
                    className='w-full text-left'
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <h3 className='font-medium text-gray-900 dark:text-gray-100'>
                      {notification.title}
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      {notification.description}
                    </p>
                    <span className='text-xs text-gray-400 dark:text-gray-500 mt-2 block'>
                      {formatDate(notification.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
          <Button
            variant='outline'
            className='w-full'
            onClick={() =>
              setNotifications(notifications.map((n) => ({ ...n, read: true })))
            }
          >
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
