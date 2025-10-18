import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-40" />
        <div className="h-[1px] w-full bg-[#00000013]" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <Card className="p-4">
              <Skeleton className="h-10 w-48" />
            </Card>
          </div>
          <div className="lg:hidden">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="hidden lg:block lg:w-80">
          <div className="sticky top-24 space-y-4">
            <Card className="p-4">
              <Skeleton className="mb-4 h-6 w-16" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
            <Card className="p-4">
              <Skeleton className="mb-4 h-6 w-16" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
            <Card className="p-4">
              <Skeleton className="mb-4 h-6 w-16" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-14 rounded-full" />
              </div>
            </Card>
          </div>
        </div>

        <div className="flex-1">
          <Skeleton className="mb-4 h-4 w-32" />

          <div className="grid grid-cols-2 gap-3 min-sm:grid-cols-3 min-lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-40 w-full rounded-3xl" />
                <div className="flex max-w-full flex-col gap-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
