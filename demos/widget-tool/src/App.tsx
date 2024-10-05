"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";
import { Slider } from "@repo/ui/components/slider";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui/components/alert";
import { Copy, Eye, HelpCircle, AlertCircle } from "@repo/ui/icons";

type WidgetType = "styled" | "unstyled" | "data";

interface Customizations {
  showImages: boolean;
  showVenue: boolean;
  showDate: boolean;
  showTime: boolean;
  showDescription: boolean;
  maxEvents: number;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  padding: number;
  dateFormat: string;
  timeFormat: string;
  ctaText: string;
  ctaUrl: string;
}
const googleFonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Poppins",
  "Oswald",
  "Source Sans Pro",
  "Slabo 27px",
  "Merriweather",
];

export default function EventWidgetConfigurator() {
  const [widgetType, setWidgetType] = useState<WidgetType>("styled");
  const [customizations, setCustomizations] = useState<Customizations>({
    showImages: true,
    showVenue: true,
    showDate: true,
    showTime: true,
    showDescription: false,
    maxEvents: 5,
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    fontFamily: "Roboto, sans-serif",
    borderRadius: 4,
    padding: 16,
    dateFormat: "MM/dd/yyyy",
    timeFormat: "12",
    ctaText: "Buy Tickets",
    ctaUrl: "",
  });
  const [apiKey, setApiKey] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [customCss, setCustomCss] = useState("");
  const [customJs, setCustomJs] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${googleFonts.join("|").replace(" ", "+")}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleCustomizationChange = useCallback(
    (key: keyof Customizations, value: any) => {
      setCustomizations((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const generateCode = useCallback(() => {
    const code = `
<!-- LMX Event Widget -->
${widgetType === "styled" ? `<link href="https://fonts.googleapis.com/css?family=${customizations.fontFamily.split(",")[0].trim().replace(" ", "+")}&display=swap" rel="stylesheet">` : ""}
<div id="lmx-event-widget" data-type="${widgetType}"></div>
<script src="https://api.lmx.com/widget.js"></script>
<script>
  LMXWidget.init({
    apiKey: '${apiKey}',
    customizations: ${JSON.stringify(customizations, null, 2)},
    customCss: \`${customCss}\`,
    customJs: function() {
      ${customJs}
    }
  });
</script>
`;
    return code.trim();
  }, [widgetType, apiKey, customizations, customCss, customJs]);

  const copyToClipboard = useCallback(() => {
    const code = generateCode();
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The widget code has been copied to your clipboard.",
      });
    });
  }, [generateCode, toast]);

  const generatePreview = useCallback(() => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter an API key to generate a preview.",
        variant: "destructive",
      });
      return;
    }
    const previewData = { apiKey, customizations, customCss, customJs };
    setPreviewUrl(
      `https://preview.lmx.com/widget?config=${encodeURIComponent(JSON.stringify(previewData))}`
    );
    toast({
      title: "Preview generated",
      description: "You can now view your widget in the preview area.",
    });
  }, [apiKey, customizations, customCss, customJs, toast]);

  return (
    <TooltipProvider>
      <div className='max-w-4xl mx-auto p-6 space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>LMX Event Widget Configurator</CardTitle>
            <CardDescription>
              Customize your event widget and generate the code for your
              website. This tool allows you to create a widget that displays
              your upcoming events from LMX on your own website, giving your
              fans easy access to your event information.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <Label htmlFor='widget-type'>Widget Type</Label>
              <RadioGroup
                id='widget-type'
                value={widgetType}
                onValueChange={(value: WidgetType) => setWidgetType(value)}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='styled'
                    id='styled'
                  />
                  <Label htmlFor='styled'>Styled Widget</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='unstyled'
                    id='unstyled'
                  />
                  <Label htmlFor='unstyled'>Unstyled Widget</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='data'
                    id='data'
                  />
                  <Label htmlFor='data'>Data Only</Label>
                </div>
              </RadioGroup>
              <p className='text-sm text-muted-foreground'>
                Choose 'Styled' for a ready-to-use widget, 'Unstyled' if you
                want to apply your own CSS, or 'Data Only' if you just need the
                event data to use in your own custom implementation.
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='api-key'>API Key</Label>
              <Input
                id='api-key'
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder='Enter your API key'
              />
              <p className='text-sm text-muted-foreground'>
                You can find your API key in your LMX account settings. This key
                is used to authenticate your requests and fetch your event data.
              </p>
            </div>

            <Tabs defaultValue='display'>
              <TabsList>
                <TabsTrigger value='display'>Display</TabsTrigger>
                {widgetType === "styled" && (
                  <TabsTrigger value='style'>Style</TabsTrigger>
                )}
                <TabsTrigger value='advanced'>Advanced</TabsTrigger>
              </TabsList>
              <TabsContent
                value='display'
                className='space-y-4'
              >
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='show-images'
                    checked={customizations.showImages}
                    onCheckedChange={(checked) =>
                      handleCustomizationChange("showImages", checked)
                    }
                  />
                  <Label htmlFor='show-images'>Show Images</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='show-venue'
                    checked={customizations.showVenue}
                    onCheckedChange={(checked) =>
                      handleCustomizationChange("showVenue", checked)
                    }
                  />
                  <Label htmlFor='show-venue'>Show Venue</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='show-date'
                    checked={customizations.showDate}
                    onCheckedChange={(checked) =>
                      handleCustomizationChange("showDate", checked)
                    }
                  />
                  <Label htmlFor='show-date'>Show Date</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='show-time'
                    checked={customizations.showTime}
                    onCheckedChange={(checked) =>
                      handleCustomizationChange("showTime", checked)
                    }
                  />
                  <Label htmlFor='show-time'>Show Time</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='show-description'
                    checked={customizations.showDescription}
                    onCheckedChange={(checked) =>
                      handleCustomizationChange("showDescription", checked)
                    }
                  />
                  <Label htmlFor='show-description'>Show Description</Label>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='max-events'>Maximum Events to Display</Label>
                  <Input
                    id='max-events'
                    type='number'
                    value={customizations.maxEvents}
                    onChange={(e) =>
                      handleCustomizationChange(
                        "maxEvents",
                        parseInt(e.target.value)
                      )
                    }
                    min={1}
                    max={50}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='cta-text'>Call-to-Action Text</Label>
                  <Input
                    id='cta-text'
                    value={customizations.ctaText}
                    onChange={(e) =>
                      handleCustomizationChange("ctaText", e.target.value)
                    }
                    placeholder='e.g., Buy Tickets, RSVP, Learn More'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='cta-url'>Call-to-Action URL</Label>
                  <Input
                    id='cta-url'
                    value={customizations.ctaUrl}
                    onChange={(e) =>
                      handleCustomizationChange("ctaUrl", e.target.value)
                    }
                    placeholder='https://your-ticketing-site.com'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Leave blank to use the default LMX ticketing page. You can
                    use {"{eventId}"} as a placeholder in the URL to dynamically
                    insert the event ID.
                  </p>
                </div>
              </TabsContent>
              {widgetType === "styled" && (
                <TabsContent
                  value='style'
                  className='space-y-4'
                >
                  <div className='space-y-2'>
                    <Label htmlFor='primary-color'>Primary Color</Label>
                    <div className='flex items-center space-x-2'>
                      <Input
                        id='primary-color'
                        type='color'
                        value={customizations.primaryColor}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "primaryColor",
                            e.target.value
                          )
                        }
                        className='w-12 h-12 p-1'
                      />
                      <Input
                        type='text'
                        value={customizations.primaryColor}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "primaryColor",
                            e.target.value
                          )
                        }
                        className='flex-grow'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='secondary-color'>Secondary Color</Label>
                    <div className='flex items-center space-x-2'>
                      <Input
                        id='secondary-color'
                        type='color'
                        value={customizations.secondaryColor}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "secondaryColor",
                            e.target.value
                          )
                        }
                        className='w-12 h-12 p-1'
                      />
                      <Input
                        type='text'
                        value={customizations.secondaryColor}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "secondaryColor",
                            e.target.value
                          )
                        }
                        className='flex-grow'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='font-family'>Font Family</Label>
                    <Select
                      value={customizations.fontFamily.split(",")[0].trim()}
                      onValueChange={(value) =>
                        handleCustomizationChange(
                          "fontFamily",
                          `${value}, sans-serif`
                        )
                      }
                    >
                      <SelectTrigger id='font-family'>
                        <SelectValue placeholder='Select a font' />
                      </SelectTrigger>
                      <SelectContent>
                        {googleFonts.map((font) => (
                          <SelectItem
                            key={font}
                            value={font}
                          >
                            <span style={{ fontFamily: `${font}, sans-serif` }}>
                              {font}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='border-radius'>Border Radius</Label>
                    <Slider
                      id='border-radius'
                      min={0}
                      max={20}
                      step={1}
                      value={[customizations.borderRadius]}
                      onValueChange={([value]) =>
                        handleCustomizationChange("borderRadius", value)
                      }
                    />
                    <div className='text-sm text-muted-foreground'>
                      {customizations.borderRadius}px
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='padding'>Padding</Label>
                    <Slider
                      id='padding'
                      min={0}
                      max={40}
                      step={4}
                      value={[customizations.padding]}
                      onValueChange={([value]) =>
                        handleCustomizationChange("padding", value)
                      }
                    />
                    <div className='text-sm text-muted-foreground'>
                      {customizations.padding}px
                    </div>
                  </div>
                </TabsContent>
              )}
              <TabsContent
                value='advanced'
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='date-format'>Date Format</Label>
                  <Select
                    value={customizations.dateFormat}
                    onValueChange={(value) =>
                      handleCustomizationChange("dateFormat", value)
                    }
                  >
                    <SelectTrigger id='date-format'>
                      <SelectValue placeholder='Select a date format' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MM/dd/yyyy'>MM/DD/YYYY</SelectItem>
                      <SelectItem value='dd/MM/yyyy'>DD/MM/YYYY</SelectItem>
                      <SelectItem value='yyyy-MM-dd'>YYYY-MM-DD</SelectItem>
                      <SelectItem value='MMMM d, yyyy'>
                        Month D, YYYY
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='time-format'>Time Format</Label>
                  <Select
                    value={customizations.timeFormat}
                    onValueChange={(value) =>
                      handleCustomizationChange("timeFormat", value)
                    }
                  >
                    <SelectTrigger id='time-format'>
                      <SelectValue placeholder='Select a time format' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='12'>12-hour</SelectItem>
                      <SelectItem value='24'>24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='custom-css'>Custom CSS</Label>
                  <Textarea
                    id='custom-css'
                    value={customCss}
                    onChange={(e) => setCustomCss(e.target.value)}
                    placeholder='Enter your custom CSS here'
                    className='min-h-[100px] font-mono'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Add any custom CSS to further style your widget. This is
                    applied after the default styles.
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='custom-js'>Custom JavaScript</Label>
                  <Textarea
                    id='custom-js'
                    value={customJs}
                    onChange={(e) => setCustomJs(e.target.value)}
                    placeholder='Enter your custom JavaScript here'
                    className='min-h-[100px] font-mono'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Add any custom JavaScript to extend the functionality of
                    your widget. This runs after the widget is initialized.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={generatePreview}>
                  <Eye className='mr-2 h-4 w-4' />
                  Preview
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate a preview of your widget</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={copyToClipboard}>
                  <Copy className='mr-2 h-4 w-4' />
                  Copy Code
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy the widget code to your clipboard</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>

        {previewUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Widget Preview</CardTitle>
              <CardDescription>
                This is a live preview of how your widget will appear on your
                website. You can interact with it to test functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <iframe
                src={previewUrl}
                title='LMX Event Widget Preview'
                className='w-full h-[400px] border-0'
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
            <CardDescription>
              Copy and paste this code into your website where you want the
              widget to appear. Make sure to place it inside the {"<body>"} tags
              of your HTML.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generateCode()}
              readOnly
              className='min-h-[200px] font-mono text-sm'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Guide</CardTitle>
            <CardDescription>
              Follow these steps to add the LMX Event Widget to your website.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <ol className='list-decimal list-inside space-y-2'>
              <li>Copy the generated code from the box above.</li>
              <li>
                Open your website's HTML file or the appropriate section of your
                content management system where you want the widget to appear.
              </li>
              <li>
                Paste the copied code into your HTML, ensuring it's within the{" "}
                {"<body>"} tags.
              </li>
              <li>
                If you're using a website builder like Wix, Squarespace, or
                WordPress, look for an option to add custom HTML and paste the
                code there.
              </li>
              <li>
                Save your changes and refresh your website to see the widget in
                action.
              </li>
            </ol>
            <Alert>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Need Help?</AlertTitle>
              <AlertDescription>
                If you encounter any issues or need assistance with integration,
                please contact our support team at support@lmx.com or visit our{" "}
                <a
                  href='#'
                  className='font-medium hover:underline'
                >
                  help center
                </a>{" "}
                for more detailed guides.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
