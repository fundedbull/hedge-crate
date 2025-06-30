import BrokerComparisonCard from "@/components/broker-comparison-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUERIES } from "@/server/db/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Zap } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  const userInfo = await currentUser();

  if (!userInfo) {
    redirect("/sign-in");
  }

  const email = userInfo.primaryEmailAddress;
  const name = userInfo.fullName;

  const [user] = await QUERIES.getUserByClerkId(session.userId);

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="dark p-6 space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      <Card className="w-full bg-zinc-900 text-white border-zinc-800">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              defaultValue={name!}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={email?.emailAddress}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-zinc-900 text-white border-zinc-800">
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Update your billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Billing Address</Label>
            <Input id="address" placeholder="Enter your billing address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card">Card Information</Label>
            <Input id="card" placeholder="XXXX-XXXX-XXXX-XXXX" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
