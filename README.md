### Project Description: Memo Practice

**Project Name:** Memo Practice

**Description:**
Memo Practice is a mini React project designed to help users practice and enhance their memorization skills. The application provides a simple and interactive interface where users can create, edit, and delete notes within dynamically generated columns. Each column can contain multiple notes, and users can manage these notes through an intuitive UI.

**Features:**
- **Add Columns:** Users can add new columns to organize their notes.
- **Delete Columns:** Columns can be deleted individually.
- **Add Notes:** Notes can be added to any column.
- **Edit Notes:** Users can edit the title and content of existing notes.
- **Delete Notes:** Notes can be deleted from any column.
- **Expandable Notes:** Notes can be expanded to view their full content.
- **Customizable Column Titles:** Users can change the titles of columns.

**Technologies Used:**
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Typed superset of JavaScript that enhances code quality and maintainability.
- **CSS:** Styling of the application to provide a visually appealing interface.
- **Custom Hooks:** For handling color themes and other reusable logic.

**How to Run the Project:**
1. **Clone the repository:**
   ```
   git clone https://github.com/matiashernandezkopi/memo-practice.git
   cd memo-practice
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the application:**
   ```
   npm start
   ```

**Folder Structure:**
```
memo-practice/
├── public/
├── src/
│   ├── components/
│   │   ├── Column.tsx
│   │   ├── ExpansibleNote.tsx
│   ├── hooks/
│   │   └── useColors.ts
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── package.json
└── README.md
```

**Usage Instructions:**
1. Open the application in your browser.
2. Click on the "+" button to add a new column.
3. Add notes to each column by clicking "Add+" and filling out the form.
4. Edit or delete notes by expanding them and using the respective buttons.
5. Customize the column titles by typing in the title input field.

**Purpose:**
The purpose of this project is to provide a simple, hands-on example for practicing React concepts, including state management, component composition, and event handling. It serves as a practical exercise for anyone looking to improve their React skills while building a functional and useful application.
