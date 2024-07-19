import type { GetImageResult } from "astro";
import { For, Index, createSignal, useContext, type Component } from "solid-js";
import "solid-slider/slider.css";
import { Slider, SliderContext, SliderProvider } from "solid-slider";
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from "../../icons";
import clsx from "clsx";
import { FullscreenCarousel } from "./FullscreenCarousel";

interface Props {
  images: readonly GetImageResult[];
}
export const ClientCarousel: Component<Props> = (props) => {
  const [fullscreenInitPage, setFullscreenInitPage] = createSignal<
    number | null
  >(null);

  return (
    <>
      <SliderProvider>
        <Body
          {...props}
          onClickImage={(index) => setFullscreenInitPage(index)}
        />
      </SliderProvider>
      <FullscreenCarousel
        initPage={fullscreenInitPage()}
        images={props.images}
        onClose={() => setFullscreenInitPage(null)}
      />
    </>
  );
};

interface BodyProps extends Props {
  onClickImage: (index: number) => void;
}
const Body: Component<BodyProps> = (props) => {
  const [sliderHelper] = useContext(SliderContext);

  return (
    <div class="w-full flex flex-col items-stretch">
      <div class="relative group">
        <Slider options={{ loop: true }}>
          {props.images.map((im, index) => (
            <img
              class="p-2 w-full h-full object-contain object-center aspect-[4/3] cursor-pointer"
              src={im.src}
              {...im.attributes}
              srcset={im.srcSet.attribute}
              loading={index === 0 ? "eager" : "lazy"}
              alt=""
              onClick={() => props.onClickImage(index)}
            />
          ))}
        </Slider>
        <div class="absolute top-0 bottom-0 left-2 w-12 h-full flex flex-col justify-center pointer-events-none">
          <button
            class="w-12 h-24 bg-black/25 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center pointer-events-auto"
            type="button"
            onclick={() => sliderHelper()?.prev()}
          >
            <ChevronLeftIcon class="w-10 h-10" />
          </button>
        </div>
        <div class="absolute top-0 bottom-0 right-2 w-12 h-full flex flex-col justify-center pointer-events-none">
          <button
            class="w-12 h-24 bg-black/25 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center pointer-events-auto"
            type="button"
            onclick={() => sliderHelper()?.next()}
          >
            <ChevronRightIcon class="w-10 h-10" />
          </button>
        </div>
      </div>
      <div class="p-3 flex flex-row justify-center gap-x-4">
        <Index each={props.images}>
          {(_, index) => (
            <button
              type="button"
              class="w-6 h-6 flex justify-center items-center"
              onClick={() => sliderHelper()?.moveTo(index)}
            >
              <CircleIcon
                class={clsx(
                  "transition scale-100",
                  index == (sliderHelper()?.current() ?? 0)
                    ? "text-gray-600"
                    : "scale-75 text-gray-300"
                )}
              />
            </button>
          )}
        </Index>
      </div>
    </div>
  );
};
