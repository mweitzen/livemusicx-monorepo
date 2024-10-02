"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

import { useToast } from "@repo/ui/hooks/use-toast";
import { Badge } from "@repo/ui/components/badge";
import { Progress } from "@repo/ui/components/progress";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  AlertCircle,
  Music,
  Send,
  MessageSquare,
  Clock,
  Users,
  Bell,
  Settings,
  Share2,
  Mic2,
  Calendar,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Thermometer,
  Droplet,
  Wind,
  VolumeX,
  Volume2,
  Volume1,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@repo/ui/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Label } from "@repo/ui/components/label";
import { Switch } from "@repo/ui/components/switch";
import { Slider } from "@repo/ui/components/slider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";

export default function VenueLiveInterface() {
  const { toast } = useToast();
  const [currentEvent, setCurrentEvent] = useState({
    performer: "Alex Harmony",
    startTime: new Date(),
    attendees: 87,
    capacity: 150,
  });
  const [venueAnnouncements, setVenueAnnouncements] = useState([
    {
      id: 1,
      message: "Welcome to tonight's performance!",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      message: "Drink specials at the bar until 9 PM!",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  const [venueAlerts, setVenueAlerts] = useState([
    {
      id: 1,
      type: "info",
      message: "Sound check completed",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 2,
      type: "warning",
      message: "Bar running low on ice",
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);
  const [venueFeedback, setVenueFeedback] = useState([
    {
      id: 1,
      type: "positive",
      message: "Great atmosphere!",
      timestamp: new Date(Date.now() - 2700000),
    },
    {
      id: 2,
      type: "negative",
      message: "Long wait at the coat check",
      timestamp: new Date(Date.now() - 1500000),
    },
  ]);
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [venueSettings, setVenueSettings] = useState({
    autoLights: true,
    soundLimitEnabled: true,
    maxDecibels: 95,
    temperature: 72,
    humidity: 45,
    ventilation: 50,
  });
  const [currentDecibels, setCurrentDecibels] = useState(85);
  const [staffList, setStaffList] = useState([
    { id: 1, name: "John Doe", role: "Bar Manager", status: "active" },
    { id: 2, name: "Jane Smith", role: "Security Lead", status: "active" },
    { id: 3, name: "Mike Johnson", role: "Sound Engineer", status: "break" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent((prev) => ({
        ...prev,
        attendees: Math.min(
          prev.capacity,
          prev.attendees + Math.floor(Math.random() * 2)
        ),
      }));
      setCurrentDecibels((prev) =>
        Math.min(venueSettings.maxDecibels, prev + (Math.random() - 0.5) * 5)
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [venueSettings.maxDecibels]);

  const handleSendAnnouncement = () => {
    if (newAnnouncement.trim()) {
      const announcement = {
        id: Date.now(),
        message: newAnnouncement.trim(),
        timestamp: new Date(),
      };
      setVenueAnnouncements((prev) => [announcement, ...prev]);
      setNewAnnouncement("");
      setShowAnnouncementDialog(false);
      toast({
        title: "Announcement sent",
        description: "Your announcement has been sent to all attendees.",
      });
    }
  };

  const handleSettingsChange = (setting, value) => {
    setVenueSettings((prev) => ({ ...prev, [setting]: value }));
    toast({
      title: "Setting updated",
      description: `${setting} has been updated to ${value}.`,
    });
  };

  const handleAlertStaff = () => {
    toast({
      title: "Staff alerted",
      description: "All staff members have been notified.",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getVolumeIcon = (decibels) => {
    if (decibels < 70) return <VolumeX className='h-6 w-6' />;
    if (decibels < 85) return <Volume1 className='h-6 w-6' />;
    return <Volume2 className='h-6 w-6' />;
  };

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <header className='p-4 bg-primary text-primary-foreground sticky top-0 z-10'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
          <h1 className='text-xl font-bold'>Venue Control Panel</h1>
          <div className='flex items-center gap-2'>
            <Badge
              variant='secondary'
              className='font-semibold'
            >
              LIVE EVENT
            </Badge>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-grow max-w-6xl mx-auto w-full px-4 pb-4'>
        <Tabs
          defaultValue='overview'
          className='h-full'
        >
          <TabsList className='grid w-full grid-cols-5 sticky top-[72px] bg-background z-10 mb-4'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='announcements'>Announcements</TabsTrigger>
            <TabsTrigger value='alerts'>Alerts</TabsTrigger>
            <TabsTrigger value='feedback'>Feedback</TabsTrigger>
            <TabsTrigger value='staff'>Staff</TabsTrigger>
          </TabsList>

          <TabsContent
            value='overview'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Current Event</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Performer:</span>
                  <span>{currentEvent.performer}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Start Time:</span>
                  <span>{formatTime(currentEvent.startTime)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Attendance:</span>
                  <span>
                    {currentEvent.attendees} / {currentEvent.capacity}
                  </span>
                </div>
                <Progress
                  value={(currentEvent.attendees / currentEvent.capacity) * 100}
                  className='h-2'
                />
              </CardContent>
            </Card>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Button
                    className='w-full'
                    onClick={() => setShowAnnouncementDialog(true)}
                  >
                    <Mic2 className='mr-2 h-4 w-4' /> Make Announcement
                  </Button>
                  <Button
                    className='w-full'
                    variant='outline'
                    onClick={handleAlertStaff}
                  >
                    <Bell className='mr-2 h-4 w-4' /> Alert Staff
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Venue Conditions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Thermometer className='h-4 w-4 mr-2' />
                      <span>Temperature</span>
                    </div>
                    <span>{venueSettings.temperature}°F</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Droplet className='h-4 w-4 mr-2' />
                      <span>Humidity</span>
                    </div>
                    <span>{venueSettings.humidity}%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Wind className='h-4 w-4 mr-2' />
                      <span>Ventilation</span>
                    </div>
                    <span>{venueSettings.ventilation}%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      {getVolumeIcon(currentDecibels)}
                      <span className='ml-2'>Sound Level</span>
                    </div>
                    <span>{Math.round(currentDecibels)} dB</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[150px]'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span>Jazz Night</span>
                      <Badge>Tomorrow</Badge>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Rock Concert</span>
                      <Badge>In 3 days</Badge>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>DJ Set</span>
                      <Badge>Next Week</Badge>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='announcements'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Venue Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {venueAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className='flex items-center gap-2 py-2 border-b last:border-b-0'
                    >
                      <MessageSquare className='h-5 w-5 text-blue-500' />
                      <span>{announcement.message}</span>
                      <span className='text-xs text-muted-foreground ml-auto'>
                        {formatTime(announcement.timestamp)}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Button onClick={() => setShowAnnouncementDialog(true)}>
              New Announcement
            </Button>
          </TabsContent>

          <TabsContent
            value='alerts'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Venue Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {venueAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className='flex items-center gap-2 py-2 border-b last:border-b-0'
                    >
                      <AlertCircle
                        className={`h-5 w-5 ${alert.type === "warning" ? "text-yellow-500" : "text-blue-500"}`}
                      />
                      <span>{alert.message}</span>
                      <span className='text-xs text-muted-foreground ml-auto'>
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='feedback'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Venue Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {venueFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className='flex items-center gap-2 py-2 border-b last:border-b-0'
                    >
                      {feedback.type === "positive" ? (
                        <ThumbsUp className='h-5 w-5 text-green-500' />
                      ) : (
                        <ThumbsDown className='h-5 w-5 text-red-500' />
                      )}
                      <span>{feedback.message}</span>
                      <span className='text-xs text-muted-foreground ml-auto'>
                        {formatTime(feedback.timestamp)}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='staff'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {staffList.map((staff) => (
                    <div
                      key={staff.id}
                      className='flex items-center justify-between gap-2 py-2 border-b last:border-b-0'
                    >
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={staff.name}
                          />
                          <AvatarFallback>
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{staff.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {staff.role}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          staff.status === "active" ? "default" : "secondary"
                        }
                      >
                        {staff.status}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={showAnnouncementDialog}
        onOpenChange={setShowAnnouncementDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Make Announcement</DialogTitle>
            <DialogDescription>
              This announcement will be sent to all attendees.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <Textarea
              placeholder='Type your announcement here...'
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowAnnouncementDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendAnnouncement}>Send Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Venue Settings</DialogTitle>
            <DialogDescription>
              Adjust venue settings and controls.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='auto-lights'>Automatic Lighting</Label>
              <Switch
                id='auto-lights'
                checked={venueSettings.autoLights}
                onCheckedChange={(checked) =>
                  handleSettingsChange("autoLights", checked)
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='sound-limit'>Sound Limit</Label>
              <Switch
                id='sound-limit'
                checked={venueSettings.soundLimitEnabled}
                onCheckedChange={(checked) =>
                  handleSettingsChange("soundLimitEnabled", checked)
                }
              />
            </div>
            {venueSettings.soundLimitEnabled && (
              <div className='space-y-2'>
                <Label htmlFor='max-decibels'>Maximum Decibels</Label>
                <Select
                  value={venueSettings.maxDecibels.toString()}
                  onValueChange={(value) =>
                    handleSettingsChange("maxDecibels", parseInt(value))
                  }
                >
                  <SelectTrigger id='max-decibels'>
                    <SelectValue placeholder='Select max decibels' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='90'>90 dB</SelectItem>
                    <SelectItem value='95'>95 dB</SelectItem>
                    <SelectItem value='100'>100 dB</SelectItem>
                    <SelectItem value='105'>105 dB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='temperature'>Temperature (°F)</Label>
              <Slider
                id='temperature'
                min={60}
                max={80}
                step={1}
                value={[venueSettings.temperature]}
                onValueChange={(value) =>
                  handleSettingsChange("temperature", value[0])
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='humidity'>Humidity (%)</Label>
              <Slider
                id='humidity'
                min={30}
                max={70}
                step={1}
                value={[venueSettings.humidity]}
                onValueChange={(value) =>
                  handleSettingsChange("humidity", value[0])
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='ventilation'>Ventilation (%)</Label>
              <Slider
                id='ventilation'
                min={0}
                max={100}
                step={5}
                value={[venueSettings.ventilation]}
                onValueChange={(value) =>
                  handleSettingsChange("ventilation", value[0])
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowSettingsDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
