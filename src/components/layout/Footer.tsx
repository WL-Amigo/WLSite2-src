import { format } from "date-fns";
import type { Component } from "solid-js";

export const LayoutFooter: Component = () => (
  <div class="text-center py-8 text-gray-600">
    <span>&copy; {format(new Date(), "yyyy")} Amigo (WhiteLuckBringers)</span>
    <span class="px-2">-</span>
    <a href="/licenses" class="underline hover:text-gray-800">
      licenses
    </a>
  </div>
);
