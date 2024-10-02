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
  Heart,
  ChevronUp,
  ChevronDown,
  Settings,
  Share2,
  Coffee,
  List,
  PlusCircle,
  ThumbsUp,
  Mic2,
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
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";

export default function PerformerLiveInterface() {
  const { toast } = useToast();
  const [currentSong, setCurrentSong] = useState({
    title: "Piano Man",
    startTime: new Date(),
  });
  const [setlist, setSetlist] = useState([
    "Piano Man",
    "Tiny Dancer",
    "Your Song",
    "New York State of Mind",
  ]);
  const [songRequests, setSongRequests] = useState([
    { song: "Bohemian Rhapsody", votes: 15 },
    { song: "Wonderwall", votes: 8 },
    { song: "Sweet Caroline", votes: 12 },
  ]);
  const [audienceFeedback, setAudienceFeedback] = useState([
    {
      id: 1,
      type: "reaction",
      content: "❤️",
      timestamp: new Date(),
      responded: false,
    },
    {
      id: 2,
      type: "comment",
      content: "Loving the vibe!",
      timestamp: new Date(),
      responded: false,
    },
    {
      id: 3,
      type: "tip",
      content: "$5",
      timestamp: new Date(),
      responded: false,
    },
  ]);
  const [performanceStats, setPerformanceStats] = useState({
    duration: 0,
    audienceCount: 87,
    tipsReceived: 75,
    energyLevel: 80,
  });
  const [showSetlistDialog, setShowSetlistDialog] = useState(false);
  const [newSetlistItem, setNewSetlistItem] = useState("");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(0);
  const [showBreakDialog, setShowBreakDialog] = useState(false);
  const [performanceStatus, setPerformanceStatus] = useState<
    "live" | "break" | "extended"
  >("live");
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOnBreak) {
        setPerformanceStats((prev) => ({
          ...prev,
          duration: prev.duration + 1,
          audienceCount: Math.min(
            200,
            prev.audienceCount + Math.floor(Math.random() * 2)
          ),
          tipsReceived: prev.tipsReceived + Math.floor(Math.random() * 5),
          energyLevel: Math.max(
            0,
            Math.min(100, prev.energyLevel + (Math.random() - 0.5) * 5)
          ),
        }));
      } else {
        setBreakTimeRemaining((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setIsOnBreak(false);
            setPerformanceStatus("extended");
            toast({
              title: "Break ended",
              description:
                "Your break has ended. The performance is now in extended time.",
            });
            return 0;
          }
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOnBreak, toast]);

  const handleSongComplete = () => {
    const nextSong = setlist[1] || "End of setlist";
    setCurrentSong({ title: nextSong, startTime: new Date() });
    setSetlist((prev) => {
      const newSetlist = [...prev];
      newSetlist.shift();
      return newSetlist;
    });
    toast({
      title: "Song completed",
      description: `Now playing: ${nextSong}`,
    });
  };

  const handleAddToSetlist = () => {
    if (newSetlistItem.trim()) {
      setSetlist((prev) => [...prev, newSetlistItem.trim()]);
      setNewSetlistItem("");
      toast({
        title: "Song added to setlist",
        description: `${newSetlistItem} has been added to your setlist.`,
      });
    }
  };

  const handleRemoveFromSetlist = (index: number) => {
    setSetlist((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "Song removed from setlist",
      description: "The selected song has been removed from your setlist.",
    });
  };

  const handleMoveSetlistItem = (index: number, direction: "up" | "down") => {
    setSetlist((prev) => {
      const newSetlist = [...prev];
      const item = newSetlist[index];
      newSetlist.splice(index, 1);
      newSetlist.splice(direction === "up" ? index - 1 : index + 1, 0, item);
      return newSetlist;
    });
  };

  const handleAddRequestToSetlist = (song: string) => {
    setSetlist((prev) => [...prev, song]);
    setSongRequests((prev) => prev.filter((request) => request.song !== song));
    toast({
      title: "Request added to setlist",
      description: `${song} has been added to your setlist.`,
    });
  };

  const handleStartBreak = () => {
    setIsOnBreak(true);
    setBreakTimeRemaining(breakDuration * 60);
    setPerformanceStatus("break");
    setShowBreakDialog(false);
    toast({
      title: "Break started",
      description: `You're now on a ${breakDuration}-minute break.`,
    });
  };

  const handleEndBreak = () => {
    setIsOnBreak(false);
    setBreakTimeRemaining(0);
    setPerformanceStatus("extended");
    toast({
      title: "Break ended",
      description:
        "You've ended your break early. The performance is now in extended time.",
    });
  };

  const handleOpenResponseDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setShowResponseDialog(true);
  };

  const handleSendResponse = () => {
    if (responseMessage.trim()) {
      setAudienceFeedback((prev) =>
        prev.map((item) =>
          item.id === selectedFeedback.id ? { ...item, responded: true } : item
        )
      );
      setShowResponseDialog(false);
      setResponseMessage("");
      toast({
        title: "Response sent",
        description: "Your response has been sent to the audience member.",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const formatBreakTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <header className='p-4 bg-primary text-primary-foreground sticky top-0 z-10'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
          <h1 className='text-xl font-bold'>Live Performance</h1>
          <div className='flex items-center gap-2'>
            <Badge
              variant={
                performanceStatus === "live"
                  ? "default"
                  : performanceStatus === "break"
                    ? "secondary"
                    : "destructive"
              }
              className='font-semibold'
            >
              {performanceStatus === "live"
                ? "LIVE"
                : performanceStatus === "break"
                  ? "ON BREAK"
                  : "EXTENDED"}
            </Badge>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setShowSetlistDialog(true)}
            >
              <Music className='h-5 w-5' />
            </Button>
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
          defaultValue='performance'
          className='h-full'
        >
          <TabsList className='grid w-full grid-cols-4 sticky top-[72px] bg-background z-10 mb-4'>
            <TabsTrigger value='performance'>Performance</TabsTrigger>
            <TabsTrigger value='audience'>Audience</TabsTrigger>
            <TabsTrigger value='requests'>Requests</TabsTrigger>
            <TabsTrigger value='stats'>Stats</TabsTrigger>
          </TabsList>

          <TabsContent
            value='performance'
            className='space-y-4'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Card className='col-span-1 md:col-span-2'>
                <CardHeader>
                  <CardTitle>Current Performance</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {isOnBreak ? (
                    <div className='text-center'>
                      <h3 className='text-2xl font-bold mb-2'>On Break</h3>
                      <div className='text-4xl font-bold mb-4'>
                        {formatBreakTime(breakTimeRemaining)}
                      </div>
                      <Button
                        size='lg'
                        onClick={handleEndBreak}
                      >
                        End Break Early
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-2xl font-bold'>
                          Now Playing: {currentSong.title}
                        </h3>
                        <Badge variant='outline'>
                          {formatDuration(
                            Math.floor(
                              (new Date().getTime() -
                                currentSong.startTime.getTime()) /
                                1000
                            )
                          )}
                        </Badge>
                      </div>
                      <Button
                        className='w-full'
                        onClick={handleSongComplete}
                      >
                        Song Complete
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Songs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-[200px] w-full rounded-md border p-2'>
                    {setlist.slice(1).map((song, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between py-2 border-b last:border-b-0'
                      >
                        <span>
                          {index + 1}. {song}
                        </span>
                        <div className='flex items-center gap-1'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              handleMoveSetlistItem(index + 1, "up")
                            }
                            disabled={index === 0}
                          >
                            <ChevronUp className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              handleMoveSetlistItem(index + 1, "down")
                            }
                            disabled={index === setlist.length - 2}
                          >
                            <ChevronDown className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className='flex items-center mt-2'>
                    <Input
                      placeholder='Add new song'
                      value={newSetlistItem}
                      onChange={(e) => setNewSetlistItem(e.target.value)}
                      className='flex-grow mr-2'
                    />
                    <Button onClick={handleAddToSetlist}>
                      <PlusCircle className='h-4 w-4 mr-2' />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Button
                    className='w-full'
                    onClick={() => setShowBreakDialog(true)}
                  >
                    <Coffee className='mr-2 h-4 w-4' /> Take a Break
                  </Button>
                  <Button
                    className='w-full'
                    variant='outline'
                    onClick={() => setShowSetlistDialog(true)}
                  >
                    <List className='mr-2 h-4 w-4' /> Manage Full Setlist
                  </Button>
                  <Button
                    className='w-full'
                    variant='secondary'
                    onClick={() =>
                      toast({
                        title: "Announcement made",
                        description:
                          "Your message has been sent to all audience members.",
                      })
                    }
                  >
                    <Mic2 className='mr-2 h-4 w-4' /> Make Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value='audience'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Audience Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {audienceFeedback.map((feedback, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 py-2 border-b last:border-b-0'
                    >
                      {feedback.type === "reaction" && (
                        <Heart className='h-5 w-5 text-red-500' />
                      )}
                      {feedback.type === "comment" && (
                        <MessageSquare className='h-5 w-5 text-blue-500' />
                      )}
                      {feedback.type === "tip" && (
                        <AlertCircle className='h-5 w-5 text-green-500' />
                      )}
                      <span>{feedback.content}</span>
                      <span className='text-xs text-muted-foreground ml-auto'>
                        {feedback.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {!feedback.responded && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleOpenResponseDialog(feedback)}
                        >
                          Respond
                        </Button>
                      )}
                      {feedback.responded && (
                        <Badge variant='secondary'>Responded</Badge>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='requests'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Song Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                  {songRequests
                    .sort((a, b) => b.votes - a.votes)
                    .map((request, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center py-2 border-b last:border-b-0'
                      >
                        <span className='font-medium'>{request.song}</span>
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary'>
                            {request.votes} votes
                          </Badge>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              handleAddRequestToSetlist(request.song)
                            }
                          >
                            Add to Setlist
                          </Button>
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='stats'
            className='space-y-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Performance Statistics</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Duration:</span>
                  <div className='flex items-center'>
                    <Clock className='h-5 w-5 mr-2' />
                    <span>{formatDuration(performanceStats.duration)}</span>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Audience Count:</span>
                  <div className='flex items-center'>
                    <Users className='h-5 w-5 mr-2' />
                    <span>{performanceStats.audienceCount}</span>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Tips Received:</span>
                  <div className='flex items-center'>
                    <AlertCircle className='h-5 w-5 mr-2' />
                    <span>${performanceStats.tipsReceived}</span>
                  </div>
                </div>
                <div>
                  <span className='font-semibold'>Audience Energy Level:</span>
                  <div className='flex items-center gap-2 mt-1'>
                    <Progress
                      value={performanceStats.energyLevel}
                      className='flex-grow'
                    />
                    <span>{performanceStats.energyLevel}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={showSetlistDialog}
        onOpenChange={setShowSetlistDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Manage Setlist</DialogTitle>
            <DialogDescription>
              Add, remove, or reorder songs in your setlist.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <ScrollArea className='h-[200px] w-full rounded-md border p-4'>
              {setlist.map((song, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center py-2 border-b last:border-b-0'
                >
                  <span>{song}</span>
                  <div className='flex items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleMoveSetlistItem(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleMoveSetlistItem(index, "down")}
                      disabled={index === setlist.length - 1}
                    >
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleRemoveFromSetlist(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className='flex gap-2'>
              <Input
                placeholder='Add new song'
                value={newSetlistItem}
                onChange={(e) => setNewSetlistItem(e.target.value)}
              />
              <Button onClick={handleAddToSetlist}>Add</Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowSetlistDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Performance Settings</DialogTitle>
            <DialogDescription>
              Adjust your performance settings here.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label>Share Performance</Label>
              <Button
                className='w-full'
                variant='outline'
                onClick={() => {
                  toast({
                    title: "Share link copied",
                    description:
                      "The link to your performance has been copied to your clipboard.",
                  });
                }}
              >
                <Share2 className='h-4 w-4 mr-2' />
                Copy Share Link
              </Button>
            </div>
            <div className='space-y-2'>
              <Label>End Performance</Label>
              <Button
                className='w-full'
                variant='destructive'
                onClick={() => {
                  setShowSettingsDialog(false);
                  toast({
                    title: "Performance ended",
                    description:
                      "Your performance has been ended. Thank you for using LMX!",
                  });
                }}
              >
                End Performance
              </Button>
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

      <Dialog
        open={showBreakDialog}
        onOpenChange={setShowBreakDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Take a Break</DialogTitle>
            <DialogDescription>
              Set the duration for your break.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <RadioGroup
              defaultValue='5'
              onValueChange={(value) => setBreakDuration(parseInt(value))}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='5'
                  id='r1'
                />
                <Label htmlFor='r1'>5 minutes</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='10'
                  id='r2'
                />
                <Label htmlFor='r2'>10 minutes</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='15'
                  id='r3'
                />
                <Label htmlFor='r3'>15 minutes</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowBreakDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStartBreak}>Start Break</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showResponseDialog}
        onOpenChange={setShowResponseDialog}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Respond to Audience</DialogTitle>
            <DialogDescription>
              Send a response to the audience member.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='p-4 bg-muted rounded-md'>
              <p className='font-semibold'>Original message:</p>
              <p>{selectedFeedback?.content}</p>
            </div>
            <Textarea
              placeholder='Type your response here...'
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowResponseDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendResponse}>Send Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
