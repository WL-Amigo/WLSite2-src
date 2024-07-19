import type { GetImageResult } from "astro";
import {
  Show,
  createEffect,
  createMemo,
  untrack,
  useContext,
  type Component,
} from "solid-js";
import { AlwaysMountedModalBase, ModalBase } from "../base/ModalBase";
import { Slider, SliderContext, SliderProvider } from "solid-slider";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../../icons";
import { isNotNullOrUndefined } from "../../utils/emptiness";

interface Props {
  initPage: number | null;
  images: readonly GetImageResult[];
  onClose: () => void;
}
export const FullscreenCarousel: Component<Props> = (props) => {
  const isOpen = createMemo(() => props.initPage !== null);

  return (
    <AlwaysMountedModalBase open={isOpen()}>
      <SliderProvider>
        <Body {...props} />
      </SliderProvider>
    </AlwaysMountedModalBase>
  );
};

const Body: Component<Props> = (props) => {
  const [sliderHelperRaw] = useContext(SliderContext);
  const sliderHelper = (): ReturnType<typeof sliderHelperRaw> | null =>
    sliderHelperRaw();
  createEffect(() => {
    const sh = untrack(() => sliderHelper());
    const nextInitPage = props.initPage;
    if (nextInitPage === null || !isNotNullOrUndefined(sh)) {
      return;
    }
    sh.moveTo(nextInitPage, 0);
  });

  const isOpen = createMemo(() => props.initPage !== null);

  return (
    <div class="w-full h-full relative flex flex-col justify-center items-stretch">
      <Slider options={{ loop: true, initial: props.initPage ?? 0 }}>
        {props.images.map((im, index) => (
          <img
            class="w-full h-full object-contain object-center"
            src={im.src}
            {...im.attributes}
            srcset={im.srcSet.attribute}
            loading={index === props.initPage ? "eager" : "lazy"}
            alt=""
          />
        ))}
      </Slider>
      <Show when={isOpen()}>
        <div class="absolute top-0 bottom-0 left-0 w-16 h-full hidden lg:flex flex-col justify-center pointer-events-none">
          <button
            class="w-16 h-24 bg-black/25 hover:bg-black/50 text-white flex flex-col justify-center items-center pointer-events-auto"
            type="button"
            onclick={() => sliderHelper()?.prev()}
          >
            <ChevronLeftIcon class="w-10 h-10" />
          </button>
        </div>
        <div class="absolute top-0 bottom-0 right-0 w-16 h-full hidden lg:flex flex-col justify-center pointer-events-none">
          <button
            class="w-16 h-24 bg-black/25 hover:bg-black/50 text-white flex flex-col justify-center items-center pointer-events-auto"
            type="button"
            onclick={() => sliderHelper()?.next()}
          >
            <ChevronRightIcon class="w-10 h-10" />
          </button>
        </div>
        <button
          class="absolute top-0 right-0 w-16 h-16 flex justify-center items-center text-white"
          onClick={() => props.onClose()}
        >
          <CloseIcon class="w-12 h-12" />
        </button>
      </Show>
    </div>
  );
};
