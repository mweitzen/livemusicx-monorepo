import React, { useState, useRef, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Slider } from "@repo/ui/components/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Toaster } from "@repo/ui/components/toaster";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  AlertCircle,
  Download,
  Image as ImageIcon,
  Move,
  Plus,
  Minus,
  Trash2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Droplet,
} from "@repo/ui/icons";

// Mock data for upcoming events
const upcomingEvents = [
  { id: 1, name: "Summer Fest", date: "2024-07-15", venue: "Central Park" },
  { id: 2, name: "Jazz Night", date: "2024-08-20", venue: "Blue Note" },
  {
    id: 3,
    name: "Rock Concert",
    date: "2024-09-05",
    venue: "Madison Square Garden",
  },
  {
    id: 4,
    name: "Electronic Music Rave",
    date: "2024-10-10",
    venue: "Warehouse 23",
  },
  {
    id: 5,
    name: "Classical Symphony",
    date: "2024-11-15",
    venue: "Carnegie Hall",
  },
];

interface EventText {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  align: "left" | "center" | "right";
  effects: {
    shadow: boolean;
    outline: boolean;
  };
}

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier", label: "Courier" },
  { value: "Verdana", label: "Verdana" },
  { value: "Georgia", label: "Georgia" },
  { value: "Palatino", label: "Palatino" },
  { value: "Garamond", label: "Garamond" },
  { value: "Bookman", label: "Bookman" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Arial Black", label: "Arial Black" },
  { value: "Impact", label: "Impact" },
];

const presetLayouts = [
  {
    name: "Centered Title",
    texts: [
      { text: "Event Title", x: 540, y: 540, fontSize: 48, align: "center" },
    ],
  },
  {
    name: "Title and Date",
    texts: [
      { text: "Event Title", x: 540, y: 400, fontSize: 48, align: "center" },
      { text: "Date", x: 540, y: 680, fontSize: 36, align: "center" },
    ],
  },
  {
    name: "Three Line",
    texts: [
      { text: "Line 1", x: 540, y: 300, fontSize: 36, align: "center" },
      { text: "Line 2", x: 540, y: 540, fontSize: 36, align: "center" },
      { text: "Line 3", x: 540, y: 780, fontSize: 36, align: "center" },
    ],
  },
];

export default function EventImageCreator() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [eventTexts, setEventTexts] = useState<EventText[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 }); // Instagram-friendly size
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<EventText[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [imageAdjustments, setImageAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(1, containerWidth / canvasSize.width);
        setScale(newScale);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [canvasSize.width]);

  useEffect(() => {
    drawCanvas();
  }, [backgroundImage, eventTexts, scale, zoom, imageAdjustments]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          let newWidth = canvasSize.width;
          let newHeight = canvasSize.height;
          if (aspectRatio > 1) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
          setCanvasSize({ width: newWidth, height: newHeight });
          setBackgroundImage(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const addEventText = () => {
    const newEventText: EventText = {
      id: Date.now(),
      text: "New Event",
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      fontSize: 24,
      color: "#FFFFFF",
      fontFamily: "Arial",
      align: "center",
      effects: {
        shadow: false,
        outline: false,
      },
    };
    const newEventTexts = [...eventTexts, newEventText];
    setEventTexts(newEventTexts);
    setSelectedEventId(newEventText.id);
    addToHistory(newEventTexts);
  };

  const updateEventText = (id: number, updates: Partial<EventText>) => {
    const newEventTexts = eventTexts.map((et) =>
      et.id === id ? { ...et, ...updates } : et
    );
    setEventTexts(newEventTexts);
    addToHistory(newEventTexts);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(zoom, zoom);

    if (backgroundImage) {
      const image = new Image();
      image.src = backgroundImage;
      image.crossOrigin = "anonymous";
      ctx.filter = `brightness(${imageAdjustments.brightness}%) contrast(${imageAdjustments.contrast}%) saturate(${imageAdjustments.saturation}%)`;
      ctx.drawImage(image, 0, 0, canvas.width / zoom, canvas.height / zoom);
      ctx.filter = "none";
    }

    eventTexts.forEach((et) => {
      ctx.font = `${et.fontSize}px ${et.fontFamily}`;
      ctx.fillStyle = et.color;
      ctx.textAlign = et.align;
      if (et.effects.shadow) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      }
      if (et.effects.outline) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(et.text, et.x / zoom, et.y / zoom);
      }
      ctx.fillText(et.text, et.x / zoom, et.y / zoom);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    ctx.restore();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale / zoom;
    const y = (event.clientY - rect.top) / scale / zoom;

    const clickedEvent = eventTexts.find(
      (et) =>
        x >= et.x / zoom - 50 &&
        x <= et.x / zoom + 50 &&
        y >= et.y / zoom - 20 &&
        y <= et.y / zoom + 20
    );

    setSelectedEventId(clickedEvent?.id || null);
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (selectedEventId === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;

    updateEventText(selectedEventId, { x, y });
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvasSize.width;
    exportCanvas.height = canvasSize.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    if (backgroundImage) {
      const image = new Image();
      image.src = backgroundImage;
      image.crossOrigin = "anonymous";
      ctx.filter = `brightness(${imageAdjustments.brightness}%) contrast(${imageAdjustments.contrast}%) saturate(${imageAdjustments.saturation}%)`;
      ctx.drawImage(image, 0, 0, canvasSize.width, canvasSize.height);
      ctx.filter = "none";
    }

    eventTexts.forEach((et) => {
      ctx.font = `${et.fontSize}px ${et.fontFamily}`;
      ctx.fillStyle = et.color;
      ctx.textAlign = et.align;
      if (et.effects.shadow) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      }
      if (et.effects.outline) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(et.text, et.x, et.y);
      }
      ctx.fillText(et.text, et.x, et.y);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    const dataUrl = exportCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "event-announcement.png";
    link.click();

    toast({
      title: "Image Exported",
      description: "Your event announcement image has been downloaded.",
    });
  };

  const removeSelectedText = () => {
    if (selectedEventId === null) return;
    const newEventTexts = eventTexts.filter((et) => et.id !== selectedEventId);
    setEventTexts(newEventTexts);
    setSelectedEventId(null);
    addToHistory(newEventTexts);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setEventTexts([]);
    setSelectedEventId(null);
    setBackgroundImage(null);
    setCanvasSize({ width: 1080, height: 1080 });
    setImageAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    setHistory([]);
    setHistoryIndex(-1);
  };

  const addToHistory = (newEventTexts: EventText[]) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newEventTexts];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEventTexts(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEventTexts(history[historyIndex + 1]);
    }
  };

  const handleImageAdjustment = (
    type: "brightness" | "contrast" | "saturation",
    value: number
  ) => {
    setImageAdjustments((prev) => ({ ...prev, [type]: value }));
  };

  const applyPresetLayout = (layout: (typeof presetLayouts)[0]) => {
    const newEventTexts = layout.texts.map((text) => ({
      id: Date.now() + Math.random(),
      ...text,
      color: "#FFFFFF",
      fontFamily: "Arial",
      effects: { shadow: false, outline: false },
    }));
    setEventTexts(newEventTexts);
    addToHistory(newEventTexts);
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Create Event Announcement Image</CardTitle>
        <CardDescription>
          Upload a background and add your upcoming events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue='canvas'
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='canvas'>Canvas</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='adjustments'>Adjustments</TabsTrigger>
          </TabsList>
          <TabsContent value='canvas'>
            <div
              ref={containerRef}
              className='flex justify-center mb-4 overflow-hidden'
            >
              <div className='relative'>
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  style={{
                    width: `${canvasSize.width * scale}px`,
                    height: `${canvasSize.height * scale}px`,
                  }}
                  className='border border-gray-300 cursor-move'
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                />
                <div className='absolute bottom-2 right-2 flex space-x-2'>
                  <Button
                    size='sm'
                    onClick={handleZoomIn}
                  >
                    <ZoomIn className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    onClick={handleZoomOut}
                  >
                    <ZoomOut className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex justify-center space-x-2 mb-4'>
              <Button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                <Undo className='h-4 w-4 mr-2' /> Undo
              </Button>
              <Button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo className='h-4 w-4 mr-2' /> Redo
              </Button>
            </div>
          </TabsContent>
          <TabsContent value='settings'>
            <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='background-image'>
                    Upload Background Image
                  </Label>
                  <Input
                    id='background-image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                  />
                </div>
                <Button onClick={addEventText}>
                  <Plus className='mr-2 h-4 w-4' /> Add Custom Text
                </Button>
                <div className='space-y-2'>
                  <Label>Preset Layouts</Label>
                  <div className='flex flex-wrap gap-2'>
                    {presetLayouts.map((layout, index) => (
                      <Button
                        key={index}
                        variant='outline'
                        onClick={() => applyPresetLayout(layout)}
                      >
                        {layout.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Upcoming Events</Label>
                  {upcomingEvents.map((event) => (
                    <Button
                      key={event.id}
                      variant='outline'
                      className='w-full justify-start'
                      onClick={() => {
                        const newEventText: EventText = {
                          id: Date.now(),
                          text: `${event.name} - ${event.date} @ ${event.venue}`,
                          x: canvasSize.width / 2,
                          y: canvasSize.height / 2,
                          fontSize: 24,
                          color: "#FFFFFF",
                          fontFamily: "Arial",
                          align: "center",
                          effects: { shadow: false, outline: false },
                        };
                        const newEventTexts = [...eventTexts, newEventText];
                        setEventTexts(newEventTexts);
                        setSelectedEventId(newEventText.id);
                        addToHistory(newEventTexts);
                      }}
                    >
                      {event.name} - {event.date}
                    </Button>
                  ))}
                </div>
                {selectedEventId !== null && (
                  <div className='space-y-2'>
                    <Label>Edit Selected Text</Label>
                    <Input
                      value={
                        eventTexts.find((et) => et.id === selectedEventId)
                          ?.text || ""
                      }
                      onChange={(e) =>
                        updateEventText(selectedEventId, {
                          text: e.target.value,
                        })
                      }
                    />
                    <Label>Font Size</Label>
                    <Slider
                      min={12}
                      max={72}
                      step={1}
                      value={[
                        eventTexts.find((et) => et.id === selectedEventId)
                          ?.fontSize || 24,
                      ]}
                      onValueChange={(value) =>
                        updateEventText(selectedEventId, { fontSize: value[0] })
                      }
                    />
                    <Label>Text Color</Label>
                    <Input
                      type='color'
                      value={
                        eventTexts.find((et) => et.id === selectedEventId)
                          ?.color || "#FFFFFF"
                      }
                      onChange={(e) =>
                        updateEventText(selectedEventId, {
                          color: e.target.value,
                        })
                      }
                    />
                    <Label>Font Family</Label>
                    <Select
                      onValueChange={(value) =>
                        updateEventText(selectedEventId, { fontFamily: value })
                      }
                      value={
                        eventTexts.find((et) => et.id === selectedEventId)
                          ?.fontFamily
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a font' />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem
                            key={font.value}
                            value={font.value}
                          >
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Text Alignment</Label>
                    <div className='flex space-x-2'>
                      <Button
                        variant={
                          eventTexts.find((et) => et.id === selectedEventId)
                            ?.align === "left"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          updateEventText(selectedEventId, { align: "left" })
                        }
                      >
                        <AlignLeft className='h-4 w-4' />
                      </Button>
                      <Button
                        variant={
                          eventTexts.find((et) => et.id === selectedEventId)
                            ?.align === "center"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          updateEventText(selectedEventId, { align: "center" })
                        }
                      >
                        <AlignCenter className='h-4 w-4' />
                      </Button>
                      <Button
                        variant={
                          eventTexts.find((et) => et.id === selectedEventId)
                            ?.align === "right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          updateEventText(selectedEventId, { align: "right" })
                        }
                      >
                        <AlignRight className='h-4 w-4' />
                      </Button>
                    </div>
                    <Label>Text Effects</Label>
                    <div className='flex space-x-2'>
                      <Button
                        variant={
                          eventTexts.find((et) => et.id === selectedEventId)
                            ?.effects.shadow
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const currentEffects = eventTexts.find(
                            (et) => et.id === selectedEventId
                          )?.effects;
                          updateEventText(selectedEventId, {
                            effects: {
                              ...currentEffects,
                              shadow: !currentEffects?.shadow,
                            },
                          });
                        }}
                      >
                        Shadow
                      </Button>
                      <Button
                        variant={
                          eventTexts.find((et) => et.id === selectedEventId)
                            ?.effects.outline
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const currentEffects = eventTexts.find(
                            (et) => et.id === selectedEventId
                          )?.effects;
                          updateEventText(selectedEventId, {
                            effects: {
                              ...currentEffects,
                              outline: !currentEffects?.outline,
                            },
                          });
                        }}
                      >
                        Outline
                      </Button>
                    </div>
                    <Button
                      variant='destructive'
                      onClick={removeSelectedText}
                    >
                      <Trash2 className='mr-2 h-4 w-4' /> Remove Text
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='adjustments'>
            <div className='space-y-4'>
              <div>
                <Label>Brightness</Label>
                <Slider
                  min={0}
                  max={200}
                  step={1}
                  value={[imageAdjustments.brightness]}
                  onValueChange={(value) =>
                    handleImageAdjustment("brightness", value[0])
                  }
                />
              </div>
              <div>
                <Label>Contrast</Label>
                <Slider
                  min={0}
                  max={200}
                  step={1}
                  value={[imageAdjustments.contrast]}
                  onValueChange={(value) =>
                    handleImageAdjustment("contrast", value[0])
                  }
                />
              </div>
              <div>
                <Label>Saturation</Label>
                <Slider
                  min={0}
                  max={200}
                  step={1}
                  value={[imageAdjustments.saturation]}
                  onValueChange={(value) =>
                    handleImageAdjustment("saturation", value[0])
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline'>
              <RotateCcw className='mr-2 h-4 w-4' /> Reset All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to reset?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove all your changes and start over.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Download className='mr-2 h-4 w-4' /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={exportImage}>
              Download Image
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast({
                  title: "Feature coming soon",
                  description:
                    "Social media sharing will be available in a future update.",
                })
              }
            >
              Share to Social Media
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
      <Toaster />
    </Card>
  );
}
