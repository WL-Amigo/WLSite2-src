import clsx from "clsx";
import type { ParentComponent } from "solid-js";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Transition } from "solid-transition-group";

interface Props {
  open: boolean;
  onClickAway?: () => void;
}
export const ModalBase: ParentComponent<Props> = (props) => {
  return (
    <Portal mount={document.getElementById("modal")!}>
      <Transition
        enterClass="opacity-0"
        enterToClass="opacity-100"
        exitClass="opacity-100"
        exitToClass="opacity-0"
      >
        <Show when={props.open}>
          <div
            class="bg-black bg-opacity-75 fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center transition-opacity duration-200"
            onClick={(ev) => {
              ev.stopPropagation();
              props.onClickAway?.();
            }}
          >
            {props.children}
          </div>
        </Show>
      </Transition>
    </Portal>
  );
};

export const AlwaysMountedModalBase: ParentComponent<Props> = (props) => {
  return (
    <Portal mount={document.getElementById("modal")!}>
      <div
        class={clsx(
          "bg-black/75 fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center transition-opacity duration-200",
          props.open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={(ev) => {
          ev.stopPropagation();
          props.onClickAway?.();
        }}
      >
        {props.children}
      </div>
    </Portal>
  );
};
