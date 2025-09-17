# Dashboard

A web-based dashboard application for monitoring and managing data.

## Features

- User authentication and authorization
- Interactive data visualization
- Real-time updates
- Responsive design
- Customizable widgets

## Used Technologies

- **React.js**: Frontend library for building user interfaces.
- **Vite**: Robust build tool and development server.
- **React-Router**: Routing library for React applications, Data mode.
- **Redux**: State management for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Sonner**: Notification library for React.js applications.

## Installation

```bash
git clone https://github.com/yourusername/Dashboard.git
cd Dashboard
pnpm install
```

## Usage

1. Start the dashboard:
   ```bash
   pnpm dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

```
Dashboard/
├── src/
│   ├── components/
│   │   ├── core/   # Core dashboard components
│   │   └── ui/     # Basic UI components
│   ├── hooks/      # Custom Hooks
│   ├── pages/      # App's pages components
│   ├── store/      # Redux state management
│   └── main.tsx    # Main entry point
│
├── README.md
└── package.json
```

## Component Documentation

### Frontend Components

- **<a href="./src/pages/login.tsx">Login</a>**: Handles user authentication and login form.
- **<a href="./src/components/core/dashboardLayout.tsx">DashboardLayout</a>**: Main layout displaying side-navbar.
- **<a href="./src/components/core/navbar.tsx">Navbar</a>**: Side menu navigation for navigation between dashboard sections and showing logged in user.
- **<a href="./src/components/ui/card.tsx">Card & CardGroup</a>**: Displays a customizable card with a title, content, and optional actions.
- **<a href="./src/components/ui/modal.tsx">Modal</a>**: Displays a modal dialog with customizable content and actions:
- **<a href="./src/components/ui/popover.tsx">Popover</a>**: Displays a popover with customizable content and actions."
- **<a href="./src/components/ui/data-table.tsx">DataTable</a>**: Displays tabular data with sorting, pagination, and filtering capabilities.
- **Notifications**: Used Sonner for notifactions, displays alerts and real-time updates.

### Components Props

- #### **Button**:
  - `variant`: "primary" | "secondary" | "bordered" | "ghost" | "danger" - Defines the button style.
  - `icon`: boolean - Changes the style to fit an icon.
  - `isLoading`: boolean - Displays a loading spinner when true.
  - `children`: ReactNode | string - Content to be displayed inside the button.
- #### **Input**:
  - `Suffix`: ReactNode - Element to be displayed at the end of the input field.
  - `Prefix`: ReactNode - Element to be displayed at the start of the input field.
  - `label`: string - Label for the input field.
  - `error`: boolean - Indicates if the input is in an error state.
  - `errorMessage`: string - Error message to be displayed when `error` is true.
  - `className`: string - Optional additional CSS classes for custom styling.
  - `classNames`: { base: string; wrapper: string; } - Optional custom CSS classes for wrapper and base.
- **Card Props**:
  - `title?`: string - Title of the card.
  - `children`: ReactNode | string - Content to be displayed inside the card.
  - `analytic?`: boolean - Indicates if the card is used for displaying analytical data for custom styling.
  - `className?`: string - Optional additional CSS classes for custom styling.
  - `classNames?`: { title: string; wrapper: string; } - Optional custom CSS classes for title and wrapper.
  - **CardGroup Props**:
    - `children`: Cards elements - Cards to be displayed in the group.
- **Modal Props**:
  - `isOpen`: boolean - Controls the visibility of the modal.
  - `setIsOpen`: React.Dispatch - Function to toggle the visibility of the modal.
  - `children`: ReactNode | ModalTrigger | ModalContent - Content to be displayed inside the modal.
  - **ModalContent**:
    - `title`: string - Title of the modal.
    - `children`: ReactNode - Content to be displayed inside the modal.
  - **ModalTrigger**:
    - <a href="#button">Button's Props</a>
- **Popover Props**:
  - `children`: ReactNode | PopoverTrigger | PopoverContent - Content to be displayed inside the popover.
  - **PopoverContent**:
    - `children`: ReactNode | PopoverItem - Content to be displayed inside the popover.
  - **PopoverItem**:
    - `children`: ReactNode - Content to be displayed inside the popover item.
    - `onClick`: (e) => void - Function to be called when the popover item is clicked.
  - **PopoverTrigger**:
    - <a href="#button">Button's Props</a>
- **DataTable Props**:
  - `data`: TData[] - The data to be displayed in the table.
  - `columns`: ColumnDef: TData[] - Column definitions for the table.
  - `pagination?`: boolean - Optional flag to enable/disable pagination.
  - `header?`: string - Optional header text for the table.
  - `striped?`: boolean - Optional flag to enable/disable striped rows.
