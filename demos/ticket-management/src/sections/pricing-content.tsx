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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import { Slider } from "@repo/ui/components/slider";

export function PricingContent() {
  const [dynamicPricing, setDynamicPricing] = useState(false);
  const [priceAdjustment, setPriceAdjustment] = useState([0, 20]);

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Smart Pricing</CardTitle>
          <CardDescription>
            Optimize your ticket prices based on demand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-2 mb-4'>
            <Switch
              id='dynamic-pricing'
              checked={dynamicPricing}
              onCheckedChange={setDynamicPricing}
            />
            <Label htmlFor='dynamic-pricing'>Enable Smart Pricing</Label>
          </div>
          {dynamicPricing && (
            <div className='space-y-4'>
              <div>
                <Label>Price Adjustment Range</Label>
                <Slider
                  value={priceAdjustment}
                  onValueChange={setPriceAdjustment}
                  max={50}
                  step={1}
                  className='mt-2'
                />
                <p className='text-sm text-muted-foreground mt-1'>
                  Adjust prices up to {priceAdjustment[1]}% based on demand
                </p>
              </div>
              <div>
                <Label>Pricing Strategy</Label>
                <Select defaultValue='balanced'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select strategy' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='conservative'>Conservative</SelectItem>
                    <SelectItem value='balanced'>Balanced</SelectItem>
                    <SelectItem value='aggressive'>Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Early Bird Discount</Label>
                <div className='flex items-center space-x-2 mt-2'>
                  <Input
                    type='number'
                    placeholder='10'
                    className='w-20'
                  />
                  <span>% off for the first</span>
                  <Input
                    type='number'
                    placeholder='50'
                    className='w-20'
                  />
                  <span>tickets</span>
                </div>
              </div>
              <Button>Apply Smart Pricing</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <PromotionalCodes />
    </div>
  );
}

function PromotionalCodes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotional Codes</CardTitle>
        <CardDescription>Create and manage discount codes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <Label htmlFor='code'>Code</Label>
              <Input
                id='code'
                placeholder='SUMMER2023'
              />
            </div>
            <div>
              <Label htmlFor='discount'>Discount</Label>
              <div className='flex items-center'>
                <Input
                  id='discount'
                  type='number'
                  placeholder='10'
                  className='w-20'
                />
                <Select defaultValue='percent'>
                  <SelectTrigger>
                    <SelectValue placeholder='Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='percent'>%</SelectItem>
                    <SelectItem value='fixed'>$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor='expiration'>Expiration</Label>
              <Input
                id='expiration'
                type='date'
              />
            </div>
          </div>
          <Button>Create Promo Code</Button>
        </div>
      </CardContent>
    </Card>
  );
}
