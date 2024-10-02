"use client";

import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";

import { useToast } from "@repo/ui/hooks/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Badge } from "@repo/ui/components/badge";
import { Progress } from "@repo/ui/components/progress";
import { Slider } from "@repo/ui/components/slider";
import { Switch } from "@repo/ui/components/switch";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  AlertCircle,
  Heart,
  Music,
  Send,
  ThumbsUp,
  Wallet,
  Volume2,
  Mic,
  Share2,
  Search,
  ChevronUp,
  Camera,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";

export default function FanLiveInterface() {
  const { toast } = useToast();
  const [performer, setPerformer] = useState({
    name: "Alex Harmony",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Versatile pianist with a repertoire spanning classical to contemporary pop.",
  });
  const [currentSong, setCurrentSong] = useState({
    title: "Piano Man",
    progress: 0,
  });
  const [setlist, setSetlist] = useState([
    "Piano Man",
    "Tiny Dancer",
    "Your Song",
    "New York State of Mind",
  ]);
  const [comments, setComments] = useState([
    {
      user: "Fan1",
      text: "Loving the vibe!",
      timestamp: new Date(),
      likes: 5,
      reactions: ["👏", "🎵"],
    },
    {
      user: "Fan2",
      text: "Can you play some Elton John?",
      timestamp: new Date(),
      likes: 3,
      reactions: ["🎹"],
    },
  ]);
  const [songRequests, setSongRequests] = useState([
    { song: "Bohemian Rhapsody", votes: 3 },
    { song: "Wonderwall", votes: 2 },
  ]);
  const [venueAlerts, setVenueAlerts] = useState([
    { message: "Happy Hour starts in 30 minutes!", timestamp: new Date() },
    {
      message: "Please remember to keep the exit areas clear.",
      timestamp: new Date(),
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRequest, setNewRequest] = useState("");
  const [volume, setVolume] = useState(50);
  const [isLiveAudioEnabled, setIsLiveAudioEnabled] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(65);
  const [repertoire, setRepertoire] = useState([
    "Piano Man",
    "Tiny Dancer",
    "Your Song",
    "New York State of Mind",
    "Bohemian Rhapsody",
    "Wonderwall",
    "Imagine",
    "Let It Be",
    "Hotel California",
    "Sweet Caroline",
    "Don't Stop Believin'",
    "Uptown Funk",
    "Shape of You",
    "Hallelujah",
    "Shallow",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userPoints, setUserPoints] = useState(100);
  const [showMomentCapture, setShowMomentCapture] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSong((prev) => ({
        ...prev,
        progress: (prev.progress + 1) % 100,
      }));
      setNoiseLevel((prev) =>
        Math.max(40, Math.min(90, prev + (Math.random() - 0.5) * 10))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: "You",
          text: newComment,
          timestamp: new Date(),
          likes: 0,
          reactions: [],
        },
      ]);
      setNewComment("");
      setUserPoints((prev) => prev + 5);
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the live chat. +5 points!",
      });
    }
  };

  const handleSongRequest = (song) => {
    const existingRequest = songRequests.find(
      (request) => request.song === song
    );
    if (existingRequest) {
      setSongRequests(
        songRequests.map((request) =>
          request.song === song
            ? { ...request, votes: request.votes + 1 }
            : request
        )
      );
    } else {
      setSongRequests([...songRequests, { song, votes: 1 }]);
    }
    setNewRequest("");
    setUserPoints((prev) => prev + 10);
    toast({
      title: "Song requested",
      description: `Your request for "${song}" has been submitted. +10 points!`,
    });
  };

  const handleTip = (amount) => {
    setUserPoints((prev) => prev + amount * 2);
    toast({
      title: "Tip sent",
      description: `$${amount} tip sent to ${performer.name}! +${amount * 2} points!`,
    });
  };

  const handleMessageToPerformer = (message) => {
    setUserPoints((prev) => prev + 15);
    toast({
      title: "Message sent",
      description: "Your message has been sent to the performer. +15 points!",
    });
  };

  const handleLikeComment = (index) => {
    const newComments = [...comments];
    newComments[index].likes += 1;
    setComments(newComments);
    setUserPoints((prev) => prev + 2);
    toast({
      title: "Comment liked",
      description: "You liked a comment. +2 points!",
    });
  };

  const handleReactToComment = (index, reaction) => {
    const newComments = [...comments];
    if (!newComments[index].reactions.includes(reaction)) {
      newComments[index].reactions.push(reaction);
      setComments(newComments);
      setUserPoints((prev) => prev + 3);
      toast({
        title: "Reaction added",
        description: `You reacted to a comment with ${reaction}. +3 points!`,
      });
    }
  };

  const handleUpvoteRequest = (index) => {
    const newRequests = [...songRequests];
    newRequests[index].votes += 1;
    setSongRequests(newRequests);
    setUserPoints((prev) => prev + 5);
    toast({
      title: "Request upvoted",
      description: "You upvoted a song request. +5 points!",
    });
  };

  const handleCaptureMoment = () => {
    setShowMomentCapture(true);
    setUserPoints((prev) => prev + 20);
    toast({
      title: "Moment captured",
      description: "You captured a special moment from the event. +20 points!",
    });
  };

  const filteredRepertoire = repertoire.filter((song) =>
    song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <header className='p-4 bg-primary text-primary-foreground sticky top-0 z-10'>
        <div className='flex justify-between items-center max-w-4xl mx-auto'>
          <h1 className='text-xl font-bold'>Live at The Melody Bar</h1>
          <div className='flex items-center gap-2'>
            <Badge
              variant='secondary'
              className='font-semibold'
            >
              {userPoints} pts
            </Badge>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleCaptureMoment}
            >
              <Camera className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
            >
              <Share2 className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-grow max-w-4xl mx-auto w-full px-4 pb-4'>
        <Tabs
          defaultValue='performer'
          className='h-full'
        >
          <TabsList className='grid w-full grid-cols-4 sticky top-[72px] bg-background z-10 mb-4'>
            <TabsTrigger value='performer'>Stage</TabsTrigger>
            <TabsTrigger value='interact'>Chat</TabsTrigger>
            <TabsTrigger value='requests'>Requests</TabsTrigger>
            <TabsTrigger value='venue'>Venue</TabsTrigger>
          </TabsList>

          <TabsContent
            value='performer'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <div className='flex items-center gap-4'>
                  <Avatar className='w-16 h-16'>
                    <AvatarImage
                      src={performer.image}
                      alt={performer.name}
                    />
                    <AvatarFallback>{performer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className='text-2xl'>{performer.name}</CardTitle>
                    <CardDescription className='text-sm'>
                      {performer.bio}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Now Playing</h3>
                  <div className='flex items-center gap-2 mb-2'>
                    <Music className='h-5 w-5 text-primary' />
                    <span className='font-medium'>{currentSong.title}</span>
                  </div>
                  <Progress
                    value={currentSong.progress}
                    className='h-2'
                  />
                </div>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold'>Live Audio</h3>
                    <Switch
                      checked={isLiveAudioEnabled}
                      onCheckedChange={setIsLiveAudioEnabled}
                      aria-label='Toggle live audio'
                    />
                  </div>
                  {isLiveAudioEnabled && (
                    <div className='flex items-center gap-2'>
                      <Volume2 className='h-5 w-5 flex-shrink-0' />
                      <Slider
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                        max={100}
                        step={1}
                        className='flex-grow'
                      />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Upcoming in Setlist
                  </h3>
                  <ul className='space-y-2'>
                    {setlist.slice(1).map((song, index) => (
                      <li
                        key={index}
                        className='flex items-center gap-2'
                      >
                        <Badge
                          variant='outline'
                          className='text-xs'
                        >
                          {index + 1}
                        </Badge>
                        {song}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='interact'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Live Chat & Reactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] pr-4'>
                  <div className='space-y-4'>
                    {comments.map((comment, index) => (
                      <div
                        key={index}
                        className='bg-muted p-3 rounded-lg'
                      >
                        <div className='flex justify-between items-start mb-1'>
                          <span className='font-bold'>{comment.user}</span>
                          <span className='text-xs text-muted-foreground'>
                            {comment.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className='mb-2'>{comment.text}</p>
                        <div className='flex items-center gap-2 flex-wrap'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-muted-foreground hover:text-primary'
                            onClick={() => handleLikeComment(index)}
                          >
                            <ThumbsUp className='h-4 w-4 mr-1' />
                            {comment.likes}
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                              >
                                😀 React
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-1'>
                              <div className='flex gap-1'>
                                {["👏", "❤️", "😂", "🎵", "🔥"].map(
                                  (reaction) => (
                                    <Button
                                      key={reaction}
                                      variant='ghost'
                                      size='sm'
                                      onClick={() =>
                                        handleReactToComment(index, reaction)
                                      }
                                    >
                                      {reaction}
                                    </Button>
                                  )
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                          {comment.reactions.length > 0 && (
                            <div className='flex gap-1 text-sm'>
                              {comment.reactions.map((reaction, i) => (
                                <span key={i}>{reaction}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleComment();
                  }}
                  className='flex gap-2 w-full'
                >
                  <Input
                    placeholder='Type your comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className='flex-grow'
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type='submit'
                          size='icon'
                          variant='secondary'
                        >
                          <Send className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value='requests'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Song Requests & Tips</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Top Requests</h3>
                  <ScrollArea className='h-[200px] pr-4'>
                    <div className='space-y-2'>
                      {songRequests
                        .sort((a, b) => b.votes - a.votes)
                        .map((request, index) => (
                          <div
                            key={index}
                            className='flex justify-between items-center p-2 bg-muted rounded-lg'
                          >
                            <span className='font-medium'>{request.song}</span>
                            <div className='flex items-center gap-2'>
                              <Badge variant='secondary'>
                                {request.votes} votes
                              </Badge>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => handleUpvoteRequest(index)}
                              >
                                <ChevronUp className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Request a Song</h3>
                  <Command className='rounded-lg border shadow-md'>
                    <CommandInput
                      placeholder='Search for a song...'
                      onValueChange={setSearchTerm}
                    />
                    <CommandList>
                      <CommandEmpty>No songs found.</CommandEmpty>
                      <CommandGroup heading='Available Songs'>
                        {filteredRepertoire.map((song) => (
                          <CommandItem
                            key={song}
                            onSelect={() => handleSongRequest(song)}
                          >
                            {song}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                  <p className='text-sm text-muted-foreground mt-2'>
                    Can't find the song you want?
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => handleSongRequest(searchTerm)}
                    >
                      Request a custom song
                    </Button>
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Tip the Performer
                  </h3>
                  <div className='grid grid-cols-2 gap-2'>
                    {[5, 10, 20, 50].map((amount) => (
                      <Button
                        key={amount}
                        variant='outline'
                        onClick={() => handleTip(amount)}
                        className='w-full'
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant='outline'
                    className='w-full mt-2'
                  >
                    <Wallet className='h-4 w-4 mr-2' />
                    Custom Amount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='venue'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Venue Information & Alerts</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Venue Alerts</h3>
                  <ScrollArea className='h-[200px] pr-4'>
                    <div className='space-y-2'>
                      {venueAlerts.map((alert, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-2 p-2 bg-muted rounded-lg'
                        >
                          <AlertCircle className='h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
                          <div>
                            <p>{alert.message}</p>
                            <p className='text-xs text-muted-foreground'>
                              {alert.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Noise Level</h3>
                  <div className='flex items-center gap-2'>
                    <Mic className='h-5 w-5 flex-shrink-0' />
                    <Progress
                      value={noiseLevel}
                      className='flex-grow'
                    />
                    <span className='text-sm font-medium w-12 text-right'>
                      {noiseLevel}dB
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Message the Performer
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleMessageToPerformer(e.target.message.value);
                    }}
                  >
                    <Textarea
                      name='message'
                      placeholder='Type your message...'
                      className='mb-2'
                    />
                    <Button
                      type='submit'
                      className='w-full'
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={showMomentCapture}
        onOpenChange={setShowMomentCapture}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Capture the Moment</DialogTitle>
            <DialogDescription>
              Take a photo or video to remember this special moment from the
              event.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-center items-center h-64 bg-muted rounded-lg'>
            <Camera className='h-12 w-12 text-muted-foreground' />
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowMomentCapture(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowMomentCapture(false);
                toast({
                  title: "Moment saved",
                  description:
                    "Your special moment has been captured and saved.",
                });
              }}
            >
              Save Moment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
