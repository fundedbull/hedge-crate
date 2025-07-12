import { CrateList } from "@/components/crate-list";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CratesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = await searchParams;
  const page = params.page;
  const currentPage = page ? parseInt(page) : 1;
  const session = await auth();
  const [user] = await QUERIES.getUserByClerkId(session.userId!);
  const crates = await QUERIES.getCratesByUserIdWithPagination(
    user.id,
    currentPage,
    10
  );
  const totalCrates = await QUERIES.getTotalCratesByUserId(user.id);
  const totalPages = Math.ceil(totalCrates / 10);

  return (
    <div className="p-4">
      <CrateList crates={crates} page="crates" />
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant={"default"} asChild>
                <Link href={`/client/dashboard/crates?page=${currentPage - 1}`}>
                  Previous
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <p className="text-sm text-muted-foreground px-2">
                Page {currentPage} of {totalPages}
              </p>
            </PaginationItem>
            <PaginationItem>
              <Button variant={"default"} asChild>
                <Link href={`/client/dashboard/crates?page=${currentPage + 1}`}>
                  Next
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
