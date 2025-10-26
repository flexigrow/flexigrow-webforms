import React from "react";
import ReactDOM from "react-dom/client";
import r2wc from "react-to-webcomponent";
import styleSheet from "@/index.css?inline";

/**
 * Web Component Wrapper using react-to-webcomponent library
 *
 * Creates Web Components from React components that can be used in any HTML page
 * including WordPress sites.
 *
 * Features:
 * - Shadow DOM support (optional)
 * - Props passed as attributes
 * - Event handling through custom events
 * - Automatic style injection (to shadow DOM or document head)
 * - Lifecycle management via react-to-webcomponent
 */

interface WebComponentConfig {
  tagName: string;
  Component: React.ComponentType<any>;
  props?: Record<string, string>;
  shadow?: "open" | "closed" | undefined;
}

export function createWebComponent({
  tagName,
  Component,
  props = {},
  shadow = undefined,
}: WebComponentConfig) {
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

  WrappedComponent.displayName = `WebComponent(${
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

      // Inject styles based on whether shadow DOM is used
      if (shadow && this.shadowRoot) {
        // Inject styles into shadow DOM
        const style = document.createElement("style");
        style.textContent = styleSheet;
        this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild);

        // Load Google Fonts in the document head (fonts need to be in light DOM)
        this.loadGoogleFonts();
      } else {
        // Inject styles into document head (no shadow DOM)
        const styleId = `${tagName}-styles`;
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          style.textContent = styleSheet;
          document.head.appendChild(style);
        }
        this.loadGoogleFonts();
      }
    }

    private loadGoogleFonts() {
      // Check if Google Fonts are already loaded
      if (
        document.querySelector(
          'link[href*="fonts.googleapis.com/css2?family=Poppins"]'
        )
      ) {
        return;
      }

      // Create preconnect links for better performance
      const preconnectGoogle = document.createElement("link");
      preconnectGoogle.rel = "preconnect";
      preconnectGoogle.href = "https://fonts.googleapis.com";
      document.head.appendChild(preconnectGoogle);

      const preconnectGstatic = document.createElement("link");
      preconnectGstatic.rel = "preconnect";
      preconnectGstatic.href = "https://fonts.gstatic.com";
      preconnectGstatic.crossOrigin = "anonymous";
      document.head.appendChild(preconnectGstatic);

      // Load Poppins font
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }

  // Register the custom element if not already registered
  if (!customElements.get(tagName)) {
    customElements.define(tagName, StyledWebComponent);
  }

  return StyledWebComponent;
}
