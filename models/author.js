const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
    let lifespan = "";
  
    if (this.date_of_birth && this.date_of_death) {
      lifespan = `${this.date_of_birth.toISOString().split('T')[0]} - ${this.date_of_death.toISOString().split('T')[0]}`;
    } else if (this.date_of_birth) {
      lifespan = this.date_of_birth.toISOString().split('T')[0];
    } else if (this.date_of_death) {
      lifespan = this.date_of_death.toISOString().split('T')[0];
    }
  
    return lifespan;
  });
  

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
