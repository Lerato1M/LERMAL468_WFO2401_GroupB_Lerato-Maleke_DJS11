// GENRE Class
export default class GENRE {
    constructor(id, title, description, showIds) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.showIds = showIds;
    }
  }
  
  // Genre Titles Mapping
  export const genreTitles = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
  };
  