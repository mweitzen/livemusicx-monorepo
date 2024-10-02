import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Switch } from "@repo/ui/components/switch";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Progress } from "@repo/ui/components/progress";
import { Badge } from "@repo/ui/components/badge";
import { toast } from "@repo/ui/hooks/use-toast";

import {
  Loader2,
  Search,
  Database,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Book,
} from "@repo/ui/icons";

import {
  socialIntegrations,
  analyticsIntegrations,
  businessIntegrations,
  communicationIntegrations,
  eventManagementIntegrations,
  marketingIntegrations,
  musicIntegrations,
  otherIntegrations,
  paymentIntegrations,
  ticketingIntegrations,
} from "./integrations-list";

export default function InegrationHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  const handleSyncAll = () => {
    setSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncing(false);
          toast({
            title: "Sync Complete",
            description:
              "All integrations have been synchronized successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const filteredIntegrations = (category: string) => {
    const allIntegrations = [
      ...socialIntegrations,
      ...businessIntegrations,
      ...musicIntegrations,
      ...ticketingIntegrations,
      ...marketingIntegrations,
      ...eventManagementIntegrations,
      ...paymentIntegrations,
      ...analyticsIntegrations,
      ...communicationIntegrations,
      ...otherIntegrations,
    ].sort((a, b) => a.name - b.name);

    return allIntegrations.filter(
      (integration) =>
        (category === "all" ||
          integration.category.toLowerCase() === category.toLowerCase()) &&
        (integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          integration.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className='space-y-6 p-6 pb-16 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>
            Integrations Hub
          </h2>
          <p className='text-muted-foreground'>
            Connect LMX with your favorite services and platforms
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search integrations'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-[200px] md:w-[300px]'
            />
          </div>
          <Button
            variant='outline'
            onClick={handleSyncAll}
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            {syncing ? "Syncing..." : "Sync All"}
          </Button>
        </div>
      </div>

      {syncing && (
        <Card className='mt-4'>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm text-muted-foreground'>
                <span>Syncing all integrations...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress
                value={syncProgress}
                className='w-full'
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs
        defaultValue='all'
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList className='flex flex-wrap justify-start'>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='social'>Social</TabsTrigger>
          <TabsTrigger value='business'>Business</TabsTrigger>
          <TabsTrigger value='music'>Music</TabsTrigger>
          <TabsTrigger value='ticketing'>Ticketing</TabsTrigger>
          <TabsTrigger value='marketing'>Marketing</TabsTrigger>
          <TabsTrigger value='event'>Event Management</TabsTrigger>
          <TabsTrigger value='payment'>Payment</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='communication'>Communication</TabsTrigger>
          <TabsTrigger value='other'>Other</TabsTrigger>
        </TabsList>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredIntegrations(activeTab).map((integration, index) => (
            <IntegrationCard
              key={index}
              {...integration}
            />
          ))}
        </div>
      </Tabs>

      <ApiIntegration />
    </div>
  );
}

function IntegrationCard({
  name,
  description,
  icon,
  category,
  connected = false,
}) {
  const [isConnected, setIsConnected] = useState(connected);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleToggle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsLoading(false);
      toast({
        title: isConnected ? "Disconnected" : "Connected",
        description: `${name} has been ${isConnected ? "disconnected" : "connected"} successfully.`,
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {icon}
            <div>
              <CardTitle className='text-sm font-medium'>{name}</CardTitle>
              <CardDescription className='text-xs'>
                {description}
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={isConnected}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          <Badge variant='outline'>{category}</Badge>
          <Dialog
            open={showSettings}
            onOpenChange={setShowSettings}
          >
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='w-24'
                disabled={!isConnected || isLoading}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  "Settings"
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{name} Settings</DialogTitle>
                <DialogDescription>
                  Configure your integration settings here.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor={`${name}-api-key`}>API Key</Label>
                  <Input
                    id={`${name}-api-key`}
                    type='password'
                    value='••••••••••••••••'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor={`${name}-webhook`}>Webhook URL</Label>
                  <Input
                    id={`${name}-webhook`}
                    value={`https://api.lmx.com/webhook/${name.toLowerCase()}`}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Data Sync Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select frequency' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='realtime'>Real-time</SelectItem>
                      <SelectItem value='hourly'>Hourly</SelectItem>
                      <SelectItem value='daily'>Daily</SelectItem>
                      <SelectItem value='weekly'>Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch id={`${name}-notifications`} />
                  <Label htmlFor={`${name}-notifications`}>
                    Enable notifications
                  </Label>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function ApiIntegration() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState(
    "sk_live_abcdefghijklmnopqrstuvwxyz123456"
  );
  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerateApiKey = () => {
    setRegenerating(true);
    setTimeout(() => {
      setApiKey(
        "sk_live_" +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
      );
      setRegenerating(false);
      toast({
        title: "API Key Regenerated",
        description:
          "Your new API key has been generated. Make sure to update it in your applications.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integration</CardTitle>
        <CardDescription>Connect your systems with our API</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='api-key'>API Key</Label>
            <div className='flex mt-1'>
              <Input
                id='api-key'
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className='flex-grow font-mono'
              />
              <Button
                variant='outline'
                className='ml-2'
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
              <Button
                variant='outline'
                className='ml-2'
                onClick={handleRegenerateApiKey}
                disabled={regenerating}
              >
                {regenerating ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <RefreshCw className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
          <div>
            <Label>Webhook URL</Label>
            <div className='flex mt-1'>
              <Input
                value='https://api.lmx.com/webhook'
                readOnly
                className='flex-grow'
              />
              <Button
                variant='outline'
                className='ml-2'
                onClick={() => {
                  navigator.clipboard.writeText("https://api.lmx.com/webhook");
                  toast({
                    title: "Copied",
                    description: "Webhook URL copied to clipboard",
                  });
                }}
              >
                <Copy className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            <Label>API Documentation</Label>
            <p className='text-sm text-muted-foreground'>
              Access our comprehensive API documentation to integrate LMX with
              your systems.
            </p>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => window.open("https://docs.lmx.com/api", "_blank")}
            >
              <Book className='mr-2 h-4 w-4' />
              View Documentation
            </Button>
          </div>
          <div className='space-y-2'>
            <Label>Data Access</Label>
            <div className='flex items-center space-x-2'>
              <Switch id='data-access' />
              <Label htmlFor='data-access'>
                Allow third-party access to your data
              </Label>
            </div>
            <p className='text-sm text-muted-foreground'>
              Enable this to allow integrated services to access your LMX data.
            </p>
          </div>
          <div className='space-y-2'>
            <Label>Security Settings</Label>
            <div className='flex items-center space-x-2'>
              <Switch
                id='two-factor'
                defaultChecked
              />
              <Label htmlFor='two-factor'>
                Two-factor authentication for API access
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Switch id='ip-whitelist' />
              <Label htmlFor='ip-whitelist'>
                IP whitelisting for API requests
              </Label>
            </div>
          </div>
          <Button className='w-full'>
            <Database className='mr-2 h-4 w-4' />
            Manage API Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
