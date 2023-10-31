export function generateUniqueId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const random = Math.random(); // Get a random number
  const uniqueId = `${timestamp}-${random}`; // Combine timestamp and random number
  return uniqueId;
}
