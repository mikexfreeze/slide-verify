import './libs/fontawesome';
interface params {
    elementId: string;
    onSuccess(): void;
    onFail(): void;
    onRefresh(): void;
    lang?: string;
    photo?: string | string[];
    source?: number[];
}
export default class SlideVerify {
    el: HTMLElement;
    onFail: () => void;
    onSuccess: () => void;
    onRefresh: () => void;
    photo: string | string[] | undefined;
    source: number[] | undefined;
    x?: number;
    y?: number;
    canvasCtx: CanvasRenderingContext2D;
    blockCtx: CanvasRenderingContext2D;
    block: HTMLCanvasElement;
    img?: HTMLImageElement;
    refreshIcon: HTMLElement;
    slider: HTMLElement;
    canvas: HTMLCanvasElement;
    sliderContainer: HTMLElement;
    sliderMask: HTMLElement;
    sliderIcon: HTMLElement;
    text: HTMLElement;
    trail: number[];
    constructor({ elementId, onSuccess, onFail, onRefresh, lang, photo, source }: params);
    initImg(): void;
    clean(): void;
    bindEvents(): void;
    verify(): {
        spliced: boolean;
        verified: boolean;
    };
    reset(): void;
}
export {};
