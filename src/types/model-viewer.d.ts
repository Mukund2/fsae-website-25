/* eslint-disable @typescript-eslint/no-empty-object-type */
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.AllHTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      poster?: string;
      "camera-controls"?: boolean | string;
      "auto-rotate"?: boolean | string;
      "auto-rotate-delay"?: string;
      "rotation-per-second"?: string;
      "shadow-intensity"?: string;
      "shadow-softness"?: string;
      exposure?: string;
      "camera-orbit"?: string;
      "field-of-view"?: string;
      "environment-image"?: string;
      "interaction-prompt"?: string;
      "tone-mapping"?: string;
      [key: string]: unknown;
    };
  }
}
