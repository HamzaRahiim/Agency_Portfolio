declare module 'embla-carousel-autoplay' {
  import { EmblaCarouselType } from 'embla-carousel'

  export interface AutoplayOptions {
    delay?: number
    stopOnInteraction?: boolean
    stopOnMouseEnter?: boolean
    stopOnFocusIn?: boolean
    rootNode?: HTMLElement
  }

  export type AutoplayType = ReturnType<typeof Autoplay>

  export default function Autoplay(
    options?: AutoplayOptions
  ): (emblaApi: EmblaCarouselType) => void
}

