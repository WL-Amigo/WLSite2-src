import clsx from "clsx";
import Styles from "./TopBar.module.css";
import {
  createSignal,
  Show,
  type Component,
  type JSX,
  type ParentComponent,
} from "solid-js";
import LogoImg from "../../assets/Logo.svg";
import { CloseIcon, MenuIcon } from "../../icons";
import { Portal } from "solid-js/web";
import { Transition } from "solid-transition-group";

interface Props {
  path: string;
  mobileButton?: JSX.Element;
}
export const TopBar: Component<Props> = (props) => (
  <nav class="container mx-auto flex flex-row items-center justify-between bg-white px-2 py-2 lg:py-4">
    <a href="/" class="flex flex-row gap-x-2 items-center flex-shrink-0">
      <img
        src={LogoImg.src}
        alt=""
        width={LogoImg.width}
        height={LogoImg.height}
        class="w-8 h-8"
      />
      <span class="font-semibold text-xl tracking-tight">
        WhiteLuckBringers
      </span>
    </a>
    <div class="items-center space-x-4 hidden lg:flex">
      <LinkButton href="/" active={props.path === "/" || props.path === ""}>
        制作物一覧
      </LinkButton>
      <LinkButton href="/profile/" active={props.path.startsWith("/profile")}>
        プロフィール
      </LinkButton>
    </div>
    {props.mobileButton}
  </nav>
);

interface LinkButtonProps {
  href: string;
  active: boolean;
}
const LinkButton: ParentComponent<LinkButtonProps> = (props) => (
  <a
    href={props.href}
    class={clsx(
      "block px-4 py-1 rounded transition duration-200 hover:shadow-md",
      props.active ? "bg-primary-200" : "bg-white"
    )}
  >
    {props.children}
  </a>
);

export const MenuButtonForMobile: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <>
      <button
        type="button"
        class="p-2 w-10 h-10 block lg:hidden"
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuIcon />
      </button>
      <Portal mount={document.getElementById("modal")!}>
        <Transition enterClass={Styles["close"]} exitToClass={Styles["close"]}>
          <Show when={isMenuOpen()}>
            <div
              class={clsx(
                Styles["mobile-menu-container"],
                "fixed inset-0 w-full h-full p-2 flex flex-col justify-center gap-y-3 bg-black/60 text-white"
              )}
            >
              <MobileLink href="/">制作物一覧</MobileLink>
              <MobileLink href="/profile/">プロフィール</MobileLink>
              <button
                class="absolute top-0 right-0 p-2 w-12 h-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon class="h-8 w-8" />
              </button>
            </div>
          </Show>
        </Transition>
      </Portal>
    </>
  );
};

const MobileLink: ParentComponent<{ href: string }> = (props) => (
  <a href={props.href} class="text-xl px-2 py-4">
    {props.children}
  </a>
);
