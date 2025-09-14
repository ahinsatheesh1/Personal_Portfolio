import bcrypt from "bcryptjs";

const run = async () => {
  const plainPassword = "admin1234"; // 👈 pick a new password
  const hash = await bcrypt.hash(plainPassword, 10);

  console.log("Plain password:", plainPassword);
  console.log("Hash:", hash);
};

run();
