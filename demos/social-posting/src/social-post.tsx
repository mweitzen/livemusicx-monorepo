import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { format, addDays, isBefore, isAfter } from "date-fns";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import { Slider } from "@repo/ui/components/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Clock,
  Image as ImageIcon,
  Link,
  Mic,
  Music,
  Save,
  Share2,
  Tag,
  Type,
  Video,
} from "lucide-react";
import { cn } from "@repo/ui/helpers";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    date: "2024-07-15",
    venue: "Central Park",
    description:
      "Annual summer music extravaganza featuring top artists from around the world.",
  },
  {
    id: 2,
    name: "Jazz Night at Blue Note",
    date: "2024-06-20",
    venue: "Blue Note Jazz Club",
    description: "An evening of smooth jazz with renowned local artists.",
  },
  {
    id: 3,
    name: "Rock Concert at Madison Square Garden",
    date: "2024-08-05",
    venue: "Madison Square Garden",
    description:
      "Epic rock concert featuring legendary bands and up-and-coming artists.",
  },
  {
    id: 4,
    name: "Electronic Dance Music Rave",
    date: "2024-09-10",
    venue: "Warehouse 23",
    description:
      "All-night dance party with top DJs and immersive light shows.",
  },
  {
    id: 5,
    name: "Classical Symphony Orchestra Performance",
    date: "2024-10-15",
    venue: "Carnegie Hall",
    description:
      "A night of classical masterpieces performed by the world-renowned symphony orchestra.",
  },
];

const socialPlatforms = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook-icon.svg",
    hasIntegration: true,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "/twitter-icon.svg",
    hasIntegration: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/instagram-icon.svg",
    hasIntegration: true,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/tiktok-icon.svg",
    hasIntegration: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/linkedin-icon.svg",
    hasIntegration: true,
  },
];

const userProfile = {
  name: "Alex Johnson",
  username: "@alexjmusic",
  avatar: "/placeholder-avatar.jpg",
};

const suggestedHashtags = [
  "MusicLover",
  "LiveMusic",
  "ConcertNight",
  "FestivalSeason",
  "NewMusic",
];
const suggestedMentions = [
  "@venuename",
  "@artistname",
  "@bandname",
  "@musicblog",
  "@radioDJ",
];

export default function SocialPostCreator() {
  // const router = useRouter();
  const [postType, setPostType] = useState("single-event");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [postContent, setPostContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "facebook",
    "twitter",
  ]);
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleTime, setScheduleTime] = useState(format(new Date(), "HH:mm"));
  const [recurringFrequency, setRecurringFrequency] = useState("daily");
  const [recurringEndDate, setRecurringEndDate] = useState(
    addDays(new Date(), 30)
  );
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [customization, setCustomization] = useState({
    font: "default",
    color: "#000000",
    layout: "standard",
  });
  const [hashtags, setHashtags] = useState(["MusicLover"]);
  const [mentions, setMentions] = useState(["@venuename"]);
  const [platformSpecificContent, setPlatformSpecificContent] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (postType === "single-event" && selectedEvent) {
      setPostContent(
        `Join us for ${selectedEvent.name} on ${format(new Date(selectedEvent.date), "MMMM d, yyyy")} at ${selectedEvent.venue}! ${selectedEvent.description}`
      );
    } else if (
      postType === "upcoming-events" &&
      dateRange.from &&
      dateRange.to
    ) {
      const events = mockEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          isAfter(eventDate, dateRange.from) &&
          isBefore(eventDate, dateRange.to)
        );
      });
      setPostContent(
        `Check out our upcoming events from ${format(dateRange.from, "MMMM d")} to ${format(dateRange.to, "MMMM d")}:\n\n${events.map((event) => `- ${event.name} on ${format(new Date(event.date), "MMMM d")} at ${event.venue}`).join("\n")}`
      );
    }
  }, [postType, selectedEvent, dateRange]);

  const handlePostTypeChange = (type) => {
    setPostType(type);
    setSelectedEvent(null);
    setDateRange({ from: null, to: null });
    setErrors({});
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setErrors({});
  };

  const handleDateRangeSelect = (range) => {
    setDateRange(range);
    setErrors({});
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));
    setSelectedMedia([...selectedMedia, ...newMedia]);
  };

  const handleRemoveMedia = (index) => {
    const newMedia = [...selectedMedia];
    URL.revokeObjectURL(newMedia[index].preview);
    newMedia.splice(index, 1);
    setSelectedMedia(newMedia);
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleScheduleTypeChange = (type) => {
    setScheduleType(type);
    if (type === "now") {
      setScheduleDate(new Date());
      setScheduleTime(format(new Date(), "HH:mm"));
    }
  };

  const handleScheduleDateChange = (date) => {
    setScheduleDate(date);
  };

  const handleScheduleTimeChange = (e) => {
    setScheduleTime(e.target.value);
  };

  const handleRecurringFrequencyChange = (frequency) => {
    setRecurringFrequency(frequency);
  };

  const handleRecurringEndDateChange = (date) => {
    setRecurringEndDate(date);
  };

  const handleCollaboratorAdd = (collaborator) => {
    setCollaborators([...collaborators, collaborator]);
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization({ ...customization, [key]: value });
  };

  const handleHashtagAdd = (hashtag) => {
    if (hashtag && !hashtags.includes(hashtag)) {
      setHashtags([...hashtags, hashtag]);
    }
  };

  const handleMentionAdd = (mention) => {
    if (mention && !mentions.includes(mention)) {
      setMentions([...mentions, mention]);
    }
  };

  const handlePlatformSpecificContentChange = (platform, content) => {
    setPlatformSpecificContent({
      ...platformSpecificContent,
      [platform]: content,
    });
  };

  const validatePost = () => {
    const newErrors = {};
    if (postType === "single-event" && !selectedEvent) {
      newErrors.event = "Please select an event";
    }
    if (postType === "upcoming-events" && (!dateRange.from || !dateRange.to)) {
      newErrors.dateRange = "Please select a date range";
    }
    if (!postContent.trim()) {
      newErrors.content = "Post content cannot be empty";
    }
    if (selectedPlatforms.length === 0) {
      newErrors.platforms = "Please select at least one platform";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostSubmit = () => {
    if (!validatePost()) {
      return;
    }

    const scheduledDateTime =
      scheduleType === "now"
        ? new Date()
        : new Date(`${format(scheduleDate, "yyyy-MM-dd")}T${scheduleTime}`);

    const postData = {
      type: postType,
      event: selectedEvent,
      dateRange,
      content: postContent,
      media: selectedMedia,
      platforms: selectedPlatforms,
      scheduleType,
      scheduledDateTime,
      recurringFrequency:
        scheduleType === "recurring" ? recurringFrequency : null,
      recurringEndDate: scheduleType === "recurring" ? recurringEndDate : null,
      isCollaborative,
      collaborators,
      customization,
      hashtags,
      mentions,
      platformSpecificContent,
    };

    console.log("Submitting post:", postData);
    // Here you would typically send this data to your backend API

    // Handle platforms without direct integration
    const platformsWithoutIntegration = selectedPlatforms.filter(
      (platform) =>
        !socialPlatforms.find((p) => p.id === platform).hasIntegration
    );

    if (platformsWithoutIntegration.length > 0) {
      // Save post data for manual posting later
      console.log(
        "Saving post data for platforms:",
        platformsWithoutIntegration
      );
      // Implement logic to save this data for later use
    }

    // Show success message and redirect user
    alert("Post created successfully!");
    // router.push("/dashboard"); // Redirect to dashboard or post management page
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Create Social Post</CardTitle>
        <CardDescription>
          Share your music events and announcements across platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue='content'
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-5'>
            <TabsTrigger value='content'>Content</TabsTrigger>
            <TabsTrigger value='media'>Media</TabsTrigger>
            <TabsTrigger value='platforms'>Platforms</TabsTrigger>
            <TabsTrigger value='customize'>Customize</TabsTrigger>
            <TabsTrigger value='schedule'>Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value='content'>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='post-type'>Post Type</Label>
                <Select
                  onValueChange={handlePostTypeChange}
                  value={postType}
                >
                  <SelectTrigger id='post-type'>
                    <SelectValue placeholder='Select post type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='single-event'>Single Event</SelectItem>
                    <SelectItem value='upcoming-events'>
                      Upcoming Events
                    </SelectItem>
                    <SelectItem value='announcement'>Announcement</SelectItem>
                    <SelectItem value='new-release'>New Release</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {postType === "single-event" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        "w-full justify-between",
                        !selectedEvent && "text-muted-foreground"
                      )}
                    >
                      {selectedEvent ? selectedEvent.name : "Select event"}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search events...' />
                      <CommandEmpty>No event found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {mockEvents.map((event) => (
                            <CommandItem
                              key={event.id}
                              onSelect={() => handleEventSelect(event)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedEvent?.id === event.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {event.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}

              {postType === "upcoming-events" && (
                <div className='flex flex-col space-y-2'>
                  <Label>Select Date Range</Label>
                  <div className='grid gap-2'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id='date'
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto p-0'
                        align='start'
                      >
                        <Calendar
                          initialFocus
                          mode='range'
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={handleDateRangeSelect}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor='post-content'>Post Content</Label>
                <Textarea
                  id='post-content'
                  placeholder="What's happening in the music scene?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className='min-h-[100px]'
                />
              </div>

              <div className='flex space-x-2'>
                <Button
                  onClick={() => handleHashtagAdd(prompt("Enter hashtag:"))}
                >
                  <Tag className='mr-2 h-4 w-4' /> Add Hashtag
                </Button>
                <Button
                  onClick={() => handleMentionAdd(prompt("Enter mention:"))}
                >
                  <AlertCircle className='mr-2 h-4 w-4' /> Add Mention
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded'
                  >
                    #{tag}
                  </span>
                ))}
                {mentions.map((mention, index) => (
                  <span
                    key={index}
                    className='bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded'
                  >
                    {mention}
                  </span>
                ))}
              </div>
              <div>
                <Label>Suggested Hashtags</Label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {suggestedHashtags.map((tag, index) => (
                    <Button
                      key={index}
                      variant='outline'
                      size='sm'
                      onClick={() => handleHashtagAdd(tag)}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Suggested Mentions</Label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {suggestedMentions.map((mention, index) => (
                    <Button
                      key={index}
                      variant='outline'
                      size='sm'
                      onClick={() => handleMentionAdd(mention)}
                    >
                      {mention}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='media'>
            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-4'>
                {selectedMedia.map((media, index) => (
                  <div
                    key={index}
                    className='relative aspect-square bg-gray-100 rounded-md overflow-hidden'
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.preview}
                        alt={`Uploaded media ${index + 1}`}
                        className='object-cover w-full h-full'
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className='object-cover w-full h-full'
                      />
                    )}
                    <Button
                      variant='destructive'
                      size='icon'
                      className='absolute top-2 right-2'
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <AlertCircle className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
                <label className='flex items-center justify-center aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors'>
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleMediaUpload}
                    multiple
                    accept='image/*,video/*'
                  />
                  <div className='text-center'>
                    <ImageIcon className='mx-auto h-8 w-8 text-gray-400' />
                    <span className='mt-2 block text-sm font-medium text-gray-900'>
                      Add Media
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='platforms'>
            <div className='space-y-4'>
              <Label>Select Platforms</Label>
              <div className='flex flex-wrap gap-2'>
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={
                      selectedPlatforms.includes(platform.id)
                        ? "default"
                        : "outline"
                    }
                    className='flex items-center space-x-2'
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className='w-5 h-5'
                    />
                    <span>{platform.name}</span>
                    {!platform.hasIntegration && (
                      <span className='text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full'>
                        Manual Post
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              {selectedPlatforms.map((platformId) => {
                const platform = socialPlatforms.find(
                  (p) => p.id === platformId
                );
                return (
                  <div
                    key={platformId}
                    className='space-y-2'
                  >
                    <Label htmlFor={`platform-content-${platformId}`}>
                      {platform.name} Specific Content (Optional)
                    </Label>
                    <Textarea
                      id={`platform-content-${platformId}`}
                      placeholder={`Customize your post for ${platform.name}...`}
                      value={platformSpecificContent[platformId] || ""}
                      onChange={(e) =>
                        handlePlatformSpecificContentChange(
                          platformId,
                          e.target.value
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value='customize'>
            <div className='space-y-4'>
              <div>
                <Label>Font Style</Label>
                <Select
                  onValueChange={(value) =>
                    handleCustomizationChange("font", value)
                  }
                  value={customization.font}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Choose a font' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='default'>Default</SelectItem>
                    <SelectItem value='serif'>Serif</SelectItem>
                    <SelectItem value='monospace'>Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Color Theme</Label>
                <Input
                  type='color'
                  value={customization.color}
                  onChange={(e) =>
                    handleCustomizationChange("color", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Layout</Label>
                <RadioGroup
                  value={customization.layout}
                  onValueChange={(value) =>
                    handleCustomizationChange("layout", value)
                  }
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='standard'
                      id='r1'
                    />
                    <Label htmlFor='r1'>Standard</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='compact'
                      id='r2'
                    />
                    <Label htmlFor='r2'>Compact</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='featured'
                      id='r3'
                    />
                    <Label htmlFor='r3'>Featured</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='schedule'>
            <div className='space-y-4'>
              <RadioGroup
                value={scheduleType}
                onValueChange={handleScheduleTypeChange}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='now'
                    id='schedule-now'
                  />
                  <Label htmlFor='schedule-now'>Post now</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='later'
                    id='schedule-later'
                  />
                  <Label htmlFor='schedule-later'>Schedule for later</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='recurring'
                    id='schedule-recurring'
                  />
                  <Label htmlFor='schedule-recurring'>
                    Set up recurring post
                  </Label>
                </div>
              </RadioGroup>

              {scheduleType !== "now" && (
                <>
                  <div className='flex flex-col space-y-2'>
                    <Label htmlFor='schedule-date'>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduleDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {scheduleDate ? (
                            format(scheduleDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={scheduleDate}
                          onSelect={handleScheduleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className='flex flex-col space-y-2'>
                    <Label htmlFor='schedule-time'>Time</Label>
                    <div className='flex items-center'>
                      <Clock className='mr-2 h-4 w-4' />
                      <Input
                        type='time'
                        id='schedule-time'
                        value={scheduleTime}
                        onChange={handleScheduleTimeChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {scheduleType === "recurring" && (
                <>
                  <div className='flex flex-col space-y-2'>
                    <Label htmlFor='recurring-frequency'>Frequency</Label>
                    <Select
                      onValueChange={handleRecurringFrequencyChange}
                      value={recurringFrequency}
                    >
                      <SelectTrigger id='recurring-frequency'>
                        <SelectValue placeholder='Select frequency' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='daily'>Daily</SelectItem>
                        <SelectItem value='weekly'>Weekly</SelectItem>
                        <SelectItem value='monthly'>Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='flex flex-col space-y-2'>
                    <Label htmlFor='recurring-end-date'>
                      End Date (Optional)
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !recurringEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {recurringEndDate ? (
                            format(recurringEndDate, "PPP")
                          ) : (
                            <span>Pick an end date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={recurringEndDate}
                          onSelect={handleRecurringEndDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          // onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {scheduleType === "now" ? "Post Now" : "Schedule Post"}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>
                {scheduleType === "now" ? "Confirm Post" : "Confirm Schedule"}
              </DialogTitle>
            </DialogHeader>
            <div className='mt-4'>
              <div
                className='bg-white rounded-lg shadow p-4'
                style={{
                  fontFamily: customization.font,
                  color: customization.color,
                }}
              >
                <div className='flex items-center mb-4'>
                  <Avatar>
                    <AvatarImage
                      src={userProfile.avatar}
                      alt={userProfile.name}
                    />
                    <AvatarFallback>
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-2'>
                    <div className='font-bold'>{userProfile.name}</div>
                    <div className='text-sm text-gray-500'>
                      {userProfile.username}
                    </div>
                  </div>
                </div>
                <p className='mb-2'>{postContent}</p>
                {selectedMedia.length > 0 && (
                  <div className='grid grid-cols-2 gap-2 mb-2'>
                    {selectedMedia.slice(0, 4).map((media, index) =>
                      media.type === "image" ? (
                        <img
                          key={index}
                          src={media.preview}
                          alt={`Preview ${index + 1}`}
                          className='rounded'
                        />
                      ) : (
                        <video
                          key={index}
                          src={media.preview}
                          className='rounded'
                          controls
                        />
                      )
                    )}
                  </div>
                )}
                <div className='flex flex-wrap gap-1 mt-2'>
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className='text-blue-500'
                    >
                      #{tag}
                    </span>
                  ))}
                  {mentions.map((mention, index) => (
                    <span
                      key={index}
                      className='text-purple-500'
                    >
                      {mention}
                    </span>
                  ))}
                </div>
              </div>
              {scheduleType !== "now" && (
                <div className='mt-4'>
                  <p className='text-sm font-medium'>
                    Scheduled for:{" "}
                    {format(
                      new Date(
                        `${format(scheduleDate, "yyyy-MM-dd")}T${scheduleTime}`
                      ),
                      "PPP 'at' p"
                    )}
                  </p>
                  {scheduleType === "recurring" && (
                    <p className='text-sm font-medium mt-2'>
                      Recurring: {recurringFrequency}
                      {recurringEndDate &&
                        `, until ${format(recurringEndDate, "PPP")}`}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className='mt-4 flex justify-end space-x-2'>
              <Button
                variant='outline'
                // onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button onClick={handlePostSubmit}>
                {scheduleType === "now" ? "Post Now" : "Schedule"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
