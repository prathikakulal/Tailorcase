// import mongoose from 'mongoose';

// const userSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  username: { type: String, unique: true, sparse: true }, // Allow NULL values
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User; // Use default export for ESM

