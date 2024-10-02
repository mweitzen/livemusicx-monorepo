import IntegrationHub from "./two";

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
import { toast } from "@repo/ui/hooks/use-toast";

import {
  Loader2,
  Search,
  Database,
  Eye,
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

export default function App() {
  return <IntegrationHub />;
}

export function IntegrationsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast({
        title: "Sync Complete",
        description: "All integrations have been synchronized successfully.",
      });
    }, 3000);
  };

  return (
    <div className='space-y-4 p-4 max-w-6xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Integrations Hub</CardTitle>
          <CardDescription>
            Connect LMX with your favorite services and platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center mb-4'>
            <div className='relative w-full max-w-sm'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search integrations'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-8'
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
          <div className='space-y-4'>
            <IntegrationCategory
              title='Social Integrations'
              description='Connect with social media platforms'
              integrations={socialIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Business Integrations'
              description='Streamline your business operations'
              integrations={businessIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Music Integrations'
              description='Promote your music across platforms'
              integrations={musicIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Ticketing Integrations'
              description='Manage ticket sales and distribution'
              integrations={ticketingIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Marketing Integrations'
              description='Enhance your marketing efforts'
              integrations={marketingIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Event Management Integrations'
              description='Streamline your event planning and execution'
              integrations={eventManagementIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Payment Integrations'
              description='Process payments securely'
              integrations={paymentIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Analytics Integrations'
              description='Gain insights into your performance'
              integrations={analyticsIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Communication Integrations'
              description='Enhance your communication channels'
              integrations={communicationIntegrations}
              searchTerm={searchTerm}
            />
            <IntegrationCategory
              title='Other Integrations'
              description='Additional tools and services'
              integrations={otherIntegrations}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>
      <ApiIntegration />
    </div>
  );
}

function IntegrationCategory({ title, description, integrations, searchTerm }) {
  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredIntegrations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredIntegrations.map((integration, index) => (
            <IntegrationCard
              key={index}
              {...integration}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function IntegrationCard({ name, description, icon, connected = false }) {
  const [isConnected, setIsConnected] = useState(connected);
  const [isLoading, setIsLoading] = useState(false);

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
        <Button
          variant='outline'
          className='w-full'
          onClick={handleToggle}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : isConnected ? (
            "Manage"
          ) : (
            "Connect"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function ApiIntegration() {
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
                type='password'
                value='••••••••••••••••'
                readOnly
                className='flex-grow'
              />
              <Button
                variant='outline'
                className='ml-2'
              >
                <Eye className='h-4 w-4 mr-1' />
                Show
              </Button>
              <Button
                variant='outline'
                className='ml-2'
              >
                <RefreshCw className='h-4 w-4 mr-1' />
                Regenerate
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
              >
                <Copy className='h-4 w-4 mr-1' />
                Copy
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            <Label>API Documentation</Label>
            <p className='text-sm text-muted-foreground'>
              Access our comprehensive API documentation to integrate LMX with
              your systems.
            </p>
            <Button variant='outline'>
              <Book className='h-4 w-4 mr-1' />
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
          <div>
            <Button className='w-full'>
              <Database className='h-4 w-4 mr-1' />
              Manage API Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
