import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Rewards</h1>

      <Card className="dark">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-3">
            FREE PRO MEMBERSHIP FOR 1 MONTH
          </h2>
          <p className="mb-4">
            Get 1 month of PRO MEMBERSHIP on us when you fully complete our{" "}
            <Link href="/" className="underline">
              survey
            </Link>
            . That's a $150 of value completely free. Click Link for Details.
          </p>
          <Link href="/">
            <Button variant="outline">LEARN MORE</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="dark">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-3">EARN $150 IN VALUE</h2>
          <p className="mb-4">
            When you refer a friend to sign up with their broker, once they sign
            up, they must subscribe to our{" "}
            <Link href="/pricing" className="underline">
              Starter
            </Link>{" "}
            or{" "}
            <Link href="/pricing" className="underline">
              PRO
            </Link>{" "}
            membership. After 90 days you will receive 1 month of Professional
            membership for free. Click Link for Details.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">LEARN MORE</Button>
            </DialogTrigger>
            <DialogContent className="dark">
              <DialogHeader>
                <DialogTitle>Lorem Ipsum</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="dark">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-3">
            SIGN UP WITH A BROKER IN CLIENT SECTION
          </h2>
          <p className="mb-4">
            And receive 1 month of Professional completely on us. It's simple -
            head to client section, select brokers, choose a{" "}
            <Link href="/client/dashboard/broker" className="underline">
              broker
            </Link>
            , SIGN UP. And when we receive confirmation you fully completed your
            onboarding, we will credit your account with 1 month of PRO. Click
            Link for Details.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">LEARN MORE</Button>
            </DialogTrigger>
            <DialogContent className="dark">
              <DialogHeader>
                <DialogTitle>Lorem Ipsum</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
