import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CrateList() {
  const crates = [
    {
      crate: "Common",
      type: "Reversal Arb",
      instrument: "TSLA",
      setup: "",
      date: "4/13/23",
    },
    // You can add more entries as needed
  ];

  return (
    <Card className="dark">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Crates</CardTitle>
            <CardDescription>Manage your trading crates.</CardDescription>
          </div>
          <Button>Open Crate</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="pb-3 pl-4">CRATE</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Instrument</th>
                <th className="pb-3">Setup</th>
                <th className="pb-3">DATE</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crates.map((crate, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 pl-4">
                    <div className="font-medium">{crate.crate}</div>
                  </td>
                  <td>{crate.type}</td>
                  <td>{crate.instrument}</td>
                  <td>{crate.setup}</td>
                  <td>{crate.date}</td>
                  <td className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Crate</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-500">
                          Delete Crate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
