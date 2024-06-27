// GENRE Class
export default class GENRE {
  constructor(id, title, description, showIds) {
    this.id = id; // Unique identifier for the genre
    this.title = title; // Title of the genre
    this.description = description; // Description of the genre
    this.showIds = showIds; // Array of IDs of shows belonging to the genre
  }
}

// Genre Titles Mapping
export const genreTitles = {
  1: "Personal Growth", // Title for genre with ID 1
  2: "Investigative Journalism", // Title for genre with ID 2
  3: "History", // Title for genre with ID 3
  4: "Comedy", // Title for genre with ID 4
  5: "Entertainment", // Title for genre with ID 5
  6: "Business", // Title for genre with ID 6
  7: "Fiction", // Title for genre with ID 7
  8: "News", // Title for genre with ID 8
  9: "Kids and Family" // Title for genre with ID 9
};
