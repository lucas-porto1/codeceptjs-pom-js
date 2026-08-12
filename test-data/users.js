function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

module.exports = {
  standard: {
    get username() {
      return requireEnvironmentVariable("STANDARD_USER");
    },
    get password() {
      return requireEnvironmentVariable("STANDARD_PASSWORD");
    },
  },
  locked: {
    get username() {
      return requireEnvironmentVariable("LOCKED_USER");
    },
    get password() {
      return requireEnvironmentVariable("STANDARD_PASSWORD");
    },
  },
};
