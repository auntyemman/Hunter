export function calculateAge(dateOfBirth: string | Date): number {
  if (!dateOfBirth) {
    return 0; // Return zero for empty date of birth
  }

  // Parse the date of birth string into a Date object
  const dob = new Date(dateOfBirth);

  // Check if the dateOfBirth is a valid date
  if (isNaN(dob.getTime())) {
    return 0; // Return zero for an invalid date of birth
  }

  // The rest of the code to calculate age remains the same
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - dob.getTime();
  const ageInMilliseconds = new Date(timeDifference).getTime();
  const age = Math.abs(ageInMilliseconds / 31557600000);

  // Ensure the calculated age is not lower than 18
  if (age < 18) {
    throw new Error('User must be at least 18 years old'); // return zero if less than 15 years of age
  }

  return Math.floor(age);
}
