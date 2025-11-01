export function SpotlightSkeleton() {
  return (
    <section aria-busy="true" className="relative z-10 w-full py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-10 w-2/3 bg-neutral-200/50 dark:bg-neutral-800/50 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppleCardsSkeleton() {
  return (
    <section aria-busy="true" className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-10 w-1/2 bg-neutral-200/50 dark:bg-neutral-800/50 rounded mb-6 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 w-56 md:h-[40rem] md:w-96 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

// components/skeleton.tsx - Versão com Card
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PostsGridSkeleton() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-16 px-6 xl:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="shadow-none py-0 gap-3 animate-pulse">
            <CardHeader className="p-2 pb-0">
              <div className="aspect-video bg-muted rounded-lg w-full" />
            </CardHeader>
            <CardContent className="pt-0 pb-5 px-5">
              {/* Categorias Skeleton */}
              <div className="flex flex-wrap gap-1 mb-3">
                <div className="h-5 bg-muted rounded w-16"></div>
                <div className="h-5 bg-muted rounded w-12"></div>
              </div>

              {/* Título Skeleton */}
              <div className="mt-2 space-y-2">
                <div className="h-5 bg-muted rounded w-full"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
              </div>

              {/* Resumo Skeleton */}
              <div className="mt-3 space-y-1">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>

              {/* Autor e Data Skeleton */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-muted"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="h-4 bg-muted rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
