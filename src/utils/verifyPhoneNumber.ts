export const validatePhoneNumber = (phoneNumber: string): string | '' => {
  // Regular expression to match both phone number formats
  const phoneNumberRegex = /^(0|\+234)([1-9]\d{9})$/;

  // Remove white spaces from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');

  // Check if the cleaned phone number matches one of the expected formats
  const match = cleanedPhoneNumber.match(phoneNumberRegex);

  if (match) {
    // Process the phone number by adding the country code if missing and removing the leading '0'
    const processedPhoneNumber = match[1] === '0' ? `+234${match[2]}` : match[0];

    // Return the processed phone number
    return processedPhoneNumber;
  } else {
    // If the phone number doesn't match the expected formats, return ""
    return '';
  }
};
