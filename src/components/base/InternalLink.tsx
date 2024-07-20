import clsx from "clsx";
import type { ParentComponent } from "solid-js";

interface Props {
  href: string;
  class?: string;
}

export const InternalLink: ParentComponent<Props> = (props) => (
  <a
    href={props.href}
    class={clsx("text-primary-700 hover:text-primary-400", props.class)}
  >
    {props.children}
  </a>
);
