/*
var db=mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    var userSchema = new mongoose.Schema({
      username: {
          type: String,
          unique: true,
          required: true
      },
      hashedPassword: {
          type: String,
          required: true
      }
    });
  
// Компиляция модели Movie с помощью movieSchema в качестве структуры. 
// Mongoose также создаёт для этих документов коллекцию под названием Movies.
var User = mongoose.model('User', userSchema);
});

mongoose.connect('mongodb://localhost/chat');
*/