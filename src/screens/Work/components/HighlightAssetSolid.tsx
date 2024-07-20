import { createSignal, type ParentComponent, type JSX } from "solid-js";
import { ModalBase } from "../../../components/base/ModalBase";

interface Props {
  coverImage?: JSX.Element;
  title: string;
}
export const HighlightAssetSolid: ParentComponent<Props> = (props) => {
  const [isOpenFullscreenImage, setIsOpenFullscreenImage] = createSignal(false);

  return (
    <>
      <button
        type="button"
        class="w-full h-12 lg:h-16 relative cursor-pointer"
        onClick={() => setIsOpenFullscreenImage(true)}
      >
        {props.coverImage}
        <div class="absolute inset-0 w-full h-full flex flex-row items-center justify-center lg:justify-start lg:pl-8 bg-black/75 hover:bg-white/75 transition-colors text-white hover:text-black">
          <span class="font-bold text-2xl lg:text-3xl">{props.title}</span>
        </div>
      </button>
      <ModalBase
        open={isOpenFullscreenImage()}
        onClickAway={() => setIsOpenFullscreenImage(false)}
      >
        {props.children}
      </ModalBase>
    </>
  );
};
