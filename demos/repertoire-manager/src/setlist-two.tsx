"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  Pause,
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
  Share2,
  Lightbulb,
  FileText,
  UserPlus,
  UserMinus,
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
import { Switch } from "@repo/ui/components/switch";
import { Label } from "@repo/ui/components/label";

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
  notes: string;
};

type Setlist = {
  id: string;
  name: string;
  sections: SetlistSection[];
  event?: string;
  date?: string;
  notes?: string;
  template?: boolean;
};

type SetlistAction = {
  type: "add" | "remove" | "move" | "edit";
  data: any;
};

type Collaborator = {
  id: string;
  name: string;
  avatar: string;
  role: "editor" | "viewer";
};

type CollaboratorAction = {
  user: string;
  action: string;
  timestamp: number;
};

const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "editor",
  },
  {
    id: "2",
    name: "Bob",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "viewer",
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "editor",
  },
];

const mockSetlistTemplates: Setlist[] = [
  {
    id: "template1",
    name: "Standard Gig",
    template: true,
    sections: [
      { id: "section1", name: "Opening Set", songs: [], notes: "" },
      { id: "section2", name: "Main Set", songs: [], notes: "" },
      { id: "section3", name: "Encore", songs: [], notes: "" },
    ],
    notes: "Standard gig template with opening, main set, and encore.",
  },
  {
    id: "template2",
    name: "Wedding Reception",
    template: true,
    sections: [
      { id: "section1", name: "Ceremony", songs: [], notes: "" },
      { id: "section2", name: "Cocktail Hour", songs: [], notes: "" },
      { id: "section3", name: "Dinner", songs: [], notes: "" },
      { id: "section4", name: "Dancing", songs: [], notes: "" },
    ],
    notes:
      "Wedding reception template with ceremony, cocktail hour, dinner, and dancing sections.",
  },
];

type EditingNotes = { id: string; type: "song" | "section" | "setlist" } | null;

export default function AdvancedSetlistManagement({
  initialSetlist,
  allSongs,
}: {
  initialSetlist: Setlist;
  allSongs: Song[];
}) {
  const [setlist, setSetlist] = useState<Setlist>({
    ...initialSetlist,
    sections: [
      { id: "unplaced", name: "Unplaced Songs", songs: [], notes: "" },
      ...initialSetlist.sections,
    ],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [undoStack, setUndoStack] = useState<SetlistAction[]>([]);
  const [redoStack, setRedoStack] = useState<SetlistAction[]>([]);
  const [collaboratorActions, setCollaboratorActions] = useState<
    CollaboratorAction[]
  >([]);
  const [isOffline, setIsOffline] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [stageLightingEnabled, setStageLightingEnabled] = useState(false);
  const [editingNotes, setEditingNotes] = useState<EditingNotes>(null);
  const [collaborators, setCollaborators] =
    useState<Collaborator[]>(mockCollaborators);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSongs = useMemo(() => {
    return allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [allSongs, searchTerm]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const sourceId = result.source.droppableId;
      const destId = result.destination.droppableId;

      if (sourceId === "repertoire") {
        // Dragging from repertoire to a section
        const song = allSongs.find((s) => s.id === result.draggableId);
        if (song) {
          addSongToSection(song, destId.replace("section-", ""));
        }
      } else {
        // Dragging between sections or within a section
        const newSections = [...setlist.sections];
        const sourceSection = newSections.find(
          (section) => `section-${section.id}` === sourceId
        );
        const destSection = newSections.find(
          (section) => `section-${section.id}` === destId
        );

        if (sourceSection && destSection) {
          const [movedSong] = sourceSection.songs.splice(
            result.source.index,
            1
          );
          destSection.songs.splice(result.destination.index, 0, movedSong);

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

          setUndoStack((prev) => [...prev, action]);
          setRedoStack([]);
          setSetlist((prev) => ({ ...prev, sections: newSections }));
          simulateCollaboratorAction("moved a song");
        }
      }
    },
    [allSongs, setlist.sections]
  );

  const addSection = useCallback(() => {
    const newSection: SetlistSection = {
      id: `section-${Date.now()}`,
      name: `New Section`,
      songs: [],
      notes: "",
    };
    const action: SetlistAction = {
      type: "add",
      data: { section: newSection },
    };
    setUndoStack((prev) => [...prev, action]);
    setRedoStack([]);
    setSetlist((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    simulateCollaboratorAction("added a new section");
  }, []);

  const updateSection = useCallback((sectionId: string, newName: string) => {
    setSetlist((prev) => {
      const oldSection = prev.sections.find(
        (section) => section.id === sectionId
      );
      const action: SetlistAction = {
        type: "edit",
        data: { sectionId, oldName: oldSection?.name, newName },
      };
      setUndoStack((prevStack) => [...prevStack, action]);
      setRedoStack([]);
      const updatedSections = prev.sections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      );
      return { ...prev, sections: updatedSections };
    });
    setEditingSectionId(null);
    simulateCollaboratorAction("renamed a section");
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setSetlist((prev) => {
      const sectionToDelete = prev.sections.find(
        (section) => section.id === sectionId
      );
      if (sectionToDelete && sectionToDelete.id !== "unplaced") {
        const action: SetlistAction = {
          type: "remove",
          data: { section: sectionToDelete },
        };
        setUndoStack((prevStack) => [...prevStack, action]);
        setRedoStack([]);
        const updatedSections = prev.sections.filter(
          (section) => section.id !== sectionId
        );
        const unplacedSection = updatedSections.find(
          (section) => section.id === "unplaced"
        );
        if (unplacedSection) {
          unplacedSection.songs = [
            ...unplacedSection.songs,
            ...sectionToDelete.songs,
          ];
        }
        simulateCollaboratorAction("deleted a section");
        return { ...prev, sections: updatedSections };
      }
      return prev;
    });
  }, []);

  const addSongToSection = useCallback((song: Song, sectionId: string) => {
    const action: SetlistAction = {
      type: "add",
      data: { song, sectionId },
    };
    setUndoStack((prev) => [...prev, action]);
    setRedoStack([]);
    setSetlist((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
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
  }, []);

  const removeSongFromSection = useCallback(
    (songId: string, sectionId: string) => {
      setSetlist((prev) => {
        const sectionToUpdate = prev.sections.find(
          (section) => section.id === sectionId
        );
        const songToRemove = sectionToUpdate?.songs.find(
          (song) => song.id === songId
        );
        if (songToRemove) {
          const action: SetlistAction = {
            type: "remove",
            data: { song: songToRemove, sectionId },
          };
          setUndoStack((prevStack) => [...prevStack, action]);
          setRedoStack([]);
          const updatedSections = prev.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  songs: section.songs.filter((song) => song.id !== songId),
                }
              : section
          );
          const unplacedSection = updatedSections.find(
            (section) => section.id === "unplaced"
          );
          if (unplacedSection) {
            unplacedSection.songs.push(songToRemove);
          }
          simulateCollaboratorAction("removed a song");
          return { ...prev, sections: updatedSections };
        }
        return prev;
      });
    },
    []
  );

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;

    const action = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, action]);

    setSetlist((prev) => {
      switch (action.type) {
        case "add":
          if ("section" in action.data) {
            return {
              ...prev,
              sections: prev.sections.filter(
                (s) => s.id !== action.data.section.id
              ),
            };
          } else {
            return {
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === action.data.sectionId
                  ? {
                      ...s,
                      songs: s.songs.filter(
                        (song) => song.id !== action.data.song.id
                      ),
                    }
                  : s
              ),
            };
          }
        case "remove":
          if ("section" in action.data) {
            return {
              ...prev,
              sections: [...prev.sections, action.data.section],
            };
          } else {
            return {
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === action.data.sectionId
                  ? { ...s, songs: [...s.songs, action.data.song] }
                  : s
              ),
            };
          }
        case "move":
          const newSections = [...prev.sections];
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
          return { ...prev, sections: newSections };
        case "edit":
          return {
            ...prev,
            sections: prev.sections.map((s) =>
              s.id === action.data.sectionId
                ? { ...s, name: action.data.oldName }
                : s
            ),
          };
        default:
          return prev;
      }
    });
  }, [undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const action = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, action]);

    setSetlist((prev) => {
      switch (action.type) {
        case "add":
          if ("section" in action.data) {
            return {
              ...prev,
              sections: [...prev.sections, action.data.section],
            };
          } else {
            return {
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === action.data.sectionId
                  ? { ...s, songs: [...s.songs, action.data.song] }
                  : s
              ),
            };
          }
        case "remove":
          if ("section" in action.data) {
            return {
              ...prev,
              sections: prev.sections.filter(
                (s) => s.id !== action.data.section.id
              ),
            };
          } else {
            return {
              ...prev,
              sections: prev.sections.map((s) =>
                s.id === action.data.sectionId
                  ? {
                      ...s,
                      songs: s.songs.filter(
                        (song) => song.id !== action.data.song.id
                      ),
                    }
                  : s
              ),
            };
          }
        case "move":
          const newSections = [...prev.sections];
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
          return { ...prev, sections: newSections };
        case "edit":
          return {
            ...prev,
            sections: prev.sections.map((s) =>
              s.id === action.data.sectionId
                ? { ...s, name: action.data.newName }
                : s
            ),
          };
        default:
          return prev;
      }
    });
  }, [redoStack]);

  const simulateCollaboratorAction = useCallback(
    (action: string) => {
      const randomCollaborator =
        collaborators[Math.floor(Math.random() * collaborators.length)];
      setCollaboratorActions((prev) => [
        { user: randomCollaborator.name, action, timestamp: Date.now() },
        ...prev.slice(0, 4),
      ]);
    },
    [collaborators]
  );

  const toggleOfflineMode = useCallback(() => {
    setIsOffline((prev) => !prev);
    toast({
      title: isOffline ? "Online Mode" : "Offline Mode",
      description: isOffline
        ? "You're back online. Changes will be synced."
        : "You're working offline. Changes will be synced when you're back online.",
    });
  }, [isOffline]);

  const exportToPDF = useCallback(() => {
    // In a real application, this would generate a PDF
    toast({
      title: "Export to PDF",
      description: "Your setlist has been exported as a PDF.",
    });
  }, []);

  const playPreview = useCallback((song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.previewUrl || "";
      audioRef.current.play();
      setPlayingSongId(song.id);
    }
  }, []);

  const stopPreview = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingSongId(null);
    }
  }, []);

  const calculateTotalDuration = useCallback(() => {
    return setlist.sections.reduce((total, section) => {
      return (
        total +
        section.songs.reduce((sectionTotal, song) => {
          const [minutes, seconds] = song.duration.split(":").map(Number);
          return sectionTotal + minutes * 60 + seconds;
        }, 0)
      );
    }, 0);
  }, [setlist.sections]);

  const formatDuration = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? hours + "h " : ""}${minutes}m ${remainingSeconds}s`;
  }, []);

  const analyzeSetlist = useCallback(() => {
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
  }, [setlist.sections]);

  const applyTemplate = useCallback((template: Setlist) => {
    setSetlist((prev) => ({
      ...prev,
      sections: [
        { id: "unplaced", name: "Unplaced Songs", songs: [], notes: "" },
        ...template.sections.map((section) => ({
          ...section,
          id: `section-${Date.now()}-${section.id}`,
        })),
      ],
    }));
    toast({
      title: "Template Applied",
      description: `The "${template.name}" template has been applied to your setlist.`,
    });
  }, []);

  const shareSetlist = useCallback(() => {
    // In a real application, this would generate a shareable link or QR code
    toast({
      title: "Setlist Shared",
      description: "A shareable link has been copied to your clipboard.",
    });
  }, []);

  const toggleStageLighting = useCallback(() => {
    setStageLightingEnabled((prev) => !prev);
    toast({
      title: stageLightingEnabled
        ? "Stage Lighting Disabled"
        : "Stage Lighting Enabled",
      description: stageLightingEnabled
        ? "Stage lighting integration has been turned off."
        : "Stage lighting will now sync with your setlist.",
    });
  }, [stageLightingEnabled]);

  const updateNotes = useCallback(
    (id: string, type: "song" | "section" | "setlist", notes: string) => {
      setSetlist((prev) => {
        if (type === "setlist") {
          return { ...prev, notes };
        } else if (type === "section") {
          return {
            ...prev,
            sections: prev.sections.map((section) =>
              section.id === id ? { ...section, notes } : section
            ),
          };
        } else {
          return {
            ...prev,
            sections: prev.sections.map((section) => ({
              ...section,
              songs: section.songs.map((song) =>
                song.id === id ? { ...song, notes } : song
              ),
            })),
          };
        }
      });
      setEditingNotes(null);
    },
    []
  );

  const addCollaborator = useCallback(
    (name: string, role: "editor" | "viewer") => {
      const newCollaborator: Collaborator = {
        id: `collaborator-${Date.now()}`,
        name,
        avatar: "/placeholder.svg?height=32&width=32",
        role,
      };
      setCollaborators((prev) => [...prev, newCollaborator]);
      toast({
        title: "Collaborator Added",
        description: `${name} has been added as a ${role}.`,
      });
    },
    []
  );

  const removeCollaborator = useCallback((id: string) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Collaborator Removed",
      description: "The collaborator has been removed from the setlist.",
    });
  }, []);

  const updateCollaboratorRole = useCallback(
    (id: string, newRole: "editor" | "viewer") => {
      setCollaborators((prev) =>
        prev.map((c) => (c.id === id ? { ...c, role: newRole } : c))
      );
      toast({
        title: "Role Updated",
        description: `The collaborator's role has been updated to ${newRole}.`,
      });
    },
    []
  );

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
            setIsPreviewMode((prev) => !prev);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [undo, redo]);

  const Sidebar = useCallback(
    () => (
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Repertoire</CardTitle>
          <CardDescription>
            Drag songs to your setlist or click to add
          </CardDescription>
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
            <Droppable
              droppableId='repertoire'
              isDropDisabled={true}
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredSongs.map((song, index) => (
                    <Draggable
                      key={song.id}
                      draggableId={song.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center justify-between p-2 mb-2 rounded-md ${
                            snapshot.isDragging
                              ? "bg-accent"
                              : "hover:bg-accent"
                          }`}
                        >
                          <div className='flex flex-col'>
                            <span className='font-medium'>{song.title}</span>
                            <span className='text-sm text-muted-foreground'>
                              {song.artist}
                            </span>
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
                                <span className='sr-only'>
                                  {playingSongId === song.id ? "Pause" : "Play"}{" "}
                                  {song.title}
                                </span>
                              </Button>
                            )}
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => addSongToSection(song, "unplaced")}
                              className='lg:hidden'
                            >
                              <Plus className='h-4 w-4' />
                              <span className='sr-only'>
                                Add {song.title} to setlist
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ScrollArea>
        </CardContent>
      </Card>
    ),
    [
      filteredSongs,
      searchTerm,
      playingSongId,
      addSongToSection,
      playPreview,
      stopPreview,
    ]
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
                  <span className='sr-only'>Undo</span>
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
                  <span className='sr-only'>Redo</span>
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
                  <span className='sr-only'>
                    {isPreviewMode ? "Edit Mode" : "Preview Mode"}
                  </span>
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
                  <span className='sr-only'>Export to PDF</span>
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
                  <span className='sr-only'>Analyze Setlist</span>
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
                  <span className='sr-only'>
                    {isOffline ? "Go Online" : "Go Offline"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isOffline ? "Go Online" : "Go Offline"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  onClick={shareSetlist}
                >
                  <Share2 className='h-4 w-4' />
                  <span className='sr-only'>Share Setlist</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Setlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline'>
                <Info className='h-4 w-4' />
                <span className='sr-only'>Setlist Info</span>
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
                <div className='space-y-2'>
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center space-x-2'>
                        <Avatar>
                          <AvatarImage
                            src={collaborator.avatar}
                            alt={collaborator.name}
                          />
                          <AvatarFallback>
                            {collaborator.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{collaborator.name}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Select
                          value={collaborator.role}
                          onValueChange={(value: "editor" | "viewer") =>
                            updateCollaboratorRole(collaborator.id, value)
                          }
                        >
                          <SelectTrigger className='w-[100px]'>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='editor'>Editor</SelectItem>
                            <SelectItem value='viewer'>Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => removeCollaborator(collaborator.id)}
                        >
                          <UserMinus className='h-4 w-4' />
                          <span className='sr-only'>
                            Remove {collaborator.name}
                          </span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-4'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className='mr-2 h-4 w-4' /> Add Collaborator
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Collaborator</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const name = formData.get("name") as string;
                          const role = formData.get("role") as
                            | "editor"
                            | "viewer";
                          if (name && role) {
                            addCollaborator(name, role);
                          }
                        }}
                      >
                        <div className='space-y-4'>
                          <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                              id='name'
                              name='name'
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor='role'>Role</Label>
                            <Select
                              name='role'
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder='Select a role' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='editor'>Editor</SelectItem>
                                <SelectItem value='viewer'>Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type='submit'>Add Collaborator</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <h3 className='text-lg font-semibold mb-2 mt-4'>
                  Recent Actions
                </h3>
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
              <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-2'>Stage Lighting</h3>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='stage-lighting'
                    checked={stageLightingEnabled}
                    onCheckedChange={toggleStageLighting}
                  />
                  <Label htmlFor='stage-lighting'>
                    Enable Stage Lighting Integration
                  </Label>
                </div>
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
                      {!isPreviewMode && section.id !== "unplaced" && (
                        <div className='flex space-x-2'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => setEditingSectionId(section.id)}
                          >
                            <Edit className='h-4 w-4' />
                            <span className='sr-only'>Edit {section.name}</span>
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => deleteSection(section.id)}
                          >
                            <Trash className='h-4 w-4' />
                            <span className='sr-only'>
                              Delete {section.name}
                            </span>
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              setEditingNotes({
                                id: section.id,
                                type: "section",
                              })
                            }
                          >
                            <FileText className='h-4 w-4' />
                            <span className='sr-only'>
                              Edit notes for {section.name}
                            </span>
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingNotes?.id === section.id &&
                        editingNotes.type === "section" && (
                          <Textarea
                            value={section.notes}
                            onChange={(e) =>
                              updateNotes(section.id, "section", e.target.value)
                            }
                            className='mb-2'
                            placeholder='Add notes for this section...'
                          />
                        )}
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
                                    <span className='sr-only'>
                                      {playingSongId === song.id
                                        ? "Pause"
                                        : "Play"}{" "}
                                      {song.title}
                                    </span>
                                  </Button>
                                )}
                                {!isPreviewMode && (
                                  <>
                                    <Button
                                      size='sm'
                                      variant='ghost'
                                      onClick={() =>
                                        removeSongFromSection(
                                          song.id,
                                          section.id
                                        )
                                      }
                                    >
                                      <Trash className='h-4 w-4' />
                                      <span className='sr-only'>
                                        Remove {song.title}
                                      </span>
                                    </Button>
                                    <Button
                                      size='sm'
                                      variant='ghost'
                                      onClick={() =>
                                        setEditingNotes({
                                          id: song.id,
                                          type: "song",
                                        })
                                      }
                                    >
                                      <FileText className='h-4 w-4' />
                                      <span className='sr-only'>
                                        Edit notes for {song.title}
                                      </span>
                                    </Button>
                                  </>
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
            <div className='flex space-x-2 mt-4'>
              <Button onClick={addSection}>
                <Plus className='mr-2 h-4 w-4' /> Add Section
              </Button>
              <Select
                onValueChange={(value) =>
                  applyTemplate(
                    mockSetlistTemplates.find((t) => t.id === value)!
                  )
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Apply Template' />
                </SelectTrigger>
                <SelectContent>
                  {mockSetlistTemplates.map((template) => (
                    <SelectItem
                      key={template.id}
                      value={template.id}
                    >
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                {section.notes && (
                  <p className='text-sm text-muted-foreground mb-2'>
                    {section.notes}
                  </p>
                )}
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
                      {song.notes && (
                        <p className='text-xs text-muted-foreground mt-1'>
                          {song.notes}
                        </p>
                      )}
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
                          <span className='sr-only'>
                            {playingSongId === song.id ? "Pause" : "Play"}{" "}
                            {song.title}
                          </span>
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
