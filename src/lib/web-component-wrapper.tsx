import React from "react";
import ReactDOM from "react-dom/client";
import styleSheet from "@/index.css?inline";

/**
 * Web Component Wrapper
 * This utility converts React components into Web Components that can be used in any HTML page
 * including WordPress sites.
 *
 * Key features:
 * - Shadow DOM for style isolation
 * - Props passed as attributes or JSON
 * - Event handling through custom events
 * - Lifecycle management
 */

interface WebComponentConfig {
  tagName: string;
  Component: React.ComponentType<any>;
  attributes?: string[];
  observedAttributes?: string[];
}

export function createWebComponent({
  tagName,
  Component,
  attributes = [],
  observedAttributes = [],
}: WebComponentConfig) {
  class ReactWebComponent extends HTMLElement {
    private root: ReactDOM.Root | null = null;
    private _shadowRoot: ShadowRoot;
    private props: Record<string, any> = {};

    static get observedAttributes() {
      return [...observedAttributes, ...attributes];
    }

    constructor() {
      super();
      // Create shadow DOM for style isolation
      this._shadowRoot = this.attachShadow({ mode: "open" }) as ShadowRoot;

      // Inject styles into Shadow DOM
      const style = document.createElement("style");
      style.textContent = styleSheet;
      this._shadowRoot.appendChild(style);

      // Create mount point
      const mountPoint = document.createElement("div");
      this._shadowRoot.appendChild(mountPoint);
    }

    connectedCallback() {
      this.updateProps();
      this.mount();
    }

    disconnectedCallback() {
      this.unmount();
    }

    attributeChangedCallback(
      _name: string,
      oldValue: string,
      newValue: string
    ) {
      if (oldValue !== newValue) {
        this.updateProps();
        this.mount();
      }
    }

    private updateProps() {
      const newProps: Record<string, any> = {};

      // Get attributes
      Array.from(this.attributes).forEach((attr) => {
        const value = attr.value;
        // Try to parse as JSON, fallback to string
        try {
          newProps[this.camelCase(attr.name)] = JSON.parse(value);
        } catch {
          newProps[this.camelCase(attr.name)] = value;
        }
      });

      // Add event handlers
      this.props = {
        ...newProps,
        onSubmit: (data: any) =>
          this.dispatchEvent(
            new CustomEvent("submit", {
              detail: data,
              bubbles: true,
              composed: true,
            })
          ),
        onSuccess: (data: any) =>
          this.dispatchEvent(
            new CustomEvent("success", {
              detail: data,
              bubbles: true,
              composed: true,
            })
          ),
        onError: (error: any) =>
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: error,
              bubbles: true,
              composed: true,
            })
          ),
        onChange: (data: any) =>
          this.dispatchEvent(
            new CustomEvent("change", {
              detail: data,
              bubbles: true,
              composed: true,
            })
          ),
      };
    }

    private camelCase(str: string): string {
      return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    private mount() {
      const mountPoint = this._shadowRoot.querySelector("div");
      if (!mountPoint) return;

      if (!this.root) {
        this.root = ReactDOM.createRoot(mountPoint);
      }

      this.root.render(
        <React.StrictMode>
          <Component {...this.props} />
        </React.StrictMode>
      );
    }

    private unmount() {
      if (this.root) {
        this.root.unmount();
        this.root = null;
      }
    }
  }

  // Register the custom element
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ReactWebComponent);
  }

  return ReactWebComponent;
}
