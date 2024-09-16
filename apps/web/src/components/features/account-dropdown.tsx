"use client";
import Link from "next/link";
import { accounts } from "@/data/mock-accounts";

import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";

export default function AccountDropdown() {
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            "flex h-10 rounded-full p-0 md:pr-1",
            "bg-background/0 hover:bg-background/50",
            "backdrop-blur-sm",
            "border border-border/40",
            "transition-all duration-300 ease-in-out",
            "hover:scale-105"
          )}
        >
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src={currentAccount.avatar}
              alt={currentAccount.name}
            />
            <AvatarFallback>{currentAccount.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='ml-2 text-sm font-medium text-gray-700 hidden lg:inline-block'>
            {currentAccount.name}
          </span>
          <ChevronDown className='ml-1 h-4 w-4 text-gray-400 hidden md:inline-block' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-56'
      >
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.id}
            className='gap-3'
            onSelect={() => setCurrentAccount(account)}
          >
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src={account.avatar}
                alt={account.name}
              />
              <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                {account.name}
              </p>
              <p className='text-xs text-gray-500'>{account.type}</p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/manage/account'>
            <User className='mr-2 h-4 w-4' />
            <span>Add Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/me'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/signout'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
