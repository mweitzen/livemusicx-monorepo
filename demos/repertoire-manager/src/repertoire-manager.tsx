"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Plus,
  Edit,
  Trash,
  Search,
  Music,
  FileText,
  Upload,
  Download,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Tag,
  Key,
  Eye,
} from "@repo/ui/icons";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Dialog,
  DialogContent,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Badge } from "@repo/ui/components/badge";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@repo/ui/components/sheet";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Slider } from "@repo/ui/components/slider";
import { Switch } from "@repo/ui/components/switch";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";

type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  originalKey: string;
  performanceKey: string;
  notes: string;
  tags: string[];
  energy: number;
  previewUrl?: string;
  lyricsUrl?: string;
  leadSheetUrl?: string;
  sheetMusicUrl?: string;
};

type SortOption = "title" | "artist" | "duration" | "originalKey" | "energy";
type SortDirection = "asc" | "desc";

// Mock data for demonstration
const mockSongs: Song[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    originalKey: "Bb",
    performanceKey: "Bb",
    notes: "Epic rock ballad with multiple sections",
    tags: ["rock", "classic", "complex"],
    energy: 80,
    previewUrl: "https://example.com/bohemian-rhapsody.mp3",
    lyricsUrl: "https://example.com/bohemian-rhapsody-lyrics.pdf",
    leadSheetUrl: "https://example.com/bohemian-rhapsody-lead-sheet.pdf",
    sheetMusicUrl: "https://example.com/bohemian-rhapsody-sheet-music.pdf",
  },
  {
    id: "2",
    title: "Imagine",
    artist: "John Lennon",
    duration: "3:01",
    originalKey: "C",
    performanceKey: "C",
    notes: "Peaceful ballad about unity",
    tags: ["ballad", "classic", "piano"],
    energy: 40,
    previewUrl: "https://example.com/imagine.mp3",
    lyricsUrl: "https://example.com/imagine-lyrics.pdf",
    leadSheetUrl: "https://example.com/imagine-lead-sheet.pdf",
    sheetMusicUrl: "https://example.com/imagine-sheet-music.pdf",
  },
  {
    id: "3",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    duration: "4:30",
    originalKey: "D",
    performanceKey: "D",
    notes: "High-energy funk pop song",
    tags: ["funk", "pop", "dance"],
    energy: 95,
    previewUrl: "https://example.com/uptown-funk.mp3",
    lyricsUrl: "https://example.com/uptown-funk-lyrics.pdf",
    leadSheetUrl: "https://example.com/uptown-funk-lead-sheet.pdf",
    sheetMusicUrl: "https://example.com/uptown-funk-sheet-music.pdf",
  },
  // Add more mock songs here...
];

export default function AdvancedRepertoireManagement({
  onAddToSetlist,
}: {
  onAddToSetlist: (song: Song) => void;
}) {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [energyRange, setEnergyRange] = useState<[number, number]>([0, 100]);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [viewingSong, setViewingSong] = useState<Song | null>(null);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.tags.some(
            (tag) => selectedTags.length === 0 || selectedTags.includes(tag)
          )
      )
      .filter(
        (song) => song.energy >= energyRange[0] && song.energy <= energyRange[1]
      )
      .sort((a, b) => {
        if (sortOption === "duration") {
          const durationA = a.duration
            .split(":")
            .reduce((acc, time) => 60 * acc + +time, 0);
          const durationB = b.duration
            .split(":")
            .reduce((acc, time) => 60 * acc + +time, 0);
          return sortDirection === "asc"
            ? durationA - durationB
            : durationB - durationA;
        }
        if (sortOption === "energy") {
          return sortDirection === "asc"
            ? a.energy - b.energy
            : b.energy - a.energy;
        }
        const valueA = a[sortOption].toLowerCase();
        const valueB = b[sortOption].toLowerCase();
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
  }, [songs, searchTerm, selectedTags, sortOption, sortDirection, energyRange]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedSongs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  const playPreview = useCallback((song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.previewUrl || "";
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        toast({
          title: "Playback Error",
          description: "Unable to play audio preview.",
          variant: "destructive",
        });
      });
      setPlayingSongId(song.id);
    }
  }, []);

  const stopPreview = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingSongId(null);
    }
  }, []);

  const handleSort = useCallback(
    (option: SortOption) => {
      if (option === sortOption) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortOption(option);
        setSortDirection("asc");
      }
    },
    [sortOption]
  );

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleEnergyRangeChange = useCallback((newRange: [number, number]) => {
    setEnergyRange(newRange);
  }, []);

  const handleEditSong = useCallback((song: Song) => {
    setEditingSong({ ...song });
  }, []);

  const handleSaveSong = useCallback((updatedSong: Song) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
    );
    toast({
      title: "Song Updated",
      description: `${updatedSong.title} has been updated successfully.`,
    });
    setEditingSong(null);
  }, []);

  const handleDeleteSong = useCallback((songId: string) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
    toast({
      title: "Song Deleted",
      description: "The song has been removed from your repertoire.",
    });
  }, []);

  const handleImport = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");
        const newSongs: Song[] = lines.slice(1).map((line) => {
          const values = line.split(",");
          return {
            id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: values[headers.indexOf("title")],
            artist: values[headers.indexOf("artist")],
            duration: values[headers.indexOf("duration")],
            originalKey: values[headers.indexOf("originalKey")],
            performanceKey: values[headers.indexOf("performanceKey")],
            notes: values[headers.indexOf("notes")],
            tags: values[headers.indexOf("tags")].split(";"),
            energy: parseInt(values[headers.indexOf("energy")]),
            previewUrl: values[headers.indexOf("previewUrl")],
            lyricsUrl: values[headers.indexOf("lyricsUrl")],
            leadSheetUrl: values[headers.indexOf("leadSheetUrl")],
            sheetMusicUrl: values[headers.indexOf("sheetMusicUrl")],
          };
        });
        setSongs((prevSongs) => [...prevSongs, ...newSongs]);
        toast({
          title: "Import Successful",
          description: `${newSongs.length} songs have been imported successfully.`,
        });
      } catch (error) {
        console.error("Error importing songs:", error);
        toast({
          title: "Import Error",
          description:
            "There was an error importing the songs. Please check the file format.",
          variant: "destructive",
        });
      }
      setIsImporting(false);
    };
    reader.readAsText(file);
  }, []);

  const handleExport = useCallback(() => {
    const headers = [
      "title",
      "artist",
      "duration",
      "originalKey",
      "performanceKey",
      "notes",
      "tags",
      "energy",
      "previewUrl",
      "lyricsUrl",
      "leadSheetUrl",
      "sheetMusicUrl",
    ];
    const csvContent = [
      headers.join(","),
      ...songs.map((song) =>
        headers
          .map((header) =>
            header === "tags" ? song[header].join(";") : song[header]
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "repertoire_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    toast({
      title: "Export Successful",
      description: "Your repertoire has been exported as a CSV file.",
    });
  }, [songs]);

  const handleAddSong = useCallback((newSong: Song) => {
    setSongs((prevSongs) => [
      ...prevSongs,
      { ...newSong, id: `song-${Date.now()}` },
    ]);
    toast({
      title: "Song Added",
      description: `${newSong.title} has been added to your repertoire.`,
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "f":
            e.preventDefault();
            document.getElementById("search-input")?.focus();
            break;
          case "s":
            e.preventDefault();
            toast({
              title: "Repertoire Saved",
              description: "Your repertoire has been saved successfully.",
            });
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Repertoire Management</h1>

      <div className='flex flex-col lg:flex-row gap-4 mb-6'>
        <div className='flex-1'>
          <Input
            id='search-input'
            type='text'
            placeholder='Search songs...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full'
          />
        </div>
        <div className='flex gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                <Filter className='mr-2 h-4 w-4' />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium mb-2'>Tags</h4>
                  <ScrollArea className='h-32'>
                    {Array.from(
                      new Set(songs.flatMap((song) => song.tags))
                    ).map((tag) => (
                      <div
                        key={tag}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagSelect(tag)}
                        />
                        <label htmlFor={`tag-${tag}`}>{tag}</label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <h4 className='font-medium mb-2'>Energy Range</h4>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={energyRange}
                    onValueChange={handleEnergyRangeChange}
                  />
                  <div className='flex justify-between mt-2'>
                    <span>{energyRange[0]}</span>
                    <span>{energyRange[1]}</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Select
            value={sortOption}
            onValueChange={(value: SortOption) => handleSort(value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='title'>Title</SelectItem>
              <SelectItem value='artist'>Artist</SelectItem>
              <SelectItem value='duration'>Duration</SelectItem>
              <SelectItem value='originalKey'>Key</SelectItem>
              <SelectItem value='energy'>Energy</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant='outline'
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortDirection === "asc" ? (
              <SortAsc className='h-4 w-4' />
            ) : (
              <SortDesc className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>

      <div className='flex justify-between mb-4'>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Add Song
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Song</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newSong: Song = {
                    id: "",
                    title: formData.get("title") as string,
                    artist: formData.get("artist") as string,
                    duration: formData.get("duration") as string,
                    originalKey: formData.get("originalKey") as string,
                    performanceKey: formData.get("performanceKey") as string,
                    notes: formData.get("notes") as string,
                    tags: (formData.get("tags") as string)
                      .split(",")
                      .map((tag) => tag.trim()),
                    energy: parseInt(formData.get("energy") as string),
                    previewUrl: formData.get("previewUrl") as string,
                    lyricsUrl: formData.get("lyricsUrl") as string,
                    leadSheetUrl: formData.get("leadSheetUrl") as string,
                    sheetMusicUrl: formData.get("sheetMusicUrl") as string,
                  };
                  handleAddSong(newSong);
                }}
              >
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='title'
                      className='text-right'
                    >
                      Title
                    </Label>
                    <Input
                      id='title'
                      name='title'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='artist'
                      className='text-right'
                    >
                      Artist
                    </Label>
                    <Input
                      id='artist'
                      name='artist'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='duration'
                      className='text-right'
                    >
                      Duration
                    </Label>
                    <Input
                      id='duration'
                      name='duration'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='originalKey'
                      className='text-right'
                    >
                      Original Key
                    </Label>
                    <Input
                      id='originalKey'
                      name='originalKey'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='performanceKey'
                      className='text-right'
                    >
                      Performance Key
                    </Label>
                    <Input
                      id='performanceKey'
                      name='performanceKey'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='energy'
                      className='text-right'
                    >
                      Energy
                    </Label>
                    <Input
                      id='energy'
                      name='energy'
                      type='number'
                      min='0'
                      max='100'
                      className='col-span-3'
                      required
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='tags'
                      className='text-right'
                    >
                      Tags
                    </Label>
                    <Input
                      id='tags'
                      name='tags'
                      className='col-span-3'
                      placeholder='Separate tags with commas'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='notes'
                      className='text-right'
                    >
                      Notes
                    </Label>
                    <Textarea
                      id='notes'
                      name='notes'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='previewUrl'
                      className='text-right'
                    >
                      Preview URL
                    </Label>
                    <Input
                      id='previewUrl'
                      name='previewUrl'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='lyricsUrl'
                      className='text-right'
                    >
                      Lyrics URL
                    </Label>
                    <Input
                      id='lyricsUrl'
                      name='lyricsUrl'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='leadSheetUrl'
                      className='text-right'
                    >
                      Lead Sheet URL
                    </Label>
                    <Input
                      id='leadSheetUrl'
                      name='leadSheetUrl'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label
                      htmlFor='sheetMusicUrl'
                      className='text-right'
                    >
                      Sheet Music URL
                    </Label>
                    <Input
                      id='sheetMusicUrl'
                      name='sheetMusicUrl'
                      className='col-span-3'
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit'>Add Song</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className='flex gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={() => setIsImporting(true)}
                >
                  <Upload className='mr-2 h-4 w-4' />
                  Import
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import songs from CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={handleExport}
                >
                  <Download className='mr-2 h-4 w-4' />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export repertoire to CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Repertoire</CardTitle>
          <CardDescription>
            {filteredAndSortedSongs.length} songs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            className='h-[600px]'
            ref={parentRef}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const song = filteredAndSortedSongs[virtualRow.index];
                return (
                  <div
                    key={song.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className='flex items-center justify-between p-2 hover:bg-accent rounded-md'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex-1'>
                          <h3 className='font-medium'>{song.title}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {song.artist}
                          </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Badge>{song.performanceKey}</Badge>
                          <Badge variant='outline'>{song.duration}</Badge>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        {song.previewUrl && (
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() =>
                              playingSongId === song.id
                                ? stopPreview()
                                : playPreview(song)
                            }
                          >
                            {playingSongId === song.id ? (
                              <Pause className='h-4 w-4' />
                            ) : (
                              <Play className='h-4 w-4' />
                            )}
                          </Button>
                        )}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => setViewingSong(song)}
                              >
                                <Eye className='h-4 w-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View song details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => handleEditSong(song)}
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit song</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => onAddToSetlist(song)}
                              >
                                <Plus className='h-4 w-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to setlist</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog
        open={editingSong !== null}
        onOpenChange={(open) => !open && setEditingSong(null)}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
          </DialogHeader>
          {editingSong && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedSong: Song = {
                  ...editingSong,
                  title: formData.get("title") as string,
                  artist: formData.get("artist") as string,
                  duration: formData.get("duration") as string,
                  originalKey: formData.get("originalKey") as string,
                  performanceKey: formData.get("performanceKey") as string,
                  notes: formData.get("notes") as string,
                  tags: (formData.get("tags") as string)
                    .split(",")
                    .map((tag) => tag.trim()),
                  energy: parseInt(formData.get("energy") as string),
                  previewUrl: formData.get("previewUrl") as string,
                  lyricsUrl: formData.get("lyricsUrl") as string,
                  leadSheetUrl: formData.get("leadSheetUrl") as string,
                  sheetMusicUrl: formData.get("sheetMusicUrl") as string,
                };
                handleSaveSong(updatedSong);
              }}
            >
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='title'
                    className='text-right'
                  >
                    Title
                  </Label>
                  <Input
                    id='title'
                    name='title'
                    defaultValue={editingSong.title}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='artist'
                    className='text-right'
                  >
                    Artist
                  </Label>
                  <Input
                    id='artist'
                    name='artist'
                    defaultValue={editingSong.artist}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='duration'
                    className='text-right'
                  >
                    Duration
                  </Label>
                  <Input
                    id='duration'
                    name='duration'
                    defaultValue={editingSong.duration}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='originalKey'
                    className='text-right'
                  >
                    Original Key
                  </Label>
                  <Input
                    id='originalKey'
                    name='originalKey'
                    defaultValue={editingSong.originalKey}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='performanceKey'
                    className='text-right'
                  >
                    Performance Key
                  </Label>
                  <Input
                    id='performanceKey'
                    name='performanceKey'
                    defaultValue={editingSong.performanceKey}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='energy'
                    className='text-right'
                  >
                    Energy
                  </Label>
                  <Input
                    id='energy'
                    name='energy'
                    type='number'
                    min='0'
                    max='100'
                    defaultValue={editingSong.energy}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='tags'
                    className='text-right'
                  >
                    Tags
                  </Label>
                  <Input
                    id='tags'
                    name='tags'
                    defaultValue={editingSong.tags.join(", ")}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='notes'
                    className='text-right'
                  >
                    Notes
                  </Label>
                  <Textarea
                    id='notes'
                    name='notes'
                    defaultValue={editingSong.notes}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='previewUrl'
                    className='text-right'
                  >
                    Preview URL
                  </Label>
                  <Input
                    id='previewUrl'
                    name='previewUrl'
                    defaultValue={editingSong.previewUrl}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='lyricsUrl'
                    className='text-right'
                  >
                    Lyrics URL
                  </Label>
                  <Input
                    id='lyricsUrl'
                    name='lyricsUrl'
                    defaultValue={editingSong.lyricsUrl}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='leadSheetUrl'
                    className='text-right'
                  >
                    Lead Sheet URL
                  </Label>
                  <Input
                    id='leadSheetUrl'
                    name='leadSheetUrl'
                    defaultValue={editingSong.leadSheetUrl}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='sheetMusicUrl'
                    className='text-right'
                  >
                    Sheet Music URL
                  </Label>
                  <Input
                    id='sheetMusicUrl'
                    name='sheetMusicUrl'
                    defaultValue={editingSong.sheetMusicUrl}
                    className='col-span-3'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isImporting}
        onOpenChange={setIsImporting}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Songs</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex items-center justify-center'>
              <label
                htmlFor='csv-upload'
                className='cursor-pointer'
              >
                <div className='flex flex-col items-center'>
                  <Upload className='h-12 w-12 text-gray-400' />
                  <span className='mt-2 text-sm text-gray-500'>
                    Click to upload CSV file
                  </span>
                </div>
                <input
                  id='csv-upload'
                  type='file'
                  accept='.csv'
                  className='hidden'
                  onChange={(e) =>
                    e.target.files && handleImport(e.target.files[0])
                  }
                />
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet
        open={viewingSong !== null}
        onOpenChange={(open) => !open && setViewingSong(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{viewingSong?.title}</SheetTitle>
            <SheetDescription>{viewingSong?.artist}</SheetDescription>
          </SheetHeader>
          {viewingSong && (
            <div className='mt-6 space-y-4'>
              <div>
                <h4 className='text-sm font-medium'>Duration</h4>
                <p>{viewingSong.duration}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium'>Original Key</h4>
                <p>{viewingSong.originalKey}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium'>Performance Key</h4>
                <p>{viewingSong.performanceKey}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium'>Energy</h4>
                <p>{viewingSong.energy}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium'>Tags</h4>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {viewingSong.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='secondary'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium'>Notes</h4>
                <p>{viewingSong.notes}</p>
              </div>
              <div className='space-y-2'>
                {viewingSong.lyricsUrl && (
                  <Button
                    asChild
                    className='w-full'
                  >
                    <a
                      href={viewingSong.lyricsUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Lyrics
                    </a>
                  </Button>
                )}
                {viewingSong.leadSheetUrl && (
                  <Button
                    asChild
                    className='w-full'
                  >
                    <a
                      href={viewingSong.leadSheetUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Lead Sheet
                    </a>
                  </Button>
                )}
                {viewingSong.sheetMusicUrl && (
                  <Button
                    asChild
                    className='w-full'
                  >
                    <a
                      href={viewingSong.sheetMusicUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Sheet Music
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
          <SheetFooter>
            <Button onClick={() => viewingSong && onAddToSetlist(viewingSong)}>
              Add to Setlist
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <audio ref={audioRef} />
    </div>
  );
}
