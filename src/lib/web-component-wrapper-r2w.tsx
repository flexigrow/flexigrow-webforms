import React from "react";
import ReactDOM from "react-dom/client";
import r2wc from "react-to-webcomponent";
import styleSheet from "@/index.css?inline";

/**
 * Web Component Wrapper using react-to-webcomponent library
 *
 * This is an alternative implementation using the react-to-webcomponent library.
 * Compare this with our custom wrapper in web-component-wrapper.tsx
 */

interface R2WCConfig {
  tagName: string;
  Component: React.ComponentType<any>;
  props?: Record<string, string>;
  shadow?: "open" | "closed";
}

export function createWebComponentR2W({
  tagName,
  Component,
  props = {},
  shadow = "open",
}: R2WCConfig) {
  // Create a wrapper component that handles event dispatching
  const WrappedComponent = React.forwardRef<HTMLElement, any>((props, ref) => {
    const elementRef = React.useRef<HTMLElement | null>(null);

    React.useImperativeHandle(ref, () => elementRef.current as HTMLElement);

    // Wrap event handlers to dispatch custom events
    const wrappedProps = React.useMemo(() => {
      const newProps = { ...props };

      // Helper to dispatch custom events
      const dispatchEvent = (eventName: string, detail: any) => {
        if (elementRef.current) {
          const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            composed: true,
          });
          elementRef.current.dispatchEvent(event);
        }
      };

      // Wrap callback props to dispatch events
      if (props.onSubmit) {
        const original = props.onSubmit;
        newProps.onSubmit = (data: any) => {
          dispatchEvent("submit", data);
          original?.(data);
        };
      }

      if (props.onSuccess) {
        const original = props.onSuccess;
        newProps.onSuccess = (data: any) => {
          dispatchEvent("success", data);
          original?.(data);
        };
      }

      if (props.onError) {
        const original = props.onError;
        newProps.onError = (error: any) => {
          dispatchEvent("error", error);
          original?.(error);
        };
      }

      if (props.onChange) {
        const original = props.onChange;
        newProps.onChange = (data: any) => {
          dispatchEvent("change", data);
          original?.(data);
        };
      }

      return newProps;
    }, [props]);

    React.useEffect(() => {
      // Store reference to the host element
      // In react-to-webcomponent, we need to traverse up to find the custom element
      let current = (ref as any)?.current;
      if (!current) return;

      // Find the custom element (host)
      while (current && current.tagName?.toLowerCase() !== tagName) {
        current = current.parentElement;
      }

      if (current) {
        elementRef.current = current;
      }
    }, []);

    return <Component {...wrappedProps} />;
  });

  WrappedComponent.displayName = `R2WC(${
    Component.displayName || Component.name || "Component"
  })`;

  // Convert props object to r2wc format
  const r2wcProps: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    r2wcProps[key] = props[key] || "string";
  });

  // Create the web component using react-to-webcomponent
  const WebComponent = r2wc(WrappedComponent, React, ReactDOM, {
    props: r2wcProps,
    shadow,
  });

  // Extend the web component to inject styles
  class StyledWebComponent extends WebComponent {
    constructor() {
      super();
      // Inject styles into Shadow DOM after r2wc creates it
      if (this.shadowRoot) {
        const style = document.createElement("style");
        style.textContent = styleSheet;
        this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild);
      }
    }
  }

  // Register the custom element if not already registered
  if (!customElements.get(tagName)) {
    customElements.define(tagName, StyledWebComponent);
  }

  return StyledWebComponent;
}
