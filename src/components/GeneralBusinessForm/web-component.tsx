import { createWebComponent } from "@/lib/web-component-wrapper";
import { GeneralBusinessForm } from "./GeneralBusinessForm";

/**
 * General Business Form Web Component
 *
 * Usage in HTML/WordPress:
 *
 * <general-business-form></general-business-form>
 *
 * Using react-to-webcomponent library for web component creation
 * with Shadow DOM enabled for style isolation
 */

createWebComponent({
  tagName: "general-business-form",
  Component: GeneralBusinessForm,
  props: {},
  shadow: "open", // Enable shadow DOM
});
