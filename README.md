# FlexiGrow Insurance Quote Form

A modern, multi-step insurance quote form built as a web component for easy integration with WordPress or any website.

## 🚀 Features

- **Multi-Step Form**: Progressive disclosure for better UX
- **Form Validation**: Built-in validation with Zod and React Hook Form
- **Modern UI**: Dark theme with Tailwind CSS and shadcn/ui components
- **Web Component**: Works anywhere (WordPress, HTML, React, Vue, etc.)
- **Responsive**: Mobile-first design
- **TypeScript**: Type-safe development

## 📦 Stack

- **Vite** - Fast build tool
- **React** - UI framework (encapsulated in web component)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Beautiful UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 🛠️ Development

### Install Dependencies

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Development Environment
VITE_API_BASE_URL=https://dev.flexigrowapi.com
VITE_API_SIGNATURE=your-dev-signature-key-here

# Production Environment
VITE_API_PROD_BASE_URL=https://uat.flexigrowapi.com
VITE_API_PROD_SIGNATURE=your-prod-signature-key-here
```

**Note:** The application automatically selects the appropriate API URL and signature based on the environment:

- Development mode (`yarn dev`) uses `VITE_API_BASE_URL` and `VITE_API_SIGNATURE`
- Production build (`yarn build`) uses `VITE_API_PROD_BASE_URL` and `VITE_API_PROD_SIGNATURE`

### Development Server

```bash
yarn dev
```

Visit `http://localhost:5173` to see the form in action.

### Build for Production

```bash
yarn build
```

Output will be in the `dist/` folder:

- `dist/MultiStepForm.js` - Your web component

## 📝 Usage

### In HTML

```html
<!-- Include the web component -->
<script type="module" src="/path/to/MultiStepForm.js"></script>

<!-- Use the component -->
<multi-step-form></multi-step-form>
```

### In WordPress

#### Option 1: Using Shortcode

1. Copy code from `wordpress-helper.php` to your theme's `functions.php`
2. Upload `dist/MultiStepForm.js` to `/wp-content/themes/your-theme/js/`
3. Use the shortcode in any page or post:

```
[quote_form]
```

#### Option 2: Using HTML Block

Add an HTML block with:

```html
<multi-step-form></multi-step-form>
```

## 🎨 Customization

### Styling

The form uses Tailwind CSS classes. You can customize the theme by editing:

- `src/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- `src/components/MultiStepForm/MultiStepForm.tsx` - Component styles

### Form Steps

Currently implemented:

1. **Your Details** - Personal and business information

To add more steps, edit `src/components/MultiStepForm/MultiStepForm.tsx`.

## 📂 Project Structure

```
flexigrow-webforms/
├── src/
│   ├── components/
│   │   ├── MultiStepForm/
│   │   │   ├── MultiStepForm.tsx      # Main component
│   │   │   └── web-component.tsx      # Web component wrapper
│   │   └── ui/                        # shadcn/ui components
│   ├── lib/
│   │   ├── utils.ts                   # Utility functions
│   │   └── web-component-wrapper.tsx  # Web component helper
│   └── index.css                      # Global styles
├── dist/                              # Build output
│   └── MultiStepForm.js
├── wordpress-helper.php               # WordPress integration
└── index.html                         # Development demo
```

## 🔧 WordPress Integration

The `wordpress-helper.php` file provides:

- **Script Enqueuing**: Automatically loads the web component
- **REST API Endpoint**: `/wp-json/flexigrow/v1/quote`
- **Form Handler**: Processes submissions and sends email notifications
- **Shortcode**: `[quote_form]` for easy embedding

## 🚢 Deployment

1. Build the project:

   ```bash
   yarn build
   ```

2. Upload `dist/MultiStepForm.js` to your server

3. For WordPress:
   - Copy `wordpress-helper.php` code to `functions.php`
   - Or create a custom plugin using the provided code

## 📄 License

MIT

## 🤝 Contributing

Feel free to submit issues and pull requests!
