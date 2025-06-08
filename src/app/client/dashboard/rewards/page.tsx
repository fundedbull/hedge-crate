import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="p-4">
      <Card className="dark">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-3">EARN 1 FREE MONTH OF PROOF</h2>
          <p className=" mb-4">
            When you refer a friend and they subscribe to our Pro+ for 90 days
            or more
          </p>
          <Button variant="outline">LEARN MORE</Button>
        </CardContent>
      </Card>
    </div>
  );
}
