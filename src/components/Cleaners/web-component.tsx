import { createWebComponent } from "@/lib/web-component-wrapper";
import { CleanersForm } from "./CleanersForm";

/**
 * Cleaners Form Web Component
 *
 * Usage in HTML/WordPress:
 *
 * <cleaners-form></cleaners-form>
 *
 * Using react-to-webcomponent library for web component creation
 * with Shadow DOM enabled for style isolation
 */

createWebComponent({
  tagName: "cleaners-form",
  Component: CleanersForm,
  props: {},
  shadow: "open", // Enable shadow DOM
});
