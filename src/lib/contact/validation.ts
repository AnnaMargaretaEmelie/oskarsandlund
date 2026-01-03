export function validateName(name: string) {
  if (name === "") {
    return "Please let me know your name";
  }
  return undefined;
}

export function validateEmail(email: string) {
  if (email === "" || !email.includes("@")) {
    return "Please enter your correct email adress";
  }
  return undefined;
}

export function validateMessage(message: string) {
  if (message.length < 5) {
    return "Write me something I can respond to, at least 5 characters, you can do it! ";
  }
  return undefined;
}