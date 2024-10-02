"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Plus,
  Edit,
  Trash,
  Share,
  Save,
  X,
  Search,
  Clock,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Upload,
  Download,
} from "@repo/ui/icons";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
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
import { Badge } from "@repo/ui/components/badge";
import { Progress } from "@repo/ui/components/progress";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { toast } from "@repo/ui/hooks/use-toast";

type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  key: string;
  notes: string;
  tags: string[];
};

type Setlist = {
  id: string;
  name: string;
  songs: Song[];
  event?: string;
  date?: string;
};

export default function EnhancedRepertoireManagement() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editingSetlist, setEditingSetlist] = useState<Setlist | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSetlist, setActiveSetlist] = useState<Setlist | null>(null);
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<Song[] | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedSongs = localStorage.getItem("songs");
    const storedSetlists = localStorage.getItem("setlists");
    if (storedSongs) setSongs(JSON.parse(storedSongs));
    if (storedSetlists) setSetlists(JSON.parse(storedSetlists));
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
    localStorage.setItem("setlists", JSON.stringify(setlists));
  }, [songs, setlists]);

  const addSong = (song: Song) => {
    setSongs([...songs, song]);
    toast({
      title: "Song added",
      description: `${song.title} has been added to your repertoire.`,
    });
  };

  const updateSong = (updatedSong: Song) => {
    setSongs(
      songs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
    );
    toast({
      title: "Song updated",
      description: `${updatedSong.title} has been updated.`,
    });
  };

  const deleteSong = (id: string) => {
    const songToDelete = songs.find((song) => song.id === id);
    setSongs(songs.filter((song) => song.id !== id));
    toast({
      title: "Song deleted",
      description: `${songToDelete?.title} has been removed from your repertoire.`,
    });
  };

  const addSetlist = (setlist: Setlist) => {
    setSetlists([...setlists, setlist]);
    toast({
      title: "Setlist created",
      description: `${setlist.name} has been added to your setlists.`,
    });
  };

  const updateSetlist = (updatedSetlist: Setlist) => {
    setSetlists(
      setlists.map((setlist) =>
        setlist.id === updatedSetlist.id ? updatedSetlist : setlist
      )
    );
    toast({
      title: "Setlist updated",
      description: `${updatedSetlist.name} has been updated.`,
    });
  };

  const deleteSetlist = (id: string) => {
    const setlistToDelete = setlists.find((setlist) => setlist.id === id);
    setSetlists(setlists.filter((setlist) => setlist.id !== id));
    toast({
      title: "Setlist deleted",
      description: `${setlistToDelete?.name} has been removed from your setlists.`,
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSetlists = [...setlists];
    const sourceSetlist = newSetlists.find(
      (setlist) => setlist.id === result.source.droppableId
    );
    const destSetlist = newSetlists.find(
      (setlist) => setlist.id === result.destination.droppableId
    );

    if (sourceSetlist && destSetlist) {
      const [reorderedSong] = sourceSetlist.songs.splice(
        result.source.index,
        1
      );
      destSetlist.songs.splice(result.destination.index, 0, reorderedSong);
      setSetlists(newSetlists);
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredSetlists = setlists.filter((setlist) =>
    setlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startPerformanceMode = (setlist: Setlist) => {
    setActiveSetlist(setlist);
    setIsPerformanceMode(true);
    setCurrentSongIndex(0);
    setElapsedTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const endPerformanceMode = () => {
    setIsPerformanceMode(false);
    setActiveSetlist(null);
    setCurrentSongIndex(0);
    setElapsedTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextSong = () => {
    if (activeSetlist && currentSongIndex < activeSetlist.songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Papa.parse(file, {
      //   complete: (results) => {
      //     const parsedSongs: Song[] = results.data.slice(1).map((row: any) => ({
      //       id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      //       title: row[0],
      //       artist: row[1],
      //       duration: row[2],
      //       key: row[3],
      //       notes: row[4],
      //       tags: row[5] ? row[5].split(',').map((tag: string) => tag.trim()) : [],
      //     }))
      //     setUploadedData(parsedSongs)
      //     setIsUploading(false)
      //   },
      //   header: true,
      //   error: (error) => {
      //     console.error('Error parsing CSV:', error)
      //     toast({ title: "Error", description: "Failed to parse the CSV file. Please check the format and try again.", variant: "destructive" })
      //     setIsUploading(false)
      //   }
      // })
    }
  };

  const confirmUpload = () => {
    if (uploadedData) {
      setSongs([...songs, ...uploadedData]);
      setUploadedData(null);
      toast({
        title: "Upload successful",
        description: `${uploadedData.length} songs have been added to your repertoire.`,
      });
    }
  };

  const cancelUpload = () => {
    setUploadedData(null);
  };

  const downloadTemplate = () => {
    const csvContent = "Title,Artist,Duration,Key,Notes,Tags\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "song_template.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportForScore = () => {
    // const forScoreData = songs.map(song => ({
    //   title: song.title,
    //   artist: song.artist,
    //   genre: song.tags.join(', '),
    //   key: song.key,
    //   duration: song.duration,
    //   notes: song.notes,
    // }))
    // const csvContent = Papa.unparse(forScoreData)
    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    // const link = document.createElement("a")
    // if (link.download !== undefined) {
    //   const url = URL.createObjectURL(blob)
    //   link.setAttribute("href", url)
    //   link.setAttribute("download", "forScore_export.csv")
    //   link.style.visibility = 'hidden'
    //   document.body.appendChild(link)
    //   link.click()
    //   document.body.removeChild(link)
    // }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPerformanceMode) {
        if (e.key === "ArrowRight") nextSong();
        if (e.key === "ArrowLeft") previousSong();
        if (e.key === "Escape") endPerformanceMode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPerformanceMode, currentSongIndex]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Repertoire Management</h1>
      {isPerformanceMode ? (
        <PerformanceMode
          setlist={activeSetlist!}
          currentSongIndex={currentSongIndex}
          elapsedTime={elapsedTime}
          onNext={nextSong}
          onPrevious={previousSong}
          onEnd={endPerformanceMode}
        />
      ) : (
        <>
          <div className='mb-4 flex items-center space-x-2'>
            <Input
              type='text'
              placeholder='Search songs, artists, or setlists...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='flex-grow'
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className='mr-2 h-4 w-4' /> Upload CSV
            </Button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept='.csv'
              style={{ display: "none" }}
            />
            <Button onClick={downloadTemplate}>
              <Download className='mr-2 h-4 w-4' /> Template
            </Button>
            <Button onClick={exportForScore}>
              <Download className='mr-2 h-4 w-4' /> Export for forScore
            </Button>
          </div>
          {isUploading && (
            <Alert className='mb-4'>
              <AlertTitle>Uploading...</AlertTitle>
              <AlertDescription>
                Please wait while we process your file.
              </AlertDescription>
            </Alert>
          )}
          {uploadedData && (
            <Alert className='mb-4'>
              <AlertTitle>Upload Preview</AlertTitle>
              <AlertDescription>
                {uploadedData.length} songs found in the CSV. Do you want to add
                these to your repertoire?
                <div className='mt-2'>
                  <Button
                    onClick={confirmUpload}
                    className='mr-2'
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={cancelUpload}
                    variant='outline'
                  >
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue='songs'>
            <TabsList className='mb-4'>
              <TabsTrigger value='songs'>Songs</TabsTrigger>
              <TabsTrigger value='setlists'>Setlists</TabsTrigger>
            </TabsList>
            <TabsContent value='songs'>
              <div className='mb-4'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className='mr-2 h-4 w-4' /> Add Song
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSong ? "Edit Song" : "Add New Song"}
                      </DialogTitle>
                    </DialogHeader>
                    <SongForm
                      song={editingSong}
                      onSave={(song) =>
                        editingSong ? updateSong(song) : addSong(song)
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onEdit={setEditingSong}
                    onDelete={deleteSong}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value='setlists'>
              <div className='mb-4'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className='mr-2 h-4 w-4' /> Create Setlist
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSetlist ? "Edit Setlist" : "Create New Setlist"}
                      </DialogTitle>
                    </DialogHeader>
                    <SetlistForm
                      setlist={editingSetlist}
                      songs={songs}
                      onSave={(setlist) =>
                        editingSetlist
                          ? updateSetlist(setlist)
                          : addSetlist(setlist)
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className='grid gap-4 md:grid-cols-2'>
                  {filteredSetlists.map((setlist) => (
                    <SetlistCard
                      key={setlist.id}
                      setlist={setlist}
                      onEdit={setEditingSetlist}
                      onDelete={deleteSetlist}
                      onShare={() => {
                        // Implement sharing functionality
                        toast({
                          title: "Sharing setlist",
                          description: `Sharing ${setlist.name}`,
                        });
                      }}
                      onStartPerformance={() => startPerformanceMode(setlist)}
                    />
                  ))}
                </div>
              </DragDropContext>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

function SongForm({
  song,
  onSave,
}: {
  song: Song | null;
  onSave: (song: Song) => void;
}) {
  const [formData, setFormData] = useState<Song>(
    song || {
      id: "",
      title: "",
      artist: "",
      duration: "",
      key: "",
      notes: "",
      tags: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || Date.now().toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <Input
        placeholder='Song Title'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Input
        placeholder='Artist'
        value={formData.artist}
        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
        required
      />
      <Input
        placeholder='Duration (e.g., 3:45)'
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
      />
      <Input
        placeholder='Key'
        value={formData.key}
        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
      />
      <Textarea
        placeholder='Notes'
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
      <Input
        placeholder='Tags (comma-separated)'
        value={formData.tags.join(", ")}
        onChange={(e) =>
          setFormData({
            ...formData,
            tags: e.target.value.split(",").map((tag) => tag.trim()),
          })
        }
      />
      <Button type='submit'>Save Song</Button>
    </form>
  );
}

function SongCard({
  song,
  onEdit,
  onDelete,
}: {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className='bg-card text-card-foreground rounded-lg shadow-md p-4'>
      <h3 className='text-lg font-semibold'>{song.title}</h3>
      <p className='text-sm text-muted-foreground'>{song.artist}</p>
      <div className='flex justify-between items-center mt-2'>
        <span className='text-sm'>{song.duration}</span>
        <span className='text-sm'>{song.key}</span>
      </div>
      <p className='text-sm mt-2'>{song.notes}</p>
      <div className='flex flex-wrap gap-2 mt-2'>
        {song.tags.map((tag, index) => (
          <Badge
            key={index}
            variant='secondary'
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className='flex justify-end space-x-2 mt-4'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => onEdit(song)}
        >
          <Edit className='h-4 w-4' />
        </Button>
        <Button
          size='sm'
          variant='outline'
          onClick={() => onDelete(song.id)}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

function SetlistForm({
  setlist,
  songs,
  onSave,
}: {
  setlist: Setlist | null;
  songs: Song[];
  onSave: (setlist: Setlist) => void;
}) {
  const [formData, setFormData] = useState<Setlist>(
    setlist || {
      id: "",
      name: "",
      songs: [],
      event: "",
      date: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || Date.now().toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <Input
        placeholder='Setlist Name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type='date'
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <Select
        value={formData.event}
        onValueChange={(value) => setFormData({ ...formData, event: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select an event (optional)' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='event1'>Event 1</SelectItem>
          <SelectItem value='event2'>Event 2</SelectItem>
          <SelectItem value='event3'>Event 3</SelectItem>
        </SelectContent>
      </Select>
      <div className='space-y-2'>
        <h4 className='text-sm font-medium'>Songs</h4>
        {formData.songs.map((song, index) => (
          <div
            key={song.id}
            className='flex items-center space-x-2'
          >
            <span>{index + 1}.</span>
            <span>{song.title}</span>
            <Button
              size='sm'
              variant='ghost'
              onClick={() =>
                setFormData({
                  ...formData,
                  songs: formData.songs.filter((s) => s.id !== song.id),
                })
              }
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
      <Select
        onValueChange={(value) =>
          setFormData({
            ...formData,
            songs: [...formData.songs, songs.find((s) => s.id === value)!],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder='Add a song' />
        </SelectTrigger>
        <SelectContent>
          {songs
            .filter((song) => !formData.songs.find((s) => s.id === song.id))
            .map((song) => (
              <SelectItem
                key={song.id}
                value={song.id}
              >
                {song.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button type='submit'>Save Setlist</Button>
    </form>
  );
}

function SetlistCard({
  setlist,
  onEdit,
  onDelete,
  onShare,
  onStartPerformance,
}: {
  setlist: Setlist;
  onEdit: (setlist: Setlist) => void;
  onDelete: (id: string) => void;
  onShare: () => void;
  onStartPerformance: () => void;
}) {
  const [showQR, setShowQR] = useState(false);

  return (
    <Droppable droppableId={setlist.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='bg-card text-card-foreground rounded-lg shadow-md p-4'
        >
          <h3 className='text-lg font-semibold'>{setlist.name}</h3>
          {setlist.event && (
            <p className='text-sm text-muted-foreground'>
              Event: {setlist.event}
            </p>
          )}
          {setlist.date && (
            <p className='text-sm text-muted-foreground'>
              Date: {setlist.date}
            </p>
          )}
          <ul className='mt-2 space-y-2'>
            {setlist.songs.map((song, index) => (
              <Draggable
                key={song.id}
                draggableId={song.id}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='bg-background p-2 rounded flex justify-between items-center'
                  >
                    <span>{song.title}</span>
                    <span className='text-sm text-muted-foreground'>
                      {song.duration}
                    </span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
          <div className='flex justify-end space-x-2 mt-4'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onEdit(setlist)}
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onDelete(setlist.id)}
            >
              <Trash className='h-4 w-4' />
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setShowQR(!showQR)}
            >
              <Share className='h-4 w-4' />
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={onStartPerformance}
            >
              <Clock className='h-4 w-4' />
            </Button>
          </div>
          {showQR && (
            <div className='mt-4'>
              {/* <QRCode value={`https://example.com/setlist/${setlist.id}`} size={128} /> */}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

function PerformanceMode({
  setlist,
  currentSongIndex,
  elapsedTime,
  onNext,
  onPrevious,
  onEnd,
}: {
  setlist: Setlist;
  currentSongIndex: number;
  elapsedTime: number;
  onNext: () => void;
  onPrevious: () => void;
  onEnd: () => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const currentSong = setlist.songs[currentSongIndex];
  const totalDuration = setlist.songs.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='fixed inset-0 bg-background flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-bold mb-4'>{setlist.name}</h2>
      <div className='text-4xl font-bold mb-2'>{currentSong.title}</div>
      <div className='text-xl mb-4'>{currentSong.artist}</div>
      <div className='text-lg mb-2'>Key: {currentSong.key}</div>
      <div className='w-full max-w-md mb-4'>
        <Progress value={(currentSongIndex / setlist.songs.length) * 100} />
      </div>
      <div className='text-lg mb-4'>
        {currentSongIndex + 1} / {setlist.songs.length}
      </div>
      <div className='text-xl mb-4'>
        {formatTime(elapsedTime)} / {formatTime(totalDuration)}
      </div>
      <div className='flex space-x-4 mb-4'>
        <Button
          onClick={onPrevious}
          disabled={currentSongIndex === 0}
        >
          <ChevronLeft className='h-6 w-6' />
        </Button>
        <Button
          onClick={onNext}
          disabled={currentSongIndex === setlist.songs.length - 1}
        >
          <ChevronRight className='h-6 w-6' />
        </Button>
      </div>
      <div className='flex space-x-4'>
        <Button onClick={onEnd}>End Performance</Button>
        <Button onClick={toggleFullscreen}>
          {isFullscreen ? (
            <Minimize2 className='h-6 w-6' />
          ) : (
            <Maximize2 className='h-6 w-6' />
          )}
        </Button>
      </div>
    </div>
  );
}
