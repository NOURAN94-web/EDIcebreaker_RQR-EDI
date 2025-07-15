# EDIcebreaker Tool

An interactive question game tool for cultural exchange and icebreaking activities.

## Features

- **Drag and Drop Interface**: Users can drag questions from the question bank into numbered panels
- **Multiple Categories**: 5 different question categories plus a random mix option
  - 🟣 Individual
  - 🟡 Culture and tradition
  - 🟢 Food and nature
  - 🔴 Society and law
  - 🔵 Academics and economy
  - ⚪ Mixed categories (random)
- **Hidden Questions**: Questions are hidden in panels and only revealed when clicked
- **Question Submission**: Users can submit new questions for admin review
- **Responsive Design**: Works on desktop and mobile devices

## Files Structure

```
EDIcebreaker-Tool/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── EDIcebreaker logo.jpg  # Logo image (add your logo here)
```

## How to Use

1. **Setup**: 
   - Download all files to your project folder
   - Add your `EDIcebreaker logo.jpg` file to the same directory
   - Open `index.html` in a web browser

2. **Creating Panels**:
   - Click "Add Panel" to create empty question panels
   - Use "Reset Panels" to clear all panels

3. **Adding Questions**:
   - Select a category from the dropdown
   - Drag questions from the list into the numbered panels
   - Questions will be hidden, showing only the panel number

4. **Revealing Questions**:
   - Click on any numbered panel to reveal/hide the question

5. **Submitting Questions**:
   - Click "Submit a Question" at the bottom
   - Fill in the form and click "Send to Admins"

## Installation

1. Clone or download this repository
2. Add your logo image file named `EDIcebreaker logo.jpg`
3. Open `index.html` in a web browser
4. No additional setup required - it's a pure HTML/CSS/JavaScript application

## Customization

- **Questions**: Edit the `questionBank` object in `script.js` to add/modify questions
- **Styling**: Modify `style.css` to change colors, fonts, and layout
- **Categories**: Add new categories by updating both the HTML select options and the `questionBank` object

## Browser Compatibility

Works in all modern browsers including:
- Chrome
- Firefox  
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and pull requests to improve the tool.
