# Hemraj Steam And Operator Management System (HSMS)

A modern, professional web application for real-time monitoring, analytics, and management of industrial steam systems.

## Features

-  **Dashboard:** Real-time KPIs and system health overview
-  **Date & Range Selectors:** Flexible reporting by date or range
-  **Reports & Analytics:** Visualize performance, consumption, and trends
-  **Operator & Shift Filters:** Drill down by operator, shift, or time
-  **Export & Download:** Export reports and analytics in various formats
-  **Responsive UI:** Clean, modern, and mobile-friendly design
-  **Secure:** Built with best practices for authentication and data safety

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Charts:** Recharts

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sayantan-003/Hemraj_Steam_Management_System
   ```
2. **Navigate to the directory: **  
   ```sh
   cd Hemraj_Steam_Management_System
   
3. **Install dependencies:**
   ```sh
   npm install
   # If you encounter issues, install dependencies explicitly:
   npm install react@^19.1.0 react-dom@^19.1.0 react-router-dom@^7.6.3
   npm install -D @eslint/js@^9.29.0 @types/react@^19.1.8 @types/react-dom@^19.1.6 @vitejs/plugin-react-swc@^3.10.2 eslint@^9.29.0 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20 globals@^16.2.0 vite@^7.0.0 tailwindcss @tailwindcss/vite
   ```

4. **Import Tailwind CSS**
   ```sh
   Add an @import to your CSS file that imports Tailwind CSS.

5. **Start the development server:**
   ```sh
   npm run dev
   ```
6. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
HSMS/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── navbar/
│   │   ├── Footer/
│   │   ├── DateSelector/
│   │   ├── SolventReport/
│   │   └── PrepReport/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── package.json
└── README.md
```

## Customization
- Update company info, contact details, and social links in `Footer.jsx`.
- Add or modify reports and analytics in the respective components.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---
© Hemraj Steam Management. All rights reserved.
