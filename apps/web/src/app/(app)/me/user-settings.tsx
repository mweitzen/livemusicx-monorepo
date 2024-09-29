"use client";
import { useState } from "react";
import { toast } from "@repo/ui/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { Switch } from "@repo/ui/components/switch";
import { Slider } from "@repo/ui/components/slider";

export default function UserSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newEvents: true,
    ticketReminders: true,
    artistUpdates: false,
    promotions: true,
  });
  const [pushNotifications, setPushNotifications] = useState({
    newEvents: true,
    ticketReminders: true,
    artistUpdates: true,
    promotions: false,
  });
  const [volumeLevel, setVolumeLevel] = useState(70);
  const [theme, setTheme] = useState("system");

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your account settings have been updated.",
    });
  };
  return (
    <Tabs defaultValue='account'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        <TabsTrigger value='preferences'>Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage your account details and security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  defaultValue='John Doe'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  defaultValue='john.doe@example.com'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  type='password'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  type='tel'
                  defaultValue='+1 (555) 123-4567'
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='notifications'>
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Customize how you receive updates and alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>
                Email Notifications
              </h3>
              <div className='space-y-2'>
                {Object.entries(emailNotifications).map(([key, value]) => (
                  <div
                    key={key}
                    className='flex items-center justify-between'
                  >
                    <Label
                      htmlFor={`email-${key}`}
                      className='flex-1'
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      id={`email-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setEmailNotifications((prev) => ({
                          ...prev,
                          [key]: checked,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Push Notifications</h3>
              <div className='space-y-2'>
                {Object.entries(pushNotifications).map(([key, value]) => (
                  <div
                    key={key}
                    className='flex items-center justify-between'
                  >
                    <Label
                      htmlFor={`push-${key}`}
                      className='flex-1'
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      id={`push-${key}`}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setPushNotifications((prev) => ({
                          ...prev,
                          [key]: checked,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='preferences'>
        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Customize your app experience.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='theme'>Theme</Label>
              <Select
                value={theme}
                onValueChange={setTheme}
              >
                <SelectTrigger id='theme'>
                  <SelectValue placeholder='Select a theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='volume'>Default Volume</Label>
              <Slider
                id='volume'
                min={0}
                max={100}
                step={1}
                value={[volumeLevel]}
                onValueChange={([value]) => setVolumeLevel(value || 0)}
              />
              <p className='text-sm text-muted-foreground'>{volumeLevel}%</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
