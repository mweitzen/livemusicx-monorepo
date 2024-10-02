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
import { CreditCard, Eye, RefreshCw, Copy, Book } from "@repo/ui/icons";

export function IntegrationsContent() {
  return (
    <div className='space-y-4'>
      <PaymentGateways />
      <ExternalTicketingServices />
      <ApiIntegration />
    </div>
  );
}

function PaymentGateways() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Gateways</CardTitle>
        <CardDescription>
          Connect your preferred payment methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <CreditCard className='h-8 w-8' />
              <div>
                <p className='font-semibold'>Stripe</p>
                <p className='text-sm text-muted-foreground'>
                  Accept credit card payments
                </p>
              </div>
            </div>
            <Button variant='outline'>Connect</Button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <img
                src='/placeholder.svg?height=32&width=32'
                alt='PayPal logo'
                className='w-8 h-8'
              />
              <div>
                <p className='font-semibold'>PayPal</p>
                <p className='text-sm text-muted-foreground'>
                  Accept PayPal payments
                </p>
              </div>
            </div>
            <Button variant='outline'>Connect</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExternalTicketingServices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>External Ticketing Services</CardTitle>
        <CardDescription>
          Connect with popular ticketing platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <img
                src='/placeholder.svg?height=40&width=40'
                alt='Ticketmaster logo'
                className='w-10 h-10'
              />
              <div>
                <p className='font-semibold'>Ticketmaster</p>
                <p className='text-sm text-muted-foreground'>
                  Sync events and ticket sales
                </p>
              </div>
            </div>
            <Button variant='outline'>Connect</Button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <img
                src='/placeholder.svg?height=40&width=40'
                alt='Eventbrite logo'
                className='w-10 h-10'
              />
              <div>
                <p className='font-semibold'>Eventbrite</p>
                <p className='text-sm text-muted-foreground'>
                  Import events and attendees
                </p>
              </div>
            </div>
            <Button variant='outline'>Connect</Button>
          </div>
        </div>
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
                value='https://api.example.com/webhook'
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
          <div>
            <Label>API Documentation</Label>
            <p className='text-sm text-muted-foreground mt-1'>
              Access our comprehensive API documentation to integrate LMX with
              your systems.
            </p>
            <Button
              variant='outline'
              className='mt-2'
            >
              <Book className='h-4 w-4 mr-1' />
              View Documentation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
