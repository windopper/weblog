declare module "ueblueprint/dist/ueblueprint.js" {
  const content: any;
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ueb-blueprint": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      template: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTemplateElement>,
        HTMLTemplateElement
      >;
    }
  }
}

export {};
