import clsx from "clsx";
import type { Component, ParentComponent } from "solid-js";

interface Props {
  href: string;
  class?: string;
}
export const ExternalLinkUnstyled: ParentComponent<Props> = (props) => {
  return (
    <a
      href={props.href}
      class={props.class}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
};

export const ExternalLink: ParentComponent<Props> = (props) => (
  <ExternalLinkUnstyled
    href={props.href}
    class={clsx("text-primary-700 hover:text-primary-400", props.class)}
  >
    {props.children}
  </ExternalLinkUnstyled>
);

export const ExternalLinkButton: ParentComponent<Props> = (props) => (
  <ExternalLinkUnstyled
    href={props.href}
    class={clsx(
      "inline-flex flex-row items-center py-1 px-2 border-b-4 rounded bg-primary-500 hover:bg-primary-400 text-white border-primary-700 hover:border-primary-500",
      props.class
    )}
  >
    {props.children}
  </ExternalLinkUnstyled>
);
