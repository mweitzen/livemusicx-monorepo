"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Plus,
  Edit,
  Trash,
  Copy,
  Save,
  Clock,
  ChevronRight,
  ChevronLeft,
  Search,
  Music,
  Layers,
  Play,
  Menu,
  X,
  Info,
  ArrowRight,
  Undo,
  Redo,
  Users,
  Download,
  Wifi,
  WifiOff,
  Pause,
} from "@repo/ui/icons";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
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
import { Slider } from "@repo/ui/components/slider";
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
} from "@repo/ui/components/sheet";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  key: string;
  notes: string;
  tags: string[];
  energy: number;
  previewUrl?: string;
};

type SetlistSection = {
  id: string;
  name: string;
  songs: Song[];
};

type Setlist = {
  id: string;
  name: string;
  sections: SetlistSection[];
  event?: string;
  date?: string;
  notes?: string;
};

type SetlistAction = {
  type: "add" | "remove" | "move" | "edit";
  data: any;
};

type CollaboratorAction = {
  user: string;
  action: string;
  timestamp: number;
};

const mockCollaborators = [
  { id: "1", name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
];

export default function App({
  initialSetlist,
  allSongs,
}: {
  initialSetlist: Setlist;
  allSongs: Song[];
}) {
  const [setlist, setSetlist] = useState<Setlist>(initialSetlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<SetlistAction[]>([]);
  const [redoStack, setRedoStack] = useState<SetlistAction[]>([]);
  const [collaboratorActions, setCollaboratorActions] = useState<
    CollaboratorAction[]
  >([]);
  const [isOffline, setIsOffline] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSongs = allSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceSection = setlist.sections.find(
      (section) => `section-${section.id}` === result.source.droppableId
    );
    const destSection = setlist.sections.find(
      (section) => `section-${section.id}` === result.destination.droppableId
    );

    if (sourceSection && destSection) {
      const newSections = [...setlist.sections];
      const sourceSectionIndex = newSections.findIndex(
        (section) => section.id === sourceSection.id
      );
      const destSectionIndex = newSections.findIndex(
        (section) => section.id === destSection.id
      );

      const [movedSong] = newSections[sourceSectionIndex].songs.splice(
        result.source.index,
        1
      );
      newSections[destSectionIndex].songs.splice(
        result.destination.index,
        0,
        movedSong
      );

      const action: SetlistAction = {
        type: "move",
        data: {
          song: movedSong,
          fromSection: sourceSection.id,
          toSection: destSection.id,
          fromIndex: result.source.index,
          toIndex: result.destination.index,
        },
      };

      setUndoStack([...undoStack, action]);
      setRedoStack([]);
      setSetlist({ ...setlist, sections: newSections });
      simulateCollaboratorAction("moved a song");
    }
  };

  const addSection = () => {
    const newSection: SetlistSection = {
      id: `section-${Date.now()}`,
      name: `New Section`,
      songs: [],
    };
    const action: SetlistAction = {
      type: "add",
      data: { section: newSection },
    };
    setUndoStack([...undoStack, action]);
    setRedoStack([]);
    setSetlist({ ...setlist, sections: [...setlist.sections, newSection] });
    simulateCollaboratorAction("added a new section");
  };

  const updateSection = (sectionId: string, newName: string) => {
    const oldSection = setlist.sections.find(
      (section) => section.id === sectionId
    );
    const action: SetlistAction = {
      type: "edit",
      data: { sectionId, oldName: oldSection?.name, newName },
    };
    setUndoStack([...undoStack, action]);
    setRedoStack([]);
    const updatedSections = setlist.sections.map((section) =>
      section.id === sectionId ? { ...section, name: newName } : section
    );
    setSetlist({ ...setlist, sections: updatedSections });
    setEditingSectionId(null);
    simulateCollaboratorAction("renamed a section");
  };

  const deleteSection = (sectionId: string) => {
    const sectionToDelete = setlist.sections.find(
      (section) => section.id === sectionId
    );
    const action: SetlistAction = {
      type: "remove",
      data: { section: sectionToDelete },
    };
    setUndoStack([...undoStack, action]);
    setRedoStack([]);
    const updatedSections = setlist.sections.filter(
      (section) => section.id !== sectionId
    );
    setSetlist({ ...setlist, sections: updatedSections });
    simulateCollaboratorAction("deleted a section");
  };

  const addSongToSection = useCallback(
    (song: Song, sectionId: string) => {
      const action: SetlistAction = {
        type: "add",
        data: { song, sectionId },
      };
      setUndoStack([...undoStack, action]);
      setRedoStack([]);
      setSetlist((prevSetlist) => ({
        ...prevSetlist,
        sections: prevSetlist.sections.map((section) =>
          section.id === sectionId
            ? { ...section, songs: [...section.songs, song] }
            : section
        ),
      }));
      toast({
        title: "Song Added",
        description: `${song.title} has been added to the setlist.`,
      });
      simulateCollaboratorAction("added a song");
    },
    [undoStack]
  );

  const removeSongFromSection = (songId: string, sectionId: string) => {
    const sectionToUpdate = setlist.sections.find(
      (section) => section.id === sectionId
    );
    const songToRemove = sectionToUpdate?.songs.find(
      (song) => song.id === songId
    );
    const action: SetlistAction = {
      type: "remove",
      data: { song: songToRemove, sectionId },
    };
    setUndoStack([...undoStack, action]);
    setRedoStack([]);
    const updatedSections = setlist.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            songs: section.songs.filter((song) => song.id !== songId),
          }
        : section
    );
    setSetlist({ ...setlist, sections: updatedSections });
    simulateCollaboratorAction("removed a song");
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const action = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, action]);

    switch (action.type) {
      case "add":
        if ("section" in action.data) {
          setSetlist({
            ...setlist,
            sections: setlist.sections.filter(
              (s) => s.id !== action.data.section.id
            ),
          });
        } else {
          setSetlist({
            ...setlist,
            sections: setlist.sections.map((s) =>
              s.id === action.data.sectionId
                ? {
                    ...s,
                    songs: s.songs.filter(
                      (song) => song.id !== action.data.song.id
                    ),
                  }
                : s
            ),
          });
        }
        break;
      case "remove":
        if ("section" in action.data) {
          setSetlist({
            ...setlist,
            sections: [...setlist.sections, action.data.section],
          });
        } else {
          setSetlist({
            ...setlist,
            sections: setlist.sections.map((s) =>
              s.id === action.data.sectionId
                ? { ...s, songs: [...s.songs, action.data.song] }
                : s
            ),
          });
        }
        break;
      case "move":
        const newSections = [...setlist.sections];
        const sourceSectionIndex = newSections.findIndex(
          (s) => s.id === action.data.fromSection
        );
        const destSectionIndex = newSections.findIndex(
          (s) => s.id === action.data.toSection
        );
        const [movedSong] = newSections[destSectionIndex].songs.splice(
          action.data.toIndex,
          1
        );
        newSections[sourceSectionIndex].songs.splice(
          action.data.fromIndex,
          0,
          movedSong
        );
        setSetlist({ ...setlist, sections: newSections });
        break;
      case "edit":
        setSetlist({
          ...setlist,
          sections: setlist.sections.map((s) =>
            s.id === action.data.sectionId
              ? { ...s, name: action.data.oldName }
              : s
          ),
        });
        break;
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const action = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, action]);

    switch (action.type) {
      case "add":
        if ("section" in action.data) {
          setSetlist({
            ...setlist,
            sections: [...setlist.sections, action.data.section],
          });
        } else {
          setSetlist({
            ...setlist,
            sections: setlist.sections.map((s) =>
              s.id === action.data.sectionId
                ? { ...s, songs: [...s.songs, action.data.song] }
                : s
            ),
          });
        }
        break;
      case "remove":
        if ("section" in action.data) {
          setSetlist({
            ...setlist,
            sections: setlist.sections.filter(
              (s) => s.id !== action.data.section.id
            ),
          });
        } else {
          setSetlist({
            ...setlist,
            sections: setlist.sections.map((s) =>
              s.id === action.data.sectionId
                ? {
                    ...s,
                    songs: s.songs.filter(
                      (song) => song.id !== action.data.song.id
                    ),
                  }
                : s
            ),
          });
        }
        break;
      case "move":
        const newSections = [...setlist.sections];
        const sourceSectionIndex = newSections.findIndex(
          (s) => s.id === action.data.fromSection
        );
        const destSectionIndex = newSections.findIndex(
          (s) => s.id === action.data.toSection
        );
        const [movedSong] = newSections[sourceSectionIndex].songs.splice(
          action.data.fromIndex,
          1
        );
        newSections[destSectionIndex].songs.splice(
          action.data.toIndex,
          0,
          movedSong
        );
        setSetlist({ ...setlist, sections: newSections });
        break;
      case "edit":
        setSetlist({
          ...setlist,
          sections: setlist.sections.map((s) =>
            s.id === action.data.sectionId
              ? { ...s, name: action.data.newName }
              : s
          ),
        });
        break;
    }
  };

  const simulateCollaboratorAction = (action: string) => {
    const randomCollaborator =
      mockCollaborators[Math.floor(Math.random() * mockCollaborators.length)];
    setCollaboratorActions((prev) => [
      { user: randomCollaborator.name, action, timestamp: Date.now() },
      ...prev.slice(0, 4),
    ]);
  };

  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
    toast({
      title: isOffline ? "Online Mode" : "Offline Mode",
      description: isOffline
        ? "You're back online. Changes will be synced."
        : "You're working offline. Changes will be synced when you're back online.",
    });
  };

  const exportToPDF = () => {
    // In a real application, this would generate a PDF
    toast({
      title: "Export to PDF",
      description: "Your setlist has been exporte d as a PDF.",
    });
  };

  const playPreview = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.previewUrl || "";
      audioRef.current.play();
      setPlayingSongId(song.id);
    }
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingSongId(null);
    }
  };

  const calculateTotalDuration = () => {
    return setlist.sections.reduce((total, section) => {
      return (
        total +
        section.songs.reduce((sectionTotal, song) => {
          const [minutes, seconds] = song.duration.split(":").map(Number);
          return sectionTotal + minutes * 60 + seconds;
        }, 0)
      );
    }, 0);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? hours + "h " : ""}${minutes}m ${remainingSeconds}s`;
  };

  const analyzeSetlist = () => {
    const energyFlow = setlist.sections.flatMap((section) =>
      section.songs.map((song) => ({ name: song.title, energy: song.energy }))
    );

    const keyChanges = setlist.sections.flatMap((section) =>
      section.songs.map((song) => ({ name: song.title, key: song.key }))
    );

    // In a real application, you would visualize this data
    console.log("Energy Flow:", energyFlow);
    console.log("Key Changes:", keyChanges);

    toast({
      title: "Setlist Analysis",
      description:
        "Energy flow and key changes have been analyzed. Check the console for details.",
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault();
            undo();
            break;
          case "y":
            e.preventDefault();
            redo();
            break;
          case "f":
            e.preventDefault();
            document.getElementById("search-input")?.focus();
            break;
          case "s":
            e.preventDefault();
            toast({
              title: "Setlist Saved",
              description: "Your setlist has been saved successfully.",
            });
            break;
          case "p":
            e.preventDefault();
            setIsPreviewMode(!isPreviewMode);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPreviewMode, undo, redo]);

  const Sidebar = () => (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Repertoire</CardTitle>
        <CardDescription>Click to add songs to your setlist</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          id='search-input'
          type='text'
          placeholder='Search songs...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mb-2'
        />
        <ScrollArea className='h-[calc(100vh-200px)]'>
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className='flex items-center justify-between p-2 hover:bg-accent rounded-md'
            >
              <Button
                variant='ghost'
                className='w-full justify-start'
                onClick={() =>
                  activeSectionId && addSongToSection(song, activeSectionId)
                }
              >
                <div className='flex flex-col items-start'>
                  <span className='font-medium'>{song.title}</span>
                  <span className='text-sm text-muted-foreground'>
                    {song.artist}
                  </span>
                </div>
              </Button>
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
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>{setlist.name}</h1>
        <div className='flex space-x-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={undo}
                  disabled={undoStack.length === 0}
                >
                  <Undo className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={redo}
                  disabled={redoStack.length === 0}
                >
                  <Redo className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  {isPreviewMode ? (
                    <Edit className='h-4 w-4' />
                  ) : (
                    <Play className='h-4 w-4' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isPreviewMode
                    ? "Edit Mode (Ctrl+P)"
                    : "Preview Mode (Ctrl+P)"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={exportToPDF}
                >
                  <Download className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export to PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={analyzeSetlist}
                >
                  <Layers className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Analyze Setlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={toggleOfflineMode}
                >
                  {isOffline ? (
                    <WifiOff className='h-4 w-4' />
                  ) : (
                    <Wifi className='h-4 w-4' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isOffline ? "Go Online" : "Go Offline"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline'>
                <Info className='h-4 w-4' />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Setlist Summary</SheetTitle>
                <SheetDescription>
                  <div className='space-y-2'>
                    <p>
                      Total Duration: {formatDuration(calculateTotalDuration())}
                    </p>
                    <p>
                      Number of Songs:{" "}
                      {setlist.sections.reduce(
                        (total, section) => total + section.songs.length,
                        0
                      )}
                    </p>
                    <p>Number of Sections: {setlist.sections.length}</p>
                  </div>
                </SheetDescription>
              </SheetHeader>
              <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-2'>Collaborators</h3>
                <div className='flex space-x-2 mb-4'>
                  {mockCollaborators.map((collaborator) => (
                    <TooltipProvider key={collaborator.id}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar>
                            <AvatarImage
                              src={collaborator.avatar}
                              alt={collaborator.name}
                            />
                            <AvatarFallback>
                              {collaborator.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{collaborator.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
                <h3 className='text-lg font-semibold mb-2'>Recent Actions</h3>
                <ul className='space-y-2'>
                  {collaboratorActions.map((action, index) => (
                    <li
                      key={index}
                      className='text-sm'
                    >
                      <span className='font-medium'>{action.user}</span>{" "}
                      {action.action} (
                      {new Date(action.timestamp).toLocaleTimeString()})
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className='lg:flex lg:space-x-4'>
        <div className='hidden lg:block lg:w-1/4'>
          <Sidebar />
        </div>

        <div className='lg:w-3/4'>
          <Sheet
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant='outline'
                className='lg:hidden mb-4'
              >
                <Menu className='h-4 w-4 mr-2' /> Open Repertoire
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <SheetHeader>
                <SheetTitle>Repertoire</SheetTitle>
                <SheetDescription>
                  Click to add songs to your setlist
                </SheetDescription>
              </SheetHeader>
              <div className='mt-4'>
                <Sidebar />
              </div>
            </SheetContent>
          </Sheet>

          <DragDropContext onDragEnd={onDragEnd}>
            {setlist.sections.map((section) => (
              <Droppable
                key={section.id}
                droppableId={`section-${section.id}`}
              >
                {(provided) => (
                  <Card
                    className='mb-4'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <CardHeader>
                      <CardTitle>
                        {editingSectionId === section.id ? (
                          <Input
                            value={section.name}
                            onChange={(e) =>
                              updateSection(section.id, e.target.value)
                            }
                            onBlur={() => setEditingSectionId(null)}
                            autoFocus
                          />
                        ) : (
                          section.name
                        )}
                      </CardTitle>
                      {!isPreviewMode && (
                        <div className='flex space-x-2'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => setEditingSectionId(section.id)}
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => deleteSection(section.id)}
                          >
                            <Trash className='h-4 w-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant={
                              activeSectionId === section.id
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setActiveSectionId(
                                activeSectionId === section.id
                                  ? null
                                  : section.id
                              )
                            }
                          >
                            <Plus className='h-4 w-4 mr-2' /> Add Songs
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {section.songs.map((song, index) => (
                        <Draggable
                          key={song.id}
                          draggableId={song.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className='p-2 mb-2 bg-secondary rounded-md flex justify-between items-center'
                            >
                              <div>
                                <span className='font-medium'>
                                  {song.title}
                                </span>
                                <span className='text-sm text-muted-foreground ml-2'>
                                  by {song.artist}
                                </span>
                              </div>
                              <div className='flex items-center space-x-4'>
                                <span className='text-sm'>{song.duration}</span>
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
                                {!isPreviewMode && (
                                  <Button
                                    size='sm'
                                    variant='ghost'
                                    onClick={() =>
                                      removeSongFromSection(song.id, section.id)
                                    }
                                  >
                                    <Trash className='h-4 w-4' />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                  </Card>
                )}
              </Droppable>
            ))}
          </DragDropContext>

          {!isPreviewMode && (
            <Button
              onClick={addSection}
              className='mt-4'
            >
              <Plus className='mr-2 h-4 w-4' /> Add Section
            </Button>
          )}
        </div>
      </div>

      {isPreviewMode && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Setlist Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-4'>
              <h3 className='text-lg font-medium'>
                Total Duration: {formatDuration(calculateTotalDuration())}
              </h3>
            </div>
            {setlist.sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className='mb-6'
              >
                <h4 className='text-xl font-semibold mb-2'>{section.name}</h4>
                {section.songs.map((song, songIndex) => (
                  <div
                    key={song.id}
                    className='flex justify-between items-center py-2 border-b last:border-b-0'
                  >
                    <div>
                      <span className='font-medium'>{song.title}</span>
                      <span className='text-sm text-muted-foreground ml-2'>
                        by {song.artist}
                      </span>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <span className='text-sm'>{song.duration}</span>
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
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <audio ref={audioRef} />
    </div>
  );
}
